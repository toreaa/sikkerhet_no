// ROS-analyse data - Risiko- og Sårbarhetsanalyse

export interface ThreatScenario {
  id: string
  category: string
  name: string
  description: string
  technicalDetails: string
  baseProbability: 1 | 2 | 3 | 4 // Sannsynlighet
  baseConsequence: 1 | 2 | 3 // Konsekvens
  probabilityFactors: string[] // Faktorer som øker sannsynlighet
  consequenceFactors: string[] // Faktorer som øker konsekvens
  mitigations: string[] // Tiltak som reduserer risiko
  relevantFlags: string[] // Klassifiseringsflagg som gjør dette relevant
  exposureMultiplier: {
    internet: number
    helsenett: number
    internal: number
  }
}

export interface RiskAssessment {
  scenario: ThreatScenario
  adjustedProbability: number
  adjustedConsequence: number
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  applicableMitigations: string[]
}

// Sannsynlighetsnivåer
export const probabilityLevels = {
  1: { label: "Svært lav", description: "Usannsynlig, < 1% sjanse per år" },
  2: { label: "Lav", description: "Lite sannsynlig, 1-10% sjanse per år" },
  3: { label: "Moderat", description: "Kan skje, 10-50% sjanse per år" },
  4: { label: "Høy", description: "Sannsynlig, > 50% sjanse per år" },
}

// Konsekvensnivåer
export const consequenceLevels = {
  1: { label: "Lav", description: "Begrenset skade, enkelt å håndtere" },
  2: { label: "Moderat", description: "Betydelig skade, krever ressurser å håndtere" },
  3: { label: "Alvorlig", description: "Stor skade, kan true liv, helse eller drift" },
}

// Risikonivåer basert på score (sannsynlighet × konsekvens)
export const riskLevels = {
  low: { min: 1, max: 3, label: "Lav risiko", color: "green", action: "Akseptabel risiko, overvåk" },
  medium: { min: 4, max: 6, label: "Moderat risiko", color: "yellow", action: "Vurder tiltak, prioriter ved kapasitet" },
  high: { min: 7, max: 9, label: "Høy risiko", color: "orange", action: "Tiltak må implementeres" },
  critical: { min: 10, max: 12, label: "Kritisk risiko", color: "red", action: "Umiddelbar handling påkrevd" },
}

