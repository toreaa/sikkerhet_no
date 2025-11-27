"use client"

import { ExposureType } from "@/types"
import { exposureTypes } from "@/data/security-data"

interface ExposureStepProps {
  onSelect: (type: ExposureType) => void
  onBack: () => void
}

export function ExposureStep({ onSelect, onBack }: ExposureStepProps) {
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
          Steg 1 av 2
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Velg eksponeringstype
        </h2>
        <p className="text-white/70 max-w-xl mx-auto">
          Hvor er tjenesten tilgjengelig fra?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {exposureTypes.map((exp) => (
          <button
            key={exp.type}
            onClick={() => onSelect(exp.type)}
            className="group bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-left hover:border-cyan-500/50 hover:bg-black/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all">
                {exp.type === "internet" ? (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {exp.name}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {exp.description}
                </p>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                  exp.type === "internet"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                  {exp.riskLevel}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-3xl mx-auto">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="text-amber-400 font-semibold mb-1">Viktig om Helsenettet</h4>
            <p className="text-white/70 text-sm">
              I henhold til Normen Faktaark 24 regnes Helsenettet som et <strong className="text-white">åpent nett</strong>.
              Dette betyr at kryptering er obligatorisk også for kommunikasjon innenfor Helsenettet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
