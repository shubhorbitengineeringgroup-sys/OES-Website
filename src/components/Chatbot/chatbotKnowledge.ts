import { OES_EXPERIENCE_YEARS } from '../../data/experience';

export const OES_KNOWLEDGE = {

  company: {
    name: 'Orbit Engineering Solutions (OES)',
    founded: 1998,
    experience: `${OES_EXPERIENCE_YEARS}+ years`,
    location: 'Bhopal, Madhya Pradesh, India',
    certification: 'Triple ISO Certified: ISO 9001:2015 (QMS), ISO 14001:2015 (EMS) & ISO 45001:2018 (OH&S)',
    portfolio: '₹200+ Crore project portfolio',
    projects: '150+ mega schemes delivered',
    impact: 'Millions of lives impacted with clean drinking water across pan-India',
    domains: ['Water Infrastructure', 'Solar Energy', 'Industrial Automation', 'SCADA/Telemetry', 'IoT Solutions', 'Surveillance Systems'],
    clients: 'Government bodies (MP Jal Nigam, Municipalities), Industries, Townships',
    tagline: 'Engineering solutions that protect lives and resources',

    offices: [
      { type: 'Working Office', address: 'Root Space, Char Imli, Mannipuram, Bhopal 462016, MP' },
      { type: 'Branch Office', address: 'Flat No.2, Block 12, Shalimar Enclave, E3 Arera Colony, Bhopal 462016' },
      { type: 'Head Office', address: 'E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043' },
    ],

    contact: {
      phones: ['+91 70241 28029', '+91 9039075049'],
      whatsapp: '+91 9039075048',
      whatsappLink: "https://wa.me/919039075048?text=Hello,%20I%20am%20interested%20in%20Orbit%20Engineering's%20services.",
      emails: ['info@orbitengineerings.com', 'service@orbitengineerings.com'],
      indiamartStore: 'https://www.indiamart.com/orbit-engineering-solutions-bhopal/?srsltid=AfmBOoqv0uyKZ1nbWyrYQsROXsB8pmT8cHLbpbeCFKcDaUv1ZOyLiEcV',
      hours: 'Monday–Saturday: 10:00 AM – 7:00 PM | Sunday: Closed',
    },

    team: [
      { name: 'Manoj Tiwari', role: 'Director & Co-Founder', expertise: 'Project Management, Business Development' },
      { name: 'Vijay Tiwari', role: 'Director & Co-Founder', expertise: 'Technical Operations, Engineering' },
    ],

    whyOES: [
      `${OES_EXPERIENCE_YEARS}+ years of trusted experience in water & automation — est. 1998`,
      'Triple ISO Certified (ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018) — quality, environment & safety excellence',
      '₹200+ Cr project portfolio — government & industrial proven',
      'Local Bhopal presence — fast on-site support across MP',
      'Single-window solution: supply, install, commission, O&M',
      'Expert in Jal Jeevan Mission, AMRUT, Smart Cities projects',
      'After-sales support & Annual Maintenance Contracts (AMC)',
      'Trusted by MP Jal Nigam, municipalities, and private industries',
    ],
  },

  // ============================================================
  //  PROJECT PORTFOLIO (B2B Context)
  // ============================================================
  projectPortfolio: [
    {
      type: 'Jal Jeevan Mission (JJM) Schemes',
      description: 'Har Ghar Jal — water supply infrastructure including pipelines, flow meters, pump automation, and quality monitoring for village-level water schemes',
      scale: 'Village to district level, multiple simultaneous schemes across MP',
    },
    {
      type: 'AMRUT Water Supply Projects',
      description: 'Urban water distribution network upgrades including SCADA-enabled flow measurement, pressure management, and NRW reduction',
      scale: 'City-level urban water boards and municipalities',
    },
    {
      type: 'Water Treatment Plants (WTP)',
      description: 'Complete WTP automation — from raw water intake to treated water distribution, including PLC panels, flow meters, analyzers, and SCADA control rooms',
      scale: 'MLD-scale plants for municipalities and private townships',
    },
    {
      type: 'Sewage Treatment Plants (STP)',
      description: 'STP process automation including DO control, BOD/COD monitoring, flow measurement, aeration systems, and central monitoring',
      scale: 'Urban municipal STPs and industrial ETPs',
    },
    {
      type: 'Solar Energy Projects',
      description: 'Rooftop solar installations, floating solar on reservoirs, solar street lighting, and solar-powered pump systems',
      scale: 'Industrial, commercial, and government installations',
    },
    {
      type: 'SCADA & Telemetry Systems',
      description: 'Remote monitoring of multiple pump stations, reservoirs, and treatment plants from a central control room using PLC, RTU, GPRS/4G telemetry',
      scale: 'Managing 50–100+ remote sites from a single command center',
    },
    {
      type: 'Industrial Automation',
      description: 'Process automation for manufacturing, chemical plants, and utilities using PLCs (Siemens, Schneider, ABB), HMI, and DCS systems',
      scale: 'Factory-level to enterprise-wide integration',
    },
  ],

  // ============================================================
  //  GOVERNMENT SCHEME EXPERTISE
  // ============================================================
  governmentSchemes: {
    jalJeevanMission: {
      name: 'Jal Jeevan Mission (JJM)',
      objective: 'Provide tap water connection to every rural household by 2024',
      oesRole: 'Supply of flow meters, level sensors, chlorination systems, SCADA/telemetry, pipelines — all compliant with JJM technical specifications',
      tenderProcess: 'State government tenders through NITI Aayog/DWSM portals, GeM, or direct procurement',
    },
    amrut: {
      name: 'AMRUT 2.0 (Atal Mission for Rejuvenation and Urban Transformation)',
      objective: 'Universal water supply coverage in all urban areas, NRW reduction',
      oesRole: 'Smart water meters, electromagnetic flow meters, SCADA, DMA (District Metered Area) setup, pipeline infrastructure',
      tenderProcess: 'Urban Local Body (ULB) / municipality tenders, state government coordination',
    },
    smartCities: {
      name: 'Smart Cities Mission',
      objective: 'ICT-enabled citizen services including smart water management',
      oesRole: 'IoT-enabled smart water meters, cloud-based monitoring dashboards, integrated billing systems, real-time analytics',
      tenderProcess: 'Smart City SPV (Special Purpose Vehicle) procurement, private-public partnership models',
    },
  },

  products: {

    flow: {
      categoryName: 'Flow Measurement',
      intro: 'Precision flow measurement instruments for water, wastewater, chemicals, and gases',
      items: [
        {
          name: 'Electromagnetic Flow Meter',
          useCases: ['Drinking water pipelines', 'WTP/STP inlet-outlet', 'Municipal distribution', 'Irrigation', 'Chemicals'],
          keyFeatures: ['No moving parts', 'High accuracy', 'Works on Faraday\'s law', 'Suitable for conductive fluids', 'Low maintenance'],
          bestFor: 'Water pipeline flow measurement — most popular for government WTPs',
          certifications: 'IP67/IP68 rated, MID certified options available',
          sizes: '15mm to 2000mm pipe diameter',
        },
        {
          name: 'Bulk Flow Meter',
          useCases: ['Bulk water supply', 'Industrial metering', 'Tanker loading'],
          keyFeatures: ['Positive displacement', 'Long-term accuracy', 'Quick maintenance design', 'Electronic control available'],
          bestFor: 'Bulk water and liquid custody transfer metering',
          certifications: 'OIML compliant options available',
          sizes: 'Various sizes for bulk metering applications',
        },
        {
          name: 'Open Channel Ultrasonic Flow Meter',
          useCases: ['Open channels', 'Rivers', 'Canals', 'Irrigation drainage'],
          keyFeatures: ['Non-contact measurement', 'No moving parts', 'Low maintenance', 'Ultrasonic pulse technology'],
          bestFor: 'Open channel flow measurement without pipe',
          certifications: 'IP67 rated',
          sizes: 'Custom as per channel dimensions',
        },
        {
          name: 'Water Meter',
          useCases: ['Residential billing', 'Commercial buildings', 'Municipal connections'],
          keyFeatures: ['Accurate billing', 'Volume measurement', 'Cubic meters / gallons', 'Rate-of-flow display'],
          bestFor: 'Residential and commercial water billing',
          certifications: 'BIS IS:779 / IS:2373 compliant',
          sizes: '15mm to 50mm for domestic, larger for commercial',
        },
        {
          name: 'Mass Flow Meter',
          useCases: ['Chemical dosing', 'Process industries', 'Critical applications'],
          keyFeatures: ['Direct mass measurement', 'No temp/pressure compensation needed', 'High accuracy', 'Digital smart transmitter', 'Rugged design'],
          bestFor: 'Precision mass flow measurement in process industries',
          certifications: 'ATEX options for hazardous areas',
          sizes: 'Process line sizes',
        },
        {
          name: 'Turbine Flow Meter',
          useCases: ['Clean liquids', 'Water', 'Light oils', 'Chemicals'],
          keyFeatures: ['High accuracy', 'SS304/SS316 construction', 'Digital display', 'Fast response', 'Low pressure drop'],
          bestFor: 'Clean, low-viscosity liquid flow measurement',
          certifications: 'ATEX options available',
          sizes: '10mm to 300mm',
        },
        {
          name: 'Vortex Flow Meter',
          useCases: ['Steam', 'Gas', 'Liquids', 'Compressed air'],
          keyFeatures: ['Ideal for steam/gas', 'No moving parts', 'Optional temp & pressure compensation', 'High stability'],
          bestFor: 'Steam, gas, and industrial flow measurement',
          certifications: 'ATEX options, SIL2 capable',
          sizes: '15mm to 300mm',
        },
        {
          name: 'Smart Prepaid Water Meter',
          useCases: ['Urban water utilities', 'Housing societies', 'Government water schemes'],
          keyFeatures: ['IoT/cloud connectivity', 'Prepaid management', 'Remote monitoring', 'Auto valve control', 'Tamper detection', 'Leak detection'],
          bestFor: 'Smart city water distribution, Jal Jeevan Mission projects',
          certifications: 'Compliant with BIS and smart metering standards',
          sizes: '15mm to 50mm for consumer connections',
        },
        {
          name: 'Smart Water Meter for Household',
          useCases: ['Homes', 'Apartments', 'Residential colonies'],
          keyFeatures: ['IoT enabled', 'Mobile app', 'Cloud dashboard', 'Leak detection', 'Battery operated'],
          bestFor: 'Household-level smart metering',
          certifications: 'BIS approved',
          sizes: '15mm standard household size',
        },
        {
          name: 'Smart Water Meter for Utilities',
          useCases: ['Municipal water boards', 'AMR/AMI systems', 'Bulk distribution'],
          keyFeatures: ['High accuracy', 'NB-IoT / LoRaWAN / RF', 'Real-time monitoring', 'Leak & tamper detection', 'Long battery life'],
          bestFor: 'City-level utility water management',
          certifications: 'MID, WRAS, OIML compliant options',
          sizes: '15mm to 200mm depending on DMA zone',
        },
      ],
    },

    analyzers: {
      categoryName: 'Water Quality Analyzers',
      intro: 'Online continuous water quality monitoring instruments for treatment plants and compliance',
      items: [
        {
          name: 'Total Chlorine Transmitter/Controller',
          useCases: ['WTP disinfection monitoring', 'Drinking water compliance', 'Swimming pools'],
          keyFeatures: ['Continuous monitoring', 'Touchscreen TFT display', 'IP67 rated', 'Ethernet/Modbus connectivity', '4 analysis inputs'],
          bestFor: 'Drinking water chlorine monitoring and control',
        },
        {
          name: 'Dissolved Oxygen (DO) Transmitter',
          useCases: ['STP/ETP aeration tanks', 'Aquaculture', 'Environmental monitoring'],
          keyFeatures: ['Safe 1-point calibration', '2-wire transmitter', 'PLC compatible', 'Temperature compensation'],
          bestFor: 'Wastewater aeration and DO control',
        },
        {
          name: 'pH Analyzer',
          useCases: ['WTP/ETP/STP', 'Chemical processes', 'Industrial effluent'],
          keyFeatures: ['Real-time pH monitoring', 'IP67 housing', 'Touchscreen', 'Ethernet connectivity', 'Multi-sensor input'],
          bestFor: 'Chemical process pH monitoring and control',
        },
        {
          name: 'Turbidity Analyzer',
          useCases: ['Drinking water clarity', 'WTP outlet', 'Effluent compliance'],
          keyFeatures: ['Real-time monitoring', 'Low maintenance', 'High sensitivity', 'Process upset detection'],
          bestFor: 'WTP outlet quality monitoring',
        },
        {
          name: 'BOD Analyzer',
          useCases: ['STP monitoring', 'ETP compliance', 'Municipal wastewater'],
          keyFeatures: ['Continuous online BOD', 'No manual sampling', '4-20mA / RS485 / Modbus', '24×7 operation', 'Compact rugged design'],
          bestFor: 'Sewage treatment plant performance monitoring',
        },
        {
          name: 'COD Analyzer',
          useCases: ['Industrial ETP', 'Municipal wastewater', 'Regulatory compliance'],
          keyFeatures: ['Real-time COD', 'Auto temperature compensation', '4-20mA / Modbus output', 'Low maintenance sensor'],
          bestFor: 'Industrial effluent COD compliance monitoring',
        },
      ],
    },

    airQuality: {
      categoryName: 'Air Quality Analyzers',
      intro: 'Continuous emission and ambient air quality monitoring instruments',
      items: [
        { name: 'SOx Analyzer', useCases: ['Flue gas monitoring', 'Boiler stacks', 'Industrial compliance'], keyFeatures: ['Continuous SO2/SO3 measurement', '24/7 operation', 'PLC/SCADA compatible'] },
        { name: 'NOx Analyzer', useCases: ['Combustion monitoring', 'Power plants', 'Emission compliance'], keyFeatures: ['NO and NO2 measurement', 'UV absorption technology', 'Chemiluminescence option'] },
        { name: 'PM10 Analyzer', useCases: ['Ambient air monitoring', 'CPCB compliance', 'Construction sites'], keyFeatures: ['Beta attenuation or optical method', 'Weatherproof cabinet', 'Continuous PM10 measurement'] },
        { name: 'PM2.5 Analyzer', useCases: ['Urban air quality', 'Public health monitoring', 'Environmental stations'], keyFeatures: ['Ultra-fine particle measurement', 'BAM or optical method', 'Size-selective inlet'] },
      ],
    },

    gasAnalyzers: {
      categoryName: 'Gas Analyzers',
      intro: 'Portable and fixed gas analyzers for industrial and environmental applications',
      items: [
        { name: 'CO Gas Analyzer', useCases: ['Flue gas analysis', 'Combustion testing', 'Safety monitoring'], keyFeatures: ['Portable suitcase design', 'Electrochemical or NDIR sensor', 'Data logging'] },
        { name: 'CO₂ Gas Analyzer', useCases: ['O2 and CO2 simultaneous', 'Fermentation', 'Environmental monitoring'], keyFeatures: ['Handheld portable', 'LCD display', 'Battery operated', 'Internal sampling pump'] },
        { name: 'CH₄ Methane Analyzer', useCases: ['Biogas plants', 'Natural gas monitoring', 'Greenhouse gas tracking'], keyFeatures: ['NDIR technology', 'Real-time display', 'PLC/SCADA output'] },
      ],
    },

    levelTransmitters: {
      categoryName: 'Level Transmitters',
      intro: 'Reliable level measurement for tanks, reservoirs, wells, and sumps',
      items: [
        {
          name: 'Hydrostatic Level Transmitter',
          useCases: ['Deep wells', 'Reservoirs', 'Sumps', 'WTP tanks'],
          keyFeatures: ['Submersible', 'Up to 200m range', 'HART communication', 'Explosion-proof option'],
          bestFor: 'Deep well and reservoir level measurement',
        },
        {
          name: 'Ultrasonic Level Transmitter',
          useCases: ['Tanks', 'Open channels', 'Non-contact measurement'],
          keyFeatures: ['Non-contact', 'No moving parts', '32-point linearization', 'Temperature compensated', 'Local display'],
          bestFor: 'Non-contact tank and channel level measurement',
        },
        {
          name: 'Capacitance Level Transmitter',
          useCases: ['Corrosive liquids', 'High temperature', 'Challenging media'],
          keyFeatures: ['High sensitivity', 'Rod or cable probes', 'Explosion-proof', '32-point linearization'],
          bestFor: 'Corrosive and challenging liquid level measurement',
        },
        {
          name: 'Submersible Level Transmitter',
          useCases: ['Tanks', 'Borewells', 'Wastewater sumps'],
          keyFeatures: ['4-20mA output', 'Fully sealed', 'Corrosion resistant', 'Hydrostatic principle'],
          bestFor: 'Submersible level sensing in tanks and borewells',
        },
      ],
    },

    levelSwitches: {
      categoryName: 'Level Switches',
      intro: 'Point level detection for pump control and alarm systems',
      items: [
        { name: 'Conductive Level Switch', useCases: ['Conductive liquids', 'Pump control', 'High/low alarms'], keyFeatures: ['Adjustable sensitivity', 'High/low fail-safe', 'Two independent relays', 'SS wetted parts'] },
        { name: 'Float Level Switch', useCases: ['Pump control', 'Overflow prevention', 'Sump management'], keyFeatures: ['No power supply needed', 'Mercury-free', 'Low cost', 'Low density liquids'] },
        { name: 'Coupling Level Switch', useCases: ['Tanks', 'Vessels', 'Sumps'], keyFeatures: ['Threaded coupling mount', 'Buoyancy principle', 'ON/OFF output'] },
      ],
    },

    valves: {
      categoryName: 'Valves & Piping',
      intro: 'Industrial valves and HDPE piping for water infrastructure projects',
      items: [
        {
          name: 'Butterfly Valve',
          useCases: ['Pipeline isolation', 'Flow throttling', 'WTP/STP'],
          keyFeatures: ['Lined type', 'Size 50-600mm', 'PN 25 rating', 'EPDM/Viton/Nitrile seating', 'Low pressure loss'],
          bestFor: 'Space-saving pipeline flow control',
        },
        {
          name: 'Gate Valve',
          useCases: ['Pipeline isolation', 'Full open/close applications'],
          keyFeatures: ['Ductile Iron MOC', 'Flanged end', 'Size up to 400mm', 'PN 16 rating'],
          bestFor: 'Pipeline isolation and shutoff',
        },
        {
          name: 'Motorized Ball Valve',
          useCases: ['Automated control', 'Remote operation', 'SCADA integration'],
          keyFeatures: ['Motor driven', 'Precise control', 'High reliability', 'Automated operation'],
          bestFor: 'SCADA/automation integrated pipeline control',
        },
        {
          name: 'Sluice Valve',
          useCases: ['Water distribution networks', 'Municipal mains'],
          keyFeatures: ['Robust construction', 'Size up to 600mm (24")', 'Low maintenance'],
          bestFor: 'Municipal water distribution isolation',
        },
        {
          name: 'Control Valve',
          useCases: ['Flow regulation', 'Pressure control', 'Process plants'],
          keyFeatures: ['Globe type', 'Pneumatic actuator', 'Valve positioner', 'PLC/DCS compatible'],
          bestFor: 'Precise process flow and pressure control',
        },
        {
          name: 'HDPE Pipes & Fittings',
          useCases: ['Water mains replacement', 'Distribution networks', 'Industrial piping'],
          keyFeatures: ['Size up to 2500mm OD', 'Flexible and durable', 'Corrosion resistant', 'Chemical resistant'],
          bestFor: 'Water distribution main pipelines',
        },
      ],
    },

    automation: {
      categoryName: 'Automation (IoT / PLC / RTU / SCADA)',
      intro: 'Complete industrial automation and remote monitoring solutions',
      items: [
        {
          name: 'IoT Platform',
          useCases: ['Smart water monitoring', 'Remote asset management', 'Data analytics'],
          keyFeatures: ['Integrated platform', 'CRM/ERP/Billing integration', 'Real-time device management', 'Cloud scalable'],
          bestFor: 'End-to-end smart water and industrial IoT',
        },
        {
          name: 'PLC (Programmable Logic Controller)',
          useCases: ['WTP automation', 'Pump station control', 'Industrial process control'],
          keyFeatures: ['SyncSys PLC brand', 'Industrial grade', 'Modular design', 'Real-time processing', 'Siemens/Allen Bradley/Schneider compatible'],
          bestFor: 'Water treatment plant automation',
        },
        {
          name: 'RTU (Remote Terminal Unit)',
          useCases: ['Remote pump stations', 'Pipeline monitoring', 'Distributed sites'],
          keyFeatures: ['Event-based protocol', 'NB-IoT compatible', 'Mobile network support', 'Semi real-time data', 'Optimal latency'],
          bestFor: 'Remote site telemetry and monitoring',
        },
        {
          name: 'SCADA System',
          useCases: ['WTP/STP control rooms', 'Multi-plant monitoring', 'Central command center'],
          keyFeatures: ['Manage 50 plants per PC', '100 plants per network', 'Real-time visualization', 'Mobile app support', 'Continuous logging'],
          bestFor: 'Centralized water plant monitoring and control',
        },
        {
          name: 'DCS Controller',
          useCases: ['Large process plants', 'Critical processes', 'Mission-critical operations'],
          keyFeatures: ['Distributed architecture', 'No single point of failure', '24×7 operation', 'Advanced PID control', 'Multi-network redundancy'],
          bestFor: 'Large-scale continuous process control',
        },
      ],
    },

    cameras: {
      categoryName: 'Surveillance & Vision Systems',
      intro: 'Professional security cameras and video management for industrial and commercial sites',
      items: [
        { name: 'Bullet Camera', useCases: ['Outdoor perimeter', 'Water plants', 'Parking lots'], keyFeatures: ['Weatherproof', 'IR night vision', '24/7 operation', 'High resolution'] },
        { name: 'Dome Camera', useCases: ['Indoor areas', 'Control rooms', 'Public spaces'], keyFeatures: ['360° coverage', 'Vandal-resistant', 'Discreet design', 'Wide angle'] },
        { name: 'PTZ Camera', useCases: ['Large area coverage', 'Perimeter tracking', 'Critical infrastructure'], keyFeatures: ['Pan-tilt-zoom', 'Remote operation', 'Auto-tracking', 'Motorized movement'] },
        { name: 'High Speed Camera', useCases: ['Process monitoring', 'Quality inspection', 'Research'], keyFeatures: ['High frame rate', 'Motion analysis', 'Professional grade'] },
        { name: 'Surveillance Servers', useCases: ['Data storage', 'Multi-camera recording', 'Remote access'], keyFeatures: ['High storage capacity', 'Redundant backup', 'Remote access', 'Scalable'] },
      ],
    },

    jointingMachines: {
      categoryName: 'Pipe Jointing Machines',
      intro: 'HDPE pipe jointing and welding equipment for water infrastructure projects',
      items: [
        { name: 'Butt Fusion Jointing Machine', useCases: ['Large diameter HDPE pipes', 'Water mains', 'Infrastructure projects'], keyFeatures: ['Heavy duty', 'Precision alignment', 'Infrastructure grade'] },
        { name: 'Welding Machine ZEEN-3000 PLUS', useCases: ['Plumbing', 'Gas industry pipes', 'HDPE fittings'], keyFeatures: ['4 programming modes', 'Barcode scanner compatible', 'Overheating protection', 'Aluminium housing'] },
        { name: 'Electrofusion Welding Machine', useCases: ['PE/PP/PVDF pipes', 'Thermoplastic connections', 'Field jointing'], keyFeatures: ['Automatic control', '3000+ weld records', 'Temperature compensation', '20-800mm range'] },
      ],
    },

    pressureInstruments: {
      categoryName: 'Pressure Sensors & Transmitters',
      intro: 'Industrial pressure measurement for pipelines, tanks, and process systems',
      items: [
        { name: 'Digital Pressure Sensor', useCases: ['Liquid/gas pressure', 'Pipeline monitoring'], keyFeatures: ['LED/LCD display', 'High accuracy', 'Compact design', 'Digital output'] },
        { name: 'Electronic Pressure Sensor', useCases: ['PLC integration', 'Industrial control'], keyFeatures: ['SS construction', 'Rugged design', 'Harsh environment rated'] },
        { name: 'Differential Pressure Transmitter', useCases: ['Flow measurement', 'Filter monitoring', 'Level measurement'], keyFeatures: ['0.07% linearity', 'HART interface', '1:200 turndown', 'Compact 71mm'] },
        { name: 'SMART TYPE Pressure Transmitter', useCases: ['Advanced process control', 'Hazardous areas'], keyFeatures: ['HART communication', 'ATEX explosion protection', '0.07% linearity', '1:200 turndown'] },
        { name: 'Blind Type Pressure Transmitter', useCases: ['Slurry', 'Viscous fluids', 'Clogging-prone media'], keyFeatures: ['Flush diaphragm', 'No cavity/dead space', 'Wastewater suitable'] },
      ],
    },

    chlorinators: {
      categoryName: 'Chlorination Systems',
      intro: 'Water disinfection solutions for drinking water treatment',
      items: [
        { name: 'Chlorinator', useCases: ['Drinking water', 'Swimming pools', 'Marine', 'Industrial water'], keyFeatures: ['Eliminates bacteria/viruses/parasites', 'Various applications'] },
        { name: 'Automatic Chlorine Dosing System', useCases: ['WTPs', 'Drinking water', 'Wastewater'], keyFeatures: ['Automatic precise dosing', 'PLC controlled', 'Online monitoring option', 'Low maintenance', 'Scalable'] },
        { name: 'CHLORINSITU IIa Electrolysis System', useCases: ['Large WTPs', 'On-site hypochlorite generation', 'Municipal drinking water'], keyFeatures: ['60-2500 g/h capacity', 'On-site chlorine generation', 'No chlorine gas handling', 'IoT monitoring (DULCONNEX)', 'Plug & play', 'Energy efficient: 4.0 kWh/kg Cl2'] },
      ],
    },

    transformers: {
      categoryName: 'Transformers & Switchgear',
      intro: 'Power equipment for utilities and industrial electrical infrastructure',
      items: [
        { name: 'Auto Transformer', useCases: ['Power transmission', 'Grid interconnection', 'Rural distribution'], keyFeatures: ['132-765kV voltage', '50-1500 MVA ratings', 'KEMA tested', 'ANSI standard'] },
        { name: 'Distribution Transformer', useCases: ['Residential distribution', 'Commercial', 'Industrial', 'Rural electrification'], keyFeatures: ['11kV to 33kV', '98%+ efficiency', 'Pole/Pad/Substation mount', 'Long life'] },
      ],
    },

    solar: {
      categoryName: 'Solar Energy Solutions',
      intro: 'Solar power products for green energy and smart city applications',
      items: [
        { name: 'Polycrystalline Solar Module', useCases: ['Rooftop', 'Ground mount', 'Budget projects'], keyFeatures: ['Cost effective', 'Reliable performance'] },
        { name: 'Monocrystalline Solar Module', useCases: ['High efficiency needs', 'Limited space'], keyFeatures: ['Higher efficiency than poly', 'Premium performance'] },
        { name: 'Mono PERC Half-Cut Module', useCases: ['Commercial', 'Industrial', 'Large scale'], keyFeatures: ['Half-cut cell technology', 'Better shade tolerance', 'High efficiency'] },
        { name: 'Mono PERC Bifacial Module', useCases: ['Ground mount', 'Floating solar', 'Maximum output'], keyFeatures: ['Dual-side power generation', 'Highest efficiency'] },
        { name: 'Smart Solar Street Light', useCases: ['Roads', 'Rural areas', 'Smart cities'], keyFeatures: ['IoT enabled', 'Auto on/off', 'Remote monitoring', 'Battery backup'] },
        { name: 'Floating Solar Plant', useCases: ['Reservoirs', 'Ponds', 'Water bodies'], keyFeatures: ['Dual use of water surface', 'Reduces evaporation', 'Cooling effect boosts efficiency'] },
      ],
    },

  }, // end products

  services: [
    {
      name: 'Water Treatment Solutions',
      details: ['Water Treatment Plants (WTP)', 'Sewage Treatment Plants (STP)', 'Reverse Osmosis (RO) Systems', 'Effluent Treatment Plants (ETP)', 'Advanced filtration systems'],
      description: 'Complete design, supply, installation, and commissioning of water and wastewater treatment facilities',
    },
    {
      name: 'Automation & Control',
      details: ['PLC panel design & installation (Siemens, Allen Bradley, Schneider)', 'SCADA system integration', 'IoT sensor networks', 'Real-time monitoring systems', 'HMI/SCADA development'],
      description: 'End-to-end industrial automation for water, power, and industrial processes',
    },
    {
      name: 'Installation & Commissioning',
      details: ['Complete system installation', 'Equipment commissioning', 'Performance testing', 'System optimization', 'Training and handover'],
      description: 'Professional field execution from blueprint to live operation',
    },
    {
      name: 'Operation & Maintenance (O&M)',
      details: ['Preventive maintenance programs', 'Emergency repair services', 'System upgrades and retrofits', 'Performance monitoring', '24/7 technical support', 'Annual Maintenance Contracts (AMC)'],
      description: 'Long-term O&M support to ensure peak plant performance',
    },
    {
      name: 'Consultancy & Design',
      details: ['Feasibility studies', 'Detailed engineering design', 'GPS surveys and mapping', 'Project planning', 'Technical documentation'],
      description: 'Expert engineering consultancy for infrastructure projects',
    },
    {
      name: 'Turnkey Automation & Cloud',
      details: ['End-to-end automation solutions', 'Cloud-based monitoring platforms', 'Data analytics and reporting', 'Mobile app integration', 'Remote system management', 'AWS, Azure, Google Cloud deployment'],
      description: 'Complete cloud-integrated turnkey automation for smart utilities',
    },
  ],

  // ============================================================
  //  STANDARD FAQs
  // ============================================================
  faqs: [
    { q: 'Do you supply and install?', a: 'Yes — OES is a single-window solution. We supply, install, commission, and provide O&M support.' },
    { q: 'Do you do government projects?', a: 'Yes — we work extensively with MP Jal Nigam, municipalities, and government agencies on Jal Jeevan Mission and AMRUT projects.' },
    { q: 'What areas do you serve?', a: 'Primarily Madhya Pradesh, but we handle pan-India projects. Headquartered in Bhopal.' },
    { q: 'Do you provide AMC?', a: 'Yes — Annual Maintenance Contracts available for all our supplied equipment and installed systems.' },
    { q: 'Can I get a product datasheet?', a: 'Yes — datasheets available for all major products. Contact us or visit the Products section.' },
    { q: 'What is your project portfolio?', a: '₹200+ Crore portfolio, 150+ mega schemes including WTPs, STPs, SCADA automation, and solar projects.' },
    { q: 'Are you ISO certified?', a: 'Yes — Orbit Engineering Solutions is Triple ISO Certified: ISO 9001:2015 (Quality), ISO 14001:2015 (Environmental Management), and ISO 45001:2018 (Occupational Health & Safety) by Times Certification Services UK Ltd.' },
    { q: 'Can I view your catalog on IndiaMART?', a: 'Yes! You can view our complete verified catalog and order directly on IndiaMART at https://www.indiamart.com/orbit-engineering-solutions-bhopal/' },
  ],

  // ============================================================
  //  EXTENDED FAQs (B2B Cross-Questions)
  // ============================================================
  extendedFaqs: [
    {
      q: 'How do you handle government tender requirements?',
      a: 'OES has extensive experience with government procurement processes — GeM portal registrations, direct tender submissions, CPWD/PWD empanelment, and JJM/AMRUT technical specifications. Our team assists clients in understanding technical specifications and preparing documentation. Contact our business development team for project-specific guidance.',
    },
    {
      q: 'What warranty do you provide on instruments?',
      a: 'Standard warranty varies by product — typically 12 to 24 months from commissioning for most instruments. Beyond warranty, OES offers Annual Maintenance Contracts (AMC) for continued technical support, preventive maintenance, and emergency response.',
    },
    {
      q: 'Do you provide training after installation?',
      a: 'Yes — every installation includes operator training and handover documentation. Our commissioning engineers train the plant operators on system operation, routine checks, and basic troubleshooting before project handover.',
    },
    {
      q: 'Can you integrate with existing SCADA or systems?',
      a: 'Yes — OES specializes in system integration. Our automation team works with Modbus, HART, Profibus, OPC-UA, and other industrial protocols to integrate new instruments or systems with existing infrastructure.',
    },
    {
      q: 'What is the project execution timeline?',
      a: 'Timelines depend on project scope. Instrument supply typically takes 2–8 weeks. Complete system projects (WTP automation, SCADA setup) take 2–6 months depending on size. OES follows structured project management with milestone tracking.',
    },
    {
      q: 'Are your products ISI/BIS certified?',
      a: 'Many of our products come with relevant certifications — BIS/IS marks, IP ratings, ATEX certification for hazardous areas, MID certification for meters, and ISO 9001:2015 quality management from OES itself. Specific certification details are available in product datasheets.',
    },
    {
      q: 'Do you work with private companies or only government?',
      a: 'OES serves both government and private sector — including municipal bodies, industrial plants, manufacturing units, housing townships, hospitals, and educational institutions. The approach may differ but the commitment to quality remains the same.',
    },
    {
      q: 'What after-sales support do you provide?',
      a: 'OES provides full after-sales support: 24/7 technical helpline, on-site emergency response (for MP locations), remote diagnostics, spare parts supply, annual calibration, and AMC packages. Our local Bhopal presence means faster response times compared to distant vendors.',
    },
    {
      q: 'Can you provide project references?',
      a: 'Yes — OES has worked on 150+ mega schemes. We can arrange reference site visits or share documented case studies for relevant project types upon request. Please contact our business development team.',
    },
    {
      q: 'How is pricing determined for large projects?',
      a: 'Large project pricing involves detailed BOQ (Bill of Quantities) preparation based on site survey, technical specifications, scope of work, and commercial terms. OES provides detailed, itemized quotations — not ballpark estimates. The process ensures transparency and accuracy for both parties.',
    },
    {
      q: 'Do you have GeM registration?',
      a: 'OES participates in government procurement processes. For specific GeM or tender requirements, please contact our business development team directly — they will clarify availability and assist with procurement documentation.',
    },
    {
      q: 'What makes OES different from other vendors?',
      a: `${OES_EXPERIENCE_YEARS}+ years of MP-specific experience, ISO 9001:2015 quality assurance, a local Bhopal support team for fast response, single-window service from supply to AMC, and proven track record with government clients like MP Jal Nigam. We focus on long-term relationships, not one-time transactions.`,
    },
  ],

};

export type ProductCategory = keyof typeof OES_KNOWLEDGE.products;
