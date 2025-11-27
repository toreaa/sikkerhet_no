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

      {/* Header */}
      <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Påkrevde sikringstiltak
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm">
                {exposureInfo?.name}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                Nivå {grading}: {gradingInfo?.name}
              </span>
            </div>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
          >
            Start på nytt
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/70">Fremdrift</span>
            <span className="text-white font-medium">{checkedCount} av {totalItems} tiltak</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
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
              className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="text-amber-400 font-semibold text-sm">{note.title}</h4>
                  <p className="text-white/70 text-sm mt-1">{note.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("technical")}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === "technical"
              ? "bg-white/10 text-white border-b-2 border-cyan-500"
              : "text-white/60 hover:text-white"
          }`}
        >
          Tekniske tiltak ({technical.length})
        </button>
        <button
          onClick={() => setActiveTab("organizational")}
          className={`px-4 py-2 rounded-t-lg transition-all ${
            activeTab === "organizational"
              ? "bg-white/10 text-white border-b-2 border-cyan-500"
              : "text-white/60 hover:text-white"
          }`}
        >
          Organisatoriske tiltak ({organizational.length})
        </button>
        {applicableNotifications.length > 0 && (
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 rounded-t-lg transition-all ${
              activeTab === "notifications"
                ? "bg-white/10 text-white border-b-2 border-cyan-500"
                : "text-white/60 hover:text-white"
            }`}
          >
            Varslingskrav ({applicableNotifications.length})
          </button>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "technical" && (
          <>
            {technical.map((measure) => (
              <div
                key={measure.id}
                className={`bg-black/40 backdrop-blur-lg rounded-xl p-5 border transition-all ${
                  checkedItems.has(measure.id)
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleCheck(measure.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedItems.has(measure.id)
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  >
                    {checkedItems.has(measure.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={`font-semibold ${checkedItems.has(measure.id) ? "text-green-400" : "text-white"}`}>
                        {measure.name}
                      </h3>
                      <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 flex-shrink-0">
                        Obligatorisk
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mt-2">{measure.description}</p>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <p className="text-white/40 text-xs">
                        <span className="font-medium">Hjemmel:</span> {measure.legal_basis}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "organizational" && (
          <>
            {organizational.map((measure) => (
              <div
                key={measure.id}
                className={`bg-black/40 backdrop-blur-lg rounded-xl p-5 border transition-all ${
                  checkedItems.has(measure.id)
                    ? "border-green-500/50 bg-green-500/5"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleCheck(measure.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      checkedItems.has(measure.id)
                        ? "bg-green-500 border-green-500"
                        : "border-white/30 hover:border-white/50"
                    }`}
                  >
                    {checkedItems.has(measure.id) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={`font-semibold ${checkedItems.has(measure.id) ? "text-green-400" : "text-white"}`}>
                        {measure.name}
                      </h3>
                      <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400 flex-shrink-0">
                        Obligatorisk
                      </span>
                    </div>
                    <p className="text-white/60 text-sm mt-2">{measure.description}</p>
                    <div className="mt-3 pt-3 border-t border-white/5">
                      <p className="text-white/40 text-xs">
                        <span className="font-medium">Hjemmel:</span> {measure.legal_basis}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "notifications" && (
          <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/70 text-sm font-medium">Hendelse</th>
                  <th className="text-left p-4 text-white/70 text-sm font-medium">Tidsfrist</th>
                  <th className="text-left p-4 text-white/70 text-sm font-medium">Mottaker</th>
                  <th className="text-left p-4 text-white/70 text-sm font-medium">Hjemmel</th>
                </tr>
              </thead>
              <tbody>
                {applicableNotifications.map((notif, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-white text-sm">{notif.event}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">
                        {notif.deadline}
                      </span>
                    </td>
                    <td className="p-4 text-white/70 text-sm">{notif.recipient}</td>
                    <td className="p-4 text-white/50 text-sm">{notif.legal_basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legal basis summary */}
      <div className="bg-black/30 backdrop-blur rounded-xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-4">Relevant lovgrunnlag</h3>
        <div className="flex flex-wrap gap-2">
          {gradingInfo?.legalBasis.map((basis, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm"
            >
              {basis}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
