"use client"

import { useState } from "react"
import { HeroSection } from "@/components/HeroSection"
import { ExposureStep } from "@/components/ExposureStep"
import { GradingStep } from "@/components/GradingStep"
import { ResultsView } from "@/components/ResultsView"
import { LegalOverview } from "@/components/LegalOverview"
import { ClassificationWizard } from "@/components/ClassificationWizard"
import { ExposureType, GradingLevel } from "@/types"
import { Shield, BookOpen, HelpCircle } from "lucide-react"

type Step = "start" | "exposure" | "grading" | "results" | "legal" | "classification"

export default function Home() {
  const [step, setStep] = useState<Step>("start")
  const [exposure, setExposure] = useState<ExposureType | null>(null)
  const [grading, setGrading] = useState<GradingLevel | null>(null)

  const handleExposureSelect = (type: ExposureType) => {
    setExposure(type)
    setStep("grading")
  }

  const handleGradingSelect = (level: GradingLevel) => {
    setGrading(level)
    setStep("results")
  }

  const handleReset = () => {
    setStep("start")
    setExposure(null)
    setGrading(null)
  }

  const handleBack = () => {
    if (step === "grading") {
      setStep("exposure")
    } else if (step === "results") {
      setStep("grading")
    } else if (step === "legal") {
      setStep("start")
    } else if (step === "classification") {
      setStep("start")
    }
  }

  const handleClassificationComplete = (level: 1 | 2 | 3 | 4, exposureType: "internet" | "helsenett") => {
    setGrading(level)
    setExposure(exposureType)
    setStep("results")
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary"
            >
              <Shield className="h-5 w-5" />
              IKT-sikkerhet Helse
            </button>
            <nav className="flex gap-2">
              <button
                onClick={() => setStep("start")}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  step === "start" || step === "exposure" || step === "grading" || step === "results"
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Veileder
              </button>
              <button
                onClick={() => setStep("legal")}
                className={`rounded-lg px-4 py-2 text-sm transition-all ${
                  step === "legal"
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Lovverk
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        {step === "start" && (
          <HeroSection
            badge={{
              text: "Basert på gjeldende lovkrav",
              action: {
                text: "Se lovverk",
                href: "#",
              },
            }}
            title="Sikringstiltak for IKT-systemer i Helse"
            description="Veileder for sikringstiltak basert på NIS2, GDPR, Normen og Sikkerhetsloven. Finn ut hvilke krav som gjelder for ditt system."
            actions={[
              {
                text: "Klassifiser system",
                variant: "glow",
                icon: <HelpCircle className="h-4 w-4" />,
                onClick: () => setStep("classification"),
              },
              {
                text: "Velg manuelt",
                variant: "outline",
                icon: <Shield className="h-4 w-4" />,
                onClick: () => setStep("exposure"),
              },
              {
                text: "Se lovverk",
                variant: "outline",
                icon: <BookOpen className="h-4 w-4" />,
                onClick: () => setStep("legal"),
              },
            ]}
          />
        )}

        {step !== "start" && (
          <div className="px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              {step === "exposure" && (
                <ExposureStep onSelect={handleExposureSelect} onBack={handleReset} />
              )}

              {step === "grading" && (
                <GradingStep
                  exposure={exposure!}
                  onSelect={handleGradingSelect}
                  onBack={handleBack}
                />
              )}

              {step === "results" && exposure && grading && (
                <ResultsView
                  exposure={exposure}
                  grading={grading}
                  onBack={handleBack}
                  onReset={handleReset}
                />
              )}

              {step === "legal" && <LegalOverview onBack={handleBack} />}

              {step === "classification" && (
                <ClassificationWizard
                  onComplete={handleClassificationComplete}
                  onBack={handleBack}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
