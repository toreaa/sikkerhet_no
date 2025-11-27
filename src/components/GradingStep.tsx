"use client"

import { ExposureType, GradingLevel } from "@/types"
import { gradingLevels, exposureTypes } from "@/data/security-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface GradingStepProps {
  exposure: ExposureType
  onSelect: (level: GradingLevel) => void
  onBack: () => void
}

export function GradingStep({ exposure, onSelect, onBack }: GradingStepProps) {
  const exposureInfo = exposureTypes.find((e) => e.type === exposure)

  const levelStyles = {
    1: "border-green-500/30 hover:border-green-500/50 bg-green-500/5",
    2: "border-yellow-500/30 hover:border-yellow-500/50 bg-yellow-500/5",
    3: "border-orange-500/30 hover:border-orange-500/50 bg-orange-500/5",
    4: "border-red-500/30 hover:border-red-500/50 bg-red-500/5",
  }

  const levelTextColors = {
    1: "text-green-600 dark:text-green-400",
    2: "text-yellow-600 dark:text-yellow-400",
    3: "text-orange-600 dark:text-orange-400",
    4: "text-red-600 dark:text-red-400",
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          Steg 2 av 2
        </Badge>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Velg graderingsnivå
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-4">
          Hvilken type informasjon behandler systemet?
        </p>
        <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Valgt eksponering:</span>
          <span className="font-medium text-foreground">{exposureInfo?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {gradingLevels.map((level) => (
          <button
            key={level.level}
            onClick={() => onSelect(level.level as GradingLevel)}
            className={cn(
              "group rounded-xl border p-6 text-left transition-all hover:shadow-lg",
              levelStyles[level.level as keyof typeof levelStyles]
            )}
          >
            <div className="flex items-start gap-4">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-background border font-bold text-lg",
                  levelTextColors[level.level as keyof typeof levelTextColors]
                )}
              >
                {level.level}
              </div>
              <div className="flex-1">
                <h3
                  className={cn(
                    "text-lg font-semibold mb-2",
                    levelTextColors[level.level as keyof typeof levelTextColors]
                  )}
                >
                  {level.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {level.description}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Eksempler:
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {level.examples.slice(0, 3).map((ex, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Lovgrunnlag:</span>{" "}
                {level.legalBasis.join(", ")}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
