import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Activity, Zap, Camera, Wrench, CheckCircle, ArrowRight, FlaskConical, Sun, Waves, Download, RotateCw, X } from 'lucide-react';
import { RAW_SUB_PRODUCTS } from '../data/rawProducts';
import { MotionFadeUp, AnimatedHeading } from '../components/Animated';
import QuoteModal from '../components/QuoteModal';
import BrochureModal from '../components/BrochureModal';

interface ProductInfoPageProps {
  variant?: string;
  onNavigate?: (page: string) => void;
}

const FlowMeterIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="9" r="6" />
    <path d="M12 9l2.5-2.5" />
    <path d="M12 15v3" />
    <path d="M3 18h18" />
    <path d="M6 15v6" />
    <path d="M18 15v6" />
  </svg>
);

export default function ProductInfoPage({ onNavigate }: ProductInfoPageProps) {
  const { variant: urlVariant } = useParams<{ variant: string }>();
  const variant = urlVariant; // Use URL param as the source of truth
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [quoteProductName, setQuoteProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // State for the floating details modal

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const handleGetQuote = (productName: string) => {
    setQuoteProductName(productName);
    setIsQuoteModalOpen(true);
  };

  const getItemsByCategory = (categoryName: string) => {
    return (RAW_SUB_PRODUCTS.find(c => c.category === categoryName)?.items || []);
  };

  const renderGallery = (categoryName: string, subtitle: string, mainTitle?: string, hideSectionWrapper?: boolean) => {
    const items = getItemsByCategory(categoryName);
    // Check if current variant is flow-meters, automation, or has exactly 2 or 4 items to apply specific grid layout
    const isTwoColumnLayout = variant === 'flow-meters' || variant === 'automation' || items.length === 2 || items.length === 4;

    const content = (
      <div className={hideSectionWrapper ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className="text-center mb-12">
          <h2 className={`font-bold text-gray-900 mb-4 ${hideSectionWrapper ? 'text-2xl' : 'text-3xl'}`}>
            {mainTitle || "Product Range"}
          </h2>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
        <div className={isTwoColumnLayout
          ? "grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        }>
          {items.map((item, idx) => {
            const firstParagraph = Array.isArray(item.paragraphs) && item.paragraphs[0] ? item.paragraphs[0] : '';
            const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0;
            const hasDetails = (!!firstParagraph) || hasBullets;

            return (
              <MotionFadeUp key={idx} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col min-h-[420px]">
                <div className="bg-gray-50 flex items-center justify-center p-6 relative">
                  {item.badge && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wider border border-white/20">
                      {item.badge}
                    </div>
                  )}
                  <img src={item.image} alt={item.name} className="h-[220px] w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 text-center">{item.name}</h3>

                  {hasDetails && (
                    <div className="mt-auto">
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 shadow-md flex items-center space-x-2 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              </MotionFadeUp>
            );
          })}
        </div>
      </div>
    );

    if (hideSectionWrapper) return content;

    return (
      <section className="py-16 bg-gray-50">
        {content}
      </section>
    );
  };
  const config: Record<string, {
    title: string;
    description: string;
    icon: any;
    features: string[];
    applications: string[];
    specifications: Array<{ parameter: string; value: string }>;
    image?: string;
  }> = {
    'flow-meters': {
      title: 'Flow',
      description: 'Precision flow measurement solutions for water and wastewater treatment applications with advanced digital capabilities.',
      icon: FlowMeterIcon,
      features: [
        'High accuracy measurement (±0.5%)',
        'Digital signal processing',
        'Multiple output options (4-20mA, HART, Modbus)',
        'IP65/67 protection rating',
        'Low maintenance design',
        'Wide flow range coverage'
      ],
      applications: [
        'Municipal water treatment',
        'Industrial process monitoring',
        'Wastewater flow measurement',
        'Chemical dosing systems',
        'Distribution network monitoring'
      ],
      specifications: [
        { parameter: 'Accuracy', value: '±0.5% of reading' },
        { parameter: 'Flow Range', value: '0.1 - 15 m/s' },
        { parameter: 'Pressure Rating', value: '16 bar standard' },
        { parameter: 'Temperature Range', value: '-20°C to +80°C' },
        { parameter: 'Protection Rating', value: 'IP65/IP67' },
        { parameter: 'Output Signals', value: '4-20mA, HART, Modbus RTU' }
      ]
    },
    'analyzers': {
      title: 'Analyzers',
      description: 'Advanced online analyzers and intelligent transmitters for continuous water quality monitoring and process control.',
      icon: Activity,
      features: [
        'Real-time water quality monitoring',
        'Multi-parameter analysis capability',
        'Automated calibration systems',
        'Remote data transmission',
        'Predictive maintenance alerts',
        'Cloud-based data analytics'
      ],
      applications: [
        'pH and ORP monitoring',
        'Dissolved oxygen measurement',
        'Turbidity analysis',
        'Chlorine residual monitoring',
        'Conductivity measurement',
        'Nutrient analysis'
      ],
      specifications: [
        { parameter: 'pH Range', value: '0-14 pH units' },
        { parameter: 'Accuracy', value: '±0.1 pH' },
        { parameter: 'Response Time', value: '< 30 seconds' },
        { parameter: 'Calibration Interval', value: '90 days' },
        { parameter: 'Communication', value: 'Modbus, Ethernet, Wireless' },
        { parameter: 'Power Supply', value: '24V DC or AC' }
      ]
    },
    'levels': {
      title: 'Levels',
      description: 'Complete range of level measurement and switching solutions for all industrial applications.',
      icon: Waves,
      features: [
        'Contact and non-contact measurement',
        'High reliability switches',
        'Various mounting options',
        'Suitable for corrosive environments',
        'Digital signals and relay outputs',
        'Easy installation and maintenance'
      ],
      applications: [
        'Tank level monitoring',
        'Water treatment plants',
        'Chemical storage tanks',
        'Sump and pit monitoring',
        'Pump control',
        'Overfill protection'
      ],
      specifications: [
        { parameter: 'Range', value: 'Up to 20m' },
        { parameter: 'Accuracy', value: '±0.25% (Hydrostatic)' },
        { parameter: 'Output', value: '4-20mA, Relay' },
        { parameter: 'Material', value: 'SS316, PP, PVDF' },
        { parameter: 'Protection', value: 'IP67/IP68' },
        { parameter: 'Temp Range', value: '-20°C to +80°C' }
      ]
    },
    'level-transmitter': {
      title: 'Level Transmitter',
      description: 'Accurate continuous level measurement for liquids and solids.',
      icon: Waves,
      features: [
        'High precision measurement',
        'Submersible & Non-contact options',
        'HART Communication',
        'Corrosion resistant materials',
        'Long-term stability'
      ],
      applications: [
        'Deep well monitoring',
        'Reservoir level',
        'Chemical tanks',
        'Wastewater lift stations'
      ],
      specifications: [
        { parameter: 'Tech', value: 'Ultrasonic, Hydrostatic, Capacitance' },
        { parameter: 'Output', value: '4-20mA' },
        { parameter: 'Range', value: '0-200m' }
      ]
    },
    'level-switch': {
      title: 'Level Switch',
      description: 'Reliable point level detection for alarms and control.',
      icon: Waves,
      features: [
        'Simple robust design',
        'No power required (Float)',
        'Multiple switch points',
        'Adjustable sensitivity'
      ],
      applications: [
        'Pump protection',
        'High/Low alarm',
        'Tank filling control'
      ],
      specifications: [
        { parameter: 'Type', value: 'Float, Conductive' },
        { parameter: 'Rating', value: '5A / 230VAC' }
      ]
    },
    'valves': {
      title: 'Valves & Piping',
      description: 'High-performance valves, actuators, and piping systems designed for demanding water treatment applications.',
      icon: Wrench,
      features: [
        'Corrosion-resistant materials',
        'Precise flow control',
        'Fail-safe operation',
        'Easy maintenance access',
        'Automated actuation options',
        'Long service life'
      ],
      applications: [
        'Process control valves',
        'Isolation and shut-off',
        'Backwash systems',
        'Chemical dosing control',
        'Pressure regulation',
        'Flow distribution'
      ],
      specifications: [
        { parameter: 'Valve Types', value: 'Ball, Butterfly, Gate, Check' },
        { parameter: 'Size Range', value: '1/2" to 48"' },
        { parameter: 'Pressure Rating', value: 'Up to 150 PSI' },
        { parameter: 'Material Options', value: 'SS316, Duplex, Hastelloy' },
        { parameter: 'Actuator Types', value: 'Pneumatic, Electric, Hydraulic' },
        { parameter: 'Standards', value: 'ANSI, DIN, JIS' }
      ]
    },
    'automation': {
      title: 'Automation (IoT / PLC / RTU / SCADA)',
      description: 'Comprehensive automation solutions integrating PLC, RTU, SCADA, and IoT technologies for intelligent water management.',
      icon: Zap,
      features: [
        'Programmable Logic Controllers (PLC)',
        'Remote Terminal Units (RTU)',
        'SCADA supervisory systems',
        'IoT sensor integration',
        'Cloud connectivity',
        'Mobile app control'
      ],
      applications: [
        'Plant automation',
        'Remote monitoring',
        'Process optimization',
        'Alarm management',
        'Data logging and reporting',
        'Predictive maintenance'
      ],
      specifications: [
        { parameter: 'PLC I/O Points', value: 'Up to 1000 digital/analog' },
        { parameter: 'Communication', value: 'Ethernet, Modbus, Profibus' },
        { parameter: 'Operating System', value: 'Real-time embedded' },
        { parameter: 'Memory', value: '32MB program, 128MB data' },
        { parameter: 'Power Supply', value: '24V DC, 110-240V AC' },
        { parameter: 'Environmental', value: '-25°C to +70°C' }
      ]
    },
    'cameras': {
      title: 'Cameras & Vision',
      description: 'Rugged industrial cameras and vision systems for surveillance, monitoring, and automated inspection in water facilities.',
      icon: Camera,
      features: [
        'High-resolution imaging',
        'Night vision capability',
        'Weather-resistant housing',
        'Motion detection',
        'Remote pan-tilt-zoom',
        'Cloud storage integration'
      ],
      applications: [
        'Perimeter security',
        'Process monitoring',
        'Equipment inspection',
        'Safety compliance',
        'Remote site management',
        'Incident documentation'
      ],
      specifications: [
        { parameter: 'Resolution', value: '4K Ultra HD (3840x2160)' },
        { parameter: 'Lens Options', value: 'Fixed, Varifocal, Zoom' },
        { parameter: 'Infrared Range', value: 'Up to 100 meters' },
        { parameter: 'Weather Rating', value: 'IP67/IP68' },
        { parameter: 'Operating Temperature', value: '-40°C to +70°C' },
        { parameter: 'Power Options', value: 'PoE, 12V DC, Solar' }
      ]
    },
    'jointing': {
      title: 'Jointing Machines',
      description: 'Professional butt fusion and electrofusion machines for creating strong, leak-proof joints in plastic piping systems.',
      icon: Wrench,
      features: [
        'Precise temperature control',
        'Automated fusion cycles',
        'Multiple pipe size capability',
        'Portable and stationary models',
        'Quality monitoring systems',
        'Compliance certification'
      ],
      applications: [
        'HDPE pipe joining',
        'PE pipe fusion',
        'PP pipe connections',
        'Electrofusion fittings',
        'Field installations',
        'Repair operations'
      ],
      specifications: [
        { parameter: 'Pipe Diameter', value: '63mm to 1200mm' },
        { parameter: 'Fusion Pressure', value: 'Up to 2.5 MPa' },
        { parameter: 'Temperature Range', value: '200°C to 260°C' },
        { parameter: 'Power Supply', value: '220V/380V AC' },
        { parameter: 'Fusion Time', value: 'Programmable cycles' },
        { parameter: 'Standards', value: 'ISO 21307, ASTM F2620' }
      ]
    },
    'pressure': {
      title: 'Pressure',
      description: 'Complete Pressure Measurement Solutions ranging from sensors to advanced transmitters.',
      icon: Gauge,
      features: [
        'Wide measuring ranges',
        'Digital and Analog outputs',
        'High accuracy and stability',
        'Rugged industrial design'
      ],
      applications: [
        'Process pressure monitoring',
        'Differential pressure flow',
        'Tank level measurement',
        'Hydraulic systems'
      ],
      specifications: [
        { parameter: 'Range', value: 'Vacuum to 1000 bar' },
        { parameter: 'Output', value: '4-20mA, 0-10V, Digital' }
      ]
    },
    'pressure-transmitter': {
      title: 'Pressure Transmitter',
      description: 'Ultra-high performance pressure transmitter with coplanar design for demanding flow and level applications.',
      icon: Gauge,
      features: [
        'Coplanar design for space efficiency',
        'Ultra-high accuracy (±0.025%)',
        'Advanced diagnostics',
        'Wireless connectivity options',
        'Multiple mounting options',
        'Long-term stability'
      ],
      applications: [
        'Flow measurement',
        'Level monitoring',
        'Pressure measurement',
        'Density applications',
        'Interface detection',
        'Process optimization'
      ],
      specifications: [
        { parameter: 'Accuracy', value: '±0.025% of calibrated span' },
        { parameter: 'Range', value: '0.15 to 4000 psi' },
        { parameter: 'Output', value: '4-20mA HART, Foundation Fieldbus' },
        { parameter: 'Response Time', value: '< 100ms' },
        { parameter: 'Ambient Temperature', value: '-40°C to +85°C' },
        { parameter: 'Process Temperature', value: '-40°C to +120°C' }
      ]
    },
    'pressure-sensor': {
      title: 'Pressure Sensor',
      description: 'Versatile pressure sensors for industrial and commercial applications.',
      icon: Gauge, // Or different icon
      features: [
        'Compact design',
        'High reliability',
        'Cost effective',
        'Fast response'
      ],
      applications: [
        'Machine automation',
        'Pneumatics',
        'HVAC',
        'Pump control'
      ],
      specifications: [
        { parameter: 'Accuracy', value: '±0.5% FS' },
        { parameter: 'Output', value: 'Analog / Digital' }
      ]
    },
    'chlorinators': {
      title: 'Chlorinators',
      description: 'Safe and efficient chlorination systems for water disinfection and purification.',
      icon: FlaskConical,
      features: [
        'Vacuum operated safety',
        'Automatic switchover systems',
        'Remote vacuum regulation',
        'Precise dosage control',
        'Gas warning systems',
        'Easy maintenance design'
      ],
      applications: [
        'Drinking water treatment',
        'Swimming pools & aquatics',
        'Wastewater disinfection',
        'Industrial cooling water',
        'Food & beverage processing',
        'Power plant cooling'
      ],
      specifications: [
        { parameter: 'Dosage Capacity', value: 'Up to 200 kg/h' },
        { parameter: 'Control Type', value: 'Manual, Automatic (Flow/Residual)' },
        { parameter: 'Mounting', value: 'Wall, Floor, Direct-mount' },
        { parameter: 'Backpressure', value: 'Up to 10 bar' },
        { parameter: 'Material', value: 'High-grade PVC/ABS' },
        { parameter: 'Vacuum', value: 'Operating vacuum < 0.1 bar' }
      ]
    },
    'transformers': {
      title: 'Transformers',
      description: 'High-performance power and distribution transformers for grid stability and industrial applications.',
      icon: Zap,
      features: [
        'High efficiency design',
        'Short circuit strength',
        'Low noise operation',
        'Weather resistant',
        'Long operational life',
        'KEMA Tested'
      ],
      applications: [
        'Power transmission',
        'Grid interconnection',
        'Urban & Rural distribution',
        'Renewable energy',
        'Industrial facilities',
        'Railway traction'
      ],
      specifications: [
        { parameter: 'Voltage Range', value: '11kV to 765kV' },
        { parameter: 'Power Ratings', value: 'Up to 1500 MVA' },
        { parameter: 'Efficiency', value: '98%+' },
        { parameter: 'Type', value: 'Auto, Distribution, Shunt, Traction' },
        { parameter: 'Standard', value: 'ANSI, IEC' }
      ]
    },
    'solar': {
      title: 'Solar Solutions',
      description: 'Comprehensive solar energy solutions including high-performance solar modules and smart solar lighting systems.',
      icon: Sun,
      features: [
        'High-efficiency monocrystalline/polycrystalline PV modules',
        'Smart automatic dusk-to-dawn operation',
        'Robust anodized aluminum frames',
        'Long life span (up to 25 years)',
        'Weatherproof (IP65/IP67) designs',
        'Sustainable and cost-effective energy'
      ],
      applications: [
        'Street and highway lighting',
        'Park and garden illumination',
        'Industrial and commercial campus security',
        'Rural electrification projects',
        'Remote site power systems',
        'Smart city infrastructure'
      ],
      specifications: [
        { parameter: 'PV Module Type', value: 'Monocrystalline / Polycrystalline' },
        { parameter: 'Wattage Range', value: '100 Wp – 200 Wp' },
        { parameter: 'Module Efficiency', value: '≥18%' },
        { parameter: 'Operating Voltage', value: '18–24 V DC' },
        { parameter: 'Frame Material', value: 'Anodized Aluminium' },
        { parameter: 'Rated Life Span', value: '25 Years' }
      ]
    },
    'solar-modules': {
      title: 'Solar Modules',
      description: 'High-performance monocrystalline and polycrystalline solar modules for residential, commercial, and utility-scale projects.',
      icon: Sun,
      features: [
        'High efficiency up to 20.10%',
        'Excellent high-temperature performance',
        'Advanced PERC and Bifacial technologies',
        '12-year product warranty',
        '30-year linear performance warranty',
        'Certified for harsh environmental conditions'
      ],
      applications: [
        'Residential rooftop solar',
        'Commercial and industrial installations',
        'Utility-scale solar farms',
        'Off-grid solar systems',
        'Bifacial ground-mounted plants',
        'Agriculture solar solutions'
      ],
      specifications: [
        { parameter: 'Module Type', value: 'Mono / Poly / PERC / Bifacial' },
        { parameter: 'Wattage Range', value: '315 Wp – 550 Wp' },
        { parameter: 'Peak Efficiency', value: 'Up to 20.10%' },
        { parameter: 'System Voltage', value: '1500 V DC' },
        { parameter: 'Product Warranty', value: '12 Years' },
        { parameter: 'Performance Warranty', value: '30 Years' }
      ]
    },
    'air-quality-analyzers': {
      title: 'Air Quality Analyzers',
      description: 'Advanced monitoring systems for SOx, NOx, PM10, and PM2.5 to ensure environmental compliance and safety.',
      icon: Gauge,
      features: [
        'Real-time pollutant monitoring',
        'High precision sensors',
        'Robust outdoor design',
        'Data logging and remote access',
        'Compliance with environmental standards'
      ],
      applications: [
        'Industrial emissions monitoring',
        'Urban air quality networks',
        'Construction site monitoring',
        'Traffic pollution analysis',
        'Environmental research'
      ],
      specifications: [
        { parameter: 'Parameters', value: 'SOx, NOx, PM10, PM2.5' },
        { parameter: 'Measurement Tech', value: 'UV Fluorescence, Chemiluminescence, Beta Attenuation' },
        { parameter: 'Output', value: '4-20mA, RS485, Ethernet' },
        { parameter: 'Power', value: '230V AC / 24V DC' }
      ]
    },
    'gas-analyzers': {
      title: 'Gas Analyzers',
      description: 'Portable and fixed gas analyzers for CO, CO2, Methane, and other industrial gases.',
      icon: FlaskConical,
      features: [
        'Multi-gas detection capability',
        'Portable and fixed models',
        'High sensitivity NDIR/Electrochemical sensors',
        'User-friendly interface',
        'Alarm and safety functions'
      ],
      applications: [
        'Confined space entry',
        'Process gas analysis',
        'Leak detection',
        'Biogas monitoring',
        'Combustion efficiency'
      ],
      specifications: [
        { parameter: 'Gases Detected', value: 'CO, CO2, CH4, O2, H2S' },
        { parameter: 'Range', value: 'ppm to % vol depending on gas' },
        { parameter: 'Response Time', value: '< 30 seconds' },
        { parameter: 'Battery Life', value: '> 10 hours (Portable)' }
      ]
    },
    'actuators': {
      title: 'Actuators',
      description: 'Advanced electric multi-turn and part-turn actuators for precise valve control and automation.',
      icon: RotateCw,
      features: [
        'Precise position control',
        'Robust industrial design',
        'Weatherproof (IP67/IP68) options',
        'Manual override capabilities',
        'Smart digital interface',
        'Wide torque and speed range'
      ],
      applications: [
        'Water treatment plants',
        'Power generation',
        'Oil and gas pipelines',
        'Chemical processing',
        'Municipal infrastructure',
        'HVAC systems'
      ],
      specifications: [
        { parameter: 'Type', value: 'Multi-turn & Part-turn' },
        { parameter: 'Enclosure', value: 'IP67, IP68' },
        { parameter: 'Output Torque', value: 'Up to 1000 Nm' },
        { parameter: 'Power Supply', value: 'AC (230V/415V)' },
        { parameter: 'Connectivity', value: 'Modbus, Profibus, HART' }
      ]
    },
    'multi-turn-actuators': {
      title: 'Multi Turn Actuators',
      description: 'Designed for gate, globe, and sluice valves requiring linear motion and high torque.',
      icon: RotateCw,
      features: [
        'High torque output',
        'Multiple revolution control',
        'Linear motion compatibility',
        'Advanced positioning accuracy'
      ],
      applications: [
        'Gate valve operation',
        'Globe valve control',
        'Sluice gate automation'
      ],
      specifications: [
        { parameter: 'Torque Range', value: 'Up to 1000 Nm' },
        { parameter: 'Protection', value: 'IP67 / IP68' }
      ]
    },
    'part-turn-actuators': {
      title: 'Part Turn Actuators',
      description: 'Ideal for butterfly, ball, and plug valves requiring 90° rotary motion.',
      icon: RotateCw,
      features: [
        '90-degree rotary operation',
        'Compact design',
        'Fast response time',
        'High reliability'
      ],
      applications: [
        'Butterfly valve control',
        'Ball valve operation',
        'Plut valve automation'
      ],
      specifications: [
        { parameter: 'Rotation Angle', value: '60° to 360°' },
        { parameter: 'Torque Range', value: 'Up to 4000 Nm' }
      ]
    }
  };

  const page = (variant && config[variant]) ? config[variant] : {
    title: 'Product Information',
    description: 'Explore our range of products and solutions designed for modern water systems.',
    icon: Gauge,
    features: [],
    applications: [],
    specifications: []
  };

  const IconComponent = page.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-[#0073bc] to-[#005a94] text-white overflow-hidden">


        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionFadeUp>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <IconComponent className="w-10 h-10" />
              </div>
              <AnimatedHeading level={1} className="text-4xl md:text-5xl font-bold mb-4">{page.title}</AnimatedHeading>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-10">{page.description}</p>

              <div className="flex justify-center">
                <button
                  onClick={() => handleGetQuote(page.title)}
                  className="bg-white text-[#0073bc] hover:bg-blue-50 font-bold py-4 px-10 rounded-full shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 active:scale-95 group"
                >
                  <span className="text-lg">Get Quote</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </MotionFadeUp>
        </div>
      </section>

      {/* Product Galleries by Category */}
      {variant === 'flow-meters' && renderGallery('Flow', 'Explore our complete lineup of flow meters')}
      {variant === 'analyzers' && renderGallery('Analyzers', 'Advanced analyzers and transmitters for continuous monitoring')}
      {variant === 'air-quality-analyzers' && renderGallery('Air Quality Analyzers', 'Advanced systems for emissions and ambient air monitoring')}
      {variant === 'gas-analyzers' && renderGallery('Gas Analyzers', 'Precision gas analysis for safety and process control')}

      {/* Actuators Pages */}
      {variant === 'actuators' && (
        <>
          {renderGallery('Multi Turn Actuators', 'Advanced multi-turn actuators for linear valve motion')}
          {renderGallery('Part Turn Actuators', 'Precision part-turn actuators for 90-degree valve operation')}
        </>
      )}
      {variant === 'multi-turn-actuators' && renderGallery('Multi Turn Actuators', 'Advanced multi-turn actuators for linear valve motion')}
      {variant === 'part-turn-actuators' && renderGallery('Part Turn Actuators', 'Precision part-turn actuators for 90-degree valve operation')}

      {/* Levels Pages */}
      {variant === 'levels' && (
        <>
          {renderGallery('Level Transmitter', 'Level Transmitters')}
          {renderGallery('Level Switch', 'Level Switches')}
        </>
      )}
      {variant === 'level-transmitter' && renderGallery('Level Transmitter', 'Continuous Level Measurement')}
      {variant === 'level-switch' && renderGallery('Level Switch', 'Point Level Detection')}

      {variant === 'valves' && renderGallery('Valves & Piping', 'Engineered valves and piping solutions for critical applications')}
      {variant === 'automation' && renderGallery('Automation (IoT / PLC / RTU / SCADA)', 'Integrated automation platforms for intelligent water management')}
      {variant === 'cameras' && renderGallery('Cameras & Vision', 'Rugged vision and surveillance systems for utilities')}
      {variant === 'jointing' && renderGallery('Jointing Machines', 'Professional jointing equipment for plastic piping systems')}

      {/* Pressure Pages */}
      {variant === 'pressure' && (
        <>
          {renderGallery('Pressure Transmitter', 'Pressure Transmitters')}
          {renderGallery('Pressure Sensor', 'Pressure Sensors')}
        </>
      )}
      {variant === 'pressure-transmitter' && renderGallery('Pressure Transmitter', 'Premium Pressure Transmitters')}
      {variant === 'pressure-sensor' && renderGallery('Pressure Sensor', 'Industrial Pressure Sensors')}


      {variant === 'transformers' && renderGallery('Transformers', 'High-performance power and distribution solutions')}
      {variant === 'solar' && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Range</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore our innovative solar energy solutions including smart lighting and high-efficiency photovoltaic modules.</p>
            </div>
            {renderGallery('Solar Lighting', 'Smart automatic street lights and monitoring systems', 'Smart Solar Solutions', true)}
            <div className="mt-20">
              {renderGallery('Solar Modules', 'Advanced Mono, Poly, PERC and Bifacial modules for all applications', 'Solar Modules', true)}
            </div>
          </div>
        </section>
      )}
      {variant === 'solar-modules' && renderGallery('Solar Modules', 'High-efficiency monocrystalline, polycrystalline, and advanced special modules', 'Solar Modules')}
      {variant === 'chlorinators' && renderGallery('Chlorinators', 'Reliable chlorination systems for water safety')}

      {/* Features Section */}
      {page.features.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">Key Features</AnimatedHeading>
              <p className="text-lg text-gray-600">Advanced capabilities that set our products apart</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-[#0073bc]" />
                    </div>
                    <p className="text-gray-700 font-medium">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      {page.applications.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">Applications</AnimatedHeading>
              <p className="text-lg text-gray-600">Where our solutions make a difference</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {page.applications.slice(0, Math.ceil(page.applications.length / 2)).map((application, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-[#0073bc] flex-shrink-0" />
                    <span className="text-gray-700">{application}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {page.applications.slice(Math.ceil(page.applications.length / 2)).map((application, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <ArrowRight className="w-5 h-5 text-[#0073bc] flex-shrink-0" />
                    <span className="text-gray-700">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Specifications Section */}
      {page.specifications.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</AnimatedHeading>
              <p className="text-lg text-gray-600">Detailed specifications for your technical requirements</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Parameter</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {page.specifications.map((spec, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{spec.parameter}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0073bc] to-[#005a94]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedHeading level={3} className="text-3xl font-bold text-white mb-4">Ready to Get Started?</AnimatedHeading>
          <p className="text-xl text-blue-100 mb-8">Contact our team for detailed specifications, pricing, and technical support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="bg-white text-[#0073bc] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-blue-100 text-sm">
              <div>Email: <a href="mailto:info@orbitengineerings.com" className="hover:text-blue-200 transition-colors">info@orbitengineerings.com</a></div>
              <div>Phone: +91 70241 28029</div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-24 right-4 md:right-8 z-50">
        {/* Download Brochure - Enhanced floating button */}
        <button
          onClick={() => setIsBrochureModalOpen(true)}
          className="group relative flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white font-bold rounded-full shadow-[0_10px_40px_rgba(0,115,188,0.4)] hover:shadow-[0_15px_50px_rgba(0,115,188,0.6)] transition-all duration-300 hover:-translate-y-1.5 active:scale-95 border-2 border-white/30 overflow-hidden backdrop-blur-sm"
          title="Download Brochure"
        >
          {/* Constant Shine Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-shine opacity-60"></div>

          <Download className="w-5 h-5 mr-2 drop-shadow-md" />
          <span className="text-sm md:text-base whitespace-nowrap drop-shadow-sm">Brochure</span>

          {/* Subtle Outer Glow */}
          <div className="absolute inset-[-2px] rounded-full border border-white/20 pointer-events-none group-hover:border-white/40 transition-colors"></div>
        </button>
      </div>

      {/* Brochure Modal */}
      <BrochureModal
        open={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        brochureUrl="/assets/docs/brochure.pdf"
      />

      {/* Quote Modal */}
      <QuoteModal open={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} productName={quoteProductName} />

      {/* Floating Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] group/modal"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* Decorative background Icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover/modal:opacity-[0.05] transition-opacity duration-1000">
                <IconComponent className="w-64 h-64 -rotate-12" />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Product Image & Overview */}
              <div className="w-full md:w-2/5 bg-gray-50 flex flex-col p-8 border-r border-gray-100 overflow-y-auto">
                <div className="flex-1 flex items-center justify-center p-4">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-[300px] w-full object-contain drop-shadow-2xl" />
                </div>
                <div className="mt-8">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight mb-4">{selectedProduct.name}</h2>
                  {selectedProduct.badge && (
                    <span className="inline-block bg-blue-100 text-[#0073bc] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-6 shadow-sm border border-blue-200">
                      {selectedProduct.badge}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      handleGetQuote(selectedProduct.name);
                      setSelectedProduct(null);
                    }}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl active:scale-95 transition-all"
                  >
                    <FlaskConical className="w-5 h-5" />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>

              {/* Right Side: Detailed Info */}
              <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-white custom-scrollbar">
                <div className="space-y-8">
                  {/* Paragraph Section */}
                  {selectedProduct.paragraphs && selectedProduct.paragraphs.length > 0 && (
                    <div className="relative">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0073bc] to-blue-300 rounded-full" />
                      <div className="space-y-4 text-gray-700 text-sm leading-relaxed font-semibold italic pl-4">
                        {selectedProduct.paragraphs.map((p: string, i: number) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bullets Section */}
                  {selectedProduct.bullets && selectedProduct.bullets.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-black text-[#0073bc] uppercase tracking-[0.4em] whitespace-nowrap">Technical Specifications</span>
                        <div className="h-px w-full bg-gradient-to-r from-blue-100 to-transparent" />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedProduct.bullets.map((b: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex items-center p-4 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                          >
                            <div className="mr-4 p-2 rounded-xl bg-white shadow-sm text-[#0073bc] group-hover:bg-[#0073bc] group-hover:text-white transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 text-[14px] font-bold leading-snug">{b}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}