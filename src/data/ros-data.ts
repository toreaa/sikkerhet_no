// ROS-analyse data - Risiko- og Sårbarhetsanalyse

// CIA-triad: Konfidensialitet, Integritet, Tilgjengelighet
export interface CIAImpact {
  confidentiality: boolean // K - Konfidensialitet
  integrity: boolean // I - Integritet
  availability: boolean // T - Tilgjengelighet
}

export interface ThreatScenario {
  id: string
  category: string
  name: string
  description: string
  vulnerabilityDescription: string // Sårbarhet beskrivelse
  consequenceDescription: string // Konsekvens beskrivelse
  technicalDetails: string
  ciaImpact: CIAImpact
  baseProbability: 1 | 2 | 3 | 4
  baseConsequence: 1 | 2 | 3
  probabilityFactors: string[]
  consequenceFactors: string[]
  existingMeasures: string[] // Typiske eksisterende tiltak
  additionalMeasures: string[] // Ytterligere tiltak
  mitigations: string[] // Alle tiltak samlet
  relevantFlags: string[]
  exposureMultiplier: {
    internet: number
    helsenett: number
    internal: number
  }
  mitigationEffect: {
    probabilityReduction: number
    consequenceReduction: number
  }
}

export interface RiskAssessment {
  scenario: ThreatScenario
  // Før tiltak
  adjustedProbability: number
  adjustedConsequence: number
  riskScore: number
  riskLevel: "low" | "medium" | "high" | "critical"
  // Etter tiltak
  mitigatedProbability: number
  mitigatedConsequence: number
  mitigatedRiskScore: number
  mitigatedRiskLevel: "low" | "medium" | "high" | "critical"
  // Tiltak
  applicableExistingMeasures: string[]
  applicableAdditionalMeasures: string[]
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

// Risikonivåer basert på score
export const riskLevels = {
  low: { min: 1, max: 3, label: "Lav risiko", color: "green", action: "Akseptabel risiko, overvåk" },
  medium: { min: 4, max: 6, label: "Moderat risiko", color: "yellow", action: "Vurder tiltak, prioriter ved kapasitet" },
  high: { min: 7, max: 9, label: "Høy risiko", color: "orange", action: "Tiltak må implementeres" },
  critical: { min: 10, max: 12, label: "Kritisk risiko", color: "red", action: "Umiddelbar handling påkrevd" },
}

// Oppdaterte trusselscenarier med detaljert format
export const threatScenarios: ThreatScenario[] = [
  // 1. Ransomware
  {
    id: "ransomware",
    category: "Ondsinnet programvare",
    name: "Ransomware-angrep",
    description: "Kryptering av data og systemer med krav om løsepenger",
    vulnerabilityDescription: "Eksponerte RDP-tjenester, sårbare VPN-løsninger, manglende MFA, eller phishing-angrep gir angripere initiell tilgang til nettverket.",
    consequenceDescription: "Kritiske systemer og data blir kryptert. Tjenestene vil ikke være tilgjengelige. Potensiell datalekkasje ved dobbel utpressing. Betydelig omdømmeskade.",
    technicalDetails: "Moderne ransomware (LockBit 3.0, BlackCat/ALPHV, Cl0p) eksfiltrerer data før kryptering. Gjennomsnittlig nedetid: 21 dager. Løsepengekrav i helse: $1.27M gjennomsnitt.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 3,
    baseConsequence: 3,
    probabilityFactors: ["Internett-eksponert RDP/VPN", "Manglende MFA", "Utdaterte systemer", "Manglende sikkerhetsopplæring"],
    consequenceFactors: ["Helseopplysninger", "Kritisk infrastruktur", "Manglende offline backup", "Ingen hendelsesresponsplan"],
    existingMeasures: [
      "Antivirus/EDR installert",
      "Brannmur konfigurert",
      "Daglig backup kjører",
      "E-postfiltrering aktivert",
    ],
    additionalMeasures: [
      "Implementer offline/immutable backup (3-2-1-1 regel)",
      "MFA på alle eksterne tilganger",
      "Nettverkssegmentering med mikrosegmentering",
      "XDR-løsning med automatisert respons",
      "Kvartalsvise phishing-simuleringer",
      "Incident response plan med øvelser",
    ],
    mitigations: [
      "Offline backup", "MFA", "Nettverkssegmentering", "EDR/XDR", "Phishing-opplæring", "Hendelsesresponsplan"
    ],
    relevantFlags: ["internet", "health_data", "critical_system"],
    exposureMultiplier: { internet: 1.5, helsenett: 1.0, internal: 0.6 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 2. Leverandørkjedeangrep
  {
    id: "supply_chain",
    category: "Leverandørkjedeangrep",
    name: "Kompromittert leverandør/programvare",
    description: "Angrep via tredjeparts programvare eller leverandørtilgang",
    vulnerabilityDescription: "Manglende kontroll på leverandørers sikkerhetsnivå. Automatiske oppdateringer fra kompromitterte kilder. Bred leverandørtilgang til systemer.",
    consequenceDescription: "Massiv dataeksponering via betrodd kanal. Vanskelig å oppdage. Kan gi full tilgang til interne systemer og data.",
    technicalDetails: "Kjente angrep: SolarWinds Orion (2020), Kaseya VSA (2021), MOVEit (2023). Helsesektoren særlig utsatt pga. mange integrasjoner (EPJ, lab, radiologi).",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Mange tredjepartsleverandører", "Automatiske oppdateringer", "Manglende leverandørvurdering"],
    consequenceFactors: ["Kritisk knutepunkt", "Tilgang til pasientdata", "Mange integrerte systemer"],
    existingMeasures: [
      "Databehandleravtaler på plass",
      "Årlig leverandørgjennomgang",
      "Nettverksovervåking",
    ],
    additionalMeasures: [
      "Leverandørsikkerhetsscoring (SOC 2, ISO 27001 krav)",
      "Segmenterte leverandørtilganger med JIT-access",
      "Overvåking av leverandøraktivitet (UEBA)",
      "Software Bill of Materials (SBOM) krav",
      "Incident response plan for leverandørbrudd",
      "Pen-test krav i kontrakter",
    ],
    mitigations: [
      "Leverandørvurdering", "Segmentering", "UEBA", "SBOM", "Hendelsesplan"
    ],
    relevantFlags: ["critical_infrastructure", "extensive_integration", "health_data"],
    exposureMultiplier: { internet: 1.2, helsenett: 1.1, internal: 0.9 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 3. Målrettet phishing
  {
    id: "phishing_targeted",
    category: "Sosial manipulering",
    name: "Målrettet phishing (spear phishing)",
    description: "Målrettede e-postangrep mot ansatte med tilgang til sensitive systemer",
    vulnerabilityDescription: "Ansatte med tilgang til sensitive systemer mottar troverdige, målrettede phishing-forsøk basert på OSINT-innsamling.",
    consequenceDescription: "Kompromitterte kontoer gir tilgang til sensitive data. Kan være starten på større angrep.",
    technicalDetails: "AI-generert phishing øker i kvalitet. Business Email Compromise (BEC) målretter ledelse og økonomi. QR-kode phishing (quishing) omgår e-postfiltre.",
    ciaImpact: { confidentiality: true, integrity: false, availability: false },
    baseProbability: 4,
    baseConsequence: 2,
    probabilityFactors: ["Stor brukergruppe", "Offentlig eksponert organisasjon", "Manglende opplæring"],
    consequenceFactors: ["Privilegerte brukere rammes", "Tilgang til pasientdata", "Manglende MFA"],
    existingMeasures: [
      "E-postfiltrering (spam/phishing)",
      "Årlig sikkerhetsopplæring",
      "Varsling av mistenkelige e-poster",
    ],
    additionalMeasures: [
      "Månedlige phishing-simuleringer med oppfølging",
      "DMARC/DKIM/SPF implementering",
      "MFA på alle kontoer (hardware-tokens for admin)",
      "Privileged Access Management (PAM)",
      "Sikkerhetskultur-program",
      "AI-basert e-postanalyse",
    ],
    mitigations: [
      "Phishing-simuleringer", "DMARC", "MFA", "PAM", "Opplæring"
    ],
    relevantFlags: ["public_facing", "patient_identifiable", "health_data"],
    exposureMultiplier: { internet: 1.3, helsenett: 1.1, internal: 0.9 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 4. Kompromitterte kontoer
  {
    id: "unauthorized_access",
    category: "Uautorisert tilgang",
    name: "Kompromitterte brukerkontoer",
    description: "Uautorisert tilgang via stjålne, gjettede eller lekkede passord",
    vulnerabilityDescription: "Svak passordpolicy, gjenbrukte passord fra andre lekkasjer, eller manglende MFA gjør kontoer sårbare.",
    consequenceDescription: "Angriper får tilgang med legitime rettigheter. Vanskelig å oppdage. Kan eskalere privilegier.",
    technicalDetails: "Credential stuffing fra 24+ milliarder lekkede passord. Password spraying mot vanlige passord. Gjennomsnittlig tid til oppdagelse: 207 dager.",
    ciaImpact: { confidentiality: true, integrity: true, availability: false },
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Manglende MFA", "Svak passordpolicy", "Gjenbrukte passord", "Ingen credential monitoring"],
    consequenceFactors: ["Tilgang til EPJ", "Administrative rettigheter", "Lateral movement mulig"],
    existingMeasures: [
      "Passordpolicy (min 8 tegn)",
      "Kontolåsing etter feilforsøk",
      "Logging av innlogging",
    ],
    additionalMeasures: [
      "MFA på alle kontoer (phishing-resistent for admin)",
      "Passordpolicy min 14 tegn eller passphrase",
      "Credential monitoring (Have I Been Pwned Enterprise)",
      "Kontobasert anomalideteksjon (UEBA)",
      "Passwordless autentisering for sensitive systemer",
      "Regelmessig tilgangsgjennomgang",
    ],
    mitigations: [
      "MFA", "Sterk passordpolicy", "Credential monitoring", "UEBA", "Tilgangsgjennomgang"
    ],
    relevantFlags: ["patient_identifiable", "health_data"],
    exposureMultiplier: { internet: 1.4, helsenett: 1.1, internal: 0.9 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 5. Datalekkasje/eksfiltrering
  {
    id: "data_exfiltration",
    category: "Datalekkasje",
    name: "Uautorisert dataeksfiltrering",
    description: "Sensitiv data kopieres ut av organisasjonen",
    vulnerabilityDescription: "Manglende DLP-kontroller, bred datatilgang, eller mulighet for å bruke USB/skytjenester gjør eksfiltrering mulig.",
    consequenceDescription: "Helseopplysninger på avveie. GDPR-brudd med potensielle bøter. Stor omdømmeskade. Mulig utpressing.",
    technicalDetails: "Helsejournaler verdt $250-1000 på darknet (10x kredittkort). Eksfiltrering via DNS tunneling, cloud storage, eller krypterte kanaler.",
    ciaImpact: { confidentiality: true, integrity: false, availability: false },
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Manglende DLP", "Bred datatilgang", "USB/cloud tillatt", "Manglende logging"],
    consequenceFactors: ["Helseopplysninger", "Mange pasienter", "Sensitive diagnoser"],
    existingMeasures: [
      "Tilgangsstyring implementert",
      "Logging av filaksess",
      "Kryptert lagring",
    ],
    additionalMeasures: [
      "Data Loss Prevention (DLP) på endpoint og nettverk",
      "USB-restriksjon/blokkering",
      "Cloud Access Security Broker (CASB)",
      "Data classification og tagging",
      "Need-to-know tilgangsprinsipp",
      "Regelmessig tilgangsgjennomgang",
    ],
    mitigations: [
      "DLP", "USB-kontroll", "CASB", "Data classification", "Tilgangsstyring"
    ],
    relevantFlags: ["health_data", "patient_identifiable", "high_confidentiality"],
    exposureMultiplier: { internet: 1.2, helsenett: 1.0, internal: 1.0 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 6. DDoS
  {
    id: "ddos",
    category: "Tjenestenekt",
    name: "DDoS-angrep",
    description: "Distribuert tjenestenektangrep som overbelaster systemer",
    vulnerabilityDescription: "Internett-eksponerte tjenester uten tilstrekkelig beskyttelse kan overbelastes av distribuerte angrep.",
    consequenceDescription: "Kritiske helsetjenester blir utilgjengelige. Pasientbehandling kan forsinkes eller stoppes.",
    technicalDetails: "DDoS-as-a-service fra $20/time. Angrep på 1+ Tbps observert. Applikasjonslagsangrep (L7) vanskeligere å stoppe.",
    ciaImpact: { confidentiality: false, integrity: false, availability: true },
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Internett-eksponert", "Kritisk helsetjeneste", "Politisk sensitivt", "Manglende DDoS-beskyttelse"],
    consequenceFactors: ["Pasientbehandling påvirkes", "Ingen redundans", "Lang gjenopprettingstid"],
    existingMeasures: [
      "Brannmur med rate limiting",
      "ISP-varsling ved angrep",
      "Redundant internettlinje",
    ],
    additionalMeasures: [
      "Dedikert DDoS-beskyttelse (Cloudflare, Akamai, Azure)",
      "Web Application Firewall (WAF)",
      "Auto-skalering av infrastruktur",
      "Anycast DNS",
      "DDoS-responsplan med ISP",
      "Kommunikasjonsplan for nedetid",
    ],
    mitigations: [
      "DDoS-beskyttelse", "WAF", "Auto-skalering", "Responsplan"
    ],
    relevantFlags: ["internet", "critical_system", "public_facing"],
    exposureMultiplier: { internet: 1.5, helsenett: 0.4, internal: 0.1 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 7. Sårbarhetsutnyttelse
  {
    id: "vulnerability_exploitation",
    category: "Sårbarhetsutnyttelse",
    name: "Utnyttelse av kjente sårbarheter",
    description: "Angrep via upatchede systemer og publiserte CVE-er",
    vulnerabilityDescription: "Systemer med kjente, upatchede sårbarheter eksponert mot nettverk. Treg patchingprosess.",
    consequenceDescription: "Full systemkompromittering mulig. Kan føre til videre angrep i nettverket.",
    technicalDetails: "Median tid fra CVE til exploit: 7 dager. CISA KEV-katalogen viser aktivt utnyttede sårbarheter. Kritiske VPN-sårbarheter (Fortinet, Ivanti) utnyttes timer etter publisering.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 3,
    baseConsequence: 3,
    probabilityFactors: ["Treg patching (>30 dager)", "Legacy-systemer", "Internett-eksponert", "Manglende sårbarhetsskanning"],
    consequenceFactors: ["Kritisk system", "Lateral movement mulig", "Ingen segmentering"],
    existingMeasures: [
      "Månedlig patching",
      "Antivirus oppdatert",
      "Brannmur på plass",
    ],
    additionalMeasures: [
      "Kontinuerlig sårbarhetsskanning (ukentlig)",
      "Patching SLA (kritisk: 24-72t, høy: 7 dager)",
      "Virtual patching via WAF/IPS",
      "Nettverkssegmentering",
      "CISA KEV-overvåking",
      "Penetrasjonstesting årlig",
    ],
    mitigations: [
      "Sårbarhetsskanning", "Rask patching", "Virtual patching", "Segmentering", "Pen-test"
    ],
    relevantFlags: ["internet", "critical_infrastructure", "health_data"],
    exposureMultiplier: { internet: 1.5, helsenett: 1.0, internal: 0.5 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 8. Innsidertrussel
  {
    id: "insider_threat",
    category: "Innsidertrussel",
    name: "Ondsinnet eller uaktsom innsider",
    description: "Ansatte som bevisst eller ubevisst forårsaker sikkerhetshendelse",
    vulnerabilityDescription: "Ansatte med bred tilgang, utilstrekkelig logging, eller manglende kontroller kan misbruke tilgang.",
    consequenceDescription: "Datatyveri, sabotasje, eller utilsiktet eksponering av sensitive data.",
    technicalDetails: "34% av databrudd involverer innsidere (Verizon DBIR). Helsepersonell trenger bred tilgang for å utføre jobben, noe som øker risikoen.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 2,
    baseConsequence: 2,
    probabilityFactors: ["Bred tilgang", "Manglende logging", "Utilfredse ansatte", "Ingen UEBA"],
    consequenceFactors: ["Tilgang til mange pasienter", "Administrative rettigheter", "Manglende segmentering"],
    existingMeasures: [
      "Tilgangsstyring basert på rolle",
      "Logging av systemtilgang",
      "Arbeidsreglement",
    ],
    additionalMeasures: [
      "User Entity Behavior Analytics (UEBA)",
      "Prinsipp om minste privilegium",
      "Logging av all datatilgang med varsling",
      "Regelmessig tilgangsgjennomgang",
      "Strukturert offboarding-prosess",
      "Bakgrunnssjekk ved ansettelse",
    ],
    mitigations: [
      "UEBA", "Minste privilegium", "Logging", "Tilgangsgjennomgang", "Offboarding"
    ],
    relevantFlags: ["health_data", "patient_identifiable"],
    exposureMultiplier: { internet: 1.0, helsenett: 1.0, internal: 1.0 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 9. Medisinsk utstyr
  {
    id: "medical_device",
    category: "Medisinsk utstyr",
    name: "Kompromittert medisinsk utstyr (IoMT)",
    description: "Angrep mot nettverkstilkoblet medisinsk utstyr",
    vulnerabilityDescription: "Medisinsk utstyr med begrenset sikkerhetsfunksjonalitet, lang livssyklus, og sjelden oppdatering eksponert på nettverk.",
    consequenceDescription: "Utstyrssvikt kan påvirke pasientbehandling. Dataeksfiltrering fra enheter. Springbrett til videre angrep.",
    technicalDetails: "53% av IoMT-enheter har kjente sårbarheter. Infusjonspumper, MR-maskiner, pacemakere har vist sårbarheter. FDA-varsler om IoMT-sikkerhet øker.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Mange IoMT-enheter", "Flat nettverksstruktur", "Legacy-utstyr", "Manglende inventar"],
    consequenceFactors: ["Livsopprettholdende utstyr", "Pasientdata på enheten", "Mange pasienter påvirkes"],
    existingMeasures: [
      "Utstyrsinventar delvis på plass",
      "Vedlikeholdsavtaler",
      "Nettverksovervåking",
    ],
    additionalMeasures: [
      "Dedikert IoMT-nettverk (VLAN-segmentering)",
      "Komplett IoMT-inventar med sårbarhetsinfo",
      "Sikkerhetskrav i anskaffelser",
      "Passiv nettverksovervåking (NAC)",
      "Leverandørkrav til sikkerhet og patching",
      "Risikovurdering før tilkobling",
    ],
    mitigations: [
      "Segmentering", "IoMT-inventar", "Sikkerhetskrav", "NAC", "Risikovurdering"
    ],
    relevantFlags: ["critical_system", "health_data", "patient_identifiable"],
    exposureMultiplier: { internet: 1.3, helsenett: 1.1, internal: 0.9 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 10. Backup-svikt
  {
    id: "backup_failure",
    category: "Kontinuitet",
    name: "Backup-svikt ved hendelse",
    description: "Backup er utilgjengelig, inkomplett, eller korrupt ved behov for gjenoppretting",
    vulnerabilityDescription: "Backup på samme nettverk som produksjon, manglende testing, eller for lange intervaller gjør backup sårbar.",
    consequenceDescription: "Permanent datatap ved ransomware eller systemfeil. Langvarig nedetid. Kan true virksomhetens eksistens.",
    technicalDetails: "Ransomware målretter aktivt backup-systemer. 37% av gjenopprettingsforsøk feiler. RTO/RPO ofte ikke testet under reelle forhold.",
    ciaImpact: { confidentiality: false, integrity: true, availability: true },
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Backup på samme nettverk", "Manglende testing", "Lange backup-intervaller", "Ingen immutable backup"],
    consequenceFactors: ["Kritisk system", "Mye data", "Lang akseptabel nedetid"],
    existingMeasures: [
      "Daglig backup kjører",
      "Backup til ekstern lokasjon",
      "Backup-monitorering",
    ],
    additionalMeasures: [
      "3-2-1-1 backup-strategi (inkl. immutable)",
      "Offline/air-gapped backup",
      "Kvartalsvis gjenopprettingstesting",
      "Dokumentert RTO/RPO per system",
      "Ransomware-resistent backup-løsning",
      "Kryptert backup med separat nøkkelhåndtering",
    ],
    mitigations: [
      "3-2-1-1 backup", "Immutable backup", "Testing", "RTO/RPO", "Offline backup"
    ],
    relevantFlags: ["critical_system", "health_data"],
    exposureMultiplier: { internet: 1.0, helsenett: 1.0, internal: 1.0 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 11. API-sikkerhet
  {
    id: "api_security",
    category: "Applikasjonssikkerhet",
    name: "API-sårbarheter og misbruk",
    description: "Utnyttelse av usikre eller feilkonfigurerte API-er",
    vulnerabilityDescription: "Manglende autentisering, autorisasjon, eller rate limiting på API-endepunkter. Eksponering av sensitive data.",
    consequenceDescription: "Massiv datahøsting, uautorisert tilgang til funksjoner, eller tjenestenekt.",
    technicalDetails: "OWASP API Security Top 10. Broken Object Level Authorization (BOLA) er vanligste sårbarhet. Helse-API-er (FHIR, HL7) krever spesiell sikring.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Mange API-er", "Manglende API-gateway", "Ingen rate limiting", "Legacy-API-er"],
    consequenceFactors: ["API-er eksponerer pasientdata", "Integrasjon med kritiske systemer"],
    existingMeasures: [
      "API-autentisering (API-nøkler)",
      "HTTPS påkrevd",
      "Grunnleggende logging",
    ],
    additionalMeasures: [
      "API Gateway med autentisering og rate limiting",
      "OAuth 2.0/OIDC for autorisasjon",
      "API-spesifikk WAF-beskyttelse",
      "Regelmessig API-sikkerhetstesting",
      "API-inventar og dokumentasjon",
      "Versjonering og deprecation-policy",
    ],
    mitigations: [
      "API Gateway", "OAuth 2.0", "WAF", "API-testing", "Inventar"
    ],
    relevantFlags: ["internet", "helsenett", "health_data", "extensive_integration"],
    exposureMultiplier: { internet: 1.4, helsenett: 1.2, internal: 0.7 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 12. Cloud-feilkonfigurasjon
  {
    id: "cloud_misconfiguration",
    category: "Skysikkerhet",
    name: "Feilkonfigurert skytjeneste",
    description: "Sensitiv data eksponert gjennom feilkonfigurerte skytjenester",
    vulnerabilityDescription: "Åpne S3-buckets, feilkonfigurerte tilganger, eller manglende kryptering i skytjenester.",
    consequenceDescription: "Offentlig eksponering av sensitive data. Brudd på GDPR og Normen. Betydelig omdømmeskade.",
    technicalDetails: "Skyfeilkonfigurasjon er involvert i 15% av databrudd. Azure, AWS og GCP har komplekse tilgangsmodeller som ofte feilkonfigureres.",
    ciaImpact: { confidentiality: true, integrity: false, availability: false },
    baseProbability: 2,
    baseConsequence: 3,
    probabilityFactors: ["Mye skybruk", "Kompleks konfigurasjon", "Manglende sky-kompetanse", "Ingen CSPM"],
    consequenceFactors: ["Helseopplysninger i sky", "Mange tjenester", "Offentlig eksponert"],
    existingMeasures: [
      "Grunnleggende IAM-konfigurasjon",
      "Kryptering aktivert",
      "Noe logging",
    ],
    additionalMeasures: [
      "Cloud Security Posture Management (CSPM)",
      "Infrastructure as Code med sikkerhetsskanning",
      "Minste privilegium IAM-policy",
      "Regelmessig konfigurasjonsgjennnomgang",
      "Cloud Access Security Broker (CASB)",
      "Automatisert compliance-sjekking",
    ],
    mitigations: [
      "CSPM", "IaC-sikkerhet", "IAM-review", "CASB", "Compliance-sjekk"
    ],
    relevantFlags: ["health_data", "internet", "high_confidentiality"],
    exposureMultiplier: { internet: 1.3, helsenett: 0.8, internal: 0.5 },
    mitigationEffect: { probabilityReduction: 2, consequenceReduction: 1 },
  },

  // 13. Manglende logging/deteksjon
  {
    id: "detection_gap",
    category: "Deteksjon",
    name: "Manglende logging og deteksjonsevne",
    description: "Sikkerhetshendelser oppdages ikke eller for sent",
    vulnerabilityDescription: "Utilstrekkelig logging, ingen sentral logganalyse (SIEM), eller manglende varsling ved anomalier.",
    consequenceDescription: "Angripere opererer uoppdaget over lang tid. Større skadeomfang. Vanskelig etterforskning.",
    technicalDetails: "Gjennomsnittlig tid til oppdagelse (MTTD): 207 dager. Angrep oppdages ofte av eksterne parter. Log4j-lignende sårbarheter krever rask deteksjon.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 3,
    baseConsequence: 2,
    probabilityFactors: ["Ingen SIEM/SOAR", "Begrenset logging", "Ingen 24/7 overvåking", "For mange varsler (alert fatigue)"],
    consequenceFactors: ["Kritiske systemer", "Sensitive data", "Regulatoriske krav til logging"],
    existingMeasures: [
      "Lokal logging på systemer",
      "Brannmurlogging",
      "Manuell gjennomgang ved hendelser",
    ],
    additionalMeasures: [
      "Sentral SIEM-løsning med korrelering",
      "SOAR for automatisert respons",
      "24/7 SOC (intern eller managed)",
      "Use cases for helsespesifikke trusler",
      "Threat hunting-kapasitet",
      "Regelmessig logganalyse-review",
    ],
    mitigations: [
      "SIEM", "SOAR", "SOC", "Threat hunting", "Use cases"
    ],
    relevantFlags: ["health_data", "critical_system", "critical_infrastructure"],
    exposureMultiplier: { internet: 1.2, helsenett: 1.1, internal: 1.0 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 14. Fysisk sikkerhet
  {
    id: "physical_security",
    category: "Fysisk sikkerhet",
    name: "Fysisk tilgang til kritisk infrastruktur",
    description: "Uautorisert fysisk tilgang til serverrom, nettverksutstyr, eller klienter",
    vulnerabilityDescription: "Mangelfull adgangskontroll, ingen logging av fysisk tilgang, eller usikrede enheter.",
    consequenceDescription: "Direkte tilgang til systemer omgår mange logiske kontroller. Datatyveri eller sabotasje.",
    technicalDetails: "USB Rubber Ducky, Raspberry Pi implants, eller direkte disktilgang kan kompromittere systemer raskt. Sosial manipulering for fysisk tilgang er effektivt.",
    ciaImpact: { confidentiality: true, integrity: true, availability: true },
    baseProbability: 2,
    baseConsequence: 2,
    probabilityFactors: ["Mange lokasjoner", "Besøkende med tilgang", "Manglende adgangskontroll"],
    consequenceFactors: ["Serverrom tilgjengelig", "Ukrypterte disker", "USB tillatt"],
    existingMeasures: [
      "Låste serverrom",
      "Besøksregistrering",
      "Adgangskort-system",
    ],
    additionalMeasures: [
      "Logging av all fysisk tilgang til kritiske områder",
      "Video-overvåking med oppbevaring",
      "Disk-kryptering (BitLocker/FileVault)",
      "USB-port blokkering",
      "Besøkspolicy med eskortekrav",
      "Regelmessig fysisk sikkerhetsgjennomgang",
    ],
    mitigations: [
      "Adgangslogging", "Video", "Disk-kryptering", "USB-blokkering", "Besøkspolicy"
    ],
    relevantFlags: ["critical_infrastructure", "health_data"],
    exposureMultiplier: { internet: 0.8, helsenett: 1.0, internal: 1.2 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },

  // 15. Tredjeparts skyrisiko
  {
    id: "third_party_cloud",
    category: "Tredjeparts risiko",
    name: "Hendelse hos skyleverandør",
    description: "Sikkerhetshendelse eller nedetid hos tredjeparts skyleverandør",
    vulnerabilityDescription: "Avhengighet av enkelt skyleverandør uten redundans eller exit-strategi.",
    consequenceDescription: "Utilgjengelighet av kritiske tjenester. Mulig dataeksponering ved leverandørbrudd.",
    technicalDetails: "Microsoft 365, Epic i sky, skybaserte lab-systemer. Store hendelser: Azure AD-nedetid, LastPass-brudd. Viktig med shared responsibility-forståelse.",
    ciaImpact: { confidentiality: true, integrity: false, availability: true },
    baseProbability: 2,
    baseConsequence: 2,
    probabilityFactors: ["Stor skyavhengighet", "Enkeltleverandør", "Kritiske tjenester i sky"],
    consequenceFactors: ["Ingen plan B", "Mye data hos leverandør", "Kritisk for drift"],
    existingMeasures: [
      "SLA-avtaler",
      "Leverandørovervåking",
      "Databehandleravtale",
    ],
    additionalMeasures: [
      "Multi-cloud eller hybrid strategi for kritiske tjenester",
      "Regelmessig leverandørsikkerhetsreview",
      "Exit-strategi og dataportabilitet",
      "Lokal backup av skydata",
      "Hendelsesresponsplan for leverandørnedetid",
      "Shared responsibility-dokumentasjon",
    ],
    mitigations: [
      "Multi-cloud", "Exit-strategi", "Lokal backup", "Leverandør-review", "Hendelsesplan"
    ],
    relevantFlags: ["critical_system", "health_data"],
    exposureMultiplier: { internet: 1.1, helsenett: 1.0, internal: 0.8 },
    mitigationEffect: { probabilityReduction: 1, consequenceReduction: 1 },
  },
]

// Hjelpefunksjon for å sjekke om et svar inneholder en verdi
function answerIncludes(answer: string | string[] | undefined, value: string): boolean {
  if (!answer) return false
  if (Array.isArray(answer)) return answer.includes(value)
  return answer === value
}

// Funksjon for å beregne risiko basert på klassifiseringssvar
export function calculateRiskAssessment(
  answers: Record<string, string | string[]>,
  flags: string[],
  exposure: "internet" | "helsenett" | "internal"
): RiskAssessment[] {
  const assessments: RiskAssessment[] = []

  // Utled implisitte flagg for helsesektoren - de fleste systemer i helse behandler helseopplysninger
  const impliedFlags = new Set(flags)

  // Legg til health_data hvis det sannsynligvis er et helsesystem
  if (flags.includes("normen_required") || flags.includes("patient_identifiable")) {
    impliedFlags.add("health_data")
  }

  // Legg til exposure-relaterte flagg
  if (exposure === "internet") {
    impliedFlags.add("internet")
    impliedFlags.add("public_facing")
  } else if (exposure === "helsenett") {
    impliedFlags.add("helsenett")
  }

  // I helsesektoren er de fleste systemer kritiske på et eller annet nivå
  if (flags.includes("critical_system") || flags.includes("critical_infrastructure")) {
    impliedFlags.add("critical_infrastructure")
    impliedFlags.add("critical_system")
  }

  const allFlags = Array.from(impliedFlags)

  for (const scenario of threatScenarios) {
    // Mer inkluderende relevansvurdering
    // Inkluder scenario hvis:
    // 1. Det ikke har noen spesifikke flagg-krav (alltid relevant)
    // 2. Minst ett av scenariets flagg matcher brukerens flagg/eksponering
    // 3. Scenariet er generelt relevant for helsesektoren (health_data flagg matcher)
    const isRelevant =
      scenario.relevantFlags.length === 0 ||
      scenario.relevantFlags.some(flag =>
        allFlags.includes(flag) ||
        exposure === flag
      ) ||
      // Alltid inkluder scenariene som er universelt relevante i helsesektoren
      scenario.relevantFlags.includes("health_data") ||
      scenario.relevantFlags.includes("critical_system")

    if (!isRelevant) continue

    // Juster sannsynlighet basert på eksponering
    let adjustedProbability = scenario.baseProbability * scenario.exposureMultiplier[exposure]

    // Juster basert på svar (støtter både enkeltvalg og multi-selekt)
    if (answerIncludes(answers["data_type"], "health") || answerIncludes(answers["data_type"], "classified")) {
      adjustedProbability *= 1.2
    }
    if (answerIncludes(answers["integration"], "critical_hub") || answerIncludes(answers["integration"], "extensive")) {
      adjustedProbability *= 1.1
    }
    if (answerIncludes(answers["user_base"], "public") || answerIncludes(answers["user_base"], "patients")) {
      adjustedProbability *= 1.1
    }

    adjustedProbability = Math.min(4, Math.max(1, Math.round(adjustedProbability)))

    // Juster konsekvens
    let adjustedConsequence: number = scenario.baseConsequence

    if (answerIncludes(answers["infrastructure_impact"], "critical")) {
      adjustedConsequence = 3
    } else if (answerIncludes(answers["infrastructure_impact"], "significant") && adjustedConsequence < 3) {
      adjustedConsequence = Math.min(3, adjustedConsequence + 1)
    }

    if (answerIncludes(answers["confidentiality_impact"], "severe") || answerIncludes(answers["confidentiality_impact"], "national")) {
      adjustedConsequence = 3
    }

    if (flags.includes("health_data") || flags.includes("patient_identifiable")) {
      adjustedConsequence = Math.max(adjustedConsequence, 2)
    }

    adjustedConsequence = Math.min(3, Math.max(1, Math.round(adjustedConsequence)))

    // Beregn risikoscore før tiltak
    const riskScore = adjustedProbability * adjustedConsequence

    // Beregn risiko etter tiltak
    const mitigatedProbability = Math.max(1, adjustedProbability - scenario.mitigationEffect.probabilityReduction)
    const mitigatedConsequence = Math.max(1, adjustedConsequence - scenario.mitigationEffect.consequenceReduction)
    const mitigatedRiskScore = mitigatedProbability * mitigatedConsequence

    // Bestem risikonivå
    const getRiskLevel = (score: number): "low" | "medium" | "high" | "critical" => {
      if (score <= 3) return "low"
      if (score <= 6) return "medium"
      if (score <= 9) return "high"
      return "critical"
    }

    assessments.push({
      scenario,
      adjustedProbability,
      adjustedConsequence,
      riskScore,
      riskLevel: getRiskLevel(riskScore),
      mitigatedProbability,
      mitigatedConsequence,
      mitigatedRiskScore,
      mitigatedRiskLevel: getRiskLevel(mitigatedRiskScore),
      applicableExistingMeasures: scenario.existingMeasures,
      applicableAdditionalMeasures: scenario.additionalMeasures,
      applicableMitigations: scenario.mitigations,
    })
  }

  return assessments.sort((a, b) => b.riskScore - a.riskScore)
}

// Funksjon for å generere risikomatrise-data
export function generateRiskMatrix(assessments: RiskAssessment[]): number[][] {
  const matrix: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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

// Hjelpefunksjoner for farger
export function getRiskColor(score: number): string {
  if (score <= 3) return "green"
  if (score <= 6) return "yellow"
  if (score <= 9) return "orange"
  return "red"
}

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

export function getCIALabel(cia: CIAImpact): string {
  const parts: string[] = []
  if (cia.confidentiality) parts.push("K")
  if (cia.integrity) parts.push("I")
  if (cia.availability) parts.push("T")
  return parts.join(", ")
}
