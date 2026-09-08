import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const publicDir = path.resolve(projectRoot, 'public');

const BASE_URL = 'https://www.orbitengineerings.com';
const TODAY = new Date().toISOString().split('T')[0];

// Define all routes with rich SEO data and pre-rendered semantic HTML
const routes = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: "Orbit Engineering Solutions | India's Leading Water Treatment, SCADA & PLC Automation Company - Bhopal",
    description: "Orbit Engineering Solutions, Bhopal – India's premier water engineering company since 1998. Specialists in Water Treatment Plants (WTP), Sewage Treatment Plants (STP), Reverse Osmosis (RO), Effluent Treatment Plants (ETP), SCADA systems, PLC automation, IoT monitoring & instrumentation. ₹200+ Cr project portfolio. Triple ISO Certified.",
    keywords: "Water Treatment Plant Bhopal, WTP manufacturer Madhya Pradesh, Sewage Treatment Plant STP India, Effluent Treatment Plant ETP, Reverse Osmosis RO plant, SCADA automation company Bhopal, PLC panel manufacturers India, Industrial Automation Bhopal, Process Instrumentation India, Electromagnetic Flow Meter, Ultrasonic Level Transmitter, Electric Actuators, Orbit Engineering Solutions, Jal Jeevan Mission contractor, smart water management Bhopal",
    schemaType: 'LocalBusiness',
    heading: "Orbit Engineering Solutions | Water Treatment Plants, SCADA & Industrial Automation",
    intro: "India's premier water engineering and automation powerhouse since 1998. Trusted by MP Jal Nigam, MPUDCL, Bhopal Municipal Corporation, and leading industrial corporations across India.",
    highlights: [
      "Turnkey Water Treatment Plants (WTP) & Sewage Treatment Plants (STP)",
      "Industrial Effluent Treatment (ETP) & Commercial Reverse Osmosis (RO)",
      "SCADA Systems, PLC Automation Panels & IoT Telemetry Solutions",
      "Process Instrumentation: Flow Meters, Level Transmitters & Online Water Analyzers",
      "Electric Actuators, Industrial Butterfly Valves & Pipeline Jointing Systems",
      "₹200+ Crore delivered project portfolio with Triple ISO 9001, 14001, 45001 Certification"
    ]
  },
  {
    path: '/services',
    priority: '0.9',
    changefreq: 'monthly',
    title: "Water Engineering, SCADA & Automation Services | Orbit Engineering Solutions Bhopal",
    description: "Comprehensive water infrastructure services: WTP/STP turnkey design & commissioning, PLC panel manufacturing, SCADA software integration, IoT telemetry, Operation & Maintenance (O&M), and engineering consultancy in Bhopal and across India.",
    keywords: "water treatment services Bhopal, SCADA integration service, PLC programming India, O&M water treatment plant, water plant commissioning, automation consultancy, IoT water monitoring service, WTP services India, STP services Bhopal, instrumentation services",
    schemaType: 'Service',
    heading: "Comprehensive Water Infrastructure & Automation Services",
    intro: "From concept engineering and GPS surveys to turnkey commissioning and 24/7 Operation & Maintenance, Orbit Engineering Solutions delivers end-to-end engineering excellence.",
    highlights: [
      "Water Treatment Plants (WTP) & Sewage Treatment (STP) Design & EPC Execution",
      "Industrial Automation: Custom PLC Control Panels & SCADA Integration",
      "Real-time IoT Telemetry, Cloud Monitoring & Pumping Station Automation",
      "Comprehensive Operation & Maintenance (O&M) Contracts for Municipal & Industrial Plants",
      "Technical Consultancy, Feasibility Studies, Hydraulic Design & GPS Surveys",
      "Preventive Maintenance, System Upgrades, Sensor Calibration & Retrofit Engineering"
    ]
  },
  {
    path: '/products',
    priority: '0.9',
    changefreq: 'weekly',
    title: "Water Treatment & Industrial Automation Products | Orbit Engineering Solutions",
    description: "Explore our complete range of certified water treatment and process automation products: Electromagnetic flow meters, ultrasonic level transmitters, pressure sensors, online water quality analyzers, electric actuators, and PLC panels.",
    keywords: "flow meter manufacturer India, level transmitter dealer Bhopal, pressure transmitter India, water quality analyzer, electric valve actuators, chlorinators Bhopal, HDPE fittings, water automation products",
    schemaType: 'ProductCatalog',
    heading: "Industrial Grade Water Treatment & Process Automation Products",
    intro: "Industry-standard instrumentation, control valves, actuators, and water purification equipment engineered for extreme reliability in harsh municipal and industrial environments.",
    highlights: [
      "Electromagnetic, Bulk, Turbine & Vortex Flow Meters",
      "Ultrasonic, Hydrostatic & Capacitance Level Transmitters & Switches",
      "Smart Pressure Transmitters & Differential Pressure (DP) Sensors",
      "Online Water Quality Analyzers: pH, Turbidity, DO, BOD, COD & Chlorine",
      "Electric Multi-Turn & Part-Turn Valve Actuators",
      "Industrial Butterfly Valves, Sluice Valves, Motorized Ball Valves & HDPE Fittings",
      "Gas Chlorinators, Electro-Chlorination Systems & Chemical Dosing Units",
      "Industrial CCTV Surveillance, Jointing Machines, Transformers & Solar Panels"
    ]
  },
  {
    path: '/projects',
    priority: '0.8',
    changefreq: 'weekly',
    title: "Water Infrastructure & SCADA Projects Portfolio | Orbit Engineering Solutions",
    description: "View Orbit Engineering Solutions' ₹200+ Crore portfolio of landmark water supply schemes, automated pumping stations, and industrial treatment facilities delivered for MP Jal Nigam, MPUDCL, Bhopal Municipal Corporation, and Fortune 500 companies.",
    keywords: "Orbit Engineering projects, MP Jal Nigam water supply scheme, MPUDCL water projects, Bhopal Municipal Corporation SCADA, Jal Jeevan Mission contractor, water infrastructure case studies India",
    heading: "Landmark Water & Industrial Automation Projects Portfolio",
    intro: "Over 150 mega schemes delivered across India, impacting millions of lives with safe drinking water and intelligent automated pumping infrastructure.",
    highlights: [
      "Multi-MLD Municipal Water Treatment Plants with SCADA integration across Madhya Pradesh",
      "Jal Jeevan Mission Rural Piped Water Schemes with remote IoT solar telemetry",
      "Industrial Effluent Treatment Plants (ETP) for pharmaceutical and manufacturing plants",
      "Automated High-Capacity Pumping Stations with PLC panels and automated valves",
      "Real-time Lake & Reservoir Water Quality Monitoring networks",
      "Clients include MP Jal Nigam, MPUDCL, Bhopal Municipal Corp, BHEL, L&T, Lupin, and Prism Cement"
    ]
  },
  {
    path: '/about',
    priority: '0.8',
    changefreq: 'monthly',
    title: "About Orbit Engineering Solutions | 25+ Years Legacy in Water Infrastructure & Automation",
    description: "Established in 1998 in Bhopal, Orbit Engineering Solutions (formerly Orbit Engineering Group) has delivered ₹200+ Cr of water treatment & automation projects across India. Triple ISO Certified (ISO 9001:2015, ISO 14001:2015, ISO 45001:2018).",
    keywords: "about Orbit Engineering Solutions, Orbit Engineering history, water engineering company Bhopal, Triple ISO certified engineering company, Manoj Tiwari Orbit, Vijay Tiwari Orbit, water infrastructure legacy India",
    schemaType: 'Organization',
    heading: "About Orbit Engineering Solutions - 25+ Years of Engineering Legacy",
    intro: "Founded in 1998 in Bhopal, Orbit Engineering Solutions has grown into one of Central India's most trusted engineering conglomerates specializing in sustainable water treatment and cutting-edge industrial automation.",
    highlights: [
      "25+ Years of Proven Operational Legacy (Est. 1998 in Bhopal, MP)",
      "₹200+ Crore delivered project portfolio across rural and urban India",
      "Triple ISO Certified: ISO 9001:2015 (Quality), ISO 14001:2015 (Environment), ISO 45001:2018 (Health & Safety)",
      "Trusted by Government Leaders: MP Jal Nigam, MPUDCL, Bhopal Municipal Corp, WRD Bhopal",
      "In-house Engineering, SCADA Programming, Panel Fabrication, and Field Testing teams",
      "Offices in Bhopal: Char Imli, Arera Colony, and Katara Hills"
    ]
  },
  {
    path: '/contact',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Contact Orbit Engineering Solutions Bhopal | Free Engineering Consultation & Quote",
    description: "Contact Orbit Engineering Solutions for turnkey water treatment plants, SCADA automation, PLC panels, and instrumentation. Office: First Floor, Shalimar Enclave, 12/2, E-3, Arera Colony, Bhopal, MP. Phone: +91 70241 28029, +91 90390 75049.",
    keywords: "contact Orbit Engineering Solutions, Orbit Engineering Bhopal address, orbit engineering phone number, water treatment consultation Bhopal, SCADA automation quote MP, Bhopal engineering office",
    schemaType: 'LocalBusiness',
    heading: "Contact Orbit Engineering Solutions Bhopal",
    intro: "Get in touch with our technical engineering consultants for project feasibility, turnkey quotes, equipment supply, and 24/7 service support.",
    highlights: [
      "Head Office: First Floor, Shalimar Enclave, 12/2, E-3, Arera Colony, Bhopal, Madhya Pradesh – 462016, India",
      "Direct Sales & Technical Helpline: +91-70241-28029 | +91-9039075049",
      "Official Emails: info@orbitengineerings.com | sales@orbitengineerings.com | service@orbitengineerings.com",
      "Pan-India Service Coverage with rapid on-site field engineering support"
    ]
  },
  {
    path: '/solutions',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Water Treatment, SCADA & Solar FAQs | Orbit Engineering Solutions",
    description: "Expert answers to frequently asked questions regarding Water Treatment Plants (WTP), Sewage Treatment Plants (STP), Reverse Osmosis, SCADA systems, PLC panels, and solar energy solutions for water infrastructure.",
    keywords: "water treatment plant FAQ, WTP plant cost India, STP plant maintenance questions, SCADA automation benefits, solar water pumping questions India, water engineering solutions",
    schemaType: 'FAQPage',
    heading: "Water Treatment & Automation Engineering Solutions FAQ",
    intro: "Find answers to key technical questions about plant capacity design, regulatory compliance, automation ROI, solar integration, and maintenance strategies.",
    highlights: [
      "WTP Plant Capacity, Filtration Media & Potable Quality Compliance (IS 10500)",
      "Sewage Treatment (STP) Technologies: MBBR, SBR & MBR Comparison",
      "Effluent Treatment (ETP) Zero Liquid Discharge (ZLD) Systems",
      "SCADA & PLC Automation Architecture for Pumping Stations & Water Grids",
      "Solar Water Pumping Schemes under PM-KUSUM & Rural Drinking Water Guidelines",
      "Operation & Maintenance (O&M) Best Practices for Long-Term Asset Reliability"
    ]
  },
  {
    path: '/faq',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Company Facts & Frequently Asked Questions (FAQ) | Orbit Engineering Solutions",
    description: "Fact sheet and verified answers about Orbit Engineering Solutions (OES): capabilities in Water Treatment Plants (WTP, STP, RO, ETP), SCADA/PLC automation, operational footprint, and technical specifications.",
    keywords: "Orbit Engineering Solutions facts, OES FAQ, water treatment contractor Bhopal, SCADA automation company Madhya Pradesh, industrial automation facts",
    schemaType: 'FAQPage',
    heading: "Company Facts & Frequently Asked Questions (FAQ)",
    intro: "Verified company facts and technical answers regarding Orbit Engineering Solutions' turnkey water treatment and industrial automation capabilities.",
    highlights: [
      "What does Orbit Engineering Solutions do? Turnkey EPC water treatment and industrial automation.",
      "What kinds of plants does OES build? WTP (potable water), STP (domestic sewage), ETP (industrial effluents), and industrial RO.",
      "Are SCADA and PLC automation handled in-house? Yes, dedicated in-house programming, panel fabrication, and field integration.",
      "Is OES an approved government contractor? Yes, approved vendor and execution partner for UADD, MPUDCL, and MP Jal Nigam.",
      "When was OES founded? Established in 1998 in Bhopal by Manoj Tiwari (Founder & MD) and Vijay Tiwari (CTO), bringing 25+ years of water infrastructure leadership.",
      "Which geographical regions does OES serve? Headquartered in Bhopal, operating across Madhya Pradesh, Central India, and Pan-India.",
      "Process Instrumentation: Flow meters, level transmitters, pressure transmitters, water analyzers, and electric actuators."
    ]
  },
  {
    path: '/team',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Our Leadership & Engineering Team | Orbit Engineering Solutions Bhopal",
    description: "Meet the visionary leadership and technical experts at Orbit Engineering Solutions: Founder Manoj Tiwari, Chief Technology Officer Vijay Tiwari, and specialized engineering departments.",
    keywords: "Orbit Engineering leadership, Manoj Tiwari Bhopal, Vijay Tiwari CTO, water treatment engineers India, SCADA specialists Bhopal",
    heading: "Leadership & Technical Engineering Team",
    intro: "Led by industry veterans with over 25 years of hands-on execution in water treatment, electrical instrumentation, software architecture, and public utility projects.",
    highlights: [
      "Manoj Tiwari - Founder & Managing Director (Visionary infrastructure leader since 1998)",
      "Vijay Tiwari - Chief Technology Officer (Automation, SCADA & Embedded Systems Architect)",
      "Field Engineering & Commissioning Specialists across Madhya Pradesh & Central India",
      "Dedicated SCADA, PLC Software & Cloud IoT Telemetry Division"
    ]
  },
  {
    path: '/clients',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Our Clients & Partners | Trusted by Government & Industry Leaders Across India",
    description: "Orbit Engineering Solutions is the trusted engineering partner for MP Jal Nigam, MPUDCL, Bhopal Municipal Corporation, Indian Railways, L&T, BHEL, Lupin Pharmaceuticals, and Prism Cement.",
    keywords: "Orbit Engineering clients, MP Jal Nigam contractor, MPUDCL partner, Lupin Pharmaceuticals ETP, Prism Cement water treatment, water infrastructure clients India",
    heading: "Trusted by Government & Fortune 500 Industrial Leaders",
    intro: "Our client relationships are built on over two decades of technical precision, flawless project delivery, and uncompromising quality standards.",
    highlights: [
      "Government Utilities: MP Jal Nigam, MPUDCL Bhopal, Bhopal Municipal Corporation, WRD Bhopal",
      "Corporate Giants: Larsen & Toubro (L&T), Bharat Heavy Electricals Limited (BHEL), Indian Railways",
      "Industrial Clients: Lupin Pharmaceuticals, Prism Johnson Cement, Vindhyachal Distillery, Central India Pvt Ltd",
      "Infrastructure Partners: Dilip Buildcon Limited (DBL), Tejas Construction"
    ]
  },

  // -------------------------------------------------------------
  // Product Category Pages
  // -------------------------------------------------------------
  {
    path: '/products/flow-meters',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Electromagnetic & Bulk Flow Meters | Industrial Water Meters - Orbit Engineering",
    description: "High-accuracy electromagnetic flow meters, bulk flow meters, turbine flow meters, and vortex meters for raw water, treated water, sewage, and chemical slurry monitoring in Bhopal & Pan-India.",
    keywords: "electromagnetic flow meter India, bulk flow meter manufacturer Bhopal, turbine flow meter, vortex flow meter price, water flow meter supplier, industrial flow meter MP",
    heading: "Electromagnetic & Industrial Water Flow Meters",
    intro: "Engineered for high accuracy and long-term durability with zero moving parts, Faraday induction technology, and robust telemetry output for municipal water grids and industrial pipelines.",
    highlights: [
      "Electromagnetic Flow Meters: Line sizes DN15 to DN2000, high accuracy ±0.5%, conductive liquids",
      "Bulk Flow Meters: Positive displacement precision metering for bulk fluid transfer",
      "Turbine Flow Meters: Fast response, clean fluid metering with pulse/4-20mA output",
      "Vortex Flow Meters: Steam, gas, and low-viscosity liquid measurement with temperature compensation",
      "Smart Prepaid AMR/AMI Water Meters for municipal and commercial billing systems"
    ]
  },
  {
    path: '/products/analyzers',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Online Water Quality Analyzers (pH, Turbidity, BOD, COD, Chlorine) | Orbit Engineering",
    description: "Continuous online water analyzers for municipal WTP, STP, and industrial ETP: pH analyzers, turbidity transmitters, dissolved oxygen (DO), free/total chlorine analyzers, BOD & COD monitors.",
    keywords: "water quality analyzer India, online pH analyzer Bhopal, turbidity analyzer supplier, online COD BOD analyzer, chlorine transmitter, continuous water monitoring",
    heading: "Continuous Online Water Quality Analyzers & Transmitters",
    intro: "Real-time process analyzers compliant with CPCB and SPCB norms for continuous environmental monitoring and automated plant chemical dosing.",
    highlights: [
      "Online pH & ORP Transmitters with automatic temperature compensation and rugged electrodes",
      "Turbidity Analyzers: Nephelometric measurement for clarified and filtered water streams",
      "Chlorine Transmitters: Amperometric sensors for real-time free and total chlorine measurement",
      "Dissolved Oxygen (DO) Transmitters: Optical luminescence sensors for aeration basin control in STP",
      "Online BOD & COD Analyzers: UV-Vis spectroscopic and wet-chemical methods for effluent compliance"
    ]
  },
  {
    path: '/products/level-transmitters',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Level Transmitters & Level Switches (Ultrasonic, Hydrostatic, Radar) | Orbit Engineering",
    description: "Precision liquid level measurement: Non-contact ultrasonic level transmitters, submersible hydrostatic level transmitters, capacitance sensors, and conductive float switches.",
    keywords: "ultrasonic level transmitter India, hydrostatic level transmitter Bhopal, float level switch, capacitance level sensor, tank level monitoring, sump level sensor",
    heading: "Liquid Level Transmitters & Level Switches",
    intro: "Non-contact ultrasonic and submersible hydrostatic transmitters providing continuous level monitoring for water reservoirs, clear water sumps, intake wells, and chemical tanks.",
    highlights: [
      "Ultrasonic Level Transmitters: Non-contact range up to 30 meters with narrow beam angle",
      "Submersible Hydrostatic Level Transmitters: Heavy-duty ceramic diaphragm for deep borewells and intake sumps",
      "Capacitance Level Transmitters: Reliable measurement for high temperature and corrosive liquids",
      "Conductive & Float Level Switches: High/Low alarm automation for pump protection against dry run"
    ]
  },
  {
    path: '/products/pressure-sensors',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Industrial Pressure Transmitters & DP Sensors | Orbit Engineering Solutions",
    description: "Smart industrial pressure transmitters, differential pressure (DP) transmitters, and digital pressure sensors for water distribution pipelines, pumping stations, and filter monitoring.",
    keywords: "pressure transmitter supplier India, differential pressure transmitter Bhopal, digital pressure sensor, pipeline pressure monitoring, filter clogging sensor",
    heading: "Smart Industrial Pressure Transmitters & Sensors",
    intro: "HART-enabled digital pressure transmitters and differential pressure sensors for monitoring pipeline head loss, filter bed clogging, and pumping network pressure.",
    highlights: [
      "Smart Pressure Transmitters: Accuracy ±0.075%, 4-20mA HART protocol, IP67 housing",
      "Differential Pressure (DP) Transmitters: Sand filter bed differential pressure and orifice flow monitoring",
      "Blind & Display-Type Pressure Transmitters for hazardous and harsh industrial field environments",
      "Stainless Steel 316L wetted parts for maximum corrosion resistance in drinking water and chemicals"
    ]
  },
  {
    path: '/products/valves-piping',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Industrial Butterfly Valves, Sluice Valves & HDPE Piping | Orbit Engineering",
    description: "Heavy-duty valves for water infrastructure: Resilient seated butterfly valves, sluice valves, gate valves, motorized control valves, and HDPE electrofusion fittings in Bhopal.",
    keywords: "butterfly valve manufacturer India, sluice valve supplier Bhopal, motorized ball valve, gate valve water works, HDPE pipe fittings, electrofusion jointing",
    heading: "Heavy-Duty Water Valves & Piping Systems",
    intro: "High-integrity isolation and throttling valves engineered to meet AWWA, BS, and IS standards for water transmission pipelines and treatment plants.",
    highlights: [
      "Wafer & Lug Type Butterfly Valves: Sizes DN50 to DN1200 with manual gear or electric actuator",
      "Resilient Seated Sluice / Gate Valves for clear water transmission lines",
      "Motorized Modulating Control Valves for automated flow and pressure control",
      "HDPE Pipes & Electrofusion Fittings for leak-free, long-life distribution networks"
    ]
  },
  {
    path: '/products/automation',
    priority: '0.8',
    changefreq: 'monthly',
    title: "SCADA Systems, Industrial PLC Panels & IoT Water Telemetry | Orbit Engineering",
    description: "Turnkey automation engineering: Custom PLC panels (Siemens, Schneider, Rockwell), cloud SCADA software integration, RTU stations, and IoT telemetry for pumping stations and water schemes.",
    keywords: "SCADA system integrators Bhopal, PLC panel manufacturer Madhya Pradesh, RTU remote terminal unit, industrial automation contractor India, IoT water monitoring, Jal Jeevan Mission SCADA",
    heading: "Turnkey SCADA Systems, PLC Panels & IoT Telemetry",
    intro: "Smart water infrastructure automation bringing centralized control, real-time data logging, predictive maintenance, and cloud dashboards to municipal and industrial operations.",
    highlights: [
      "Custom PLC Automation Panels fabricated with IP55/IP65 sheet steel enclosures",
      "Centralized SCADA System Integration with mimic displays, trend graphs, and SMS/Email alarms",
      "Remote Terminal Units (RTU) with cellular 4G/5G, LoRa, and fiber optic communication",
      "Cloud-Based Water Management Platform for remote monitoring of distributed pumping schemes"
    ]
  },
  {
    path: '/products/electric-actuators',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Electric Multi-Turn & Part-Turn Valve Actuators | Orbit Engineering Solutions",
    description: "High-performance electric multi-turn and part-turn valve actuators for butterfly valves, gate valves, and sluice gates. Official distributor & integrator of Regada actuators in India.",
    keywords: "electric actuator manufacturer India, multi turn electric actuator, part turn actuator butterfly valve, motorized valve actuator Bhopal, Regada actuator distributor",
    heading: "Electric Multi-Turn & Part-Turn Valve Actuators",
    intro: "Precision motorized valve actuation providing smooth, fail-safe remote operation of isolation and control valves across high-pressure pipelines.",
    highlights: [
      "Part-Turn Electric Actuators: For butterfly valves and ball valves (torques up to 2000 Nm)",
      "Multi-Turn Electric Actuators: For sluice valves, gate valves, and penstocks (torques up to 10,000 Nm)",
      "Intelligent non-intrusive setup with local display, position feedback, and 4-20mA modulating control",
      "Explosion-proof and weatherproof IP67/IP68 enclosures for all outdoor operating conditions"
    ]
  },
  {
    path: '/products/solar',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Solar Water Pumping Systems & Solar Panels (PM-KUSUM) | Orbit Engineering",
    description: "Sustainable solar solutions for water infrastructure: Solar pumps, mono-crystalline & bifacial half-cut PV modules, floating solar plants, and smart solar street lighting in Bhopal, MP.",
    keywords: "solar pump installation Bhopal, PM KUSUM solar pump contractor, bifacial solar panels Madhya Pradesh, floating solar plant India, solar water treatment",
    heading: "Solar Water Pumping & Renewable Energy Systems",
    intro: "Clean solar power systems engineered to energize rural drinking water supply, agricultural irrigation, and municipal pumping stations off the grid.",
    highlights: [
      "Solar Water Pumping Systems (Surface & Submersible) compliant with PM-KUSUM guidelines",
      "High-Efficiency Mono-PERC Bifacial & Half-Cut Solar PV Modules",
      "Innovative Floating Solar Power Plants for reservoirs and water treatment basins",
      "Integrated Smart Solar Street Lighting with lithium batteries and automated dusk-to-dawn sensors"
    ]
  },
  {
    path: '/products/chlorination',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Gas Chlorination Systems, Electro-Chlorinators & Dosing Units | Orbit Engineering",
    description: "Safe water disinfection: Vacuum gas chlorinators, on-site sodium hypochlorite electrolysis generators (Chlorinsitu), and chemical dosing pumps for safe municipal drinking water.",
    keywords: "gas chlorinator manufacturer India, electro chlorination system, chlorine dosing system Bhopal, water disinfection equipment, sodium hypochlorite generator",
    heading: "Water Disinfection & Gas Chlorination Systems",
    intro: "Critical disinfection systems ensuring pathogen-free potable water compliance with Indian Standard IS 10500 for drinking water.",
    highlights: [
      "Vacuum-Operated Gas Chlorinators: Cylinder and tonner mounted safety systems up to 200 kg/hr",
      "Electro-Chlorination Electrolysis Systems (Chlorinsitu): On-site generation from salt water",
      "Automatic Chlorine Residual Transmitters and leak detection safety scrubbers",
      "Chemical Dosing Pumps for alum, lime, polyelectrolyte, and neutralizing chemicals"
    ]
  },
  {
    path: '/products/transformers',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Distribution Transformers, Auto-Transformers & SF6 Breakers | Orbit Engineering",
    description: "Electrical power infrastructure: Oil-cooled distribution transformers, auto-transformers, locomotive transformers, and SF6 circuit breakers for pumping stations and sub-stations.",
    keywords: "distribution transformer manufacturer India, auto transformer Bhopal, SF6 circuit breaker, electrical substation equipment, pumping station electricals",
    heading: "Industrial Electrical Power & Substation Equipment",
    intro: "High-reliability electrical distribution equipment delivering clean, uninterrupted power to mega water supply pumping stations and treatment plants.",
    highlights: [
      "Distribution Transformers: 11kV/33kV step-down transformers up to 5 MVA",
      "Auto-Transformers and Shunt Reactors for voltage regulation and line stabilization",
      "SF6 Gas-Insulated Circuit Breakers and HT Vacuum Circuit Breakers (VCB)",
      "Complete electrical turnkey substation installation, testing, and commissioning"
    ]
  },
  {
    path: '/products/jointing',
    priority: '0.7',
    changefreq: 'monthly',
    title: "HDPE Pipe Butt Fusion & Electrofusion Jointing Machines | Orbit Engineering",
    description: "Heavy-duty pipeline installation machines: Hydraulic butt fusion welding machines and electrofusion jointing units for HDPE pipelines up to 1200mm diameter.",
    keywords: "HDPE jointing machine price, butt fusion welding machine Bhopal, electrofusion machine India, pipe jointing contractor, HDPE pipeline welding",
    heading: "HDPE Pipeline Jointing & Welding Equipment",
    intro: "Precision jointing machines delivering high-tensile, leak-proof fusion joints on HDPE water supply and wastewater pressure pipelines.",
    highlights: [
      "Hydraulic Butt Fusion Jointing Machines: Pipe sizes 63mm to 1200mm",
      "Universal Electrofusion Jointing Machines with barcode scanning and welding log recording",
      "Pipe Scrapers, Alignment Clamps, and certified HDPE fusion technician training",
      "Rental and sales options for water pipeline contractors across India"
    ]
  },
  {
    path: '/products/cameras',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial CCTV & PTZ Vision Systems for Water Plants | Orbit Engineering",
    description: "High-definition industrial surveillance: PTZ dome cameras, bullet cameras, and high-speed monitoring systems for 24/7 security of water treatment plants, dams, and intake wells.",
    keywords: "industrial CCTV camera Bhopal, PTZ surveillance camera water plant, water infrastructure security systems, dam surveillance camera",
    heading: "Industrial CCTV & Plant Surveillance Systems",
    intro: "Ruggedized, weatherproof surveillance solutions for perimeter security, process monitoring, and remote facility inspection.",
    highlights: [
      "Long-Range PTZ Cameras with 30x/45x optical zoom and infrared night vision up to 200m",
      "IP67 Weatherproof and vandal-resistant dome and bullet cameras for outdoor intake structures",
      "Centralized NVR storage with remote mobile monitoring and SCADA integration"
    ]
  },
  {
    path: '/products/sdv',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Submersible Dredging Vehicle (SDV) | Underwater Silt Clearing Robot - Orbit Engineering",
    description: "Patented remote-operated submersible dredging vehicle (SDV) designed for desilting sedimentation tanks, clarifiers, and water intake wells without draining or interrupting water supply.",
    keywords: "submersible dredging vehicle, underwater silt removal robot India, clarifier desilting machine, reservoir dredging equipment, intake well desilting robot",
    heading: "Submersible Dredging Vehicle (SDV) - Underwater Desilting",
    intro: "Innovative robotic technology that desilts live water treatment clarifiers, reservoirs, and intake sumps safely from the surface without requiring plant shutdown.",
    highlights: [
      "Zero Downtime: Operates underwater while the water treatment plant remains online",
      "Remote Controlled Surface Console with live underwater video feed and sonar navigation",
      "Heavy-Duty Slurry Pumping: Removes heavy silt, sludge, and debris at high throughput",
      "Download official technical brochure and specification sheet on our website"
    ]
  },
  {
    path: '/products/scour-monitoring',
    priority: '0.8',
    changefreq: 'monthly',
    title: "Real-Time Scour Detection & Bridge Foundation Monitoring System | Orbit Engineering",
    description: "Acoustic and sonar real-time scour monitoring system protecting bridge piers, river dams, and underwater foundation structures from flood erosion and catastrophic collapse.",
    keywords: "bridge scour monitoring system India, real time scour detection, acoustic scour sensor, foundation scour monitoring, river bed erosion monitoring",
    heading: "Real-Time Scour Detection for Foundation Safety",
    intro: "Autonomous real-time sensor system continuously monitoring riverbed scour around bridge piers, providing early warnings before structural integrity is compromised.",
    highlights: [
      "Continuous Acoustic Sonar Measurement of riverbed sediment levels around piers",
      "Automated Flood Alert Warning System with solar power and cellular telemetry",
      "Non-intrusive underwater sensor deployment with zero maintenance requirement",
      "Compliant with Indian Road Congress (IRC) and Ministry of Road Transport bridge safety norms"
    ]
  },
  {
    path: '/products/air-quality-analyzers',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Continuous Ambient Air Quality Analyzers (PM2.5, PM10) | Orbit Engineering",
    description: "Continuous ambient air quality monitoring systems (CAAQMS) for PM2.5, PM10, and suspended particulate matter compliance for municipal and industrial zones.",
    keywords: "PM2.5 analyzer India, PM10 air quality monitor Bhopal, continuous ambient air monitoring CAAQMS, dust monitor",
    heading: "Ambient Air Quality & Dust Particulate Analyzers",
    intro: "High-precision optical particle counters providing continuous monitoring of respirable and fine particulate matter for environmental compliance.",
    highlights: [
      "Simultaneous Measurement of PM1, PM2.5, PM10, and Total Suspended Particulates (TSP)",
      "Automatic Humidity Conditioning with heated inlet to eliminate fog interference",
      "Direct Data Transmission to State Pollution Control Board (MPPCB) servers"
    ]
  },
  {
    path: '/products/gas-analyzers',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial Gas Analyzers (SOx, NOx, CO, CO2, Methane) | Orbit Engineering",
    description: "Flue gas and emission monitoring analyzers: SO2, NOx, CO, CO2, and Methane gas detectors for effluent plants, biogas units, and industrial stacks.",
    keywords: "flue gas analyzer India, SOx NOx analyzer supplier, methane gas analyzer Bhopal, industrial emission monitoring, biogas analyzer",
    heading: "Continuous Flue Gas & Industrial Emission Analyzers",
    intro: "Non-dispersive infrared (NDIR) and electrochemical analyzers for industrial combustion efficiency and continuous emission monitoring (CEMS).",
    highlights: [
      "Multi-Gas Measurement: SO2, NO, NO2, CO, CO2, O2, and Methane (CH4)",
      "Heated Sampling Lines and moisture conditioning sample cleanup systems",
      "Explosion-Proof Certified Enclosures for hazardous zone installation"
    ]
  },

  // Aliases for alternate URLs used in navigation and sitemap
  {
    path: '/products/levels',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Level Transmitters & Level Switches | Orbit Engineering",
    description: "Industrial liquid level transmitters and switches: Ultrasonic, hydrostatic, capacitance, and float level switches for tanks, sumps, and reservoirs.",
    keywords: "level transmitters India, level switch Bhopal, water level sensor",
    heading: "Level Transmitters & Switches",
    intro: "High-accuracy continuous level transmitters and level switches for water treatment and industrial storage tanks.",
    highlights: ["Ultrasonic Level Transmitters", "Hydrostatic Level Transmitters", "Capacitance Level Transmitters", "Conductive & Float Level Switches"]
  },
  {
    path: '/products/level-transmitter',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Ultrasonic & Hydrostatic Level Transmitters | Orbit Engineering",
    description: "Continuous liquid level measurement with non-contact ultrasonic and submersible hydrostatic transmitters.",
    keywords: "level transmitter India, ultrasonic level transmitter Bhopal, hydrostatic level sensor",
    heading: "Industrial Level Transmitters",
    intro: "Continuous level monitoring solutions for reservoirs, sumps, and tanks.",
    highlights: ["Non-contact Ultrasonic Transmitters", "Submersible Hydrostatic Transmitters"]
  },
  {
    path: '/products/level-switch',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Float & Conductive Level Switches | Orbit Engineering",
    description: "Reliable point level switches for automated pump start/stop and overflow protection in water and chemical tanks.",
    keywords: "level switch India, float level switch Bhopal, conductive level switch",
    heading: "Point Level Switches",
    intro: "Fail-safe high and low level detection switches for industrial tanks and sumps.",
    highlights: ["Float Level Switches", "Conductive Level Switches", "Coupling Level Switches"]
  },
  {
    path: '/products/pressure',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial Pressure Transmitters & Sensors | Orbit Engineering",
    description: "Digital pressure transmitters and differential pressure sensors for pipelines and pumping stations.",
    keywords: "pressure transmitter Bhopal, differential pressure sensor India",
    heading: "Pressure Transmitters & Sensors",
    intro: "Precision pressure measurement instruments for water pipelines and industrial processes.",
    highlights: ["Smart Pressure Transmitters", "Differential Pressure Transmitters", "Digital Pressure Transmitters"]
  },
  {
    path: '/products/pressure-transmitter',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Smart Digital Pressure Transmitters | Orbit Engineering",
    description: "HART-enabled digital pressure transmitters for accurate pipeline pressure monitoring.",
    keywords: "pressure transmitter supplier India, smart pressure transmitter",
    heading: "Smart Pressure Transmitters",
    intro: "High-precision pressure transmitters with 4-20mA HART communication.",
    highlights: ["Smart Gauge Pressure Transmitters", "Blind-Type Pressure Transmitters", "Display Pressure Transmitters"]
  },
  {
    path: '/products/pressure-sensor',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial Pressure Sensors & Transducers | Orbit Engineering",
    description: "Rugged industrial pressure sensors and transducers for pump discharge lines and hydraulic circuits.",
    keywords: "pressure sensor Bhopal, industrial pressure transducer",
    heading: "Industrial Pressure Sensors",
    intro: "Continuous pressure sensing for automation and SCADA integration.",
    highlights: ["Piezoelectric Pressure Sensors", "Differential Pressure Sensors"]
  },
  {
    path: '/products/valves',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial Water Valves & Actuated Valves | Orbit Engineering",
    description: "Complete valve solutions: Butterfly valves, gate valves, sluice valves, and motorized valves.",
    keywords: "water valves manufacturer India, butterfly valve Bhopal",
    heading: "Industrial Valves & Actuation",
    intro: "Heavy-duty valves for municipal water supply schemes and industrial plants.",
    highlights: ["Butterfly Valves", "Motorized Ball Valves", "Sluice & Gate Valves", "Control Valves"]
  },
  {
    path: '/products/actuators',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Electric Valve Actuators (Multi-Turn & Part-Turn) | Orbit Engineering",
    description: "Electric multi-turn and part-turn valve actuators for automated pipeline control.",
    keywords: "electric valve actuator India, motorized valve actuator Bhopal",
    heading: "Electric Valve Actuators",
    intro: "High-torque motorized actuators for isolation and control valves.",
    highlights: ["Part-Turn Actuators", "Multi-Turn Actuators", "Intelligent Modulating Controls"]
  },
  {
    path: '/products/part-turn-actuators',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Electric Part-Turn Valve Actuators | Orbit Engineering",
    description: "Electric part-turn actuators for 90-degree rotation of butterfly valves and ball valves.",
    keywords: "part turn electric actuator, butterfly valve actuator India",
    heading: "Part-Turn Electric Actuators",
    intro: "Compact, high-torque 90-degree actuators for butterfly and ball valves.",
    highlights: ["Regada Part-Turn Actuators", "Torque up to 2000 Nm", "Fail-safe operation"]
  },
  {
    path: '/products/multi-turn-actuators',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Electric Multi-Turn Valve Actuators | Orbit Engineering",
    description: "Heavy-duty multi-turn electric actuators for sluice valves, gate valves, and penstocks.",
    keywords: "multi turn electric actuator, sluice valve actuator India",
    heading: "Multi-Turn Electric Actuators",
    intro: "Heavy-duty multi-turn actuators designed for high thrust and long travel valves.",
    highlights: ["Regada Multi-Turn Series", "Torque up to 10,000 Nm", "Non-intrusive setup"]
  },
  {
    path: '/products/chlorinators',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Gas Chlorinators & Electro-Chlorination Systems | Orbit Engineering",
    description: "Disinfection solutions: Vacuum gas chlorinators, on-site electrochlorinators, and dosing pumps.",
    keywords: "chlorinators India, gas chlorinator Bhopal, water disinfection",
    heading: "Water Chlorinators & Disinfection",
    intro: "Proven chlorination systems ensuring safe, microbial-free drinking water.",
    highlights: ["Gas Chlorinators", "Electro-Chlorination Systems", "Dosing Systems"]
  },
  {
    path: '/products/solar-modules',
    priority: '0.7',
    changefreq: 'monthly',
    title: "High-Efficiency Solar PV Modules & Pumping | Orbit Engineering",
    description: "Mono-PERC half-cut and bifacial solar modules for industrial power and PM-KUSUM pumping.",
    keywords: "solar modules Bhopal, bifacial solar panels India, solar pump",
    heading: "Solar PV Modules & Solar Pumping",
    intro: "High-efficiency solar photovoltaic modules for sustainable power generation.",
    highlights: ["Mono-PERC Half-Cut Modules", "Bifacial Solar Panels", "Floating Solar Systems"]
  }
];

