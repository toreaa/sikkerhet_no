"use client"

import { parseLegalBasis } from "@/data/legal-links"
import { ExternalLink } from "lucide-react"

interface LegalBasisLinksProps {
  legalBasis: string
}

export function LegalBasisLinks({ legalBasis }: LegalBasisLinksProps) {
  const parsed = parseLegalBasis(legalBasis)

  return (
    <span className="inline-flex flex-wrap gap-x-1 gap-y-0.5">
      <span className="font-medium">Hjemmel:</span>
      {parsed.map((item, index) => (
        <span key={index}>
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              {item.text}
              <ExternalLink className="h-3 w-3" />
            </a>
          ) : (
            <span>{item.text}</span>
          )}
          {index < parsed.length - 1 && <span>,</span>}
        </span>
      ))}
    </span>
  )
}
