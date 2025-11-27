"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Shield,
  Clock,
  Users,
  FileText,
  Server,
  Lock,
  Bell,
  Zap,
  Building,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NIS2ChecklistProps {
  onBack: () => void
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  details: string[]
  category: string
  article?: string
  articleUrl?: string
  deadline?: string
}

interface ChecklistCategory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  items: ChecklistItem[]
}

const nis2Categories: ChecklistCategory[] = [
  {
    id: "governance",
    name: "Styring og ledelse",
    icon: <Building className="h-5 w-5" />,
    color: "blue",
    items: [
      {
        id: "gov-1",
        title: "Ledelsesansvar etablert",
        description: "Toppledelsen må godkjenne og overvåke cybersikkerhetstiltak",
        details: [
          "Styret/ledelsen har formelt godkjent sikkerhetspolicy",
          "Ledelsen gjennomgår sikkerhetsrapporter regelmessig",
          "Det er utpekt ansvarlig for informasjonssikkerhet (CISO eller tilsvarende)",
          "Ledelsen har gjennomgått opplæring i cybersikkerhet",
        ],
        category: "governance",
        article: "Art. 20",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_20.html",
      },
      {
        id: "gov-2",
        title: "Sikkerhetspolicy vedtatt",
        description: "Dokumentert policy for informasjonssikkerhet",
        details: [
          "Policy er oppdatert og godkjent siste 12 måneder",
          "Policy dekker alle vesentlige sikkerhetsområder",
          "Policy er kommunisert til alle ansatte",
          "Det finnes prosess for årlig gjennomgang",
        ],
        category: "governance",
        article: "Art. 21(2)(a)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "risk",
    name: "Risikostyring",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "orange",
    items: [
      {
        id: "risk-1",
        title: "Risikovurdering gjennomført",
        description: "Systematisk vurdering av cybersikkerhetsrisikoer",
        details: [
          "Risikovurdering er gjennomført siste 12 måneder",
          "Alle kritiske systemer er inkludert",
          "Risikoer er prioritert og akseptnivå er definert",
          "Tiltaksplan er etablert for høye risikoer",
        ],
        category: "risk",
        article: "Art. 21(2)(a)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "risk-2",
        title: "Sikkerhetstiltak implementert",
        description: "Tekniske og organisatoriske tiltak basert på risikovurdering",
        details: [
          "Tiltak er proporsjonale med identifiserte risikoer",
          "Tiltak dekker konfidensialitet, integritet og tilgjengelighet",
          "Effektiviteten av tiltak måles og rapporteres",
          "State-of-the-art løsninger vurderes",
        ],
        category: "risk",
        article: "Art. 21(1)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "incident",
    name: "Hendelseshåndtering",
    icon: <Bell className="h-5 w-5" />,
    color: "red",
    items: [
      {
        id: "inc-1",
        title: "Hendelseshåndteringsplan",
        description: "Dokumentert prosess for håndtering av sikkerhetshendelser",
        details: [
          "Plan inkluderer deteksjon, analyse og respons",
          "Roller og ansvar er tydelig definert",
          "Eskaleringsprosedyrer er etablert",
          "Planen er testet/øvd siste 12 måneder",
        ],
        category: "incident",
        article: "Art. 21(2)(b)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "inc-2",
        title: "Varslingsrutiner etablert",
        description: "Prosedyrer for varsling til myndigheter ved vesentlige hendelser",
        details: [
          "Tidlig varsling innen 24 timer er mulig",
          "Full rapport innen 72 timer er mulig",
          "Kontaktinfo til NSM/sektormyndighet er kjent",
          "Intern varslingskjede er definert",
        ],
        category: "incident",
        article: "Art. 23",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_23.html",
        deadline: "24 timer",
      },
    ],
  },
  {
    id: "continuity",
    name: "Kontinuitet",
    icon: <Zap className="h-5 w-5" />,
    color: "purple",
    items: [
      {
        id: "cont-1",
        title: "Backup-rutiner",
        description: "Regelmessig sikkerhetskopiering av kritiske data og systemer",
        details: [
          "Backup-frekvens er definert basert på kritikalitet",
          "Backup lagres geografisk adskilt (offsite)",
          "Gjenoppretting er testet siste 6 måneder",
          "Backup er beskyttet mot ransomware",
        ],
        category: "continuity",
        article: "Art. 21(2)(c)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "cont-2",
        title: "Beredskapsplan",
        description: "Plan for opprettholdelse av drift under og etter hendelser",
        details: [
          "Kritiske prosesser og systemer er identifisert",
          "RTO (Recovery Time Objective) er definert",
          "RPO (Recovery Point Objective) er definert",
          "Alternative driftsrutiner er dokumentert",
        ],
        category: "continuity",
        article: "Art. 21(2)(c)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "cont-3",
        title: "Krisehåndtering",
        description: "Organisering og prosesser for håndtering av større hendelser",
        details: [
          "Kriseteam er utpekt med tydelige roller",
          "Kommunikasjonsplan er etablert",
          "Øvelser gjennomføres årlig",
          "Læringspunkter dokumenteres og følges opp",
        ],
        category: "continuity",
        article: "Art. 21(2)(c)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "supply",
    name: "Leverandørsikkerhet",
    icon: <Users className="h-5 w-5" />,
    color: "teal",
    items: [
      {
        id: "sup-1",
        title: "Leverandøroversikt",
        description: "Kartlegging av IKT-leverandører og deres risiko",
        details: [
          "Alle kritiske IKT-leverandører er identifisert",
          "Risikovurdering er gjort per leverandør",
          "Avhengigheter til leverandører er dokumentert",
          "Exit-strategi finnes for kritiske leverandører",
        ],
        category: "supply",
        article: "Art. 21(2)(d)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "sup-2",
        title: "Sikkerhetskrav i kontrakter",
        description: "Avtaler med leverandører inkluderer sikkerhetskrav",
        details: [
          "Databehandleravtaler er på plass (GDPR)",
          "Sikkerhetskrav er spesifisert i kontrakter",
          "Revisjonsrett er avtalt",
          "Varslingskrav ved hendelser er inkludert",
        ],
        category: "supply",
        article: "Art. 21(2)(d)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "access",
    name: "Tilgangsstyring",
    icon: <Lock className="h-5 w-5" />,
    color: "green",
    items: [
      {
        id: "acc-1",
        title: "Tilgangskontroll",
        description: "Styring av hvem som har tilgang til systemer og data",
        details: [
          "Prinsippet om minste privilegium følges",
          "Tilganger gjennomgås regelmessig (minst årlig)",
          "Prosess for onboarding/offboarding av ansatte",
          "Priviligerte tilganger er strengt kontrollert",
        ],
        category: "access",
        article: "Art. 21(2)(i)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "acc-2",
        title: "Flerfaktorautentisering",
        description: "MFA implementert for kritiske systemer",
        details: [
          "MFA er påkrevd for administrativ tilgang",
          "MFA er påkrevd for ekstern tilgang (VPN)",
          "MFA vurdert for alle systemer med sensitive data",
          "Phishing-resistent MFA vurdert (FIDO2/passkeys)",
        ],
        category: "access",
        article: "Art. 21(2)(j)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "technical",
    name: "Teknisk sikkerhet",
    icon: <Server className="h-5 w-5" />,
    color: "slate",
    items: [
      {
        id: "tech-1",
        title: "Nettverkssikkerhet",
        description: "Beskyttelse av nettverk og kommunikasjon",
        details: [
          "Brannmur og segmentering er implementert",
          "Kryptering brukes for data i transitt",
          "IDS/IPS eller tilsvarende overvåkning",
          "Sikker konfigurasjon av nettverksutstyr",
        ],
        category: "technical",
        article: "Art. 21(2)(e)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "tech-2",
        title: "Sårbarhetshåndtering",
        description: "Prosess for å identifisere og håndtere sårbarheter",
        details: [
          "Regelmessig sårbarhetsskanning gjennomføres",
          "Kritiske oppdateringer installeres innen definert tid",
          "Prosess for testing før utrulling av patcher",
          "Oversikt over alle systemer og programvare",
        ],
        category: "technical",
        article: "Art. 21(2)(e)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "tech-3",
        title: "Kryptografi",
        description: "Bruk av kryptering for å beskytte data",
        details: [
          "Data i hvile er kryptert der relevant",
          "Data i transitt er kryptert (TLS 1.2+)",
          "Nøkkelhåndtering er dokumentert",
          "Kryptostandard følger anbefalinger (NSM/ENISA)",
        ],
        category: "technical",
        article: "Art. 21(2)(h)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
  {
    id: "awareness",
    name: "Opplæring og bevissthet",
    icon: <FileText className="h-5 w-5" />,
    color: "amber",
    items: [
      {
        id: "awa-1",
        title: "Sikkerhetsopplæring",
        description: "Regelmessig opplæring av ansatte i cybersikkerhet",
        details: [
          "Alle ansatte gjennomfører grunnleggende opplæring",
          "Opplæring gjennomføres ved ansettelse og årlig",
          "Spesialisert opplæring for IT-personell",
          "Ledelsen har gjennomgått relevant opplæring",
        ],
        category: "awareness",
        article: "Art. 21(2)(g)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
      {
        id: "awa-2",
        title: "Phishing-øvelser",
        description: "Testing av ansattes evne til å gjenkjenne phishing",
        details: [
          "Simulerte phishing-øvelser gjennomføres",
          "Resultater analyseres og følges opp",
          "Målrettet opplæring til de som trenger det",
          "Trend over tid følges",
        ],
        category: "awareness",
        article: "Art. 21(2)(g)",
        articleUrl: "https://www.nis-2-directive.com/NIS_2_Directive_Article_21.html",
      },
    ],
  },
]

export function NIS2Checklist({ onBack }: NIS2ChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(nis2Categories.map((c) => c.id))
  )
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId)
      } else {
        newSet.add(categoryId)
      }
      return newSet
    })
  }

  const toggleItemDetails = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const totalItems = nis2Categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = checkedItems.size
  const progressPercent = Math.round((completedItems / totalItems) * 100)

  const getCategoryProgress = (category: ChecklistCategory) => {
    const completed = category.items.filter((item) => checkedItems.has(item.id)).length
    return { completed, total: category.items.length }
  }

  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-600 dark:text-orange-400" },
    red: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-600 dark:text-red-400" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-600 dark:text-purple-400" },
    teal: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-600 dark:text-teal-400" },
    green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-600 dark:text-green-400" },
    slate: { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-600 dark:text-slate-400" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400" },
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Tilbake
      </Button>

      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          NIS2 Compliance Sjekkliste
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interaktiv sjekkliste basert på NIS2-direktivet (Digital sikkerhetsloven i Norge).
          Bruk denne for å vurdere din organisasjons etterlevelse av kravene.
        </p>
      </div>

      {/* Info-boks */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm">
              Om NIS2 og Digital sikkerhetsloven
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              NIS2-direktivet er EUs regelverk for cybersikkerhet i kritiske sektorer, inkludert helse.
              I Norge implementeres dette gjennom Digital sikkerhetsloven. Helsesektoren regnes som
              &ldquo;essential entity&rdquo; og er underlagt de strengeste kravene.
            </p>
            <a
              href="https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
            >
              Les ENISA veiledning
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Total fremdrift</h3>
            <p className="text-sm text-muted-foreground">
              {completedItems} av {totalItems} punkter fullført
            </p>
          </div>
          <div className={cn(
            "text-3xl font-bold",
            progressPercent >= 80 ? "text-green-500" :
            progressPercent >= 50 ? "text-yellow-500" :
            "text-red-500"
          )}>
            {progressPercent}%
          </div>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-500",
              progressPercent >= 80 ? "bg-green-500" :
              progressPercent >= 50 ? "bg-yellow-500" :
              "bg-red-500"
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {nis2Categories.map((category) => {
          const progress = getCategoryProgress(category)
          const isExpanded = expandedCategories.has(category.id)
          const colors = colorClasses[category.color]

          return (
            <div
              key={category.id}
              className={cn("rounded-xl border overflow-hidden", colors.border)}
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full p-4 flex items-center justify-between",
                  colors.bg
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={colors.text}>{category.icon}</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {progress.completed} av {progress.total} fullført
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      progress.completed === progress.total
                        ? "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30"
                        : ""
                    )}
                  >
                    {Math.round((progress.completed / progress.total) * 100)}%
                  </Badge>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 space-y-3 border-t border-border/50">
                  {category.items.map((item) => {
                    const isChecked = checkedItems.has(item.id)
                    const isItemExpanded = expandedItems.has(item.id)

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "rounded-lg border p-4 transition-all",
                          isChecked
                            ? "border-green-500/30 bg-green-500/5"
                            : "border-border bg-card"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {isChecked ? (
                              <CheckCircle2 className="h-6 w-6 text-green-500" />
                            ) : (
                              <Circle className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
                            )}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4
                                  className={cn(
                                    "font-medium",
                                    isChecked
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-foreground"
                                  )}
                                >
                                  {item.title}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.description}
                                </p>
                              </div>
                              {item.article && item.articleUrl && (
                                <a
                                  href={item.articleUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-shrink-0"
                                >
                                  <Badge
                                    variant="outline"
                                    className="text-xs hover:bg-primary/10 hover:border-primary cursor-pointer transition-colors flex items-center gap-1"
                                  >
                                    {item.article}
                                    <ExternalLink className="h-3 w-3" />
                                  </Badge>
                                </a>
                              )}
                            </div>

                            {item.deadline && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 dark:text-amber-400">
                                <Clock className="h-3 w-3" />
                                Tidsfrist: {item.deadline}
                              </div>
                            )}

                            <button
                              onClick={() => toggleItemDetails(item.id)}
                              className="text-sm text-primary hover:underline mt-2 flex items-center gap-1"
                            >
                              {isItemExpanded ? "Skjul detaljer" : "Vis detaljer"}
                              {isItemExpanded ? (
                                <ChevronUp className="h-3 w-3" />
                              ) : (
                                <ChevronDown className="h-3 w-3" />
                              )}
                            </button>

                            {isItemExpanded && (
                              <div className="mt-3 p-3 rounded-lg bg-muted/50">
                                <p className="text-xs font-medium text-muted-foreground mb-2">
                                  Sjekkliste:
                                </p>
                                <ul className="space-y-1">
                                  {item.details.map((detail, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-muted-foreground flex items-start gap-2"
                                    >
                                      <span className="text-primary mt-1">•</span>
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h4 className="font-semibold text-foreground mb-3">Viktige ressurser</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="https://www.nsm.no/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Nasjonal sikkerhetsmyndighet (NSM)
          </a>
          <a
            href="https://www.datatilsynet.no/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Datatilsynet
          </a>
          <a
            href="https://www.helsedirektoratet.no/normen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            Normen for helsesektoren
          </a>
          <a
            href="https://www.enisa.europa.eu/topics/nis-directive"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            ENISA NIS2 ressurser
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm">
              Ansvarsfraskrivelse
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Denne sjekklisten er ment som et hjelpemiddel og erstatter ikke juridisk rådgivning
              eller formell compliance-vurdering. Kontakt relevante myndigheter eller rådgivere
              for bindende vurderinger av din organisasjons etterlevelse.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
