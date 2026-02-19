
export interface AnalysisSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  metrics?: { label: string; value: string; color: string }[];
}

export enum SectionType {
  FIT = 'fit',
  TECHNICAL = 'technical',
  COMPETITIVE = 'competitive',
  MONETIZATION = 'monetization',
  INDONESIA = 'indonesia',
  SCALABILITY = 'scalability',
  REDUCE = 'reduce',
  PCF = 'pcf',
  SCOPES = 'scopes'
}
