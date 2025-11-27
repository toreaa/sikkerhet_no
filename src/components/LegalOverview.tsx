"use client"

import { useState } from "react"
import { legalRequirements } from "@/data/security-data"

interface LegalOverviewProps {
  onBack: () => void
}

const legalDetails = {
  nis2: {
    title: "NIS2-direktivet",
    status: "Kommende (NIS1 gjeldende fra juli 2025)",
    keyRequirements: [
      { title: "Risikovurdering", description: "Systematiske risikovurderinger av nettverk og informasjonssystemer", article: "Art. 21(2)(a)" },
      { title: "Hendelseshåndtering", description: "Prosedyrer for håndtering og varsling av hendelser", article: "Art. 21(2)(b)" },
      { title: "Kontinuitet", description: "Beredskaps- og kontinuitetsplaner inkludert øvelser", article: "Art. 21(2)(c)" },
      { title: "Leverandørkjede", description: "Sikkerhetskrav til leverandører og underleverandører", article: "Art. 21(2)(d)" },
      { title: "Sårbarhetshåndtering", description: "Prosedyrer for oppdatering og patching", article: "Art. 21(2)(e)" },
      { title: "Kryptering", description: "Bruk av kryptografi og kryptering", article: "Art. 21(2)(h)" },
      { title: "Ledelsesansvar", description: "Styre og toppledelse har eksplisitt ansvar", article: "Art. 20" },
    ],
    notifications: [
      { event: "Tidlig varsling", deadline: "24 timer", description: "Varsle tilsynsmyndighet om signifikant hendelse" },
      { event: "Hendelsesrapport", deadline: "72 timer", description: "Detaljert hendelsesrapport" },
      { event: "Fullstendig rapport", deadline: "1 måned", description: "Rotårsaksanalyse og tiltak" },
    ],
    sanctions: "Opptil 10 mill. EUR eller 2% av global omsetning for vesentlige tjenestetilbydere",
  },
  gdpr: {
    title: "GDPR / Personopplysningsloven",
    status: "Gjeldende",
    keyRequirements: [
      { title: "Helseopplysninger", description: "Særlig kategori personopplysninger med strengere krav", article: "Art. 9" },
      { title: "Sikkerhetstiltak", description: "Tekniske og organisatoriske tiltak tilpasset risiko", article: "Art. 32" },
      { title: "DPIA", description: "Personvernkonsekvensvurdering ved høy risiko", article: "Art. 35" },
      { title: "Databehandleravtale", description: "Påkrevd ved bruk av leverandører", article: "Art. 28" },
      { title: "Dokumentasjon", description: "Må kunne dokumentere etterlevelse", article: "Art. 5(2)" },
    ],
    notifications: [
      { event: "Brudd på personopplysningssikkerheten", deadline: "72 timer", description: "Varsle Datatilsynet" },
      { event: "Høy risiko for registrerte", deadline: "Uten ugrunnet opphold", description: "Varsle berørte" },
    ],
    sanctions: "Opptil 20 mill. EUR eller 4% av global omsetning",
  },
  normen: {
    title: "Normen v7.0",
    status: "Gjeldende (oppdatert sept. 2025)",
    keyRequirements: [
      { title: "Tilgangsstyring", description: "Kun tilgang ved tjenstlig behov, årlig gjennomgang", article: "Faktaark 14" },
      { title: "Logging", description: "Logging av tilgang til helseopplysninger", article: "Faktaark 15" },
      { title: "Kryptering", description: "All kommunikasjon over åpne nett skal krypteres", article: "Faktaark 24" },
      { title: "IKT-prosjekter", description: "Sikkerhetskrav og dokumentasjon", article: "Faktaark 37" },
      { title: "Personvernprinsippene", description: "GDPR-prinsippene operasjonalisert", article: "Faktaark 57" },
    ],
    notifications: [],
    sanctions: "Bransjenorm - etterlevelse forventes, tilsyn fra Datatilsynet/Helsetilsynet",
  },
  sikkerhetsloven: {
    title: "Sikkerhetsloven",
    status: "Gjeldende",
    keyRequirements: [
      { title: "Sikkerhetsgradering", description: "BEGRENSET, KONFIDENSIELT, HEMMELIG, STRENGT HEMMELIG", article: "§ 5-3" },
      { title: "Sikkerhetsklarering", description: "Personellklarering for tilgang til gradert informasjon", article: "§ 8-1" },
      { title: "Leverandørklarering", description: "Klarering av leverandører for gradert informasjon", article: "§ 9-3" },
      { title: "Fysisk sikring", description: "Kontrollerte/sperrede/beskyttede områder", article: "Forskrift §§ 28-31" },
      { title: "Kryptering", description: "NSM-godkjent kryptering for KONFIDENSIELT+", article: "Forskrift § 35" },
    ],
    notifications: [
      { event: "Sikkerhetstruende hendelse", deadline: "Umiddelbart", description: "Varsle NSM" },
    ],
    sanctions: "Straffeansvar ved brudd, administrative sanksjoner",
  },
  nsm: {
    title: "NSM Grunnprinsipper v2.1",
    status: "Gjeldende veiledning",
    keyRequirements: [
      { title: "Identifisere", description: "Kartlegg systemer, brukere og tilganger", article: "Kategori 1" },
      { title: "Beskytte", description: "10 prinsipper for beskyttelse og opprettholdelse", article: "Kategori 2" },
      { title: "Oppdage", description: "Overvåkning, analyse og testing", article: "Kategori 3" },
      { title: "Håndtere", description: "Hendelseshåndtering og gjenoppretting", article: "Kategori 4" },
    ],
    notifications: [],
    sanctions: "Veiledning - ikke direkte sanksjoner, men referert i andre lover",
  },
  pasientjournal: {
    title: "Pasientjournalloven",
    status: "Gjeldende",
    keyRequirements: [
      { title: "Informasjonssikkerhet", description: "Tekniske og organisatoriske tiltak iht. GDPR Art. 32", article: "§ 22" },
      { title: "Tilgangsstyring", description: "Kun tilgang ved tjenstlig behov", article: "§ 16" },
      { title: "Logging", description: "Pasienten har rett til innsyn i hvem som har aksessert", article: "Forskrift § 14" },
    ],
    notifications: [],
    sanctions: "Tilsyn fra Helsetilsynet og Datatilsynet",
  },
}

