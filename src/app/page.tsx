"use client"

import { useState } from "react"
import { ShaderAnimation } from "@/components/ShaderAnimation"
import { ExposureStep } from "@/components/ExposureStep"
import { GradingStep } from "@/components/GradingStep"
import { ResultsView } from "@/components/ResultsView"
import { LegalOverview } from "@/components/LegalOverview"
import { ExposureType, GradingLevel } from "@/types"

type Step = "start" | "exposure" | "grading" | "results" | "legal"

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
    }
  }

  return (
    <main className="relative min-h-screen">
      <ShaderAnimation />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleReset}
                className="text-white font-semibold text-lg hover:text-cyan-400 transition-colors"
              >
                IKT-sikkerhet Helse
              </button>
              <nav className="flex gap-4">
                <button
                  onClick={() => setStep("start")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    step === "start"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Veileder
                </button>
                <button
                  onClick={() => setStep("legal")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    step === "legal"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Lovverk
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {step === "start" && (
              <div className="text-center space-y-8 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Sikringstiltak for IKT-systemer
                </h1>
                <p className="text-xl text-white/80 max-w-2xl mx-auto">
                  Veileder for sikringstiltak i helsesektoren basert på NIS2, GDPR, Normen og Sikkerhetsloven
                </p>

                <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold text-white mb-6">
                    Kom i gang
                  </h2>
                  <p className="text-white/70 mb-8">
                    Veilederen hjelper deg å identifisere hvilke sikringstiltak som kreves basert på:
                  </p>
                  <ul className="text-left text-white/70 space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">1</span>
                      <span>Eksponeringstype (Internett eller Helsenett)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">2</span>
                      <span>Informasjonssensitivitet (4 nivåer)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">3</span>
                      <span>Konkrete tiltak med lovhjemmel</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setStep("exposure")}
                    className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all transform hover:scale-[1.02]"
                  >
                    Start veilederen
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8">
                  <div className="bg-black/30 backdrop-blur rounded-xl p-6 border border-white/10 text-left">
                    <h3 className="text-white font-semibold mb-2">Kun lovkrav</h3>
                    <p className="text-white/60 text-sm">
                      Alle tiltak er basert på faktisk lovgivning, ikke synsing
                    </p>
                  </div>
                  <div className="bg-black/30 backdrop-blur rounded-xl p-6 border border-white/10 text-left">
                    <h3 className="text-white font-semibold mb-2">Fire nivåer</h3>
                    <p className="text-white/60 text-sm">
                      Fra ikke-sensitiv til skjermingsverdig informasjon
                    </p>
                  </div>
                </div>
              </div>
            )}

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
          </div>
        </div>
      </div>
    </main>
  )
}
