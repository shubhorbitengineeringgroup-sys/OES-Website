import { Droplets, Zap, Gauge, ThermometerSun, Activity, FlaskConical, Wrench, Camera, BarChart3, Sun, Droplet } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import subHeadingImage from '../assets/products/sub-heading.jpg';
import productsHeroBg from '../assets/products/hero-section.jpg';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
// iconProductsSolutions removed; hero uses shared HeroSection
import iconWTP from '../assets/icon/Water Treatment Plants.png';
import iconSTP from '../assets/icon/Sewage Treatment Plants.png';
import iconRO from '../assets/icon/Reverse Osmosis Systems.png';
import iconETP from '../assets/icon/Effluent Treatment Plants.png';
import iconPLC from '../assets/icon/plc-control-panel.png';
import iconIoT from '../assets/icon/iot-sensors.png';
import iconSolar from '../assets/products/solar-panel.jpg';
import iconChlorinator from '../assets/products/chlorinator.jpeg';
import iconFlowMeter from '../assets/products/electromagnetic-flow-meter.jpg';
import iconAnalyzer from '../assets/products/ph-analyzer.jpeg';
import iconValve from '../assets/products/butter-fly-valves.jpg';
import iconCamera from '../assets/products/bullet-camera.jpg';
import iconJointing from '../assets/products/electrofusion.jpeg';
import iconPressure from '../assets/products/rosemount-3051s-series-coplanar-pressure-transmitter.jpg';
import iconTransformer from '../assets/products/distribution-transformer.jpeg';
// Raw products now live in src/data/rawProducts to avoid HMR issues

interface ProductsPageProps {
  onNavigate?: (page: string) => void;
}



