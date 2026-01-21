// Product images
import bulkFlowMeter from '../assets/products/bulk-flow-meter.jpg';
import electromagneticFlowMeter from '../assets/products/electromagnetic-flow-meter.jpg';
import ultrasonicLevelTx from '../assets/products/ultrasonic-level-tx.jpg';
import waterMeter from '../assets/products/water-meter.jpg';
import chlorineTransmitter from '../assets/products/chlorine-transmitter-new.jpg';
import doTransmitter from '../assets/products/do-transmitter.png';
import phAnalyzer from '../assets/products/ph-analyzer.png';
import turbidityTransmitter from '../assets/products/turbidity-transmitter.png';
import differentialPressureTransmitter from '../assets/products/differential-pressure-transmitter.jpg';
import smartTypePressureTransmitter from '../assets/products/smart-type-pressure-transmitter.jpg';
import hydrostaticLevelTx from '../assets/products/hydrostatic-level-tx.jpg';
import capacitanceLevelTransmitter from '../assets/products/capacitance-level-transmitter.jpg';
import conductiveLevelSwitch from '../assets/products/conductive-level-switch.jpg';
import floatLevelSwitch from '../assets/products/float-level-switch.jpg';
import blindTypePressureTransmitters from '../assets/products/blind-type-pressure-transmitters.jpg';
import butterflyValves from '../assets/products/butter-fly-valves.jpg';
import gateValve from '../assets/products/gate-valve.jpg';
import motorizedBallValve from '../assets/products/motorized-ball-valve.jpg';
import sluceValves from '../assets/products/sluce-valves.jpg';
import rtu from '../assets/products/rtu-remote.png';
import scada from '../assets/products/scada.jpg';
import iot from '../assets/products/iot.png';
import servers from '../assets/products/servers.jpg';
import softwares from '../assets/products/softwares.jpg';
import bulletCamera from '../assets/products/bullet-camera.jpg';
import domeCamera from '../assets/products/dome-camera.jpg';
import highSpeedCamera from '../assets/products/high-speed-camera.jpg';
import ptzCamera from '../assets/products/ptz-camera.jpg';
import bigJointingMachines from '../assets/products/big-jointing-machines.jpg';
import weldingMachine from '../assets/products/welding_machine.jpg';
import electrofusionJointingMachine from '../assets/products/electrofusion.jpeg';
import hdpeFittings from '../assets/products/hdpe-fittings.jpg';
import chlorinator from '../assets/products/chlorinator.png';
import plc from '../assets/products/plc.png';
import autoTransformer from '../assets/products/auto-transformer.png';
import distributionTransformer from '../assets/products/distribution-transformer.png';
import shuntReactor from '../assets/products/shunt-reactor.png';
import locomotiveTransformer from '../assets/products/locomotive-transformer.png';
import sf6CircuitBreaker from '../assets/products/sf6-circuit-breaker.png';
import solarStreetLight from '../assets/products/smart-solar-street-light.png';
import solarPanel from '../assets/products/solar-panel.jpg';



