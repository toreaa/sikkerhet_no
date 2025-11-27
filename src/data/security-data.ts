import { GradingInfo, ExposureInfo, Measure, LegalRequirement } from "@/types"

export const gradingLevels: GradingInfo[] = [
  {
    level: 1,
    name: "Ikke-sensitiv informasjon",
    description: "Systemer uten personopplysninger eller helseopplysninger",
    examples: [
      "Offentlig tilgjengelig informasjon",
      "Generell informasjon om tjenester",
      "Anonymisert statistikk",
    ],
    legalBasis: ["NSM Grunnprinsipper"],
  },
  {
    level: 2,
    name: "Teknisk interessant informasjon",
    description: "Informasjon som kan gi innsikt i infrastruktur eller brukes til forberedelse av angrep",
    examples: [
      "Konfigurasjonsinformasjon",
      "Nettverksdiagrammer",
      "Intern dokumentasjon",
      "Driftssystemer uten helseopplysninger",
    ],
    legalBasis: ["NSM Grunnprinsipper", "NIS2"],
  },
  {
    level: 3,
    name: "Helseopplysninger",
    description: "Systemer som behandler helseopplysninger (GDPR Art. 9 - særlig kategori)",
    examples: [
      "Pasientjournalsystemer",
      "Laboratoriesystemer",
      "Bildediagnostikk (PACS)",
      "E-resept",
      "Kjernejournal",
      "Velferdsteknologi med helseopplysninger",
    ],
    legalBasis: ["GDPR Art. 9 og 32", "Pasientjournalloven § 22", "Normen", "NIS2"],
  },
  {
    level: 4,
    name: "Skjermingsverdig informasjon",
    description: "Informasjon underlagt Sikkerhetsloven som kan skade nasjonale sikkerhetsinteresser",
    examples: [
      "Beredskapsplaner for pandemier",
      "Kritisk helseinfrastruktur",
      "Sensitive forskningsdata",
      "Nasjonal helseressursfordeling",
    ],
    legalBasis: ["Sikkerhetsloven", "Virksomhetssikkerhetsforskriften"],
  },
]

export const exposureTypes: ExposureInfo[] = [
  {
    type: "internet",
    name: "Internett-eksponert",
    description: "Tjenesten er tilgjengelig fra det åpne internett",
    riskLevel: "Høy risiko - eksponert mot hele verden",
  },
  {
    type: "helsenett",
    name: "Helsenett-eksponert",
    description: "Tjenesten er kun tilgjengelig via Helsenettet",
    riskLevel: "Moderat risiko - NB: Helsenettet regnes som åpent nett",
  },
]

export const legalRequirements: LegalRequirement[] = [
  {
    id: "nis2",
    name: "NIS2-direktivet",
    source: "EU-direktiv / Digitalsikkerhetsloven",
    url: "https://www.regjeringen.no/no/sub/eos-notatbasen/notatene/2021/feb/nis2-direktivet/",
    description: "Krav til cybersikkerhet for kritisk infrastruktur inkl. helsesektoren",
  },
  {
    id: "gdpr",
    name: "GDPR / Personopplysningsloven",
    source: "EU-forordning / Norsk lov",
    url: "https://www.datatilsynet.no/rettigheter-og-plikter/personvernprinsippene/",
    description: "Krav til behandling og sikring av personopplysninger",
  },
  {
    id: "normen",
    name: "Normen v7.0",
    source: "Bransjenorm",
    url: "https://www.helsedirektoratet.no/normen/",
    description: "Norm for informasjonssikkerhet og personvern i helse- og omsorgssektoren",
  },
  {
    id: "sikkerhetsloven",
    name: "Sikkerhetsloven",
    source: "Norsk lov",
    url: "https://lovdata.no/dokument/NL/lov/2018-06-01-24",
    description: "Beskyttelse av skjermingsverdig informasjon og objekter",
  },
  {
    id: "nsm",
    name: "NSM Grunnprinsipper v2.1",
    source: "Veiledning",
    url: "https://nsm.no/grunnprinsipper",
    description: "21 prinsipper med 118 sikkerhetstiltak",
  },
  {
    id: "pasientjournal",
    name: "Pasientjournalloven",
    source: "Norsk lov",
    url: "https://lovdata.no/dokument/NL/lov/2014-06-20-42",
    description: "Krav til behandling av helseopplysninger i pasientjournaler",
  },
]

