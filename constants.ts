import { AnalysisSection, SectionType } from './types';

export const INITIAL_ANALYSIS_DATA: AnalysisSection[] = [
  {
    id: SectionType.FIT,
    title: "Product & Climate Fit",
    icon: "fa-leaf",
    summary: "Comprehensive Scope 1, 2, and 3 carbon accounting with specialized methodologies for industrial transition.",
    metrics: [
      { label: "Scope Coverage", value: "1, 2, 3", color: "text-emerald-600" },
      { label: "Audit Readiness", value: "High", color: "text-blue-600" }
    ],
    details: [
      "Scope 1 Tracking: Direct emissions from fuel combustion (stationary/mobile) and refrigerants. Logic uses GHG Protocol emission factors based on fuel type and volume.",
      "Scope 2 Tracking: Indirect emissions from purchased electricity/heat. Supports both Location-based and Market-based (RECs/I-RECs) reporting methods.",
      "Scope 3 Strategy: Focuses on Category 1 (Purchased Goods) and Category 4 (Upstream Logistics). Implements a hybrid approach: Spend-based proxies for initial assessment, transitioning to Activity-based for high-impact suppliers.",
      "Market Differentiator: 'Supply Chain Network Effect'—Sub-tier suppliers receive free basic accounts to submit primary data directly, eliminating Scope 3 data gaps that competitors solve with inaccurate industry averages.",
      "Regulatory Fit: Native support for OJK 51 (ID), EU CSRD, and CBAM, positioning the platform as a bridge for exporters into the European market."
    ]
  },
  {
    id: SectionType.SCOPES,
    title: "Advanced GHG Scopes",
    icon: "fa-diagram-project",
    summary: "Audit-grade organizational carbon inventory mapped to the Corporate Value Chain Standard.",
    metrics: [
      { label: "S3 Categories", value: "All 15", color: "text-emerald-600" },
      // Fixed: Merged 'label2' into 'label' to match AnalysisSection interface
      { label: "Reporting (Dual S2)", value: "Supported", color: "text-blue-600" }
    ],
    details: [
      "Scope 1 Granularity: Mobile combustion, stationary combustion, process emissions, and fugitive leaks calculated at the asset level.",
      "Scope 2 Methodology: Automated switch between Location-based (regional grid factors) and Market-based (contract-specific emission rates) for high-fidelity reporting.",
      "Scope 3 Depth: Comprehensive tracking for Upstream (Category 1-8) and Downstream (Category 9-15) activities, ensuring no carbon blind spots.",
      "Consolidation Approach: Flexible boundary definition supporting Financial Control, Operational Control, and Equity Share logic."
    ]
  },
  {
    id: SectionType.PCF,
    title: "Product Carbon Footprint (PCF)",
    icon: "fa-box-open",
    summary: "Unit-level LCA quantification aligned with ISO 14067 and GHG Protocol Product Standards.",
    metrics: [
      { label: "Standard", value: "ISO 14067", color: "text-emerald-600" },
      { label: "Precision", value: "LCA-Grade", color: "text-blue-600" }
    ],
    details: [
      "ISO 14067 Compliance: Follows requirements for quantification and reporting of greenhouse gas emissions throughout the life cycle of a product.",
      "Boundary Selection: Supports both 'Cradle-to-Gate' (B2B) and 'Cradle-to-Grave' (B2C) assessment boundaries.",
      "Inventory Analysis: Captures raw material extraction, manufacturing energy, logistics, retail, use-phase electricity, and end-of-life recycling/disposal.",
      "Functional Unit: Customizable functional units (e.g., per kg, per item, per service hour) to ensure meaningful comparisons and labels."
    ]
  },
  {
    id: SectionType.TECHNICAL,
    title: "Technical Review",
    icon: "fa-microchip",
    summary: "Transitioning to a GHG/ISO compliant architecture with automated auditing logs.",
    metrics: [
      { label: "GHG Alignment", value: "Full", color: "text-emerald-600" },
      { label: "ISO 14064", value: "Ready", color: "text-amber-600" }
    ],
    details: [
      "GHG Protocol Integration: Automated 'Organizational Boundary' setup (Equity vs Control share) and base-year recalibration logic for mergers/acquisitions.",
      "ISO 14064-1 Compliance: Implementation of 'Audit-Ready Data Logs' where every data point is timestamped with evidence attachments, drastically reducing external audit costs.",
      "Uncertainty Analysis: New module to calculate and report data quality indicators and statistical uncertainty, a mandatory requirement for high-level ISO compliance.",
      "API First Strategy: Real-time syncing with IoT meters (Scope 2) and ERP systems (Scope 1/3) to eliminate manual 'Human-in-the-loop' errors.",
      "Scalability: Multi-entity hierarchy supporting thousands of subsidiaries with localized emission factor overrides."
    ]
  },
  {
    id: SectionType.REDUCE,
    title: "Reduction Optimizer",
    icon: "fa-wand-magic-sparkles",
    summary: "AI-powered engine generating actionable decarbonization pathways based on emission profiles.",
    metrics: [
      { label: "AI Precision", value: "94%", color: "text-emerald-600" },
      { label: "ROI Modeling", value: "Integrated", color: "text-blue-600" }
    ],
    details: [
      "Feature Concept: The 'Decarbonization Planner' add-on converts raw carbon data into a phased reduction roadmap.",
      "Methodology: Uses sector-specific benchmarks (SBTi aligned) to identify hotspots and suggest interventions.",
      "Value Proposition: Shifts the platform from a 'Reporting Tool' to a 'Strategy Partner', significantly increasing user retention and Enterprise LTV.",
      "Actionable Outputs: Generates specific CAPEX/OPEX estimates for solar transition, fleet electrification, and supply chain re-routing."
    ]
  },
  {
    id: SectionType.COMPETITIVE,
    title: "Competitive Positioning",
    icon: "fa-trophy",
    summary: "Localized expertise vs Global generalized platforms.",
    metrics: [
      { label: "Regional Moat", value: "Strong", color: "text-emerald-600" },
      { label: "Price/Value", value: "Optimal", color: "text-blue-600" }
    ],
    details: [
      "Vs Watershed/Perspectives: Ecotrack Pro wins on localized emission factor databases (PLN Grid intensity, regional fuel types) and lower implementation costs for SMEs.",
      "Strategic Niche: The 'Carbon Compliance Gateway' for Indonesian conglomerates needing to report to both local OJK and international stakeholders.",
      "Supply Chain Focus: Leveraging the Indonesian manufacturing base to create a dense network of primary supplier data that global tools lack access to."
    ]
  },
  {
    id: SectionType.MONETIZATION,
    title: "Monetization Strategy",
    icon: "fa-sack-dollar",
    summary: "Tiered SaaS model combining subscription stability with usage-based upside.",
    metrics: [
      { label: "SME Price", value: "€499/mo", color: "text-slate-600" },
      { label: "Corp Price", value: "€2,450/mo", color: "text-emerald-600" }
    ],
    details: [
      "SME Tier (€499/mo): Scope 1 & 2 only, CSV imports, standard GHG report templates, 1 entity. Ideal for small local manufacturers.",
      "Corporate Tier (€2,450/mo): Full Scope 1-3 (limited categories), API/ERP integration (SAP/Oracle), CSRD/OJK dashboards, 5 user seats. Usage-based: €0.10 per transaction beyond 5k.",
      "Enterprise Tier (€8,000+ custom): Unlimited entities, Supplier Portal (Network Effect), dedicated Sustainability Success Manager, SSO, and White-labeling options.",
      "Premium Add-ons: AI Decarbonization Planner (€600/mo add-on) for scenario modeling, and 'One-Click Audit Export' (€2,000 one-off) which generates auditor-formatted PDF/XBRL packs.",
      "Consulting Upsell: Partnership with local ESG boutique firms for 'Software-Led Consulting' where Ecotrack Pro takes a 20% platform fee."
    ]
  },
  {
    id: SectionType.INDONESIA,
    title: "Indonesia Strategy",
    icon: "fa-flag",
    summary: "Deep integration with national climate infrastructure and carbon tax frameworks.",
    metrics: [
      { label: "SRN PPI Sync", value: "Planned", color: "text-emerald-600" },
      { label: "Carbon Tax Fit", value: "Active", color: "text-purple-600" }
    ],
    details: [
      "National Registry (SRN PPI): Future-proofed to push verified emissions data directly to government databases for Carbon Tax credit verification.",
      "Green Deal Alignment: Supports the JETP (Just Energy Transition Partnership) by providing transparency to coal-reliant industries transitioning to renewables.",
      "Partnership Strategy: Collaborate with Mandiri/BCA to offer 'Green Loans' to clients who maintain high data quality scores on Ecotrack Pro.",
      "SEA Expansion: Using Indonesia as a laboratory for the Vietnam and Thailand manufacturing corridors."
    ]
  },
  {
    id: SectionType.SCALABILITY,
    title: "Scalability Plan",
    icon: "fa-rocket",
    summary: "Aggressive ARR growth fueled by supply chain data requirements.",
    metrics: [
      { label: "ARR Goal", value: "€10M", color: "text-emerald-600" },
      { label: "CAC/LTV", value: "1:5", color: "text-blue-600" }
    ],
    details: [
      "Phase 1 (Months 0-6): Secure 30 Indonesian industrial pilots. Focus: Data automation and OJK 51 reporting perfection.",
      "Phase 2 (Months 6-12): Launch Supplier Portal. Capture 500+ SME 'free' users via Enterprise clients, creating the network moat.",
      "Path to €1M ARR: Conversion of 35 Corporate and 4 Enterprise accounts in the Mining/Palm Oil sector.",
      "Path to €10M ARR: Dominance in the ASEAN manufacturing belt through bank-led distribution and mandatory ESG reporting triggers."
    ]
  }
];