export function LegalOverview({ onBack }: LegalOverviewProps) {
  const [selectedLaw, setSelectedLaw] = useState<string | null>(null)

  const details = selectedLaw ? legalDetails[selectedLaw as keyof typeof legalDetails] : null

  return (
    <div className="space-y-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tilbake til veileder
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Lovverk og Reguleringer
        </h2>
        <p className="text-white/70 max-w-xl mx-auto">
          Oversikt over relevant lovverk for IKT-sikkerhet i helsesektoren
        </p>
      </div>

      {!selectedLaw ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalRequirements.map((req) => (
            <button
              key={req.id}
              onClick={() => setSelectedLaw(req.id)}
              className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-left hover:border-cyan-500/50 transition-all group"
            >
              <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                {req.name}
              </h3>
              <p className="text-white/50 text-xs mb-3">{req.source}</p>
              <p className="text-white/60 text-sm">{req.description}</p>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm">
                <span>Les mer</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedLaw(null)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tilbake til oversikt
          </button>

          {details && (
            <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{details.title}</h3>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                      {details.status}
                    </span>
                  </div>
                  <a
                    href={legalRequirements.find((r) => r.id === selectedLaw)?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Kilde
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-4">Hovedkrav</h4>
                  <div className="space-y-3">
                    {details.keyRequirements.map((req, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h5 className="text-white font-medium">{req.title}</h5>
                            <p className="text-white/60 text-sm mt-1">{req.description}</p>
                          </div>
                          <span className="px-2 py-1 rounded text-xs bg-cyan-500/20 text-cyan-400 flex-shrink-0">
                            {req.article}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {details.notifications.length > 0 && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">Varslingskrav</h4>
                    <div className="bg-white/5 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left p-3 text-white/70 text-sm font-medium">Hendelse</th>
                            <th className="text-left p-3 text-white/70 text-sm font-medium">Frist</th>
                            <th className="text-left p-3 text-white/70 text-sm font-medium">Beskrivelse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.notifications.map((notif, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0">
                              <td className="p-3 text-white text-sm">{notif.event}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">
                                  {notif.deadline}
                                </span>
                              </td>
                              <td className="p-3 text-white/60 text-sm">{notif.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {details.sanctions && (
                  <div>
                    <h4 className="text-white font-semibold mb-4">Sanksjoner ved brudd</h4>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <p className="text-white/70 text-sm">{details.sanctions}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
