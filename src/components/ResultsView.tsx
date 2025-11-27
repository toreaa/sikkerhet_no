"use client"

import { useState } from "react"
import { ExposureType, GradingLevel } from "@/types"
import {
  getMeasuresForLevel,
  gradingLevels,
  exposureTypes,
  notificationRequirements,
  importantNotes,
} from "@/data/security-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LegalBasisLinks } from "@/components/LegalBasisLinks"
import { ArrowLeft, RotateCcw, Check, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResultsViewProps {
  exposure: ExposureType
  grading: GradingLevel
  onBack: () => void
  onReset: () => void
}

export function ResultsView({ exposure, grading, onBack, onReset }: ResultsViewProps) {
  const [activeTab, setActiveTab] = useState<"technical" | "organizational" | "notifications">("technical")
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const { technical, organizational } = getMeasuresForLevel(grading, exposure)
  const gradingInfo = gradingLevels.find((g) => g.level === grading)
  const exposureInfo = exposureTypes.find((e) => e.type === exposure)

  const applicableNotifications = notificationRequirements.filter((n) => n.level <= grading)
  const applicableNotes = importantNotes.filter(
    (n) => n.level === "all" || n.level === grading
  )

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setCheckedItems(newChecked)
  }

  const totalItems = technical.length + organizational.length
  const checkedCount = checkedItems.size
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Påkrevde sikringstiltak
            </h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{exposureInfo?.name}</Badge>
              <Badge variant="secondary">
                Nivå {grading}: {gradingInfo?.name}
              </Badge>
            </div>
          </div>
          <Button variant="outline" onClick={onReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Start på nytt
          </Button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Fremdrift</span>
            <span className="font-medium text-foreground">
              {checkedCount} av {totalItems} tiltak
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Important Notes */}
      {applicableNotes.length > 0 && (
        <div className="space-y-4">
          {applicableNotes.map((note, i) => (
            <div
              key={i}
              className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
                    {note.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    {note.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("technical")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
            activeTab === "technical"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Tekniske tiltak ({technical.length})
        </button>
        <button
          onClick={() => setActiveTab("organizational")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
            activeTab === "organizational"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Organisatoriske ({organizational.length})
        </button>
        {applicableNotifications.length > 0 && (
          <button
            onClick={() => setActiveTab("notifications")}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px",
              activeTab === "notifications"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Varslingskrav ({applicableNotifications.length})
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "technical" &&
          technical.map((measure) => (
            <div
              key={measure.id}
              className={cn(
                "rounded-xl border bg-card p-5 transition-all",
                checkedItems.has(measure.id)
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-border hover:border-border/80"
              )}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleCheck(measure.id)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-lg border-2 flex-shrink-0 transition-all",
                    checkedItems.has(measure.id)
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-muted-foreground/30 hover:border-muted-foreground/50"
                  )}
                >
                  {checkedItems.has(measure.id) && <Check className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        "font-semibold",
                        checkedItems.has(measure.id)
                          ? "text-green-600 dark:text-green-400"
                          : "text-foreground"
                      )}
                    >
                      {measure.name}
                    </h3>
                    <Badge variant="destructive" className="text-xs flex-shrink-0">
                      Obligatorisk
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    {measure.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <LegalBasisLinks legalBasis={measure.legal_basis} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "organizational" &&
          organizational.map((measure) => (
            <div
              key={measure.id}
              className={cn(
                "rounded-xl border bg-card p-5 transition-all",
                checkedItems.has(measure.id)
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-border hover:border-border/80"
              )}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleCheck(measure.id)}
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-lg border-2 flex-shrink-0 transition-all",
                    checkedItems.has(measure.id)
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-muted-foreground/30 hover:border-muted-foreground/50"
                  )}
                >
                  {checkedItems.has(measure.id) && <Check className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        "font-semibold",
                        checkedItems.has(measure.id)
                          ? "text-green-600 dark:text-green-400"
                          : "text-foreground"
                      )}
                    >
                      {measure.name}
                    </h3>
                    <Badge variant="destructive" className="text-xs flex-shrink-0">
                      Obligatorisk
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    {measure.description}
                  </p>
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">
                      <LegalBasisLinks legalBasis={measure.legal_basis} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {activeTab === "notifications" && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Hendelse
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Tidsfrist
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Mottaker
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Hjemmel
                  </th>
                </tr>
              </thead>
              <tbody>
                {applicableNotifications.map((notif, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="p-4 text-sm text-foreground">{notif.event}</td>
                    <td className="p-4">
                      <Badge variant="destructive" className="text-xs">
                        {notif.deadline}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {notif.recipient}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <LegalBasisLinks legalBasis={notif.legal_basis} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legal basis summary */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-semibold text-foreground mb-4">Relevant lovgrunnlag</h3>
        <div className="flex flex-wrap gap-2">
          {gradingInfo?.legalBasis.map((basis, i) => (
            <Badge key={i} variant="secondary">
              {basis}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
