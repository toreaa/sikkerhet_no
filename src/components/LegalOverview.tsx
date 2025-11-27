"use client"

import { useState } from "react"
import { legalRequirements } from "@/data/security-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake til veileder
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Lovverk og Reguleringer
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Oversikt over relevant lovverk for IKT-sikkerhet i helsesektoren
        </p>
      </div>

      {!selectedLaw ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {legalRequirements.map((req) => (
            <button
              key={req.id}
              onClick={() => setSelectedLaw(req.id)}
              className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {req.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{req.source}</p>
              <p className="text-sm text-muted-foreground">{req.description}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary">
                <span>Les mer</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Button variant="ghost" onClick={() => setSelectedLaw(null)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Tilbake til oversikt
          </Button>

          {details && (
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {details.title}
                    </h3>
                    <Badge variant="secondary">{details.status}</Badge>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={legalRequirements.find((r) => r.id === selectedLaw)?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Kilde
                    </a>
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Hovedkrav</h4>
                  <div className="space-y-3">
                    {details.keyRequirements.map((req, i) => (
                      <div key={i} className="rounded-lg border border-border bg-muted/50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h5 className="font-medium text-foreground">{req.title}</h5>
                            <p className="text-sm text-muted-foreground mt-1">
                              {req.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="flex-shrink-0">
                            {req.article}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {details.notifications.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">Varslingskrav</h4>
                    <div className="rounded-lg border border-border bg-muted/50 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                              Hendelse
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                              Frist
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                              Beskrivelse
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.notifications.map((notif, i) => (
                            <tr key={i} className="border-b border-border/50 last:border-0">
                              <td className="p-3 text-sm text-foreground">{notif.event}</td>
                              <td className="p-3">
                                <Badge variant="destructive" className="text-xs">
                                  {notif.deadline}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-muted-foreground">
                                {notif.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {details.sanctions && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-4">
                      Sanksjoner ved brudd
                    </h4>
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                      <p className="text-sm text-muted-foreground">{details.sanctions}</p>
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
