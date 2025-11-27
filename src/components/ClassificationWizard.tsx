"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  classificationQuestions,
  exposureQuestions,
  calculateRecommendedLevel,
  calculateExposure,
} from "@/data/classification-data"
import { gradingLevels } from "@/data/security-data"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Shield,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassificationWizardProps {
  onComplete: (level: 1 | 2 | 3 | 4, exposure: "internet" | "helsenett") => void
  onROS: (level: 1 | 2 | 3 | 4, exposure: "internet" | "helsenett", answers: Record<string, string | string[]>, flags: string[]) => void
  onBack: () => void
}

export function ClassificationWizard({ onComplete, onROS, onBack }: ClassificationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showResult, setShowResult] = useState(false)

  const allQuestions = [...classificationQuestions, ...exposureQuestions]
  const currentQuestion = allQuestions[currentStep]
  const totalSteps = allQuestions.length
  const isMultiSelect = currentQuestion?.multiSelect === true

  const handleAnswer = (optionId: string) => {
    if (isMultiSelect) {
      setAnswers((prev) => {
        const currentSelections = (prev[currentQuestion.id] as string[]) || []
        const isSelected = currentSelections.includes(optionId)

        // Hvis "none" velges, fjern alle andre valg
        if (optionId === "none") {
          return {
            ...prev,
            [currentQuestion.id]: isSelected ? [] : ["none"],
          }
        }

        // Hvis noe annet velges, fjern "none" fra listen
        let newSelections = currentSelections.filter((id) => id !== "none")

        if (isSelected) {
          newSelections = newSelections.filter((id) => id !== optionId)
        } else {
          newSelections = [...newSelections, optionId]
        }

        return {
          ...prev,
          [currentQuestion.id]: newSelections,
        }
      })
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionId,
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const currentAnswer = answers[currentQuestion?.id]

  const isOptionSelected = (optionId: string): boolean => {
    if (isMultiSelect) {
      const selections = (currentAnswer as string[]) || []
      return selections.includes(optionId)
    }
    return currentAnswer === optionId
  }

  const hasAnswer = (): boolean => {
    if (isMultiSelect) {
      const selections = (currentAnswer as string[]) || []
      return selections.length > 0
    }
    return !!currentAnswer
  }

  if (showResult) {
    const result = calculateRecommendedLevel(answers)
    const exposure = calculateExposure(answers)
    const gradingInfo = gradingLevels.find((g) => g.level === result.level)

    const levelColors = {
      1: "border-green-500/50 bg-green-500/10",
      2: "border-yellow-500/50 bg-yellow-500/10",
      3: "border-orange-500/50 bg-orange-500/10",
      4: "border-red-500/50 bg-red-500/10",
    }

    const levelTextColors = {
      1: "text-green-600 dark:text-green-400",
      2: "text-yellow-600 dark:text-yellow-400",
      3: "text-orange-600 dark:text-orange-400",
      4: "text-red-600 dark:text-red-400",
    }

    const confidenceColors = {
      high: "bg-green-500/20 text-green-600 dark:text-green-400",
      medium: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
      low: "bg-red-500/20 text-red-600 dark:text-red-400",
    }

    const confidenceLabels = {
      high: "Høy sikkerhet",
      medium: "Moderat sikkerhet",
      low: "Lav sikkerhet - bør verifiseres",
    }

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Button variant="ghost" onClick={() => setShowResult(false)} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tilbake til spørsmål
        </Button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Klassifiseringsresultat
          </h2>
          <p className="text-muted-foreground">
            Basert på dine svar anbefales følgende klassifisering
          </p>
        </div>

        {/* Resultat-kort */}
        <div
          className={cn(
            "rounded-xl border-2 p-8 text-center",
            levelColors[result.level]
          )}
        >
          <div
            className={cn(
              "text-6xl font-bold mb-2",
              levelTextColors[result.level]
            )}
          >
            Nivå {result.level}
          </div>
          <h3 className={cn("text-2xl font-semibold mb-4", levelTextColors[result.level])}>
            {gradingInfo?.name}
          </h3>
          <p className="text-muted-foreground mb-4">{gradingInfo?.description}</p>
          <Badge className={confidenceColors[result.confidence]}>
            {confidenceLabels[result.confidence]}
          </Badge>
        </div>

        {/* Eksponering */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h4 className="font-semibold text-foreground mb-2">Nettverkseksponering</h4>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-base py-1 px-3">
              {exposure === "internet"
                ? "Internett-eksponert"
                : exposure === "helsenett"
                ? "Helsenett-eksponert"
                : "Internt nettverk"}
            </Badge>
            {exposure === "helsenett" && (
              <span className="text-sm text-muted-foreground">
                (Husk: Helsenettet regnes som åpent nett)
              </span>
            )}
          </div>
        </div>

        {/* Begrunnelse */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Begrunnelse
          </h4>
          <ul className="space-y-2">
            {result.reasoning.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Advarsel ved lav sikkerhet */}
        {result.confidence === "low" && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
                  Anbefaling
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Klassifiseringen bør verifiseres av sikkerhetspersonell eller
                  personvernombud før endelig beslutning.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Handlingsknapper */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() =>
                onROS(
                  result.level,
                  exposure === "internal" ? "helsenett" : exposure,
                  answers,
                  result.flags
                )
              }
              className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400"
            >
              <FileText className="h-4 w-4" />
              Generer ROS-analyse
            </Button>
            <Button
              onClick={() =>
                onComplete(
                  result.level,
                  exposure === "internal" ? "helsenett" : exposure
                )
              }
              className="flex-1 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400"
            >
              <Shield className="h-4 w-4" />
              Se sikringstiltak
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setAnswers({})
              setCurrentStep(0)
              setShowResult(false)
            }}
            className="w-full"
          >
            Start på nytt
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Spørsmål {currentStep + 1} av {totalSteps}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Spørsmål */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {currentQuestion.question}
        </h2>
        {currentQuestion.description && (
          <p className="text-muted-foreground">{currentQuestion.description}</p>
        )}
      </div>

      {/* Alternativer */}
      <div className="space-y-3 max-w-2xl mx-auto">
        {isMultiSelect && (
          <p className="text-sm text-muted-foreground text-center mb-2">
            Du kan velge flere alternativer
          </p>
        )}
        {currentQuestion.options.map((option) => {
          const selected = isOptionSelected(option.id)
          return (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "mt-0.5 h-5 w-5 border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    isMultiSelect ? "rounded-md" : "rounded-full",
                    selected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {selected && (
                    isMultiSelect ? (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )
                  )}
                </div>
                <div>
                  <div className="font-medium text-foreground">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Navigasjon */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Forrige
        </Button>
        <Button
          onClick={handleNext}
          disabled={!hasAnswer()}
          className="gap-2"
        >
          {currentStep === totalSteps - 1 ? "Se resultat" : "Neste"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
