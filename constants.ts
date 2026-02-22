
import { AnalysisSection, SectionType } from './types';

export const INITIAL_ANALYSIS_DATA: AnalysisSection[] = [
  {
    id: SectionType.REGISTRY,
    title: "National Carbon Registry Layer",
    icon: "fa-database",
    summary: "Centralized monitoring system for national emission tracking and sector-wide heatmaps.",
    metrics: [
      { label: "Monitored Entities", value: "4,250", color: "text-indigo-500" },
      { label: "Data Fidelity", value: "99.8%", color: "text-emerald-500" }
    ],
    details: [
      "National Emission Monitoring: Real-time aggregation of Scope 1 & 2 data from all registered industrial entities.",
      "Sector Heatmap: Visual intelligence identifying high-intensity geographical and industrial clusters.",
      "Policy Impact Simulation: Modeling the macro-effect of regulatory changes on national NDC targets.",
      "Tax Estimation: Automated calculation of projected national carbon tax revenue based on current emission trajectories."
    ]
  },
  {
    id: SectionType.REGULATOR_TOOLS,
    title: "Regulator Tools",
    icon: "fa-gavel",
    summary: "Advanced oversight tools for verifier management and MRV integrity.",
    metrics: [
      { label: "Active Verifiers", value: "84", color: "text-blue-500" },
      { label: "Fraud Alerts", value: "2 Active", color: "text-rose-500" }
    ],
    details: [
      "Approve Verifier: Streamlined portal for certifying and auditing third-party verification bodies.",
      "Detect Fraud MRV: AI-powered anomaly detection to identify inconsistencies in Monitoring, Reporting, and Verification data.",
      "Emission Trajectory: Predictive modeling of national emission trends to ensure alignment with international climate commitments.",
      "Audit Trail: Immutable ledger of all regulatory actions and entity submissions for complete transparency."
    ]
  },
  {
    id: SectionType.POLICY_SIM,
    title: "AI Policy Simulation",
    icon: "fa-vial-circle-check",
    summary: "B2G killer feature for simulating the impact of legislative decisions on industry and environment.",
    metrics: [
      { label: "Sim Accuracy", value: "94.2%", color: "text-emerald-400" },
      { label: "Scenarios", value: "Unlimited", color: "text-indigo-400" }
    ],
    details: [
      "Carbon Tax Impact: Simulate how increasing carbon tax rates will affect specific industrial sectors and national GDP.",
      "EV Subsidy Modeling: Predict the emission reduction curve resulting from various electric vehicle incentive structures.",
      "Industrial Shift: Forecast how policy changes will drive capital migration between high-carbon and low-carbon technologies.",
      "Strategic Advantage: Provides data-backed evidence for legislative proposals, making the platform indispensable for policy makers."
    ]
  },
  {
    id: SectionType.PRICE_PREDICTION,
    title: "AI Carbon Price Prediction",
    icon: "fa-chart-line",
    summary: "Market intelligence for regional carbon pricing and demand forecasting.",
    metrics: [
      { label: "Price Forecast", value: "IDR 42k", color: "text-emerald-500" },
      { label: "Market Balance", value: "Tight", color: "text-amber-500" }
    ],
    details: [
      "Regional Price Prediction: Forecasting carbon credit prices across Southeast Asian markets based on supply/demand dynamics.",
      "Offset Demand: Modeling the future appetite for carbon offsets from domestic and international corporate buyers.",
      "Market Imbalance: Identifying projected shortages or surpluses in specific credit types (e.g., NBS vs Tech-based).",
      "Economic Stability: Assisting regulators in maintaining market stability through informed intervention strategies."
    ]
  },
  {
    id: SectionType.ACCOUNTING,
    title: "Carbon Accounting Engine",
    icon: "fa-calculator",
    summary: "High-precision emission quantification engine aligned with global standards.",
    metrics: [
      { label: "Standard", value: "GHG Protocol", color: "text-emerald-500" },
      { label: "ISO Compliance", value: "14064-1 / 14067", color: "text-blue-500" }
    ],
    details: [
      "Full Scope 1, 2, and 3 tracking with automated data ingestion from ERP and utility sources.",
      "ISO 14064-1: Organizational level greenhouse gas quantification and reporting.",
      "ISO 14067: Product Carbon Footprint (PCF) quantification for life cycle assessment (LCA).",
      "Dynamic emission factor library with regional overrides for Indonesian grid intensity."
    ]
  },
  {
    id: SectionType.CALCULATOR,
    title: "GHG Protocol Calculator",
    icon: "fa-calculator",
    summary: "Interactive quantification tool for direct and indirect emissions aligned with international standards.",
    metrics: [
      { label: "Methodology", value: "GHG Protocol", color: "text-emerald-500" },
      { label: "GWP Standard", value: "IPCC AR6", color: "text-blue-500" }
    ],
    details: [
      "Scope 1: Direct emissions from owned or controlled sources (fuel combustion, refrigerants).",
      "Scope 2: Indirect emissions from the generation of purchased energy (electricity, steam, heating).",
      "Scope 3: All other indirect emissions that occur in the value chain (travel, waste, procurement).",
      "Audit Readiness: Generates evidence-backed reports for ISO 14064-1 verification."
    ]
  },
  {
    id: SectionType.COMPLIANCE,
    title: "ESG Compliance Manager",
    icon: "fa-file-shield",
    summary: "Unified regulatory hub for global and national sustainability reporting.",
    metrics: [
      { label: "Global", value: "CSRD / TCFD", color: "text-indigo-500" },
      { label: "National", value: "SRN PPI / NEK", color: "text-amber-500" }
    ],
    details: [
      "Global Alignment: Native support for EU CSRD, ISSB IFRS-S2, and TCFD disclosure frameworks.",
      "Indonesian Regulation: Direct integration with SRN PPI KLHK and Nilai Ekonomi Karbon (NEK) tracking.",
      "Bursa Karbon: Audit-ready data exports for IDX Carbon listing and SPE-GRK verification.",
      "Outputs: Automated ESG Reports, audit-ready evidence files, and direct regulator submission portals."
    ]
  },
  {
    id: SectionType.REDUCTION,
    title: "Carbon Reduction Planner",
    icon: "fa-brain",
    summary: "AI-driven decarbonization pathways and financial impact modeling.",
    metrics: [
      { label: "AI Confidence", value: "96%", color: "text-emerald-400" },
      { label: "ROI Forecast", value: "Active", color: "text-blue-400" }
    ],
    details: [
      "Smart Recommendations: AI-generated emission reduction strategies based on operational hotspots.",
      "Tax Prediction: Predictive modeling for carbon tax liabilities under evolving Indonesian frameworks.",
      "Renewable ROI: Financial feasibility analysis for solar adoption and energy efficiency upgrades.",
      "Supply Chain Optimization: Logistics and procurement modeling to minimize Scope 3 intensity."
    ]
  },
  {
    id: SectionType.WALLET,
    title: "Carbon Asset Wallet",
    icon: "fa-wallet",
    summary: "Strategic management of carbon credits and environmental assets.",
    metrics: [
      { label: "Credit Balance", value: "12,450 tCO2e", color: "text-emerald-500" },
      { label: "Asset Value", value: "€186k", color: "text-indigo-500" }
    ],
    details: [
      "Secure Storage: Centralized repository for verified carbon credits (SPE-GRK, VCU, etc.).",
      "Offset Tracking: Real-time monitoring of retirement status and vintage verification.",
      "Financial Valuation: Live tracking of carbon asset market value for balance sheet reporting.",
      "Transaction Ledger: Immutable history of credit acquisitions and retirements for audit transparency."
    ]
  },
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
    id: SectionType.VELOCITY,
    title: "Environmental Velocity",
    icon: "fa-gauge-high",
    summary: "Real-time emission intensity tracking across direct operations, acquired assets, and external value chains.",
    metrics: [
      { label: "Direct Intensity", value: "0.42", color: "text-emerald-500" },
      { label: "Chain Velocity", value: "High", color: "text-rose-500" }
    ],
    details: [
      "Direct Control: Real-time monitoring of stationary combustion and process emissions per unit of production. High velocity here indicates immediate operational inefficiency.",
      "Purchased Assets: Intensity tracking of acquired energy and utility contracts. This vector measures the 'cleanliness' of your procurement infrastructure.",
      "External Chain: Deep-tier scope 3 intensity modeling. This is the 'drag' coefficient of your business model, representing emissions embedded in the supply chain per dollar spent.",
      "Intensity Forecasting: Predictive models that estimate how capacity expansion will accelerate or decelerate your aggregate carbon footprint."
    ]
  },
  {
    id: SectionType.SCOPES,
    title: "Advanced GHG Scopes",
    icon: "fa-diagram-project",
    summary: "Audit-grade organizational carbon inventory mapped to the Corporate Value Chain Standard.",
    metrics: [
      { label: "S3 Categories", value: "All 15", color: "text-emerald-600" },
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
    id: SectionType.ESG_COMPLIANCE,
    title: "ESG Compliance ID",
    icon: "fa-gavel",
    summary: "National regulatory hub for SRN PPI KLHK, IDX Carbon, and OJK 51 Reporting.",
    metrics: [
      { label: "Regulator Sync", value: "SRN PPI", color: "text-emerald-600" },
      { label: "Carbon Price", value: "IDR 30k-100k", color: "text-blue-600" }
    ],
    details: [
      "SRN PPI Integration: Automated generation of DRAM (Dokumen Rancangan Aksi Mitigasi) based on Scope 1-3 activity data.",
      "NEK Calculation: Real-time tracking of Carbon Economic Value (Nilai Ekonomi Karbon) for internal tax budgeting and bursa pricing.",
      "IDX Carbon Readiness: Seamless export of SPE-GRK (Sertifikat Pengurangan Emisi) data for listing on the Indonesia Carbon Exchange.",
      "Audit Trail: Permanent ledger of evidence for POJK 51 sustainability reporting, drastically reducing consultant man-hours."
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
      "Vs Watershed/Perspectives: CarbonINA Pro wins on localized emission factor databases (PLN Grid intensity, regional fuel types) and lower implementation costs for SMEs.",
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
      "Consulting Upsell: Partnership with local ESG boutique firms for 'Software-Led Consulting' where CarbonINA Pro takes a 20% platform fee."
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
      "Partnership Strategy: Collaborate with Mandiri/BCA to offer 'Green Loans' to clients who maintain high data quality scores on CarbonINA Pro.",
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
