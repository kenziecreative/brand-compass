#!/usr/bin/env node
// Check for Brand Compass updates in background, write result to cache.
// Called by SessionStart hook — runs once per session, non-blocking.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const cwd = process.cwd();
const homeDir = os.homedir();
const cacheDir = path.join(homeDir, '.claude', 'cache');
const cacheFile = path.join(cacheDir, 'brand-compass-update.json');

// Ensure cache directory exists
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Run check in background (detached so it doesn't block session start)
const child = spawn(process.execPath, ['-e', `
  const fs = require('fs');
  const { execSync } = require('child_process');

  const cwd = ${JSON.stringify(cwd)};
  const cacheFile = ${JSON.stringify(cacheFile)};

  function run(cmd) {
    return execSync(cmd, { cwd, encoding: 'utf8', timeout: 15000, windowsHide: true }).trim();
  }

  try {
    // Verify this is the brand-compass repo
    const remote = run('git remote get-url origin');
    if (!remote.includes('knz-brand-guidance')) process.exit(0);

    // Fetch latest from remote (quiet, no merge, include tags for version detection)
    run('git fetch origin main --quiet --tags');

    const localSha = run('git rev-parse HEAD');
    const remoteSha = run('git rev-parse origin/main');

    if (localSha === remoteSha) {
      // Up to date
      let localVersion = 'unknown';
      try { localVersion = run('git describe --tags HEAD'); } catch (e) {
        try { localVersion = run('git tag --sort=-creatordate').split('\\n')[0]; } catch (e2) {}
      }

      fs.writeFileSync(cacheFile, JSON.stringify({
        update_available: false,
        local_sha: localSha.slice(0, 7),
        remote_sha: remoteSha.slice(0, 7),
        local_version: localVersion,
        remote_version: localVersion,
        commits_behind: 0,
        commit_summary: [],
        checked: Math.floor(Date.now() / 1000)
      }));
      process.exit(0);
    }

    // Behind remote — gather details
    const log = run('git log HEAD..origin/main --oneline');
    const commits = log.split('\\n').filter(Boolean);

    let localVersion = 'unknown';
    try { localVersion = run('git describe --tags HEAD'); } catch (e) {
      try { localVersion = run('git tag --sort=-creatordate').split('\\n')[0]; } catch (e2) {}
    }

    let remoteVersion = 'unknown';
    try { remoteVersion = run('git describe --tags origin/main'); } catch (e) {
      try { remoteVersion = run('git tag --sort=-creatordate').split('\\n')[0]; } catch (e2) {}
    }

    fs.writeFileSync(cacheFile, JSON.stringify({
      update_available: true,
      local_sha: localSha.slice(0, 7),
      remote_sha: remoteSha.slice(0, 7),
      local_version: localVersion,
      remote_version: remoteVersion,
      commits_behind: commits.length,
      commit_summary: commits.map(c => c.replace(/^[a-f0-9]+ /, '')),
      checked: Math.floor(Date.now() / 1000)
    }));
  } catch (e) {
    // Network error, not a git repo, etc. — fail silently, no notification.
  }
`], {
  stdio: 'ignore',
  detached: true,
  windowsHide: true
});

child.unref();