// Trusselscenarier basert på oppdatert trusselbilde
export const threatScenarios: ThreatScenario[] = [
  // Ransomware og malware
  {
    id: "ransomware",
    category: "Ondsinnet programvare",
    name: "Ransomware-angrep",
    description: "Kryptering av data og systemer med krav om løsepenger",
    technicalDetails: "Angrep via phishing-e-post, RDP-eksponering, eller sårbare VPN-løsninger. Moderne ransomware (LockBit, BlackCat) eksfiltrerer data før kryptering for dobbel utpressing.",
    baseProbability: 3,
    baseConsequence: 3,
    probabilityFactors: ["Internett-eksponert", "Manglende MFA", "Utdaterte systemer"],
    consequenceFactors: ["Helseopplysninger", "Kritisk system", "Manglende backup"],
    mitigations: [
      "Implementer offline backup (3-2-1 regel)",
      "MFA på alle eksterne tilganger",
      "Nettverkssegmentering",
      "EDR/XDR-løsning",
      "Phishing-opplæring",
    ],
    relevantFlags: ["internet", "health_data", "critical_system"],
    exposureMultiplier: { internet: 1.5, helsenett: 1.0, internal: 0.7 },
  },
  {
    id: "supply_chain",
    category: "Leverandørkjedeangrep",
    name: "Kompromittert leverandør/programvare",
    description: "Angrep via tredjepart eller kompromittert programvare",
    technicalDetails: "Eksempler: SolarWinds, Kaseya, MOVEit. Angripere kompromitterer leverandørers systemer for å nå mange mål. Særlig relevant for helsesektoren med mange integrasjoner.",
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Omfattende integrasjon", "Mange leverandører", "Manglende leverandørkontroll"],
    consequenceFactors: ["Kritisk knutepunkt", "Tilgang til sensitive data"],
    mitigations: [
      "Leverandørsikkerhetsgjennomgang (GDPR Art. 28)",
      "Minimere leverandørtilganger",
      "Overvåke leverandøraktivitet",
      "Segmentere leverandørtilganger",
      "Incident response plan for leverandørbrudd",
    ],
    relevantFlags: ["critical_infrastructure", "extensive_integration"],
    exposureMultiplier: { internet: 1.2, helsenett: 1.0, internal: 0.8 },
  },
  {
    id: "phishing_targeted",
    category: "Sosial manipulering",
    name: "Målrettet phishing (spear phishing)",
    description: "Målrettede angrep mot ansatte med tilgang til sensitive systemer",
    technicalDetails: "Angripere bruker OSINT og sosiale medier for å lage troverdige meldinger. Særlig rettet mot IT-personell, ledelse, og helsepersonell med systemtilgang.",
    baseProbability: 4,
    baseConsequence: 2,
    probabilityFactors: ["Stor brukergruppe", "Offentlig eksponert", "Kjent organisasjon"],
    consequenceFactors: ["Privilegerte brukere", "Tilgang til pasientdata"],
    mitigations: [
      "Sikkerhetsopplæring og phishing-simuleringer",
      "E-postfiltrering og sandboxing",
      "MFA på alle kontoer",
      "Privileged Access Management (PAM)",
      "Rapporteringskultur for mistenkelige meldinger",
    ],
    relevantFlags: ["public_facing", "patient_identifiable"],
    exposureMultiplier: { internet: 1.3, helsenett: 1.0, internal: 0.8 },
  },
  {
    id: "unauthorized_access",
    category: "Uautorisert tilgang",
    name: "Kompromitterte brukerkontoer",
    description: "Uautorisert tilgang via stjålne eller gjettede passord",
    technicalDetails: "Credential stuffing fra tidligere lekkasjer, brute force, eller passordgjetting. Ofte kombinert med manglende MFA og dårlig passordpolicy.",
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Manglende MFA", "Svak passordpolicy", "Gjenbrukte passord"],
    consequenceFactors: ["Tilgang til EPJ", "Administrative rettigheter"],
    mitigations: [
      "MFA på alle kontoer",
      "Sterk passordpolicy (min 14 tegn)",
      "Credential monitoring (Have I Been Pwned)",
      "Kontobasert anomalideteksjon",
      "Automatisk kontolåsing",
    ],
    relevantFlags: ["patient_identifiable", "health_data"],
    exposureMultiplier: { internet: 1.4, helsenett: 1.1, internal: 0.9 },
  },
  {
    id: "data_exfiltration",
    category: "Datalekkasje",
    name: "Uautorisert dataeksfiltrering",
    description: "Sensitiv data kopieres ut av organisasjonen",
    technicalDetails: "Kan skje via ondsinnet innsider, kompromittert konto, eller malware. Helseopplysninger har høy verdi på det mørke markedet ($250-1000 per journal).",
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Manglende DLP", "Bred tilgang", "USB tillatt"],
    consequenceFactors: ["Helseopplysninger", "Mange pasienter", "Sensitive diagnoser"],
    mitigations: [
      "Data Loss Prevention (DLP)",
      "Logging og overvåking av datatilgang",
      "Tilgangsstyring (need-to-know)",
      "Kryptering av data",
      "USB-restriksjon",
    ],
    relevantFlags: ["health_data", "patient_identifiable", "high_confidentiality"],
    exposureMultiplier: { internet: 1.3, helsenett: 1.0, internal: 1.0 },
  },
  {
    id: "ddos",
    category: "Tjenestenekt",
    name: "DDoS-angrep",
    description: "Overbelastningsangrep som gjør tjenesten utilgjengelig",
    technicalDetails: "Volumetriske angrep (UDP flood), protokollangrep (SYN flood), eller applikasjonslagsangrep (HTTP flood). Kan leies for $20-200/time.",
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Internett-eksponert", "Kritisk tjeneste", "Politisk sensitiv"],
    consequenceFactors: ["Pasientbehandling påvirkes", "Ingen redundans"],
    mitigations: [
      "DDoS-beskyttelse (CDN/WAF)",
      "Redundante internettlinjer",
      "Skalerbar infrastruktur",
      "Incident response plan for DDoS",
      "Kommunikasjonsplan",
    ],
    relevantFlags: ["internet", "critical_system", "public_facing"],
    exposureMultiplier: { internet: 1.5, helsenett: 0.5, internal: 0.2 },
  },
  {
    id: "vulnerability_exploitation",
    category: "Sårbarhetsutnyttelse",
    name: "Utnyttelse av kjente sårbarheter",
    description: "Angrep via upatchede systemer og kjente CVE-er",
    technicalDetails: "Median tid fra CVE til exploit: 7 dager. Kritiske sårbarheter i VPN (Fortinet, Pulse Secure), Exchange, Log4j etc. utnyttes aktivt.",
    baseProbability: 3,
    baseConsequence: 3,
    probabilityFactors: ["Treg patching", "Legacy-systemer", "Internett-eksponert"],
    consequenceFactors: ["Kritisk system", "Lateral movement mulig"],
    mitigations: [
      "Sårbarhetsskanning (minst ukentlig)",
      "Patching SLA (kritisk: 24-72t)",
      "Virtual patching via WAF/IPS",
      "Segmentering av legacy-systemer",
      "Fjerne unødvendige tjenester",
    ],
    relevantFlags: ["internet", "critical_infrastructure"],
    exposureMultiplier: { internet: 1.5, helsenett: 1.0, internal: 0.6 },
  },
  {
    id: "insider_threat",
    category: "Innsidertrussel",
    name: "Ondsinnet eller uaktsom innsider",
    description: "Ansatte som bevisst eller ubevisst forårsaker sikkerhetshendelse",
    technicalDetails: "Inkluderer datatyverier, sabotasje, eller utilsiktet eksponering. Helsepersonell har bred tilgang for å kunne utføre jobben.",
    baseProbability: 2,
    baseConsequence: 2,
    probabilityFactors: ["Bred tilgang", "Manglende logging", "Utilfredse ansatte"],
    consequenceFactors: ["Tilgang til mange pasienter", "Administrative rettigheter"],
    mitigations: [
      "Prinsipp om minste privilegium",
      "Logging av all datatilgang (Normen 5.3)",
      "Regelmessig tilgangsgjennomgang",
      "Offboarding-prosedyrer",
      "Anomalideteksjon på brukeratferd",
    ],
    relevantFlags: ["health_data", "patient_identifiable"],
    exposureMultiplier: { internet: 1.0, helsenett: 1.0, internal: 1.0 },
  },
  {
    id: "medical_device",
    category: "Medisinsk utstyr",
    name: "Kompromittert medisinsk utstyr",
    description: "Angrep mot nettverkstilkoblet medisinsk utstyr",
    technicalDetails: "IoMT (Internet of Medical Things) har ofte begrenset sikkerhet, lange livssykluser, og kan ikke enkelt patches. Kan påvirke pasientbehandling.",
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Mange IoMT-enheter", "Flat nettverksstruktur", "Legacy-utstyr"],
    consequenceFactors: ["Livsopprettholdende utstyr", "Pasientdata på enheten"],
    mitigations: [
      "Segmentere medisinsk utstyr",
      "Inventar over alle IoMT-enheter",
      "Sårbarhetsvurdering før anskaffelse",
      "Overvåke nettverkstrafikk",
      "Leverandørkrav til sikkerhet",
    ],
    relevantFlags: ["critical_system", "health_data"],
    exposureMultiplier: { internet: 1.3, helsenett: 1.1, internal: 0.9 },
  },
  {
    id: "backup_failure",
    category: "Kontinuitet",
    name: "Backup-svikt ved hendelse",
    description: "Backup er utilgjengelig eller korrupt ved behov for gjenoppretting",
    technicalDetails: "Ransomware målretter ofte backup-systemer. Untestede backups feiler i 37% av gjenopprettingsforsøk ifølge studier.",
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Ingen offline backup", "Manglende testing", "Backup på samme nettverk"],
    consequenceFactors: ["Kritisk system", "Lang gjenopprettingstid akseptabel"],
    mitigations: [
      "3-2-1 backup-strategi",
      "Offline/immutable backup",
      "Regelmessig gjenopprettingstesting",
      "Dokumentert gjenopprettingsprosedyre",
      "RTO/RPO-definert og testet",
    ],
    relevantFlags: ["critical_system", "health_data"],
    exposureMultiplier: { internet: 1.0, helsenett: 1.0, internal: 1.0 },
  },
]

