
import { Droplets, Settings, FileText, Wrench, Cloud, Cpu } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import iconWaterTreatmentPlants from '../assets/icon/Water Treatment Plants.png';
import iconAutomationSystems from '../assets/icon/Automation Systems.png';
import iconOMServices from '../assets/icon/O&M Services.png';
import iconCloudManagement from '../assets/icon/Cloud Management.png';
import iconInstallationCommissioning from '../assets/icon/Installation & Commissioning.png';
import iconConsultancyDesign from '../assets/icon/Consultancy & Design.png';

interface ServicesPageProps {
  onNavigate?: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  void onNavigate;

  const services = [
    {
      icon: Droplets,
      image: iconWaterTreatmentPlants,
      title: 'Water Treatment Solutions',
      items: [
        'Water Treatment Plants (WTP)',
        'Sewage Treatment Plants (STP)',
        'Reverse Osmosis (RO) Systems',
        'Effluent Treatment Plants (ETP)',
        'Advanced filtration systems'
      ]
    },
    {
      icon: Cpu,
      image: iconAutomationSystems,
      title: 'Automation & Control',
      items: [
        'PLC panel design & installation',
        'SCADA system integration',
        'IoT sensor networks',
        'Real-time monitoring systems',
        'Automated control systems'
      ]
    },
    {
      icon: Wrench,
      image: iconInstallationCommissioning,
      title: 'Installation & Commissioning',
      items: [
        'Complete system installation',
        'Equipment commissioning',
        'Performance testing',
        'System optimization',
        'Training and handover'
      ]
    },
    {
      icon: Settings,
      image: iconOMServices,
      title: 'Operation & Maintenance',
      items: [
        'Preventive maintenance programs',
        'Emergency repair services',
        'System upgrades and retrofits',
        'Performance monitoring',
        '24/7 technical support'
      ]
    },
    {
      icon: FileText,
      image: iconConsultancyDesign,
      title: 'Consultancy & Design',
      items: [
        'Feasibility studies',
        'Detailed engineering design',
        'GPS surveys and mapping',
        'Project planning',
        'Technical documentation'
      ]
    },
    {
      icon: Cloud,
      image: iconCloudManagement,
      title: 'Turnkey Automation & Cloud',
      items: [
        'End-to-end automation solutions',
        'Cloud-based monitoring platforms',
        'Data analytics and reporting',
        'Mobile app integration',
        'Remote system management'
      ]
    }
  ];

  const technicalCapabilities = [
    'Advanced PLC programming (Siemens, Allen Bradley, Schneider)',
    'HMI/SCADA development and deployment',
    'Industrial IoT sensor integration',
    'Cloud platform deployment (AWS, Azure)',
    'Network infrastructure setup',
    'Cybersecurity implementation',
    'Data acquisition systems',
    'Energy management solutions'
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Technical Services | WTP Maintenance & SCADA Automation - Orbit Engineering"
        description="Professional services for water infrastructure: PLC/SCADA integration, O&M, consultancy, and turnkey automation by Orbit Engineering Group."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Services | Water treatment solutions, PLC/SCADA automation, IoT integration, O&M services, and consultancy in Bhopal</h1>

      <HeroSection title="Our Services" subtitle="Comprehensive water infrastructure solutions from concept to maintenance" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const position = index % 3;
              const variants = {
                hidden: {
                  opacity: 0,
                  x: position === 0 ? 100 : position === 2 ? -100 : 0,
                  scale: position === 1 ? 0.95 : 1,
                  transition: {
                    duration: 1.2,
                    ease: "easeOut" as any,
                    delay: 0.1
                  }
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 1.2, ease: "easeOut" as any }
                }
              };

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={variants}
                  className="group bg-gray-50 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="icon-wrap mb-6 mx-auto">
                    {service.image ? (
                      <img src={service.image} alt={`${service.title} engineering services by Orbit Group Bhopal`} className="icon-img icon-hover" />
                    ) : (
                      <service.icon className="h-12 w-12 md:h-14 md:w-14 text-[#0073bc] mx-auto transform transition-transform duration-300 group-hover:scale-105" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="text-[#0073bc] mr-2 mt-1">•</span>
                        <span className="text-sm">{item}</span>
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Technical Capabilities
              </h2>
              <p className="text-lg text-gray-600">
                Our technical expertise spans the latest technologies and industry standards
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {technicalCapabilities.map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                  >
                    <div className="bg-[#0073bc] rounded-full p-1 mt-1 flex-shrink-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{capability}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Content Management Systems
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We develop custom web-based monitoring and management platforms using modern CMS frameworks including Drupal and Joomla. These systems provide intuitive interfaces for real-time data visualization, reporting, and system control accessible from any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}

    </div>
  );
}
