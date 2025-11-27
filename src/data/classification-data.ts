// Klassifiseringsspørsmål for å bestemme graderingsnivå

export interface ClassificationQuestion {
  id: string
  question: string
  description?: string
  options: ClassificationOption[]
}

export interface ClassificationOption {
  id: string
  label: string
  description?: string
  points: number // Poeng som bidrar til klassifisering
  flags?: string[] // Spesielle flagg som kan overstyre
}

export const classificationQuestions: ClassificationQuestion[] = [
  {
    id: "data_type",
    question: "Hvilken type data behandler systemet?",
    description: "Velg den mest sensitive datatypen systemet håndterer",
    options: [
      {
        id: "public",
        label: "Offentlig tilgjengelig informasjon",
        description: "Informasjon som allerede er offentlig eller ment for offentligheten",
        points: 0,
      },
      {
        id: "internal",
        label: "Intern informasjon",
        description: "Teknisk dokumentasjon, interne prosedyrer, ikke-sensitiv driftsinformasjon",
        points: 1,
      },
      {
        id: "personal",
        label: "Alminnelige personopplysninger",
        description: "Navn, kontaktinfo, ansattdata (ikke helserelatert)",
        points: 2,
      },
      {
        id: "health",
        label: "Helseopplysninger",
        description: "Pasientjournal, diagnoser, behandling, resepter, labsvar",
        points: 3,
        flags: ["health_data"],
      },
      {
        id: "classified",
        label: "Skjermingsverdig informasjon",
        description: "Informasjon underlagt Sikkerhetsloven (nasjonal sikkerhet)",
        points: 4,
        flags: ["classified"],
      },
    ],
  },
  {
    id: "patient_data",
    question: "Inneholder systemet pasientidentifiserbare opplysninger?",
    description: "Kan enkeltpasienter identifiseres direkte eller indirekte?",
    options: [
      {
        id: "no",
        label: "Nei",
        description: "Ingen kobling til enkeltpasienter",
        points: 0,
      },
      {
        id: "anonymized",
        label: "Anonymiserte data",
        description: "Data som ikke kan tilbakeføres til enkeltpersoner",
        points: 0,
      },
      {
        id: "pseudonymized",
        label: "Pseudonymiserte data",
        description: "Kan tilbakeføres med nøkkel/kodeliste",
        points: 2,
      },
      {
        id: "yes",
        label: "Ja, direkte identifiserbare",
        description: "Navn, fødselsnummer, eller annen direkte identifikasjon",
        points: 3,
        flags: ["patient_identifiable"],
      },
    ],
  },
  {
    id: "infrastructure_impact",
    question: "Hva er konsekvensen hvis systemet blir utilgjengelig?",
    description: "Vurder påvirkning på pasientsikkerhet og drift",
    options: [
      {
        id: "minimal",
        label: "Minimal påvirkning",
        description: "Kan enkelt håndteres med manuelle rutiner",
        points: 0,
      },
      {
        id: "moderate",
        label: "Moderat påvirkning",
        description: "Forsinkelser i drift, men ikke kritisk",
        points: 1,
      },
      {
        id: "significant",
        label: "Betydelig påvirkning",
        description: "Vesentlig redusert kapasitet, potensielt forsinket behandling",
        points: 2,
      },
      {
        id: "critical",
        label: "Kritisk påvirkning",
        description: "Direkte fare for pasientsikkerhet eller liv",
        points: 3,
        flags: ["critical_system"],
      },
    ],
  },
  {
    id: "confidentiality_impact",
    question: "Hva er konsekvensen hvis informasjonen kommer på avveie?",
    description: "Vurder skadepotensialet ved uautorisert tilgang",
    options: [
      {
        id: "minimal",
        label: "Minimal skade",
        description: "Informasjonen er lite sensitiv",
        points: 0,
      },
      {
        id: "moderate",
        label: "Moderat skade",
        description: "Kan gi innsikt i infrastruktur eller interne prosesser",
        points: 1,
      },
      {
        id: "significant",
        label: "Betydelig skade",
        description: "Personvern krenkes, omdømmeskade, regulatoriske brudd",
        points: 2,
      },
      {
        id: "severe",
        label: "Alvorlig skade",
        description: "Stor skade for enkeltpersoner eller samfunnet",
        points: 3,
        flags: ["high_confidentiality"],
      },
      {
        id: "national",
        label: "Skade på nasjonale interesser",
        description: "Kan skade Norges sikkerhet eller vitale interesser",
        points: 4,
        flags: ["national_security"],
      },
    ],
  },
  {
    id: "integration",
    question: "Hvordan er systemet integrert med andre systemer?",
    description: "Vurder systemets rolle i den større infrastrukturen",
    options: [
      {
        id: "standalone",
        label: "Frittstående system",
        description: "Ingen eller minimal integrasjon med andre systemer",
        points: 0,
      },
      {
        id: "limited",
        label: "Begrenset integrasjon",
        description: "Integrasjon med noen interne systemer",
        points: 1,
      },
      {
        id: "extensive",
        label: "Omfattende integrasjon",
        description: "Integrert med mange systemer, sentral komponent",
        points: 2,
      },
      {
        id: "critical_hub",
        label: "Kritisk knutepunkt",
        description: "Sentral hub som mange andre systemer er avhengige av",
        points: 3,
        flags: ["critical_infrastructure"],
      },
    ],
  },
  {
    id: "user_base",
    question: "Hvem har tilgang til systemet?",
    description: "Vurder brukergruppens størrelse og sammensetning",
    options: [
      {
        id: "internal_limited",
        label: "Begrenset intern gruppe",
        description: "Kun et fåtall navngitte medarbeidere",
        points: 0,
      },
      {
        id: "internal_broad",
        label: "Bred intern tilgang",
        description: "Mange ansatte i organisasjonen",
        points: 1,
      },
      {
        id: "external_partners",
        label: "Eksterne samarbeidspartnere",
        description: "Tilgang for partnere, leverandører eller andre helseaktører",
        points: 2,
      },
      {
        id: "patients",
        label: "Pasienter/innbyggere",
        description: "Publikumstjeneste med pålogging",
        points: 2,
        flags: ["public_facing"],
      },
      {
        id: "public",
        label: "Åpen for alle",
        description: "Offentlig tilgjengelig uten pålogging",
        points: 1,
      },
    ],
  },
  {
    id: "regulatory",
    question: "Er systemet underlagt spesielle regulatoriske krav?",
    description: "Velg alle som gjelder (velg det strengeste)",
    options: [
      {
        id: "none",
        label: "Ingen spesielle krav",
        description: "Standard IKT-sikkerhetskrav",
        points: 0,
      },
      {
        id: "gdpr",
        label: "GDPR/Personopplysningsloven",
        description: "Behandler personopplysninger",
        points: 2,
      },
      {
        id: "normen",
        label: "Normen for helsesektoren",
        description: "Behandler helseopplysninger",
        points: 3,
        flags: ["normen_required"],
      },
      {
        id: "security_law",
        label: "Sikkerhetsloven",
        description: "Skjermingsverdig informasjon eller objekt",
        points: 4,
        flags: ["security_law"],
      },
    ],
  },
]