// Funksjon for å beregne risiko basert på klassifiseringssvar
export function calculateRiskAssessment(
  answers: Record<string, string>,
  flags: string[],
  exposure: "internet" | "helsenett" | "internal"
): RiskAssessment[] {
  const assessments: RiskAssessment[] = []

  for (const scenario of threatScenarios) {
    // Sjekk om scenariet er relevant basert på flagg
    const isRelevant = scenario.relevantFlags.length === 0 ||
      scenario.relevantFlags.some(flag =>
        flags.includes(flag) ||
        exposure === flag ||
        answers["network_exposure"] === flag
      )

    if (!isRelevant) continue

    // Juster sannsynlighet basert på eksponering
    let adjustedProbability = scenario.baseProbability * scenario.exposureMultiplier[exposure]

    // Juster basert på svar
    if (answers["data_type"] === "health" || answers["data_type"] === "classified") {
      adjustedProbability *= 1.2
    }
    if (answers["integration"] === "critical_hub" || answers["integration"] === "extensive") {
      adjustedProbability *= 1.1
    }
    if (answers["user_base"] === "public" || answers["user_base"] === "patients") {
      adjustedProbability *= 1.1
    }

    // Begrens til maks 4
    adjustedProbability = Math.min(4, Math.round(adjustedProbability * 10) / 10)

    // Juster konsekvens basert på svar
    let adjustedConsequence: number = scenario.baseConsequence

    if (answers["infrastructure_impact"] === "critical") {
      adjustedConsequence = 3
    } else if (answers["infrastructure_impact"] === "significant" && adjustedConsequence < 3) {
      adjustedConsequence = Math.min(3, adjustedConsequence + 1)
    }

    if (answers["confidentiality_impact"] === "severe" || answers["confidentiality_impact"] === "national") {
      adjustedConsequence = 3
    }

    if (flags.includes("health_data") || flags.includes("patient_identifiable")) {
      adjustedConsequence = Math.max(adjustedConsequence, 2)
    }

    // Begrens til maks 3
    adjustedConsequence = Math.min(3, Math.round(adjustedConsequence))

    // Beregn risikoscore
    const riskScore = Math.round(adjustedProbability * adjustedConsequence)

    // Bestem risikonivå
    let riskLevel: "low" | "medium" | "high" | "critical"
    if (riskScore <= 3) riskLevel = "low"
    else if (riskScore <= 6) riskLevel = "medium"
    else if (riskScore <= 9) riskLevel = "high"
    else riskLevel = "critical"

    assessments.push({
      scenario,
      adjustedProbability: Math.round(adjustedProbability),
      adjustedConsequence: Math.round(adjustedConsequence),
      riskScore,
      riskLevel,
      applicableMitigations: scenario.mitigations,
    })
  }

  // Sorter etter risikoscore (høyest først)
  return assessments.sort((a, b) => b.riskScore - a.riskScore)
}

