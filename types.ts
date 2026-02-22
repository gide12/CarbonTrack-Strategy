
export interface AnalysisSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  metrics?: { label: string; value: string; color: string }[];
}

export enum SectionType {
  // Company Persona Sections
  ACCOUNTING = 'accounting',
  CALCULATOR = 'calculator',
  COMPLIANCE = 'compliance',
  REDUCTION = 'reduction',
  WALLET = 'wallet',
  
  // Government Persona Sections
  REGISTRY = 'registry',
  REGULATOR_TOOLS = 'regulator_tools',
  POLICY_SIM = 'policy_sim',
  PRICE_PREDICTION = 'price_prediction',
  
  // Legacy/Other Sections
  FIT = 'fit',
  TECHNICAL = 'technical',
  COMPETITIVE = 'competitive',
  MONETIZATION = 'monetization',
  INDONESIA = 'indonesia',
  SCALABILITY = 'scalability',
  REDUCE = 'reduce',
  PCF = 'pcf',
  SCOPES = 'scopes',
  ESG_COMPLIANCE = 'esg_compliance',
  VELOCITY = 'velocity'
}

export enum UserPersona {
  COMPANY = 'company',
  GOVERNMENT = 'government',
  NONE = 'none'
}

export enum Language {
  EN = 'en',
  ID = 'id'
}