// Spørsmål om eksponering
export const exposureQuestions: ClassificationQuestion[] = [
  {
    id: "network_exposure",
    question: "Hvordan er systemet tilgjengelig nettverksmessig?",
    description: "Velg det som best beskriver hvordan systemet nås",
    options: [
      {
        id: "internal_only",
        label: "Kun internt nettverk",
        description: "Kun tilgjengelig fra organisasjonens lokale nettverk",
        points: 0,
      },
      {
        id: "vpn",
        label: "Via VPN",
        description: "Tilgjengelig eksternt, men kun via VPN",
        points: 1,
      },
      {
        id: "helsenett",
        label: "Helsenettet",
        description: "Eksponert på Norsk Helsenett",
        points: 2,
        flags: ["helsenett"],
      },
      {
        id: "internet",
        label: "Internett",
        description: "Direkte tilgjengelig fra internett",
        points: 3,
        flags: ["internet"],
      },
    ],
  },
]

// Funksjon for å beregne anbefalt nivå
export function calculateRecommendedLevel(
  answers: Record<string, string>
): {
  level: 1 | 2 | 3 | 4
  confidence: "high" | "medium" | "low"
  flags: string[]
  reasoning: string[]
} {
  let totalPoints = 0
  const flags: string[] = []
  const reasoning: string[] = []

  // Gå gjennom svar og samle poeng og flagg
  for (const question of classificationQuestions) {
    const answerId = answers[question.id]
    if (answerId) {
      const option = question.options.find((o) => o.id === answerId)
      if (option) {
        totalPoints += option.points
        if (option.flags) {
          flags.push(...option.flags)
        }
        if (option.points >= 3) {
          reasoning.push(`${question.question}: ${option.label}`)
        }
      }
    }
  }

  // Sjekk for overordnede flagg som tvinger et nivå
  if (flags.includes("classified") || flags.includes("national_security") || flags.includes("security_law")) {
    return {
      level: 4,
      confidence: "high",
      flags,
      reasoning: [
        "Systemet behandler skjermingsverdig informasjon og er underlagt Sikkerhetsloven",
        ...reasoning,
      ],
    }
  }

  if (flags.includes("health_data") || flags.includes("patient_identifiable") || flags.includes("normen_required")) {
    // Minimum nivå 3 for helseopplysninger
    const level = totalPoints >= 20 ? 4 : 3
    return {
      level: level as 3 | 4,
      confidence: "high",
      flags,
      reasoning: [
        "Systemet behandler helseopplysninger og er underlagt Normen og GDPR Art. 9",
        ...reasoning,
      ],
    }
  }

  // Beregn nivå basert på poeng
  let level: 1 | 2 | 3 | 4
  let confidence: "high" | "medium" | "low"

  if (totalPoints <= 3) {
    level = 1
    confidence = totalPoints <= 1 ? "high" : "medium"
    reasoning.unshift("Systemet behandler ikke sensitiv informasjon")
  } else if (totalPoints <= 8) {
    level = 2
    confidence = totalPoints >= 5 && totalPoints <= 7 ? "high" : "medium"
    reasoning.unshift("Systemet inneholder teknisk interessant informasjon")
  } else if (totalPoints <= 15) {
    level = 3
    confidence = "medium"
    reasoning.unshift("Systemet kan inneholde sensitiv informasjon - verifiser om det er helseopplysninger")
  } else {
    level = 4
    confidence = "low"
    reasoning.unshift("Høy score indikerer potensielt skjermingsverdig - bør verifiseres")
  }

  return { level, confidence, flags, reasoning }
}

// Funksjon for å bestemme eksponering
export function calculateExposure(
  answers: Record<string, string>
): "internet" | "helsenett" | "internal" {
  const networkAnswer = answers["network_exposure"]

  if (networkAnswer === "internet") {
    return "internet"
  } else if (networkAnswer === "helsenett") {
    return "helsenett"
  }
  return "internal"
}