// Helper to inject SEO tags and semantic pre-rendered HTML into HTML template
function createPageHtml(templateHtml, route) {
  let html = templateHtml;

  // 1. Replace <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  // 2. Replace meta title
  html = html.replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/is, `<meta name="title" content="${route.title}" />`);

  // 3. Replace meta description
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/is, `<meta name="description" content="${route.description}" />`);

  // 4. Replace meta keywords
  if (route.keywords) {
    html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/?>/is, `<meta name="keywords" content="${route.keywords}" />`);
  }

  // 5. Replace canonical URL
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/is, `<link rel="canonical" href="${canonicalUrl}" />`);

  // 6. Replace OpenGraph tags
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/is, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/is, `<meta property="og:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/is, `<meta property="og:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/is, `<meta property="og:image" content="${BASE_URL}/og-image.png" />`);

  // 7. Replace Twitter tags
  html = html.replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:title" content="${route.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:description" content="${route.description}" />`);
  html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/is, `<meta name="twitter:image" content="${BASE_URL}/og-image.png" />`);

  // 8. Fix schema logo and image
  html = html.replace(/"logo":\s*"https:\/\/www\.orbitengineerings\.com\/[^"]*"/g, `"logo": "${BASE_URL}/orbit-logo.png"`);
  html = html.replace(/"image":\s*"https:\/\/www\.orbitengineerings\.com\/[^"]*"/g, `"image": "${BASE_URL}/og-image.png"`);

  // 9. Inject specific BreadcrumbList schema for subpages
  if (route.path !== '/') {
    const segments = route.path.split('/').filter(Boolean);
    const breadcrumbs = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` }
    ];
    let currentPath = '';
    segments.forEach((seg, idx) => {
      currentPath += `/${seg}`;
      const name = seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      breadcrumbs.push({
        "@type": "ListItem",
        "position": idx + 2,
        "name": name,
        "item": `${BASE_URL}${currentPath}`
      });
    });

    const breadcrumbSchema = `
  <!-- Structured Data: BreadcrumbList for this page -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": ${JSON.stringify(breadcrumbs, null, 2)}
  }
  </script>`;
    html = html.replace('</head>', `${breadcrumbSchema}\n</head>`);
  }

  // 9. Pre-rendered crawlable HTML inside #root
  const semanticContent = `
    <header style="padding: 20px; border-bottom: 1px solid #eee;">
      <h1>${route.heading || route.title}</h1>
      <nav>
        <a href="/">Home</a> | <a href="/services">Services</a> | <a href="/products">Products</a> | <a href="/projects">Projects</a> | <a href="/about">About Us</a> | <a href="/contact">Contact</a>
      </nav>
    </header>
    <main style="padding: 20px; max-width: 1200px; margin: auto;">
      <section>
        <p style="font-size: 1.1rem; line-height: 1.6;">${route.intro || route.description}</p>
      </section>
      ${route.highlights && route.highlights.length ? `
      <section style="margin-top: 20px;">
        <h2>Key Capabilities & Technical Highlights</h2>
        <ul>
          ${route.highlights.map(h => `<li style="margin-bottom: 8px;"><strong>${h.split(':')[0]}</strong>${h.includes(':') ? ':' + h.split(':').slice(1).join(':') : ''}</li>`).join('\n          ')}
        </ul>
      </section>` : ''}
      <section style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
        <h3>Contact Orbit Engineering Solutions</h3>
        <p>Head Office: First Floor, Shalimar Enclave, 12/2, E-3, Arera Colony, Bhopal, Madhya Pradesh – 462016</p>
        <p>Phone: +91-70241-28029 / +91-9039075049 | Email: info@orbitengineerings.com | sales@orbitengineerings.com</p>
        <p><a href="/contact" style="display: inline-block; padding: 10px 20px; background-color: #0073bc; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Request a Technical Quote</a></p>
      </section>
    </main>`;

  // Replace fallback content inside #root
  html = html.replace(
    /<!-- Pre-rendered semantic content for search engine crawlers -->[\s\S]*?<\/main>/,
    `<!-- Pre-rendered semantic content for search engine crawlers -->${semanticContent}`
  );

  return html;
}

// Main execution function
function main() {
  console.log('🚀 Starting Static Route Generation for SEO (SSG)...');

  if (!fs.existsSync(distDir)) {
    console.error(`❌ Dist directory not found at ${distDir}. Run 'npm run build' first.`);
    process.exit(1);
  }

  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Template dist/index.html not found.`);
    process.exit(1);
  }

  const baseTemplateHtml = fs.readFileSync(templatePath, 'utf8');

  let generatedCount = 0;

  // Process each route
  routes.forEach((route) => {
    const pageHtml = createPageHtml(baseTemplateHtml, route);

    let targetFile;
    if (route.path === '/') {
      targetFile = path.resolve(distDir, 'index.html');
    } else {
      const routeDir = path.resolve(distDir, route.path.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFile = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    generatedCount++;
    console.log(`  ✓ Generated: ${route.path} -> ${path.relative(projectRoot, targetFile)}`);
  });

  // Generate XML Sitemap with all routes and image extensions
  console.log('\n📄 Generating Comprehensive XML Sitemap...');

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  routes.forEach((route) => {
    const loc = `${BASE_URL}${route.path === '/' ? '/' : route.path}`;
    sitemapXml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || '0.7'}</priority>
    <image:image>
      <image:loc>${BASE_URL}/og-image.png</image:loc>
      <image:title>${route.title.replace(/&/g, '&amp;')}</image:title>
    </image:image>
  </url>
`;
  });

  sitemapXml += `</urlset>\n`;

  // Write sitemap to dist/ and public/
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`  ✓ Sitemap written to dist/sitemap.xml and public/sitemap.xml (${routes.length} URLs indexed)`);

  // Ensure robots.txt is present in dist
  const publicRobots = path.resolve(publicDir, 'robots.txt');
  const distRobots = path.resolve(distDir, 'robots.txt');
  if (fs.existsSync(publicRobots)) {
    fs.copyFileSync(publicRobots, distRobots);
    console.log(`  ✓ Copied public/robots.txt to dist/robots.txt`);
  }

  console.log(`\n🎉 Successfully pre-rendered ${generatedCount} static routes! All pages will now return HTTP 200 OK on GitHub Pages without 404s!`);
}

main();
