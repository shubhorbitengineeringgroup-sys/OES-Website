import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { legalPages, business } from '../src/data/legalContent.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const publicDir = path.resolve(projectRoot, 'public');

const BASE_URL = 'https://orbitengineerings.com';


// Define all routes with rich SEO data and pre-rendered semantic HTML
const routes = [
  {
    "path": "/",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Orbit Engineering Solutions | Water Treatment, SCADA & PLC Automation - Bhopal",
    "description": "Water treatment, SCADA/PLC automation, instrumentation and solar project services from Bhopal, India. Contact Orbit Engineering Solutions for a B2B inquiry.",
    "heading": "Orbit Engineering Solutions",
    "intro": "Vijay Kumar Tiwari trades as Orbit Engineering Solutions, a Bhopal-based sole proprietorship providing water infrastructure and automation services.",
    "highlights": [
      "Water treatment: WTP, STP, ETP and RO systems",
      "PLC, SCADA, RTU and IoT integration",
      "Flow, level, pressure and water-quality instrumentation",
      "Project-specific design, installation, commissioning and maintenance"
    ]
  },
  {
    "path": "/services",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Water Engineering & Automation Services | Orbit Engineering Solutions",
    "description": "Engineering, installation, commissioning, instrumentation, SCADA/PLC integration and maintenance services, subject to agreed scope.",
    "heading": "Water Infrastructure & Automation Services",
    "intro": "Discuss your source water, process, site, equipment and project requirements with our technical team.",
    "highlights": [
      "Water treatment and wastewater engineering",
      "Control panels and industrial automation",
      "Telemetry and remote monitoring",
      "Installation, commissioning and maintenance under agreed terms"
    ]
  },
  {
    "path": "/products",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Water Treatment & Automation Catalogue | Orbit Engineering Solutions",
    "description": "Explore indicative water treatment, automation and instrumentation equipment. Confirm model, datasheet, certifications and terms in a written quotation.",
    "heading": "Products & Solutions",
    "intro": "A B2B catalogue for discussing equipment requirements, with no online checkout or payment facility.",
    "highlights": [
      "Flow, level, pressure and water-quality instruments",
      "Valves, actuators and chlorinators",
      "PLC, RTU and SCADA equipment",
      "Solar equipment, transformers and jointing machines"
    ]
  },
  {
    "path": "/projects",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Water Infrastructure Project References | Orbit Engineering Solutions",
    "description": "Selected portfolio references in water infrastructure, instrumentation and automation. Confirm OES scope, current status and documentary evidence with the team.",
    "heading": "Project References",
    "intro": "Portfolio references identify relevant schemes and end-clients. They do not imply endorsement, direct appointment or responsibility for an entire project.",
    "highlights": [
      "Water treatment and supply scheme automation",
      "Industrial instrumentation and control systems",
      "PLC, SCADA and telemetry integration",
      "Project scope and records available for discussion"
    ]
  },
  {
    "path": "/about",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "About Orbit Engineering Solutions | Water Engineering in Bhopal",
    "description": "Orbit Engineering Solutions is the trading name of Vijay Kumar Tiwari, a sole proprietor based in Bhopal, providing water engineering and automation services.",
    "heading": "About Orbit Engineering Solutions",
    "intro": "Our work includes water treatment, process instrumentation, automation and project services. Confirm the contracted scope and required documentation for your requirement.",
    "highlights": [
      "Operator: Vijay Kumar Tiwari, trading as Orbit Engineering Solutions",
      "Entity: Sole proprietorship",
      "Business address: GF, E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043, India",
      "Current certification documents and scope must be requested from the team"
    ]
  },
  {
    "path": "/contact",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Contact Orbit Engineering Solutions | Bhopal",
    "description": "Contact Orbit Engineering Solutions at GF, E-45, Pride City, Katara Hills, Bhopal 462043 for a B2B engineering inquiry.",
    "heading": "Contact Orbit Engineering Solutions",
    "intro": "Send a project inquiry or ask our team for a written quotation. Response times and service arrangements depend on the request and agreed scope.",
    "highlights": [
      "Business address: GF, E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043, India",
      "Phone: +91 70241 28029; +91 9039075049",
      "Email: info@orbitengineerings.com; service@orbitengineerings.com"
    ]
  },
  {
    "path": "/solutions",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Business & Technical FAQ | Orbit Engineering Solutions",
    "description": "General answers about water treatment, SCADA/PLC automation, instrumentation and project inquiries.",
    "heading": "Frequently Asked Questions",
    "intro": "Technical catalogue information is indicative. Confirm current manufacturer documents, application suitability and commercial terms with the team.",
    "highlights": [
      "Operator: Vijay Kumar Tiwari, trading as Orbit Engineering Solutions, a sole proprietorship",
      "Water treatment, instrumentation and industrial automation services",
      "Approvals and tender eligibility require project-specific supporting documents",
      "Warranty, delivery and maintenance depend on the written quotation or contract"
    ]
  },
  {
    "path": "/faq",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Business & Technical FAQ | Orbit Engineering Solutions",
    "description": "General answers about water treatment, SCADA/PLC automation, instrumentation and project inquiries.",
    "heading": "Frequently Asked Questions",
    "intro": "Technical catalogue information is indicative. Confirm current manufacturer documents, application suitability and commercial terms with the team.",
    "highlights": [
      "Operator: Vijay Kumar Tiwari, trading as Orbit Engineering Solutions, a sole proprietorship",
      "Water treatment, instrumentation and industrial automation services",
      "Approvals and tender eligibility require project-specific supporting documents",
      "Warranty, delivery and maintenance depend on the written quotation or contract"
    ]
  },
  {
    "path": "/team",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Our Team | Orbit Engineering Solutions",
    "description": "Meet the engineering and business team at Orbit Engineering Solutions, operated by proprietor Vijay Kumar Tiwari in Bhopal.",
    "heading": "Our Team",
    "intro": "Engineering, project coordination and business support for water infrastructure and automation.",
    "highlights": [
      "Vijay Kumar Tiwari: Proprietor",
      "Manoj Tiwari: Project Management",
      "Water engineering, automation and project support"
    ]
  },
  {
    "path": "/clients",
    "priority": "0.8",
    "changefreq": "monthly",
    "title": "Organisation & Project References | Orbit Engineering Solutions",
    "description": "Organisations identified in selected portfolio references. Confirm the relationship, scope and supporting records with our team.",
    "heading": "Organisation & Project References",
    "intro": "Organisation names identify portfolio references. They do not imply endorsement, partnership, direct appointment or responsibility for an entire project.",
    "highlights": [
      "Contact the team for relevant scope and supporting records",
      "Third-party trademarks belong to their respective owners"
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
    intro: "High-integrity isolation and throttling valves with applicable AWWA, BS and IS requirements to be confirmed for the selected model for water transmission pipelines and treatment plants.",
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
    intro: "Precision motorized valve actuation providing smooth, remote operation with project-specific interlocks of isolation and control valves across high-pressure pipelines.",
    highlights: [
      "Part-Turn Electric Actuators: For butterfly valves and ball valves (torques up to 2000 Nm)",
      "Multi-Turn Electric Actuators: For sluice valves, gate valves, and penstocks (torques up to 10,000 Nm)",
      "Intelligent non-intrusive setup with local display, position feedback, and 4-20mA modulating control",
      "Confirm hazardous-area and weather-protection requirements against the selected model"
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
    description: "Water disinfection equipment: Vacuum gas chlorinators, on-site sodium hypochlorite electrolysis generators (Chlorinsitu), and chemical dosing pumps for municipal water treatment, subject to treatment design and testing.",
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
    intro: "High-reliability electrical distribution equipment delivering electrical power to mega water supply pumping stations and treatment plants.",
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
      "Pipe Scrapers, Alignment Clamps, and HDPE fusion operator training under agreed scope",
      "Rental and sales options for water pipeline contractors across India"
    ]
  },
  {
    path: '/products/cameras',
    priority: '0.7',
    changefreq: 'monthly',
    title: "Industrial CCTV & PTZ Vision Systems for Water Plants | Orbit Engineering",
    description: "High-definition industrial surveillance: PTZ dome cameras, bullet cameras, and high-speed monitoring systems for surveillance of water treatment plants, dams, and intake wells.",
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
    description: "Remote-operated submersible dredging vehicle (SDV) designed for desilting sedimentation tanks, clarifiers, and water intake wells with operating arrangements subject to site assessment.",
    keywords: "submersible dredging vehicle, underwater silt removal robot India, clarifier desilting machine, reservoir dredging equipment, intake well desilting robot",
    heading: "Submersible Dredging Vehicle (SDV) - Underwater Desilting",
    intro: "Remote-operated equipment for desilting clarifiers, reservoirs and intake sumps. Site conditions and operating procedures determine deployment requirements.",
    highlights: [
      "Deployment: shutdown and isolation requirements depend on the site assessment",
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
    description: "Acoustic and sonar real-time scour monitoring system for monitoring bridge piers, river dams and underwater foundations.",
    keywords: "bridge scour monitoring system India, real time scour detection, acoustic scour sensor, foundation scour monitoring, river bed erosion monitoring",
    heading: "Real-Time Scour Detection for Foundation Safety",
    intro: "Autonomous real-time sensor system continuously monitoring riverbed scour around bridge piers, supporting monitoring and inspection; it does not determine structural safety.",
    highlights: [
      "Continuous Acoustic Sonar Measurement of riverbed sediment levels around piers",
      "Automated Flood Alert Warning System with solar power and cellular telemetry",
      "Underwater sensor deployment with a project-specific inspection and maintenance plan",
      "Assess applicable bridge-monitoring standards and obtain project-specific documentation"
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
      "Hazardous-area enclosures require model-specific certification and suitability checks"
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
    intro: "High and low level detection switches for industrial tanks and sumps.",
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
    highlights: ["Regada Part-Turn Actuators", "Torque up to 2000 Nm", "Confirm required interlocks and failure response"]
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
    intro: "Chlorination equipment selected for the treatment design, with appropriate dosing control, maintenance and water testing.",
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

// Legal content is shared with the React pages and consent notices.
routes.push(...legalPages.map((page) => ({ ...page, heading: page.title, intro: page.description, priority: '0.5', changefreq: 'monthly' })));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function renderSections(sections) {
  return sections.map((section) => `<section><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.items?.length ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}</section>`).join('');
}

function createPageHtml(templateHtml, route) {
  let html = templateHtml;
  const canonicalPath = route.path === '/solutions' ? '/faq' : route.path;
  const canonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '/' : canonicalPath + '/'}`;
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`);
  const tags = [
    ['name', 'title', route.title], ['name', 'description', route.description],
    ['property', 'og:title', route.title], ['property', 'og:description', route.description],
    ['property', 'og:url', canonicalUrl], ['name', 'twitter:title', route.title],
    ['name', 'twitter:description', route.description], ['name', 'twitter:url', canonicalUrl],
  ];
  if (route.keywords) tags.push(['name', 'keywords', route.keywords]);
  for (const [attribute, name, value] of tags) {
    const pattern = new RegExp(`<meta\\s+${attribute}="${name}"\\s+content="[^"]*"\\s*/?>`, 'is');
    html = html.replace(pattern, () => `<meta ${attribute}="${name}" content="${escapeHtml(value)}" />`);
  }
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/is, `<link rel="canonical" href="${canonicalUrl}" />`);
  // The shared template's homepage FAQ is not a FAQ for unrelated routes.
  if (!['/', '/faq', '/solutions'].includes(route.path)) {
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (script) => script.includes('"FAQPage"') || script.includes('"BreadcrumbList"') ? '' : script);
  }
  if (route.path !== '/') {
    let currentPath = '';
    const breadcrumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` }];
    canonicalPath.split('/').filter(Boolean).forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({ '@type': 'ListItem', position: index + 2, name: segment.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), item: `${BASE_URL}${currentPath}/` });
    });
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs })}</script>\n</head>`);
  }
  const legalLinks = legalPages.map((page) => `<a href="${escapeHtml(page.path)}/">${escapeHtml(page.title)}</a>`).join(' | ');
  const details = route.sections
    ? renderSections(route.sections)
    : `${route.highlights?.length ? `<section><h2>Information</h2><ul>${route.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>` : ''}${route.path.startsWith('/products') ? '<p>Catalogue descriptions, images and technical values are indicative and may vary by manufacturer and model. Confirm current datasheets, certification documents, application suitability, availability and warranty terms in the written quotation.</p>' : ''}`;
  const productNavigation = route.sections ? '' : `<nav aria-label="Product categories"><h2>Explore our products</h2><ul>${routes.filter((item) => item.path.startsWith('/products/') && item.path !== route.path).map((item) => `<li><a href="${escapeHtml(item.path)}/">${escapeHtml(item.heading || item.title)}</a></li>`).join('')}</ul></nav>`;
  const semanticContent = `
    <header><h1>${escapeHtml(route.heading || route.title)}</h1><nav><a href="/">Home</a> | <a href="/services/">Services</a> | <a href="/products/">Products</a> | <a href="/projects/">Projects</a> | <a href="/about/">About</a> | <a href="/contact/">Contact</a></nav></header>
    <main><p>${escapeHtml(route.intro || route.description)}</p>${details}${productNavigation}
    <section><h2>Contact Orbit Engineering Solutions</h2><p>${escapeHtml(business.operator)} (${escapeHtml(business.entityType)})</p><p>${escapeHtml(business.address)}</p><p>Phone: ${escapeHtml(business.phone)} | Email: ${escapeHtml(business.grievanceEmail)}</p><p><a href="/contact/">Discuss a B2B requirement</a></p></section>
    <nav aria-label="Legal information">${legalLinks}</nav></main>`;
  return html.replace(/<!-- Pre-rendered semantic content for search engine crawlers -->[\s\S]*?<\/main>/, `<!-- Pre-rendered semantic content for search engine crawlers -->${semanticContent}`);
}

function main() {
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) throw new Error('Run the Vite build before generating static routes.');
  const templateHtml = fs.readFileSync(templatePath, 'utf8');
  for (const route of routes) {
    const directory = route.path === '/' ? distDir : path.resolve(distDir, route.path.replace(/^\//, ''));
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), createPageHtml(templateHtml, route), 'utf8');
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${routes.filter((route) => route.path !== '/solutions').map((route) => `<url><loc>${BASE_URL}${route.path === '/' ? '/' : route.path + '/'}</loc><changefreq>${route.changefreq || 'monthly'}</changefreq><priority>${route.priority || '0.7'}</priority><image:image><image:loc>${BASE_URL}/og-image.png</image:loc><image:title>${escapeHtml(route.title)}</image:title></image:image></url>`).join('')}</urlset>\n`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  const robots = path.join(publicDir, 'robots.txt');
  if (fs.existsSync(robots)) fs.copyFileSync(robots, path.join(distDir, 'robots.txt'));
  console.log(`Generated ${routes.length} static routes, including shared legal content, and sitemap.`);
}

main();
