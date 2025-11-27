export type ExposureType = "internet" | "helsenett"
export type GradingLevel = 1 | 2 | 3 | 4

export interface Measure {
  id: string
  name: string
  description: string
  legal_basis: string
  required: boolean
  category: "technical" | "organizational"
}

export interface LegalRequirement {
  id: string
  name: string
  source: string
  url: string
  description: string
}

export interface GradingInfo {
  level: GradingLevel
  name: string
  description: string
  examples: string[]
  legalBasis: string[]
}

export interface ExposureInfo {
  type: ExposureType
  name: string
  description: string
  riskLevel: string
}