export const RAW_SUB_PRODUCTS = [
  {
    category: 'Flow Meters',
    items: [
      {
        name: 'Bulk Flow Meter',
        image: bulkFlowMeter,
        datasheetUrl: '/datasheets/bulk-flow-meter.pdf',
        paragraphs: [
          'The bulk flow meter is precision made positive displacement liquid measuring instruments which maintain accurate metering over long periods of operation. The simplicity of design and construction together with the sustained accuracy has led to widespread use.'
        ],
        bullets: [
          'Serviceability: Designed for quick and easy maintenance',
          'Automatic additive injector available',
          'Electronic control available'
        ]
      },
      {
        name: 'Electromagnetic Flow Meter',
        image: electromagneticFlowMeter,
        datasheetUrl: '/datasheets/electromagnetic-flow-meter.pdf',
        paragraphs: [
          'Electromagnetic flow meters (or magmeters) are a type of velocity or volumetric flow meter that operate pursuant to Faraday\'s law of electromagnetic induction – which states that a voltage will be induced when a conductor moves through a magnetic field. Magmeters can detect the flow rate of conductive fluids only.'
        ],
        bullets: [
          'No moving parts',
          'High accuracy for conductive fluids',
          'Operates on Faraday\'s law of electromagnetic induction'
        ]
      },
      {
        name: 'Open Channel Ultrasonic Flow Meter',
        image: ultrasonicLevelTx,
        datasheetUrl: '/datasheets/ultrasonic-flow-meter.pdf',
        paragraphs: [
          'An ultrasonic flow meter is a type of flow meter that measures the velocity of a fluid with ultrasound to calculate volume flow. Using ultrasonic transducers the flow meter can measure the average velocity along the path of an emitted beam.'
        ],
        bullets: [
          'Non-contact measurement',
          'No moving parts',
          'Low maintenance costs',
          'Affected by acoustic properties of fluid'
        ]
      },
      {
        name: 'Water Meter',
        image: waterMeter,
        datasheetUrl: '/datasheets/water-meter.pdf',
        paragraphs: [
          'Water metering is the practice of measuring water use. Water meters measure the volume of water used by residential and commercial building units that are supplied with water by a public water supply system. They are also used to determine flow.'
        ],
        bullets: [
          'Residential/Commercial use',
          'Accurate billing measurement',
          'Available in cubic meters or gallons',
          'Rate-of-flow display'
        ]
      }
    ]
  },
  {
    category: 'Analyzers & Transmitters',
    items: [
      {
        name: 'Total Chlorine Transmitter/Controller',
        image: chlorineTransmitter,
        bullets: [
          'Up to four analysis inputs in any combination for direct connection of sensors for liquid analysis',
          'Up to 21 further measuring signals can be connected either directly or via interface',
          'Interfaces: USB host USB device Modbus PROFIBUS DP Ethernet',
          'Ethernet function: web server alarm alerts by email setup per PC readout of recorded measurement data',
          'Vibrant TFT color graphics screen with 5.5″ diagonal screen sizes 320 × 240 pixels and 256 colors',
          'Intuitive operation via touchscreen',
          'Wall-mounted housing (protection type IP67) with spacious connection area'
        ]
      },
      {
        name: 'Measurement of dissolved oxygen (DO) in aqueous solutions',
        image: doTransmitter,
        bullets: [
          'Safe 1-point calibration',
          '2-wire transmitter (for basic and standard version)',
          'Electrical isolation of measurement signal (DO) and output signal (mA)',
          'Easy connection to an existing system (e.g PLC)',
          'Can be used as stand-alone system in maximum version',
          'Compensation of temperature atmospheric pressure and salinity',
          'Further processing of the temperature of the medium is possible (separate Pt 1000 or 2-wire transmitter)'
        ]
      },
      {
        name: 'pH Analyzer',
        image: phAnalyzer,
        bullets: [
          'Up to four analysis inputs in any combination for direct connection of sensors for liquid analysis',
          'Up to 21 further measuring signals can be connected either directly or via interface',
          'Interfaces: USB host USB device Modbus PROFIBUS DP Ethernet',
          'Ethernet function: web server alarm alerts by email setup per PC readout of recorded measurement data',
          'Vibrant TFT color graphics screen with 5.5″ diagonal screen sizes 320 × 240 pixels and 256 colors',
          'Intuitive operation via touchscreen',
          'Wall-mounted housing (protection type IP67) with spacious connection area',
          'lain language operation multilingual',
          'Graphic display with background lighting',
          'Can be combined with tecLine Ci tecLine Ci-S ecoLine Ci conductivity and temperature sensors'
        ]
      },
      {
        name: 'Turbidity Transmitter',
        image: turbidityTransmitter,
        paragraphs: ['Water clarity and suspended solids measurement'],
        bullets: [
          'Real-time monitoring',
          'Low maintenance',
          'High sensitivity'
        ]
      },
      {
        name: 'Capacitance Level Transmitter',
        image: capacitanceLevelTransmitter,
        bullets: [
          '2-wire compact transmitter',
          'High sensitivity',
          'Rod (0.2 – 3 m) or cable (1 – 20 m) probes',
          'Plastic aluminium or stainless steel housing',
          'Fully or partly insulated probes',
          'Plug-in display module',
          '32-point linearisation',
          'Explosion-proof models',
          'Chemicals with dense gas layers above the surface',
          'High pressure high temperature or vacuum',
          'Viscous or corrosive media'
        ]
      },
      {
        name: 'Conductive Level Switch',
        image: conductiveLevelSwitch,
        bullets: [
          'Limit switch or differential switch versions',
          'Adjustable sensitivity',
          'Adjustable time delay',
          'High or low fail-safe mode',
          'All wetted parts stainless steel',
          'Compact unit with two independent relays',
          'Separate probe and relay unit',
          'Rod probes up to 3 m'
        ]
      },
      {
        name: 'Float Level Switch',
        image: floatLevelSwitch,
        bullets: [
          'Operation without power supply',
          'Low cost polypropylene level switch',
          'Hermetically moulded double chamber',
          'Mercury free micro switch',
          'Adjustable switch differential',
          'For low density liquids'
        ]
      },
      {
        name: 'Hydrostatic Level Transmitter',
        image: hydrostaticLevelTx,
        bullets: [
          '2- or 3-wire submersible transmitter',
          'Plastic or stainless steel body',
          'Capacitive ceramic piezoresistive stainless steel and piezoresistive ceramic sensor',
          'Up to 200 m range',
          'Reverse polarity protection',
          'Optional lightning protection',
          'Linearity: ±0.25 %',
          'HART communication',
          'Venting tube in cable',
          'Incorporated Pt100 temperature sensor',
          'Explosion-proof models'
        ]
      },
      {
        name: 'Ultrasonic Level Transmitter',
        image: ultrasonicLevelTx,
        bullets: [
          '2- or 4-wire integrated transmitter',
          'Non-contact level metering',
          'Narrow 5° beam angle',
          'Excellent signal processing',
          'Temperature compensated',
          'Secondary lightning protection',
          '32-point linearization',
          'PP PVDF PTFE housing and transducers',
          'Plug-in display module',
          'Plastic aluminum or stainless steel housing',
          'Explosion-proof models',
          'Level and volume measurement and display',
          'Open channel flow measurement',
          'Fail-safe indication',
          'For challenging applications such as long distance measurement and light dust during filling'
        ]
      },

    ]
  },
  {
    category: 'Valves & Piping',
    items: [
      {
        name: 'Butterfly Valves',
        image: butterflyValves,
        datasheetUrl: '/datasheets/butterfly-valves.pdf',
        paragraphs: [
          'Butterfly valves are used where space is limited. Unlike gate valves butterfly valves can be used for throttling or regulating flow as well as in the full open and fully closed position. The pressure loss through a butterfly valve is small in comparison with the gate valve. Type- Lined Size range – 50 mm to 600 mm Pressure- PN 25 Seating material – EPDM/Viton/ Nitrile.'
        ],
        bullets: [
          'Space-saving design',
          'Throttling capability',
          'Low pressure loss',
          'Size range: 50-600mm',
          'PN 25 pressure rating'
        ]
      },
      {
        name: 'Gate Valve',
        image: gateValve,
        datasheetUrl: '/datasheets/gate-valve-di.pdf',
        paragraphs: [
          'Gate valves are designed for fully open or fully closed service. They are installed in pipelines as isolating valves, and should not be used as control or regulating valves.'
        ],
        bullets: [
          'MOC: Ductile Iron (DI)',
          'Connection: Flanged End',
          'Size: Up to 400 MM',
          'Pressure Rating: PN 16'
        ]
      },
      {
        name: 'HDPE Pipe & Fittings',
        image: hdpeFittings,
        datasheetUrl: '/datasheets/hdpe-pipes.pdf',
        paragraphs: [
          'HDPE pipe is a type of flexible plastic pipe used for fluid and gas transfer and is often used to replace ageing concrete or steel mains pipeline. We offer a comprehensive range of HDPE pipes and fittings.',
          'Our range extends up to 2500mm outer diameter, providing solutions for even the largest municipal and industrial projects.'
        ],
        bullets: [
          'Flexible and durable construction',
          'Corrosion and chemical resistant',
          'Size range up to 2500mm',
          'Suitable for fluid and gas transfer'
        ]
      },
      {
        name: 'Motorized Ball Valve',
        image: motorizedBallValve,
        datasheetUrl: '/datasheets/motorized-ball-valve.pdf',
        paragraphs: [
          'A motorized valve is an automated device used for controlling the flow of liquids, gases, and other materials in industrial, commercial, and manufacturing settings.',
          'This type of valve uses a motor to open and close the valve, allowing for precise control over the output pressure and flow rate.'
        ],
        bullets: [
          'Precise motorized control',
          'High operational reliability',
          'Automated pressure regulation',
          'Suitable for diverse industrial media'
        ]
      },
      {
        name: 'Sluice Valve',
        image: sluceValves,
        datasheetUrl: '/datasheets/sluice-valves.pdf',
        paragraphs: [
          'A complete range of Sluice/Gate valves for all of your water management applications. These valves provide reliable isolation in water distribution networks.'
        ],
        bullets: [
          'Robust construction',
          'Low maintenance requirements',
          'Available in sizes up to 24" (600 mm)',
          'Reliable long-term operation'
        ]
      }
    ]
  },
  {
    category: 'Automation (IoT / PLC / RTU / SCADA)',
    items: [
      {
        name: 'IoT',
        image: iot,
        datasheetUrl: '/datasheets/iot-platform.pdf',
        paragraphs: ['We offer an Integrated IOT Platform to manage Customer Device and Data. We also provided integration plugins with popular CRMs Billing and ERP solutions.'],
        bullets: [
          'Integrated platform',
          'Device and data management',
          'CRM/Billing/ERP integration',
          'Real-time monitoring'
        ]
      },
      {
        name: 'PLC',
        image: plc,
        datasheetUrl: '/datasheets/plc-systems.pdf',
        paragraphs: ['Programmable Logic Controllers for industrial automation and process control in water treatment systems.'],
        bullets: [
          'Industrial grade reliability',
          'Modular design flexibility',
          'Programming versatility',
          'Real-time processing'
        ]
      },
      {
        name: 'RTU (Remote Terminal Unit)',
        image: rtu,
        datasheetUrl: '/datasheets/rtu-units.pdf',
        paragraphs: ['Event based secure protocol connects clients (producers and subscribers) to get live data (semi real-time) even on non-real-time connections.'],
        bullets: [
          'Event-based secure protocol',
          'Semi real-time data',
          'Optimal latency',
          'Mobile network support',
          'NBIoT compatible'
        ]
      },
      {
        name: 'SCADA',
        image: scada,
        datasheetUrl: '/datasheets/scada-systems.pdf',
        paragraphs: ['Process visualization with network function. Real time operation. Batch related and continuous logging for comprehensive plant management.'],
        bullets: [
          'Real-time process visualization',
          'Manage up to 50 plants per PC',
          '100 plants per network',
          'Mobile app support',
          'Continuous logging'
        ]
      }
    ]
  },
  {
    category: 'Cameras & Vision',
    items: [
      {
        name: 'Bullet Camera',
        image: bulletCamera,
        datasheetUrl: '/datasheets/bullet-camera.pdf',
        paragraphs: ['Fixed direction surveillance camera designed for outdoor monitoring applications. Features weatherproof housing and infrared night vision capabilities for 24/7 security coverage.'],
        bullets: [
          'Weatherproof design',
          'Infrared night vision',
          'Fixed direction monitoring',
          '24/7 operation',
          'High resolution imaging'
        ]
      },
      {
        name: 'Dome Camera',
        image: domeCamera,
        datasheetUrl: '/datasheets/dome-camera.pdf',
        paragraphs: ['360-degree surveillance dome camera with vandal-resistant design. Provides discreet monitoring with wide-angle coverage for comprehensive area surveillance.'],
        bullets: [
          '360-degree coverage',
          'Vandal-resistant housing',
          'Discreet appearance',
          'Wide-angle lens',
          'Professional surveillance'
        ]
      },
      {
        name: 'High Speed Camera',
        image: highSpeedCamera,
        datasheetUrl: '/datasheets/high-speed-camera.pdf',
        paragraphs: ['High frame rate recording camera designed for capturing rapid motion and detailed analysis. Professional-grade equipment for specialized monitoring applications.'],
        bullets: [
          'High frame rate capture',
          'Motion analysis capability',
          'Professional grade',
          'Detailed recording',
          'Specialized applications'
        ]
      },
      {
        name: 'PTZ Camera',
        image: ptzCamera,
        datasheetUrl: '/datasheets/ptz-camera.pdf',
        paragraphs: ['Pan-Tilt-Zoom controllable camera with remote operation capabilities. Features motorized movement and zoom functions for dynamic surveillance coverage.'],
        bullets: [
          'Pan-tilt-zoom control',
          'Remote operation',
          'Motorized movement',
          'Dynamic coverage',
          'Auto-tracking features'
        ]
      },
      {
        name: 'Servers',
        image: servers,
        datasheetUrl: '/datasheets/surveillance-servers.pdf',
        paragraphs: ['High-capacity video recording and storage servers designed for surveillance systems. Features redundant storage and remote access capabilities for reliable data management.'],
        bullets: [
          'High storage capacity',
          'Redundant backup systems',
          'Remote access capability',
          'Reliable data management',
          'Scalable architecture'
        ]
      },
      {
        name: 'Software',
        image: softwares,
        datasheetUrl: '/datasheets/surveillance-software.pdf',
        paragraphs: ['Comprehensive video management and analytics software for surveillance systems. Provides multi-camera support, intelligent analytics, and user-friendly interface for efficient monitoring.'],
        bullets: [
          'Multi-camera management',
          'Intelligent analytics',
          'User-friendly interface',
          'Real-time monitoring',
          'Advanced reporting'
        ]
      }
    ]
  },
  {
    category: 'Jointing Machines',
    items: [
      {
        name: 'Big Jointing Machine',
        image: bigJointingMachines,
        datasheetUrl: '/datasheets/big-jointing-machine.pdf',
        paragraphs: ['Heavy-duty pipe jointing equipment designed for large diameter pipe installations in water infrastructure project.'],
        bullets: [
          'Heavy-duty construction',
          'Large diameter capability',
          'Precision alignment',
          'Infrastructure grade',
          'Reliable joint formation'
        ]
      },
      {
        name: 'Welding Machine ZEEN-3000 PLUS',
        image: weldingMachine,
        datasheetUrl: '/datasheets/butt-fusion-welding.pdf',
        paragraphs: [
          'The device supports fittings used in the plumbing and gas industry. It allows four programming modes: manual, scanner, barcode manual, as last. The welder\'s aluminium housing and built-in fan facilitate transformer cooling.',
          'A plywood transport box is included to protect against mechanical damage and to ensure convenient transport and storage of the machine. Simple and clear operation of the welding machine control programme. Possibility to connect a barcode scanner (optional accessory). The temperature measurement system of the transformer protects the welder from overheating.'
        ],
        bullets: [
          'Four programming modes: manual, scanner, barcode manual',
          'Aluminium housing with built-in fan',
          'Temperature measurement system prevents overheating',
          'Plywood transport box included',
          'Optional barcode scanner connectivity'
        ]
      },
      {
        name: 'Electrofusion welding Machine',
        image: electrofusionJointingMachine,
        datasheetUrl: '/datasheets/electrofusion-welding.pdf',
        paragraphs: ['Electrofusion welding machines are universal devices used to connect thermoplastic pipes and fittings (PE PP PVDF) resistance method using electrofusion fittings.'],
        bullets: [
          'Automatic control system',
          'Real-time monitoring',
          '3000+ weld record memory',
          'Temperature compensation',
          '20-800mm welding range'
        ]
      }
    ]
  },
  {
    category: 'Pressure Transmitter',
    items: [
      {
        name: 'Blind Type Pressure Transmitter',
        image: blindTypePressureTransmitters,
        datasheetUrl: '/datasheets/blind-pressure-transmitter.pdf',
        paragraphs: ['Gauge pressure measurement without display'],
        bullets: [
          'Compact design',
          'High accuracy',
          '4-20mA output'
        ]
      },
      {
        name: 'Differential Pressure Transmitter',
        image: differentialPressureTransmitter,
        datasheetUrl: '/datasheets/differential-pressure-transmitter.pdf',
        paragraphs: ['0 to 250 mbar – 0 to 1.6 bar relative / 0 to 600 mbar – 0 to 25 bar absolute. Welded measuring system. Compact 71mm design.'],
        bullets: [
          'Wide pressure ranges',
          'Compact 71mm design',
          'HART interface',
          '0.07% linearity',
          '1:200 turndown ratio'
        ]
      },
      {
        name: 'SMART TYPE Pressure Transmitter',
        image: smartTypePressureTransmitter,
        datasheetUrl: '/datasheets/smart-pressure-transmitter.pdf',
        paragraphs: ['HART® interface. Optional explosion protection Ex ia according to ATEX GOST-R. Linearity 0.07 %. Turn down 1:200.'],
        bullets: [
          'HART communication',
          'Explosion protection options',
          '0.07% linearity',
          '1:200 turndown',
          'Flow measurement capability'
        ]
      }
    ]
  },
  {
    category: 'Chlorinators',
    items: [
      {
        name: 'Chlorinator',
        image: chlorinator,
        datasheetUrl: '/datasheets/chlorinator-system.pdf',
        paragraphs: ['Chlorinator adds chlorine to drinking water to eliminate parasites bacteria and viruses. Chlorinators are also used in various industrial and municipal applications for water disinfection.'],
        bullets: [
          'Eliminates parasites and bacteria',
          'Swimming pool applications',
          'Odor control capability',
          'Marine growth prevention',
          'Service water system use'
        ]
      }
    ]
  },
  {
    category: 'Transformers',
    items: [
      {
        name: 'Auto Transformers',
        image: autoTransformer,
        paragraphs: [
          'Auto Transformers are frequently used in power applications to interconnect systems operating at different voltage classes, for example 400 kV to 220 kV for transmission. They are also often used for providing conversions between the two common domestic main voltage bands in the world (400, 200, 66 kV).',
          'The links between the UK 400 kV and 275 kV SuperGrid networks are normally three-phase autotransformers with taps at the common neutral end. Autotransformers are built with common main winding and a separate low voltage winding. For long distance rural power distribution lines, special autotransformers with automatic tap-changing equipment are inserted as voltage regulators.'
        ],
        bullets: [
          'Better short circuit strength',
          'Compact design',
          'Durability',
          'Optimum losses',
          'KEMA Tested',
          'Epoxy bonded CTC for improved short circuit withstand',
          'Voltage: 132 to 765 kV',
          'Ratings: 50 to 1500 MVA',
          'Standard: ANSI',
          'Applications: Power transmission, Grid interconnection, Voltage regulation for rural distribution, SuperGrid networks'
        ]
      },
      {
        name: 'Distribution Transformers',
        image: distributionTransformer,
        paragraphs: [
          'Distribution Transformer is an essential electrical device used to step down the high voltage from power transmission lines to a lower voltage suitable for safe use in homes, offices, and industries.',
          'It ensures efficient distribution of electricity at the consumer level while minimizing power losses. These transformers are generally installed on poles, pads, or substations and play a vital role in providing reliable and continuous power supply in the distribution network. They are designed for maximum efficiency and long operational life.'
        ],
        bullets: [
          'High efficiency design',
          'Low power losses',
          'Pole/Pad mountable',
          'Weather resistant',
          'Long operational life',
          'Minimal maintenance required',
          'Voltage: 11kV to 33kV',
          'Installation: Pole/Pad/Substation',
          'Efficiency: 98%+',
          'Applications: Residential distribution, Commercial buildings, Industrial facilities, Rural electrification, Urban substations'
        ]
      },
      {
        name: 'Shunt Reactors',
        image: shuntReactor,
        paragraphs: [
          'Shunt Reactors are used to improve power system stability by absorbing excess reactive power in high-voltage transmission lines. They enhance voltage regulation, reduce losses, and ensure efficient grid performance.',
          'Essential components for modern power grids, shunt reactors manage reactive power to maintain voltage stability across long transmission distances. They prevent over-voltage conditions and optimize power flow efficiency with low-noise operation.'
        ],
        bullets: [
          'Reactive power compensation',
          'Voltage stabilization',
          'Low noise operation',
          'Oil-immersed design',
          'Gapped core technology',
          'Extended service intervals',
          'Voltage: Up to 765 kV',
          'Type: Oil Immersed',
          'Core: Gapped Design',
          'Applications: High-voltage transmission, Grid stabilization, Reactive power management, Long transmission lines'
        ]
      },
      {
        name: 'Locomotive & Trackside Transformers',
        image: locomotiveTransformer,
        paragraphs: [
          'Locomotive and Trackside Power Transformers provide reliable and efficient power solutions for railway operations. They are engineered to withstand dynamic loads, ensure smooth traction, and support continuous, safe rail network performance.',
          'Designed specifically for the demanding railway environment, these transformers handle the unique challenges of traction power systems. From high-speed trains to metro networks, our solutions ensure uninterrupted power delivery with robust vibration resistance.'
        ],
        bullets: [
          'Dynamic load handling',
          'Vibration resistant design',
          'Compact footprint',
          'High efficiency ratings',
          'Weather resistant enclosure',
          'Quick fault recovery',
          'Application: Railway Traction',
          'Design: Compact & Robust',
          'Performance: High Efficiency',
          'Applications: Electric locomotives, Metro systems, High-speed rail, Trackside substations, Railway electrification'
        ]
      },
      {
        name: 'AIS (SF6) Circuit Breaker Up To 800 kV',
        image: sf6CircuitBreaker,
        paragraphs: [
          'AIS (Air Insulated Substation) SF₆ Circuit Breaker up to 800 kV is a high-voltage switching device used in air-insulated substations to control, protect, and isolate electrical equipment in transmission networks.',
          'It utilizes sulfur hexafluoride (SF₆) gas as the insulating and arc-quenching medium, which provides excellent dielectric strength and high interrupting capability, enabling safe and reliable operation even at ultra-high voltages like 800 kV. This technology ensures minimal footprint and maximum reliability.'
        ],
        bullets: [
          'SF₆ gas insulation',
          'High interrupting capability',
          'Excellent dielectric strength',
          'Ultra-high voltage rated',
          'Reliable arc quenching',
          'Compact design'
        ]
      }
    ]
  },
  {
    category: 'Solar sensor',
    items: [
      {
        name: 'Smart Solar Street Light with PV Panels',
        image: solarStreetLight,
        bullets: [
          'Type: Monocrystalline / Polycrystalline PV Module',
          'Wattage: 100 Wp – 200 Wp (as per site requirement)',
          'Efficiency: ≥18%',
          'Voltage: 18–24 V DC',
          'Frame: Anodized Aluminium',
          'Life Span: 25 Years'
        ]
      },
      {
        name: 'Solar Panel (Module)',
        image: solarPanel,
        bullets: [
          'Type: Monocrystalline / Polycrystalline',
          'Rated Power: 330 Wp – 550 Wp (per panel)',
          'Efficiency: 18% – 22%',
          'Operating Voltage (Vmp): 30 – 42 V',
          'Operating Current (Imp): 8 – 13 A',
          'Open Circuit Voltage (Voc): 38 – 50 V',
          'Short Circuit Current (Isc): 9 – 14 A',
          'Glass: Toughened / Tempered Glass (3.2 mm)',
          'Frame Material: Anodized Aluminium'
        ]
      }

    ]
  }
];


