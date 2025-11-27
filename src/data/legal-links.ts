// Mapping av hjemmel-referanser til URL-er
export const legalLinks: Record<string, { url: string; label: string }> = {
  // NSM Grunnprinsipper
  "NSM 1.1": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/identifisere-og-kartlegge/kartlegg-styringsstruktur-leveranser-og-undersottende-systemer/",
    label: "NSM 1.1",
  },
  "NSM 2.1": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/ivareta-sikkerhet-i-anskaffelses-og-utviklingsprosesser/",
    label: "NSM 2.1",
  },
  "NSM 2.3": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/ivareta-en-sikker-konfigurasjon/",
    label: "NSM 2.3",
  },
  "NSM 2.4": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/beskytt-virksomhetens-nettverk/",
    label: "NSM 2.4",
  },
  "NSM 2.6": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/ha-kontroll-pa-identiteter-og-tilganger/",
    label: "NSM 2.6",
  },
  "NSM 2.7": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/beskytt-data-i-ro-og-i-transitt/",
    label: "NSM 2.7",
  },
  "NSM 2.9": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/etabler-evne-til-gjenoppretting-av-data/",
    label: "NSM 2.9",
  },
  "NSM 2.10": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/beskytte-og-opprettholde/integrer-sikkerhet-i-prosess-for-endringshandtering/",
    label: "NSM 2.10",
  },
  "NSM 3.1": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/oppdage/oppdag-og-fjern-kjente-sarbarheter-og-trusler/",
    label: "NSM 3.1",
  },
  "NSM 3.2": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/oppdage/etabler-sikkerhetsovervakning/",
    label: "NSM 3.2",
  },
  "NSM 3.4": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/oppdage/gjennomfor-inntrengningstester/",
    label: "NSM 3.4",
  },
  "NSM 4.1": {
    url: "https://nsm.no/regelverk-og-hjelp/rad-og-anbefalinger/grunnprinsipper-for-ikt-sikkerhet/handtere-og-gjenopprette/forbered-virksomheten-pa-handtering-av-hendelser/",
    label: "NSM 4.1",
  },

  // Normen faktaark
  "Normen Faktaark 14": {
    url: "https://www.helsedirektoratet.no/normen/tilgangsstyring-faktaark-14",
    label: "Normen Faktaark 14",
  },
  "Normen Faktaark 15": {
    url: "https://www.helsedirektoratet.no/normen/logging-og-innsyn-i-logg-faktaark-15",
    label: "Normen Faktaark 15",
  },
  "Normen Faktaark 24": {
    url: "https://www.helsedirektoratet.no/normen/kommunikasjon-over-apne-nett-faktaark-24",
    label: "Normen Faktaark 24",
  },
  "Normen Faktaark 37": {
    url: "https://www.ehelse.no/normen/normen-dokumenter/sikkerhetskrav-og-sikkerhetsdokumentasjon-i-ikt-prosjekter-faktaark-37",
    label: "Normen Faktaark 37",
  },
  "Normen": {
    url: "https://www.helsedirektoratet.no/normen/norm-for-informasjonssikkerhet-og-personvern-i-helse-og-omsorgssektoren",
    label: "Normen",
  },

  // NIS2
  "NIS2": {
    url: "https://www.regjeringen.no/no/sub/eos-notatbasen/notatene/2021/feb/nis2-direktivet/id2846097/",
    label: "NIS2",
  },
  "NIS2 Art. 21": {
    url: "https://www.regjeringen.no/no/sub/eos-notatbasen/notatene/2021/feb/nis2-direktivet/id2846097/",
    label: "NIS2 Art. 21",
  },

  // GDPR
  "GDPR Art. 32": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-15-38/*#KAPITTEL_gdpr-4",
    label: "GDPR Art. 32",
  },
  "GDPR Art. 35": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-15-38/*#KAPITTEL_gdpr-4",
    label: "GDPR Art. 35",
  },
  "GDPR Art. 28": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-15-38/*#KAPITTEL_gdpr-4",
    label: "GDPR Art. 28",
  },
  "GDPR Art. 6 og 9": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-15-38/*#KAPITTEL_gdpr-2-2",
    label: "GDPR Art. 6 og 9",
  },

  // Pasientjournalforskriften
  "Pasientjournalforskriften § 14": {
    url: "https://lovdata.no/dokument/SF/forskrift/2019-03-01-168/KAPITTEL_3#%C2%A714",
    label: "Pasientjournalforskriften § 14",
  },

  // Helsepersonelloven
  "Helsepersonelloven": {
    url: "https://lovdata.no/dokument/NL/lov/1999-07-02-64",
    label: "Helsepersonelloven",
  },

  // Sikkerhetsloven
  "Sikkerhetsloven": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-01-24",
    label: "Sikkerhetsloven",
  },
  "Sikkerhetsloven § 8-1": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-01-24/KAPITTEL_8#%C2%A78-1",
    label: "Sikkerhetsloven § 8-1",
  },
  "Sikkerhetsloven § 9-3": {
    url: "https://lovdata.no/dokument/NL/lov/2018-06-01-24/KAPITTEL_9#%C2%A79-3",
    label: "Sikkerhetsloven § 9-3",
  },

  // Virksomhetssikkerhetsforskriften
  "Virksomhetssikkerhetsforskriften": {
    url: "https://lovdata.no/dokument/SF/forskrift/2018-12-20-2053",
    label: "Virksomhetssikkerhetsforskriften",
  },
  "Virksomhetssikkerhetsforskriften § 35": {
    url: "https://lovdata.no/dokument/SF/forskrift/2018-12-20-2053/KAPITTEL_6#%C2%A735",
    label: "Virksomhetssikkerhetsforskriften § 35",
  },
  "Virksomhetssikkerhetsforskriften §§ 28-31": {
    url: "https://lovdata.no/dokument/SF/forskrift/2018-12-20-2053/KAPITTEL_7",
    label: "Virksomhetssikkerhetsforskriften §§ 28-31",
  },

  // NHN
  "NHN-krav": {
    url: "https://www.nhn.no/for-leverandorer/bli-godkjent",
    label: "NHN-krav",
  },
}

// Funksjon for å parse hjemmel-streng og returnere lenker
export function parseLegalBasis(legalBasisString: string): Array<{ text: string; url?: string }> {
  const parts = legalBasisString.split(/,\s*/)

  return parts.map((part) => {
    const trimmed = part.trim()

    // Sjekk om vi har en eksakt match
    if (legalLinks[trimmed]) {
      return { text: trimmed, url: legalLinks[trimmed].url }
    }

    // Sjekk om noen av nøklene er inneholdt i teksten
    for (const [key, value] of Object.entries(legalLinks)) {
      if (trimmed.includes(key) || key.includes(trimmed)) {
        return { text: trimmed, url: value.url }
      }
    }

    // Ingen match funnet
    return { text: trimmed }
  })
}
