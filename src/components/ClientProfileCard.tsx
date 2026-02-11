import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getAssetPack } from '@/lib/phase-utils'
import type { ClientProfile } from '@/types/brand'

interface ClientProfileCardProps {
  client: ClientProfile
}

export function ClientProfileCard({ client }: ClientProfileCardProps) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">{client.name}</h2>
          {client.type && (
            <Badge variant="outline" className="mt-1">
              {client.type}
            </Badge>
          )}
        </div>

        {client.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{client.description}</p>
        )}

        {client.platforms.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
              Platforms
            </p>
            <div className="flex flex-wrap gap-1.5">
              {client.platforms.map(p => (
                <Badge key={p} variant="secondary" className="text-xs">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {client.existingAssets.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
              Existing Assets
            </p>
            <p className="text-sm text-muted-foreground">{client.existingAssets.join(', ')}</p>
          </div>
        )}

        {client.assetPacks.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
              Asset Packs
            </p>
            <div className="flex flex-wrap gap-1.5">
              {client.assetPacks.map(id => {
                const pack = getAssetPack(id)
                return (
                  <Badge key={id} variant="info" className="text-xs">
                    {pack?.shortName ?? id}
                  </Badge>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