// Funksjon for å generere risikomatrise-data
export function generateRiskMatrix(assessments: RiskAssessment[]): number[][] {
  // Matrise: [konsekvens][sannsynlighet] = antall trusler
  const matrix: number[][] = [
    [0, 0, 0, 0], // Konsekvens 1
    [0, 0, 0, 0], // Konsekvens 2
    [0, 0, 0, 0], // Konsekvens 3
  ]

  for (const assessment of assessments) {
    const probIndex = assessment.adjustedProbability - 1
    const consIndex = assessment.adjustedConsequence - 1
    if (probIndex >= 0 && probIndex < 4 && consIndex >= 0 && consIndex < 3) {
      matrix[consIndex][probIndex]++
    }
  }

  return matrix
}

// Hjelpefunksjon for å få farge basert på risikoscore
export function getRiskColor(score: number): string {
  if (score <= 3) return "green"
  if (score <= 6) return "yellow"
  if (score <= 9) return "orange"
  return "red"
}

// Hjelpefunksjon for å få CSS-klasser basert på risikoscore
export function getRiskColorClasses(score: number): { bg: string; text: string; border: string } {
  if (score <= 3) {
    return {
      bg: "bg-green-500/20",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-500/50",
    }
  }
  if (score <= 6) {
    return {
      bg: "bg-yellow-500/20",
      text: "text-yellow-600 dark:text-yellow-400",
      border: "border-yellow-500/50",
    }
  }
  if (score <= 9) {
    return {
      bg: "bg-orange-500/20",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-500/50",
    }
  }
  return {
    bg: "bg-red-500/20",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/50",
  }
}