// Tiltak organisert etter kategori
export const technicalMeasures: Measure[] = [
  // Nivå 1 - Grunnleggende
  {
    id: "tls",
    name: "TLS-kryptering (HTTPS)",
    description: "Kryptert kommunikasjon med TLS 1.2 eller høyere",
    legal_basis: "NSM 2.7, Normen Faktaark 24",
    required: true,
    category: "technical",
  },
  {
    id: "firewall",
    name: "Brannmur",
    description: "Perimetersikring og segmentering",
    legal_basis: "NSM 2.4",
    required: true,
    category: "technical",
  },
  {
    id: "patching",
    name: "Sårbarhetshåndtering / Patching",
    description: "Regelmessige sikkerhetsoppdateringer",
    legal_basis: "NSM 3.1, NIS2 Art. 21",
    required: true,
    category: "technical",
  },
  {
    id: "backup",
    name: "Sikkerhetskopiering",
    description: "Regelmessig backup med testing av gjenoppretting",
    legal_basis: "NSM 2.9, NIS2 Art. 21",
    required: true,
    category: "technical",
  },
  {
    id: "logging_basic",
    name: "Systemlogging",
    description: "Logging av systemhendelser",
    legal_basis: "NSM 3.2",
    required: true,
    category: "technical",
  },

  // Nivå 2 - Forsterket
  {
    id: "mfa",
    name: "Flerfaktor-autentisering (MFA)",
    description: "To eller flere autentiseringsfaktorer",
    legal_basis: "NSM 2.6, NHN-krav",
    required: true,
    category: "technical",
  },
  {
    id: "segmentation",
    name: "Nettverkssegmentering",
    description: "Isolering av nettverkssoner",
    legal_basis: "NSM 2.4",
    required: true,
    category: "technical",
  },
  {
    id: "vulnerability_scan",
    name: "Sårbarhetsskanning",
    description: "Automatisert skanning etter kjente sårbarheter",
    legal_basis: "NSM 3.1",
    required: true,
    category: "technical",
  },
  {
    id: "ids_ips",
    name: "IDS/IPS",
    description: "Innbruddsdeteksjon og -forebygging",
    legal_basis: "NSM 3.2",
    required: true,
    category: "technical",
  },
  {
    id: "secure_config",
    name: "Sikker konfigurasjon",
    description: "Hardening, fjerne standardpassord og unødvendige tjenester",
    legal_basis: "NSM 2.3",
    required: true,
    category: "technical",
  },

  // Nivå 3 - Helseopplysninger
  {
    id: "eid",
    name: "Sikker autentisering (eID)",
    description: "BankID, Buypass eller tilsvarende for pasienter/brukere",
    legal_basis: "Normen Faktaark 24",
    required: true,
    category: "technical",
  },
  {
    id: "e2e_encryption",
    name: "Ende-til-ende kryptering",
    description: "Kryptering av all helseinformasjon i transitt",
    legal_basis: "Normen Faktaark 24 (OBLIGATORISK)",
    required: true,
    category: "technical",
  },
  {
    id: "encryption_at_rest",
    name: "Kryptering i ro",
    description: "Kryptert lagring av helseopplysninger",
    legal_basis: "GDPR Art. 32",
    required: true,
    category: "technical",
  },
  {
    id: "access_logging",
    name: "Tilgangslogging",
    description: "Logging av hvem som har aksessert hvilke opplysninger",
    legal_basis: "Pasientjournalforskriften § 14, GDPR Art. 32",
    required: true,
    category: "technical",
  },
  {
    id: "waf",
    name: "Web Application Firewall (WAF)",
    description: "Beskyttelse mot OWASP Top 10",
    legal_basis: "NSM 2.4",
    required: true,
    category: "technical",
  },
  {
    id: "pentest",
    name: "Penetrasjonstesting",
    description: "Regelmessig sikkerhetstesting",
    legal_basis: "NSM 3.4",
    required: true,
    category: "technical",
  },

  // Nivå 4 - Skjermingsverdig
  {
    id: "nsm_crypto",
    name: "NSM-godkjent kryptering",
    description: "Kryptering godkjent av NSM for gradert informasjon",
    legal_basis: "Virksomhetssikkerhetsforskriften § 35",
    required: true,
    category: "technical",
  },
  {
    id: "separated_infra",
    name: "Adskilt infrastruktur",
    description: "Fysisk eller logisk separert fra øvrig infrastruktur",
    legal_basis: "Virksomhetssikkerhetsforskriften",
    required: true,
    category: "technical",
  },
  {
    id: "physical_security",
    name: "Fysisk sikring",
    description: "Kontrollert/sperret/beskyttet område",
    legal_basis: "Virksomhetssikkerhetsforskriften §§ 28-31",
    required: true,
    category: "technical",
  },
]

