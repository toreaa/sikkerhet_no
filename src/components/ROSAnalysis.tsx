"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  RiskAssessment,
  probabilityLevels,
  consequenceLevels,
  riskLevels,
  generateRiskMatrix,
  getRiskColorClasses,
  getCIALabel,
} from "@/data/ros-data"
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Table,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ROSAnalysisProps {
  assessments: RiskAssessment[]
  exposure: "internet" | "helsenett" | "internal"
  level: 1 | 2 | 3 | 4
  onBack: () => void
  onViewMeasures: () => void
}

export function ROSAnalysis({
  assessments,
  exposure,
  level,
  onBack,
  onViewMeasures,
}: ROSAnalysisProps) {
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"table" | "matrix" | "scenarios" | "summary">("table")

  const matrix = generateRiskMatrix(assessments)

  // Statistikk
  const criticalCount = assessments.filter((a) => a.riskLevel === "critical").length
  const highCount = assessments.filter((a) => a.riskLevel === "high").length
  const mediumCount = assessments.filter((a) => a.riskLevel === "medium").length
  const lowCount = assessments.filter((a) => a.riskLevel === "low").length

  const exposureLabels = {
    internet: "Internett-eksponert",
    helsenett: "Helsenett-eksponert",
    internal: "Internt nettverk",
  }

  // Fargekoder for matrisen
  const matrixColors = [
    ["bg-green-500/30", "bg-green-500/30", "bg-yellow-500/30", "bg-yellow-500/30"],
    ["bg-green-500/30", "bg-yellow-500/30", "bg-yellow-500/30", "bg-orange-500/30"],
    ["bg-yellow-500/30", "bg-yellow-500/30", "bg-orange-500/30", "bg-red-500/30"],
  ]

  const matrixScores = [
    [1, 2, 3, 4],
    [2, 4, 6, 8],
    [3, 6, 9, 12],
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake til klassifisering
      </Button>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Risiko- og Sårbarhetsanalyse
        </h2>
        <p className="text-muted-foreground">
          Basert på klassifisering: Nivå {level}, {exposureLabels[exposure]}
        </p>
      </div>

      {/* Oppsummering */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={cn("rounded-xl border p-4 text-center", getRiskColorClasses(12).border, getRiskColorClasses(12).bg)}>
          <div className={cn("text-3xl font-bold", getRiskColorClasses(12).text)}>{criticalCount}</div>
          <div className="text-sm text-muted-foreground">Kritisk risiko</div>
        </div>
        <div className={cn("rounded-xl border p-4 text-center", getRiskColorClasses(9).border, getRiskColorClasses(9).bg)}>
          <div className={cn("text-3xl font-bold", getRiskColorClasses(9).text)}>{highCount}</div>
          <div className="text-sm text-muted-foreground">Høy risiko</div>
        </div>
        <div className={cn("rounded-xl border p-4 text-center", getRiskColorClasses(6).border, getRiskColorClasses(6).bg)}>
          <div className={cn("text-3xl font-bold", getRiskColorClasses(6).text)}>{mediumCount}</div>
          <div className="text-sm text-muted-foreground">Moderat risiko</div>
        </div>
        <div className={cn("rounded-xl border p-4 text-center", getRiskColorClasses(3).border, getRiskColorClasses(3).bg)}>
          <div className={cn("text-3xl font-bold", getRiskColorClasses(3).text)}>{lowCount}</div>
          <div className="text-sm text-muted-foreground">Lav risiko</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        <button
          onClick={() => setActiveTab("table")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap flex items-center gap-2",
            activeTab === "table"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Table className="h-4 w-4" />
          ROS-tabell
        </button>
        <button
          onClick={() => setActiveTab("matrix")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap flex items-center gap-2",
            activeTab === "matrix"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutGrid className="h-4 w-4" />
          Risikomatrise
        </button>
        <button
          onClick={() => setActiveTab("scenarios")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === "scenarios"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Detaljer ({assessments.length})
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px whitespace-nowrap",
            activeTab === "summary"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Sammendrag
        </button>
      </div>

      {/* ROS-tabell visning */}
      {activeTab === "table" && (
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground mb-4">
            <span className="font-medium">K</span>=Konfidensialitet, <span className="font-medium">I</span>=Integritet, <span className="font-medium">T</span>=Tilgjengelighet
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">ID#</th>
                    <th className="text-left p-3 font-medium text-muted-foreground min-w-[150px]">Scenario</th>
                    <th className="text-left p-3 font-medium text-muted-foreground min-w-[200px]">Sårbarhet beskrivelse</th>
                    <th className="text-left p-3 font-medium text-muted-foreground min-w-[200px]">Konsekvens beskrivelse</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">K, I, T</th>
                    <th className="text-left p-3 font-medium text-muted-foreground min-w-[200px]">Eksisterende tiltak</th>
                    <th className="text-center p-3 font-medium text-muted-foreground" colSpan={3}>
                      <div>Vurdering før tiltak</div>
                      <div className="flex gap-2 mt-1 justify-center text-xs">
                        <span>S</span>
                        <span>K</span>
                        <span>S×K</span>
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium text-muted-foreground min-w-[200px]">Ytterligere tiltak</th>
                    <th className="text-center p-3 font-medium text-muted-foreground" colSpan={3}>
                      <div>Vurdering etter tiltak</div>
                      <div className="flex gap-2 mt-1 justify-center text-xs">
                        <span>S</span>
                        <span>K</span>
                        <span>S×K</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map((assessment, index) => {
                    const beforeColors = getRiskColorClasses(assessment.riskScore)
                    const afterColors = getRiskColorClasses(assessment.mitigatedRiskScore)

                    return (
                      <tr key={assessment.scenario.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                        <td className="p-3 text-foreground font-medium">{index + 1}</td>
                        <td className="p-3 text-foreground font-medium">{assessment.scenario.name}</td>
                        <td className="p-3 text-muted-foreground text-xs">{assessment.scenario.vulnerabilityDescription}</td>
                        <td className="p-3 text-muted-foreground text-xs">{assessment.scenario.consequenceDescription}</td>
                        <td className="p-3 text-center">
                          <Badge variant="outline" className="text-xs">
                            {getCIALabel(assessment.scenario.ciaImpact)}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground text-xs">
                          <ul className="space-y-1">
                            {assessment.applicableExistingMeasures.slice(0, 3).map((measure, i) => (
                              <li key={i}>• {measure}</li>
                            ))}
                          </ul>
                        </td>
                        {/* Før tiltak */}
                        <td className="p-3 text-center font-medium">{assessment.adjustedProbability}</td>
                        <td className="p-3 text-center font-medium">{assessment.adjustedConsequence}</td>
                        <td className="p-3 text-center">
                          <Badge className={cn(beforeColors.bg, beforeColors.text, "font-bold")}>
                            {assessment.riskScore}
                          </Badge>
                        </td>
                        <td className="p-3 text-muted-foreground text-xs">
                          <ul className="space-y-1">
                            {assessment.applicableAdditionalMeasures.slice(0, 3).map((measure, i) => (
                              <li key={i}>• {measure}</li>
                            ))}
                          </ul>
                        </td>
                        {/* Etter tiltak */}
                        <td className="p-3 text-center font-medium">{assessment.mitigatedProbability}</td>
                        <td className="p-3 text-center font-medium">{assessment.mitigatedConsequence}</td>
                        <td className="p-3 text-center">
                          <Badge className={cn(afterColors.bg, afterColors.text, "font-bold")}>
                            {assessment.mitigatedRiskScore}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Matrise-visning */}
      {activeTab === "matrix" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
            <h3 className="font-semibold text-foreground mb-4">
              Risikomatrise (Sannsynlighet × Konsekvens)
            </h3>

            <div className="min-w-[500px]">
              <div className="flex">
                <div className="flex flex-col justify-center mr-2">
                  <span className="text-xs text-muted-foreground -rotate-90 whitespace-nowrap">
                    KONSEKVENS →
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex mb-1">
                    <div className="w-24" />
                    {[1, 2, 3, 4].map((prob) => (
                      <div
                        key={prob}
                        className="flex-1 text-center text-xs font-medium text-muted-foreground p-2"
                      >
                        {probabilityLevels[prob as 1 | 2 | 3 | 4].label}
                      </div>
                    ))}
                  </div>

                  {[2, 1, 0].map((consIndex) => (
                    <div key={consIndex} className="flex mb-1">
                      <div className="w-24 flex items-center text-xs font-medium text-muted-foreground pr-2">
                        {consequenceLevels[(consIndex + 1) as 1 | 2 | 3].label}
                      </div>
                      {[0, 1, 2, 3].map((probIndex) => (
                        <div
                          key={probIndex}
                          className={cn(
                            "flex-1 aspect-square flex flex-col items-center justify-center rounded-lg m-0.5 transition-all",
                            matrixColors[consIndex][probIndex]
                          )}
                        >
                          <span className="text-lg font-bold text-foreground">
                            {matrixScores[consIndex][probIndex]}
                          </span>
                          {matrix[consIndex][probIndex] > 0 && (
                            <span className="text-xs text-muted-foreground">
                              ({matrix[consIndex][probIndex]} trussel{matrix[consIndex][probIndex] > 1 ? "er" : ""})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}

                  <div className="text-center text-xs text-muted-foreground mt-2">
                    SANNSYNLIGHET →
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h4 className="font-semibold text-foreground mb-4">Risikonivåer</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(riskLevels).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-4 h-4 rounded",
                        value.color === "green" && "bg-green-500",
                        value.color === "yellow" && "bg-yellow-500",
                        value.color === "orange" && "bg-orange-500",
                        value.color === "red" && "bg-red-500"
                      )}
                    />
                    <span className="font-medium text-sm">{value.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Score {value.min}-{value.max}: {value.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scenarier-visning */}
      {activeTab === "scenarios" && (
        <div className="space-y-4">
          {assessments.map((assessment) => {
            const colors = getRiskColorClasses(assessment.riskScore)
            const isExpanded = expandedScenario === assessment.scenario.id

            return (
              <div
                key={assessment.scenario.id}
                className={cn(
                  "rounded-xl border bg-card overflow-hidden transition-all",
                  colors.border
                )}
              >
                <button
                  onClick={() =>
                    setExpandedScenario(isExpanded ? null : assessment.scenario.id)
                  }
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {assessment.scenario.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getCIALabel(assessment.scenario.ciaImpact)}
                        </Badge>
                        <Badge className={cn(colors.bg, colors.text, "text-xs")}>
                          Før: {assessment.riskScore}
                        </Badge>
                        <Badge className={cn(getRiskColorClasses(assessment.mitigatedRiskScore).bg, getRiskColorClasses(assessment.mitigatedRiskScore).text, "text-xs")}>
                          Etter: {assessment.mitigatedRiskScore}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {assessment.scenario.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assessment.scenario.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">S × K</div>
                        <div className={cn("font-bold", colors.text)}>
                          {assessment.adjustedProbability} × {assessment.adjustedConsequence}
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2">Sårbarhet</h4>
                        <p className="text-sm text-muted-foreground">
                          {assessment.scenario.vulnerabilityDescription}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2">Konsekvens</h4>
                        <p className="text-sm text-muted-foreground">
                          {assessment.scenario.consequenceDescription}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-2">Tekniske detaljer</h4>
                      <p className="text-sm text-muted-foreground">
                        {assessment.scenario.technicalDetails}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2">
                          Eksisterende tiltak
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {assessment.applicableExistingMeasures.map((measure, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-0.5">✓</span>
                              {measure}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Ytterligere tiltak
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {assessment.applicableAdditionalMeasures.map((measure, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-500 mt-0.5">+</span>
                              {measure}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2">Vurdering før tiltak</h4>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Sannsynlighet:</span> <span className="font-medium">{assessment.adjustedProbability}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Konsekvens:</span> <span className="font-medium">{assessment.adjustedConsequence}</span>
                          </div>
                          <Badge className={cn(colors.bg, colors.text, "font-bold")}>
                            Risiko: {assessment.riskScore}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-2">Vurdering etter tiltak</h4>
                        <div className="flex items-center gap-4">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Sannsynlighet:</span> <span className="font-medium">{assessment.mitigatedProbability}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Konsekvens:</span> <span className="font-medium">{assessment.mitigatedConsequence}</span>
                          </div>
                          <Badge className={cn(getRiskColorClasses(assessment.mitigatedRiskScore).bg, getRiskColorClasses(assessment.mitigatedRiskScore).text, "font-bold")}>
                            Risiko: {assessment.mitigatedRiskScore}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Sammendrag-visning */}
      {activeTab === "summary" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Overordnet vurdering</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground text-sm mb-2">Klassifisering</h4>
                <p className="text-sm text-muted-foreground">
                  Systemet er klassifisert til <strong>Nivå {level}</strong> med{" "}
                  <strong>{exposureLabels[exposure].toLowerCase()}</strong>.
                  Dette innebærer at systemet må tilfredsstille sikringskrav i henhold til
                  {level >= 3 ? " Normen, GDPR Art. 9, og " : " "}
                  NSM Grunnprinsipper.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground text-sm mb-2">Trusselbilde</h4>
                <p className="text-sm text-muted-foreground">
                  Basert på oppdatert trusselbilde (2024-2025) er det identifisert{" "}
                  <strong>{assessments.length} relevante trusselscenarier</strong> for dette systemet.
                  {criticalCount > 0 && (
                    <span className="text-red-500">
                      {" "}
                      {criticalCount} av disse har kritisk risiko og krever umiddelbar handling.
                    </span>
                  )}
                  {highCount > 0 && (
                    <span className="text-orange-500">
                      {" "}
                      {highCount} har høy risiko der tiltak må implementeres.
                    </span>
                  )}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground text-sm mb-2">Effekt av tiltak</h4>
                <p className="text-sm text-muted-foreground">
                  Ved implementering av anbefalte tiltak vil risikoene reduseres betydelig.
                  Gjennomsnittlig risikoscore før tiltak: <strong>{Math.round(assessments.reduce((sum, a) => sum + a.riskScore, 0) / assessments.length * 10) / 10}</strong>.
                  Etter tiltak: <strong>{Math.round(assessments.reduce((sum, a) => sum + a.mitigatedRiskScore, 0) / assessments.length * 10) / 10}</strong>.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground text-sm mb-2">Prioriterte tiltak</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  {criticalCount > 0 && (
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                      <span>
                        <strong>Kritisk:</strong> Adresser trusler med risikoscore 10-12 først
                      </span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <span>
                      Implementer obligatoriske sikringstiltak for Nivå {level}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <span>
                      Gjennomfør jevnlig sårbarhetsskanning og penetrasjonstesting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-primary mt-0.5" />
                    <span>
                      Etabler hendelseshåndteringsplan og øv på denne
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
                  Viktig merknad
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Denne ROS-analysen er basert på generelle antagelser og oppdatert trusselbilde.
                  En fullstendig ROS bør gjennomføres med involvering av relevante interessenter
                  og tilpasses organisasjonens spesifikke kontekst og risikoappetitt.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Handlingsknapper */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onViewMeasures}
          className="flex-1 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
        >
          <Shield className="h-4 w-4" />
          Se påkrevde sikringstiltak
        </Button>
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => {
            alert("PDF-eksport kommer snart!")
          }}
        >
          <Download className="h-4 w-4" />
          Eksporter ROS (PDF)
        </Button>
      </div>
    </div>
  )
}