export default function ProductsPage({ onNavigate }: ProductsPageProps) {
  // mark prop as used to satisfy TypeScript when parent passes navigation handler
  void onNavigate;
  const productCategories = [
    {
      icon: Droplets,
      image: iconWTP,
      title: 'Water Treatment Plants',
      description: 'Complete WTP solutions for municipal and industrial applications',
      features: [
        'Capacity: 1 MLD to 100 MLD',
        'Multi-stage filtration',
        'Chemical dosing systems',
        'Automated backwash',
        'Real-time quality monitoring'
      ]
    },
    {
      icon: FlaskConical,
      image: iconSTP,
      title: 'Sewage Treatment Plants',
      description: 'Advanced STP systems with automated controls',
      features: [
        'Biological treatment process',
        'Tertiary treatment options',
        'Sludge management',
        'Odor control systems',
        'Effluent quality monitoring'
      ]
    },
    {
      icon: Activity,
      image: iconRO,
      title: 'Reverse Osmosis Systems',
      description: 'High-efficiency RO plants for pure water production',
      features: [
        'Energy-efficient membranes',
        'Auto-flush systems',
        'TDS monitoring',
        'Compact modular design',
        'Low maintenance operation'
      ]
    },
    {
      icon: Gauge,
      image: iconETP,
      title: 'Effluent Treatment Plants',
      description: 'Industrial wastewater treatment solutions',
      features: [
        'Custom process design',
        'Zero liquid discharge options',
        'Chemical treatment',
        'Automated pH control',
        'Compliance monitoring'
      ]
    },
    {
      icon: Zap,
      image: iconPLC,
      title: 'PLC Control Panels',
      description: 'Intelligent automation and control systems',
      features: [
        'Programmable logic controllers',
        'HMI touch panels',
        'Remote monitoring',
        'Alarm management',
        'Data logging'
      ]
    },
    {
      icon: ThermometerSun,
      image: iconIoT,
      title: 'IoT Sensors',
      description: 'Smart sensors for water quality and flow monitoring',
      features: [
        'pH, turbidity, chlorine sensors',
        'Flow meters',
        'Pressure transmitters',
        'Level sensors',
        'Wireless connectivity'
      ]
    },
    {
      icon: Gauge,
      image: iconFlowMeter,
      page: 'product-info:flow-meters',
      title: 'Flow Meters',
      description: 'Precision flow measurement for all applications',
      features: [
        'Electromagnetic flow meters',
        'Ultrasonic flow meters',
        'High accuracy ±0.5%',
        'Wide flow range',
        'Digital outputs'
      ]
    },
    {
      icon: Activity,
      image: iconAnalyzer,
      page: 'product-info:analyzers',
      title: 'Analyzers & Transmitters',
      description: 'Continuous online water quality monitoring',
      features: [
        'pH/ORP analyzers',
        'Conductivity transmitters',
        'Dissolved oxygen sensors',
        'Turbidity meters',
        'Multi-parameter systems'
      ]
    },
    {
      icon: Wrench,
      image: iconValve,
      page: 'product-info:valves',
      title: 'Valves & Piping',
      description: 'Industrial grade valves and piping solutions',
      features: [
        'Butterfly valves',
        'Gate & Globe valves',
        'Check valves',
        'Actuated valves',
        'Corrosion resistant material'
      ]
    },
    {
      icon: Camera,
      image: iconCamera,
      page: 'product-info:cameras',
      title: 'Cameras & Vision',
      description: 'Rugged surveillance for water infrastructure',
      features: [
        'CCTV systems',
        'Night vision',
        'Remote monitoring',
        'Motion detection',
        'IP67 rated housing'
      ]
    },
    {
      icon: Wrench,
      image: iconJointing,
      page: 'product-info:jointing',
      title: 'Jointing Machines',
      description: 'HDPE pipe jointing and fusion equipment',
      features: [
        'Butt fusion machines',
        'Electrofusion units',
        'Pipe scrapers',
        'Data logging',
        'Field proven reliability'
      ]
    },
    {
      icon: BarChart3,
      image: iconPressure,
      page: 'product-info:rosemount',
      title: 'Pressure Transmitter',
      description: 'High-performance pressure and level transmitters',
      features: [
        '3051S Series',
        'Coplanar design',
        'High stability',
        'Advanced diagnostics',
        'HART communication'
      ]
    },
    {
      icon: Zap,
      image: iconTransformer,
      page: 'product-info:transformers',
      title: 'Transformers',
      description: 'Power and distribution transformers for grid stability',
      features: [
        'Auto Transformers',
        'Distribution Transformers',
        'Shunt Reactors',
        'Locomotive Transformers',
        'High Efficiency'
      ]
    },
    {
      icon: Sun,
      image: iconSolar,
      page: 'product-info:solar',
      title: 'Solar Sensor',
      description: 'Advanced solar monitoring and control systems',
      features: [
        'Solar irradiance sensors',
        'Panel efficiency monitoring',
        'Real-time performance tracking',
        'Weather station integration',
        'Data logging & analytics'
      ]
    },
    {
      icon: Droplet,
      image: iconChlorinator,
      page: 'product-info:chlorinators',
      title: 'Chlorinators',
      description: 'Automated chlorine dosing systems for water treatment',
      features: [
        'Precise chemical dosing',
        'Automated control',
        'Flow-proportional dosing',
        'Safety interlocks',
        'Low maintenance operation'
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Water Treatment Products & Solutions | WTP, STP, RO, ETP - Orbit Engineering"
        description="Explore Orbit Engineering's comprehensive range of water treatment products, including WTP, STP, RO systems, ETP, and industrial automation solutions in Bhopal."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Products | Water Treatment Plants (WTP), STP, RO, ETP, PLC Control Panels & IoT Sensors Bhopal</h1>

      <HeroSection title="Products & Solutions" subtitle="Advanced water treatment technologies and automation systems" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.slice(0, 6).map((category, index) => {
              const position = index % 3;
              const variants = {
                hidden: {
                  opacity: 0,
                  x: position === 0 ? 100 : position === 2 ? -100 : 0,
                  scale: position === 1 ? 0.95 : 1
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 1.2, ease: "easeOut" as any, delay: index * 0.05 }
                }
              };

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={variants}
                  className={`group bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-[#0073bc]/20 transform hover:-translate-y-1 ${(category as any).page ? 'cursor-pointer' : ''
                    }`}
                  onClick={() => {
                    if ((category as any).page && onNavigate) {
                      onNavigate((category as any).page);
                    }
                  }}
                >
                  <div className="icon-wrap mb-6 mx-auto group-hover:bg-[#0073bc]/10 transition-colors duration-300">
                    {category.image ? (
                      <img src={category.image} alt={`${category.title} system design and installation by Orbit Engineering Bhopal`} className="icon-img icon-hover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <category.icon className="h-10 w-10 text-[#0073bc] mx-auto group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {category.title === 'Water Treatment Plants' && '🚰 '}
                    {category.title === 'Sewage Treatment Plants' && '🧼 '}
                    {category.title === 'Reverse Osmosis Systems' && '💧 '}
                    {category.title === 'Effluent Treatment Plants' && '🏭 '}
                    {category.title === 'PLC Control Panels' && '📟 '}
                    {category.title === 'IoT Sensors' && '📶 '}
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="text-[#0073bc] mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* New Hero Section for remaining products */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl my-16 h-[300px] flex items-center justify-center">
            <img
              src={productsHeroBg}
              alt="Products Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 text-center px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">All Products</h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium">Explore Our Complete Range of Smart & Reliable Solutions</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.slice(6).map((category, index) => {
              // Adjust index for staggered animation continuity
              const actualIndex = index + 6;
              const position = actualIndex % 3;
              const variants = {
                hidden: {
                  opacity: 0,
                  x: position === 0 ? 100 : position === 2 ? -100 : 0,
                  scale: position === 1 ? 0.95 : 1
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 1.2, ease: "easeOut" as any, delay: index * 0.05 }
                }
              };

              return (
                <motion.div
                  key={actualIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={variants}
                  className={`group bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-[#0073bc]/20 transform hover:-translate-y-1 ${(category as any).page ? 'cursor-pointer' : ''
                    }`}
                  onClick={() => {
                    if ((category as any).page && onNavigate) {
                      onNavigate((category as any).page);
                    }
                  }}
                >
                  <div className="icon-wrap mb-6 mx-auto group-hover:bg-[#0073bc]/10 transition-colors duration-300">
                    {category.image ? (
                      <img src={category.image} alt={`${category.title} system design and installation by Orbit Engineering Bhopal`} className="icon-img icon-hover group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <category.icon className="h-10 w-10 text-[#0073bc] mx-auto group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="text-[#0073bc] mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl text-white">
              <img src={subHeadingImage} alt="Clarus Fusion background" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 p-8 md:p-12 text-center py-20">
                <Zap className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  Clarus Fusion Series
                </h2>
                <p className="text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Our flagship integrated water management platform combining advanced treatment processes with intelligent automation for optimal performance and efficiency.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-2">30%</div>
                    <div className="text-blue-100 text-sm">Lower Power Consumption</div>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-2">99.5%</div>
                    <div className="text-blue-100 text-sm">Treatment Efficiency</div>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-blue-100 text-sm">Remote Monitoring</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold mb-3">Key Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Energy-optimized operation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Predictive maintenance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Cloud-based analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Mobile app control</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Automated reporting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-200">•</span>
                      <span className="text-sm">Scalable architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our engineering team can design and build products tailored to your specific requirements
          </p>

        </div>
      </section>
    </div>
  );
}