export const organizationalMeasures: Measure[] = [
  // Nivå 1
  {
    id: "system_owner",
    name: "Definert systemeier",
    description: "Klart definert ansvar for systemet",
    legal_basis: "NSM 1.1",
    required: true,
    category: "organizational",
  },
  {
    id: "change_mgmt",
    name: "Endringsrutiner",
    description: "Kontrollerte endringer med godkjenning",
    legal_basis: "NSM 2.10",
    required: true,
    category: "organizational",
  },

  // Nivå 2
  {
    id: "risk_assessment",
    name: "Risikovurdering",
    description: "Dokumentert risikovurdering ved etablering og endringer",
    legal_basis: "NIS2 Art. 21, GDPR Art. 32, Normen",
    required: true,
    category: "organizational",
  },
  {
    id: "incident_procedures",
    name: "Hendelsesprosedyrer",
    description: "Dokumenterte prosedyrer for sikkerhetshendelser",
    legal_basis: "NSM 4.1, NIS2",
    required: true,
    category: "organizational",
  },
  {
    id: "access_control_policy",
    name: "Tilgangskontrollpolicy",
    description: "Tilgang kun til de som trenger det",
    legal_basis: "NSM 2.6",
    required: true,
    category: "organizational",
  },

  // Nivå 3
  {
    id: "dpia",
    name: "DPIA (Personvernkonsekvensvurdering)",
    description: "Obligatorisk ved høy risiko for registrerte",
    legal_basis: "GDPR Art. 35",
    required: true,
    category: "organizational",
  },
  {
    id: "dpa",
    name: "Databehandleravtale",
    description: "Påkrevd ved bruk av leverandører",
    legal_basis: "GDPR Art. 28",
    required: true,
    category: "organizational",
  },
  {
    id: "legal_basis",
    name: "Behandlingsgrunnlag",
    description: "Dokumentert lovlig grunnlag for behandling",
    legal_basis: "GDPR Art. 6 og 9",
    required: true,
    category: "organizational",
  },
  {
    id: "annual_review",
    name: "Årlig tilgangsgjennomgang",
    description: "Årlig kontroll av tildelte tilganger",
    legal_basis: "Normen Faktaark 14",
    required: true,
    category: "organizational",
  },
  {
    id: "confidentiality",
    name: "Taushetspliktserklæring",
    description: "Signert erklæring for alle med tilgang",
    legal_basis: "Helsepersonelloven",
    required: true,
    category: "organizational",
  },
  {
    id: "training",
    name: "Sikkerhetsopplæring",
    description: "Opplæring for alle ansatte med tilgang",
    legal_basis: "Normen, NIS2",
    required: true,
    category: "organizational",
  },
  {
    id: "continuity_plan",
    name: "Beredskaps- og kontinuitetsplan",
    description: "Dokumentert og øvet beredskapsplan",
    legal_basis: "NIS2 Art. 21",
    required: true,
    category: "organizational",
  },

  // Nivå 4
  {
    id: "security_clearance",
    name: "Sikkerhetsklarering",
    description: "Personellsikkerhetsklarering for alle med tilgang",
    legal_basis: "Sikkerhetsloven § 8-1",
    required: true,
    category: "organizational",
  },
  {
    id: "supplier_clearance",
    name: "Leverandørklarering",
    description: "Klarering av leverandører for gradert informasjon",
    legal_basis: "Sikkerhetsloven § 9-3",
    required: true,
    category: "organizational",
  },
]

