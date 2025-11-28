"use client"

import { ExposureType } from "@/types"
import { exposureTypes } from "@/data/security-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Globe, Lock } from "lucide-react"

interface ExposureStepProps {
  onSelect: (type: ExposureType) => void
  onBack: () => void
}

export function ExposureStep({ onSelect, onBack }: ExposureStepProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          Steg 1 av 2
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Velg eksponeringstype
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Hvor er tjenesten tilgjengelig fra?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {exposureTypes.map((exp) => (
          <button
            key={exp.type}
            onClick={() => onSelect(exp.type)}
            className="group rounded-xl border border-border bg-card p-8 text-left transition-all hover:border-primary/50 hover:shadow-lg overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                {exp.type === "internet" ? (
                  <Globe className="h-6 w-6" />
                ) : (
                  <Lock className="h-6 w-6" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors break-words">
                  {exp.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {exp.description}
                </p>
                <Badge
                  variant={exp.type === "internet" ? "destructive" : "secondary"}
                  className="text-xs"
                >
                  {exp.riskLevel}
                </Badge>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6 max-w-3xl mx-auto">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
            !
          </div>
          <div>
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
              Viktig om Helsenettet
            </h4>
            <p className="text-sm text-muted-foreground">
              I henhold til Normen Faktaark 24 regnes Helsenettet som et{" "}
              <strong className="text-foreground">åpent nett</strong>. Dette
              betyr at kryptering er obligatorisk også for kommunikasjon
              innenfor Helsenettet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
