"use client"

import { ExposureType, GradingLevel } from "@/types"
import { gradingLevels, exposureTypes } from "@/data/security-data"

interface GradingStepProps {
  exposure: ExposureType
  onSelect: (level: GradingLevel) => void
  onBack: () => void
}

export function GradingStep({ exposure, onSelect, onBack }: GradingStepProps) {
  const exposureInfo = exposureTypes.find((e) => e.type === exposure)

  const levelColors = {
    1: "from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-green-500/30",
    2: "from-yellow-500/20 to-amber-500/20 hover:from-yellow-500/30 hover:to-amber-500/30 border-yellow-500/30",
    3: "from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border-orange-500/30",
    4: "from-red-500/20 to-purple-500/20 hover:from-red-500/30 hover:to-purple-500/30 border-red-500/30",
  }

  const levelTextColors = {
    1: "text-green-400",
    2: "text-yellow-400",
    3: "text-orange-400",
    4: "text-red-400",
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tilbake
      </button>

      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 text-sm mb-4">
          Steg 2 av 2
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Velg graderingsnivå
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-4">
          Hvilken type informasjon behandler systemet?
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Valgt eksponering: <span className="text-white font-medium">{exposureInfo?.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {gradingLevels.map((level) => (
          <button
            key={level.level}
            onClick={() => onSelect(level.level as GradingLevel)}
            className={`group bg-gradient-to-br ${levelColors[level.level as keyof typeof levelColors]} backdrop-blur-lg rounded-2xl p-6 border text-left transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full bg-black/30 flex items-center justify-center ${levelTextColors[level.level as keyof typeof levelTextColors]} font-bold text-lg`}>
                {level.level}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${levelTextColors[level.level as keyof typeof levelTextColors]}`}>
                  {level.name}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {level.description}
                </p>
                <div className="space-y-1">
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wide">Eksempler:</p>
                  <ul className="text-white/60 text-xs space-y-1">
                    {level.examples.slice(0, 3).map((ex, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/50 text-xs">
                <span className="font-medium">Lovgrunnlag:</span> {level.legalBasis.join(", ")}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