// Funksjon for å hente tiltak basert på nivå og eksponering
export function getMeasuresForLevel(
  level: number,
  exposure: "internet" | "helsenett"
): { technical: Measure[]; organizational: Measure[] } {
  const technicalIds: Record<number, string[]> = {
    1: ["tls", "firewall", "patching", "backup", "logging_basic"],
    2: ["tls", "firewall", "patching", "backup", "logging_basic", "mfa", "segmentation", "vulnerability_scan", "ids_ips", "secure_config"],
    3: ["tls", "firewall", "patching", "backup", "logging_basic", "mfa", "segmentation", "vulnerability_scan", "ids_ips", "secure_config", "eid", "e2e_encryption", "encryption_at_rest", "access_logging", "waf", "pentest"],
    4: ["tls", "firewall", "patching", "backup", "logging_basic", "mfa", "segmentation", "vulnerability_scan", "ids_ips", "secure_config", "eid", "e2e_encryption", "encryption_at_rest", "access_logging", "waf", "pentest", "nsm_crypto", "separated_infra", "physical_security"],
  }

  const organizationalIds: Record<number, string[]> = {
    1: ["system_owner", "change_mgmt"],
    2: ["system_owner", "change_mgmt", "risk_assessment", "incident_procedures", "access_control_policy"],
    3: ["system_owner", "change_mgmt", "risk_assessment", "incident_procedures", "access_control_policy", "dpia", "dpa", "legal_basis", "annual_review", "confidentiality", "training", "continuity_plan"],
    4: ["system_owner", "change_mgmt", "risk_assessment", "incident_procedures", "access_control_policy", "dpia", "dpa", "legal_basis", "annual_review", "confidentiality", "training", "continuity_plan", "security_clearance", "supplier_clearance"],
  }

  // For internett-eksponering på nivå 2+, legg til WAF
  let techIds = technicalIds[level] || []
  if (exposure === "internet" && level >= 2 && !techIds.includes("waf")) {
    techIds = [...techIds, "waf"]
  }

  const technical = technicalMeasures.filter((m) => techIds.includes(m.id))
  const organizational = organizationalMeasures.filter((m) =>
    (organizationalIds[level] || []).includes(m.id)
  )

  return { technical, organizational }
}

// Varslingskrav
export const notificationRequirements = [
  {
    event: "Signifikant sikkerhetshendelse",
    deadline: "24 timer",
    recipient: "Tilsynsmyndighet",
    legal_basis: "NIS2",
    level: 3,
  },
  {
    event: "Brudd på personopplysningssikkerheten",
    deadline: "72 timer",
    recipient: "Datatilsynet",
    legal_basis: "GDPR Art. 33",
    level: 3,
  },
  {
    event: "Høy risiko for registrerte",
    deadline: "Uten ugrunnet opphold",
    recipient: "Berørte pasienter/registrerte",
    legal_basis: "GDPR Art. 34",
    level: 3,
  },
  {
    event: "Sikkerhetstruende hendelse",
    deadline: "Umiddelbart",
    recipient: "NSM",
    legal_basis: "Sikkerhetsloven",
    level: 4,
  },
]

// Viktig informasjon
export const importantNotes = [
  {
    title: "Helsenettet er et åpent nett",
    description: "I henhold til Normen Faktaark 24 regnes Helsenettet som et åpent nett. Dette betyr at kryptering er obligatorisk også for kommunikasjon innenfor Helsenettet.",
    level: "all",
  },
  {
    title: "Logging av tilgang er lovpålagt",
    description: "Pasientjournalforskriften § 14 krever at det logges hvem som har aksessert pasientopplysninger, og pasienten har rett til innsyn i denne loggen.",
    level: 3,
  },
  {
    title: "24-timers varsling ved hendelser",
    description: "NIS2 krever tidlig varsling til tilsynsmyndighet innen 24 timer ved signifikante sikkerhetshendelser.",
    level: 3,
  },
]
