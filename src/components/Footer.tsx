import { AlertTriangle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-muted-foreground text-sm">
              Ansvarsfraskrivelse
            </h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
              Denne veilederen er ment som et hjelpemiddel og erstatter ikke juridisk
              rådgivning eller formell compliance-vurdering. Kontakt relevante myndigheter
              eller rådgivere for bindende vurderinger av din organisasjons etterlevelse.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} IKT-sikkerhet Helse. Basert på gjeldende lovverk og retningslinjer.
        </div>
      </div>
    </footer>
  )
}
