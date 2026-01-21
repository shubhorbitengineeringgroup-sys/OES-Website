import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gauge, Activity, Zap, Camera, Wrench, BarChart3, CheckCircle, ArrowRight, FlaskConical, Sun } from 'lucide-react';
import { RAW_SUB_PRODUCTS } from '../data/rawProducts';
import { MotionFadeUp, AnimatedHeading } from '../components/Animated';

interface ProductInfoPageProps {
  variant?: string;
  onNavigate?: (page: string) => void;
}

export default function ProductInfoPage({ onNavigate }: ProductInfoPageProps) {
  const { variant: urlVariant } = useParams<{ variant: string }>();
  const variant = urlVariant; // Use URL param as the source of truth
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggleExpanded = (key: string) => {
    setExpandedMap(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getItemsByCategory = (categoryName: string) => {
    return (RAW_SUB_PRODUCTS.find(c => c.category === categoryName)?.items || []);
  };

  const renderGallery = (categoryName: string, subtitle: string) => {
    const items = getItemsByCategory(categoryName);
    // Check if current variant is flow-meters, automation, or has exactly 2 items to apply specific grid layout
    const isTwoColumnLayout = variant === 'flow-meters' || variant === 'automation' || items.length === 2;

    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Range</h2>
            <p className="text-lg text-gray-600">{subtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5">
            {items.map((item, idx) => {
              const key = `${categoryName}-${idx}`;
              const isExpanded = !!expandedMap[key];
              const firstParagraph = Array.isArray(item.paragraphs) && item.paragraphs[0] ? item.paragraphs[0] : '';
              const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0;
              const hasDetails = (!!firstParagraph) || hasBullets;

              // Dynamic width class based on layout requirement
              const widthClass = isTwoColumnLayout
                ? "w-full md:w-[48%]" // Stacks on small screens, 2-col on MD+
                : "w-full sm:w-[48%] lg:w-[31%]"; // Stacks on small, 2-col on SM/MD, 3-col on LG

              return (
                <MotionFadeUp key={idx} className={`${widthClass} group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[420px]`}>
                  <div className="bg-gray-50 flex items-center justify-center p-6">
                    <img src={item.image} alt={item.name} className="h-[220px] w-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <h3 className="text-xl font-bold text-gray-900 text-center">{item.name}</h3>
                    {hasDetails && (
                      <div className="mt-auto">
                        <button
                          onClick={() => toggleExpanded(key)}
                          className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl text-sm font-bold bg-[#0073bc] text-white hover:bg-[#005a94] shadow-md hover:shadow-lg transition-all active:scale-95"
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      </div>
                    )}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      {firstParagraph && (
                        <p className="mt-3 text-gray-600 text-sm leading-6">{firstParagraph}</p>
                      )}
                      {hasBullets && (
                        <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 text-sm">
                          {item.bullets!.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </MotionFadeUp>
              );
            })}
          </div>
        </div>
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
      title: 'Flow Meters',
      description: 'Precision flow measurement solutions for water and wastewater treatment applications with advanced digital capabilities.',
      icon: Gauge,
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
      title: 'Analyzers & Transmitters',
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
    'rosemount': {
      title: 'Pressure Transmitter',
      description: 'Ultra-high performance pressure transmitter with coplanar design for demanding flow and level applications.',
      icon: BarChart3,
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
      title: 'Solar sensor',
      description: 'Renewable and sustainable energy solutions with high-efficiency solar panels and smart lighting systems.',
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
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-[#0073bc] to-[#005a94] text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionFadeUp>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
                <IconComponent className="w-10 h-10" />
              </div>
              <AnimatedHeading level={1} className="text-4xl md:text-5xl font-bold mb-4">{page.title}</AnimatedHeading>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">{page.description}</p>
            </div>
          </MotionFadeUp>
        </div>
      </section>

      {/* Product Galleries by Category */}
      {variant === 'flow-meters' && renderGallery('Flow Meters', 'Explore our complete lineup of flow meters')}
      {variant === 'analyzers' && renderGallery('Analyzers & Transmitters', 'Advanced analyzers and transmitters for continuous monitoring')}
      {variant === 'valves' && renderGallery('Valves & Piping', 'Engineered valves and piping solutions for critical applications')}
      {variant === 'automation' && renderGallery('Automation (IoT / PLC / RTU / SCADA)', 'Integrated automation platforms for intelligent water management')}
      {variant === 'cameras' && renderGallery('Cameras & Vision', 'Rugged vision and surveillance systems for utilities')}
      {variant === 'jointing' && renderGallery('Jointing Machines', 'Professional jointing equipment for plastic piping systems')}
      {variant === 'rosemount' && renderGallery('Pressure Transmitter', 'Premium models and options')}
      {variant === 'transformers' && renderGallery('Transformers', 'High-performance power and distribution solutions')}
      {variant === 'solar' && renderGallery('Solar sensor', 'Sustainable solar energy and smart lighting solutions')}
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
    </div>
  );
}