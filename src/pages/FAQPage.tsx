import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import subHeadingImage from '../assets/products/sub-heading.jpg';
import heroWaterImage from '../assets/products/hero-section.jpg';
import { ChevronDown, HelpCircle, Droplet, Sun, Layers, LayoutGrid } from 'lucide-react';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const [openSectionIndex, setOpenSectionIndex] = useState<string | null>('0-0');

  interface FAQItem {
    question: string;
    answer: React.ReactNode;
  }

  interface FAQSection {
    title: string;
    icon: React.ElementType;
    faqs: FAQItem[];
  }

  const sections: FAQSection[] = [
    {
      title: 'Understanding Our Water Treatment Plant (WTP)',
      icon: Droplet,
      faqs: [
        {
          question: 'What types of water treatment solutions do you offer?',
          answer: 'Orbit Engineering Group offers a wide range of water treatment solutions to meet various needs, including: Water filtration systems: Remove impurities, contaminants, and suspended solids from water. Water softening systems: Reduce the hardness of water by removing calcium and magnesium ions. Disinfection systems: Eliminate harmful bacteria, viruses, and other microorganisms. Wastewater treatment systems: Treat wastewater to remove pollutants and contaminants before discharge.'
        },
        {
          question: 'How does a Water Treatment Plant improve water quality?',
          answer: 'A WTP removes suspended solids, harmful microorganisms, organic matter, and chemical contaminants through processes such as coagulation, filtration, and disinfection, ensuring safe and potable water supply.'
        },
        {
          question: 'Do you design customized WTP solutions for different capacities?',
          answer: 'Yes, we design customized WTP solutions based on raw water quality, required treatment standards, plant capacity (MLD), and site conditions to ensure efficient and compliant operation.'
        },
        {
          question: 'What factors influence the cost of a Water Treatment Plant?',
          answer: 'The cost depends on plant capacity, treatment technology, raw water quality, automation level, civil and mechanical scope, and long-term operation & maintenance requirements.'
        }
      ]
    },
    {
      title: 'Understanding Our Solar Power',
      icon: Sun,
      faqs: [
        {
          question: 'Which type of solar system is suitable for industrial or infrastructure projects?',
          answer: 'On-grid and hybrid solar systems are commonly used for industrial, commercial, and infrastructure projects due to their reliability, scalability, and cost-effectiveness.'
        },
        {
          question: 'Do you provide customized solar solutions based on site requirements?',
          answer: 'Yes, we offer customized solar solutions after detailed site assessment, load analysis, and energy requirement evaluation to ensure maximum efficiency, safety, and long-term performance.'
        },
        {
          question: 'Do you provide design, installation, and maintenance support for solar systems?',
          answer: 'Yes, we offer complete solar solutions including system design, engineering, installation, commissioning, and operation & maintenance support.'
        },
        {
          question: 'How can I get in touch with your solar solutions team?',
          answer: 'You can contact our team through the website contact form, email, or phone. Our experts will assist you with consultations, site visits, and project planning.'
        }
      ]
    },
    {
      title: 'Our Products & Technologies',
      icon: Layers,
      faqs: [
        {
          question: 'What types of flow meters do you offer?',
          answer: 'We offer a wide range of flow meters suitable for water, wastewater, and industrial applications. These systems are designed to handle varying flow conditions, pipe sizes, and fluid characteristics. Our solutions ensure accurate measurement for both clean and contaminated fluids. They are suitable for continuous and critical operations.'
        },
        {
          question: 'Can flow meters be integrated with automation systems?',
          answer: 'Yes, our flow meters are designed to integrate seamlessly with PLC, RTU, and SCADA systems. They support industry-standard communication protocols for real-time data monitoring. Integration helps improve operational control, reporting, and decision-making. Remote monitoring and data logging are also supported.'
        },
        {
          question: 'How accurate and reliable are your flow meters?',
          answer: 'Our flow meters are engineered for high accuracy and stable long-term operation. They are suitable for continuous industrial and infrastructure use with minimal drift. Robust construction ensures reliable performance even in harsh environments. Regular calibration helps maintain measurement accuracy.'
        },
        {
          question: 'What parameters can be measured using analyzers and transmitters?',
          answer: 'Our analyzers and transmitters can measure key water quality parameters such as pH, turbidity, conductivity, dissolved oxygen, chlorine, and more. These measurements help assess water quality in real time. They are widely used in water treatment plants and industrial processes. Accurate data supports process control and compliance.'
        },
        {
          question: 'Are these instruments suitable for continuous monitoring?',
          answer: 'Yes, these instruments are specifically designed for continuous online monitoring. They provide real-time data without interrupting plant operations. This helps operators respond quickly to process variations. Continuous monitoring improves efficiency and water quality consistency.'
        },
        {
          question: 'Can analyzers be integrated with SCADA systems?',
          answer: 'Yes, our analyzers and transmitters are fully compatible with PLC and SCADA systems. Integration enables centralized monitoring, alarm generation, and data storage. Operators can access live and historical data remotely. This improves operational visibility and control.'
        },
        {
          question: 'What types of valves and piping systems do you provide?',
          answer: 'We provide a wide range of valves and piping solutions suitable for water treatment and industrial applications. These systems are designed to control flow, pressure, and isolation efficiently. They are available in different materials and configurations. Each solution is selected based on project requirements.'
        },
        {
          question: 'Are valves suitable for high-pressure and continuous operation?',
          answer: 'Yes, our valves are designed to withstand high pressure and continuous operating conditions. They are manufactured using durable materials to ensure long service life. Proper sealing ensures minimal leakage. This makes them suitable for critical infrastructure systems.'
        },
        {
          question: 'What automation solutions do you offer?',
          answer: 'We offer complete automation solutions including PLC, RTU, SCADA, and IoT-based systems. These solutions help monitor and control processes efficiently. They are widely used in water, wastewater, and infrastructure projects. Systems are designed for scalability and reliability.'
        },
        {
          question: 'How does SCADA benefit water and infrastructure projects?',
          answer: 'SCADA systems enable real-time monitoring, data visualization, and remote control. They help identify faults early and reduce downtime. Centralized control improves operational efficiency and decision-making. SCADA also supports reporting and performance analysis.'
        },
        {
          question: 'Are the systems suitable for outdoor environments?',
          answer: 'Yes, our camera systems are designed for outdoor and harsh environmental conditions. They are resistant to dust, moisture, and temperature variations. This ensures reliable operation in industrial sites. Rugged design ensures long service life.'
        },
        {
          question: 'Is remote access available for camera systems?',
          answer: 'Yes, remote viewing and monitoring are supported through secure network connections. Authorized users can access live and recorded footage. Remote access improves security management. It also supports quick decision-making during emergencies.'
        },
        {
          question: 'Are jointing machines suitable for large-diameter pipes?',
          answer: 'Yes, jointing machines are available for various pipe diameters and materials. They are designed to handle heavy-duty site conditions. Machines ensure uniform joint quality across projects. This improves installation efficiency and safety.'
        },
        {
          question: 'Are the machines compliant with safety standards?',
          answer: 'Yes, all jointing machines are designed as per applicable safety and quality standards. Safety features protect operators during use. Compliance ensures suitability for government and industrial projects. Regular inspections further enhance safety.'
        },
        {
          question: 'Are chlorinators suitable for drinking water treatment?',
          answer: 'Yes, chlorinators are commonly used in potable water treatment. They ensure safe chlorine dosing as per required standards. Proper dosing maintains water quality without over-chlorination. This makes them suitable for municipal use.'
        },
        {
          question: 'How is chlorine dosing controlled?',
          answer: 'Chlorine dosing is controlled automatically based on flow and demand. Automated control ensures consistent disinfection. Safety features help prevent overdosing. Monitoring systems provide operational visibility.'
        },
        {
          question: 'Do transformers meet safety and efficiency standards?',
          answer: 'Yes, all transformers comply with applicable electrical safety and efficiency standards. Compliance ensures safe operation and reduced losses. Quality checks are conducted during manufacturing. This ensures long-term reliability.'
        },
        {
          question: 'Do you provide testing and commissioning support?',
          answer: 'Yes, we provide testing, installation, and commissioning support. Proper commissioning ensures safe and efficient operation. Our team assists during startup and handover. Post-installation support is also available.'
        }
      ]
    },
    {
      title: 'General Questions',
      icon: LayoutGrid,
      faqs: [
        {
          question: 'Are your products suitable for industrial and government projects?',
          answer: 'Yes, our products are designed to meet the requirements of industrial, municipal, and government infrastructure projects. They comply with relevant national and international standards. Robust design and reliable performance make them suitable for critical and large-scale applications. Each solution is selected based on project specifications.'
        },
        {
          question: 'Do you provide installation, commissioning, and after-sales support?',
          answer: 'Yes, we provide end-to-end support including installation, testing, commissioning, and after-sales service. Our technical team ensures smooth system handover and operational readiness. Preventive maintenance and technical assistance are also available. This ensures long-term reliability and customer satisfaction.'
        },
        {
          question: 'How do your SCADA systems help optimise water distribution?',
          answer: 'Our SCADA (Supervisory Control and Data Acquisition) systems provide real-time monitoring and control of water distribution networks. By collecting and analyzing data on water flow, pressure, and consumption, we can optimize operations, identify leaks, and improve efficiency.'
        },
        {
          question: 'Do you offer custom solutions to meet specific needs?',
          answer: 'Yes, we specialise in providing customised solutions to meet the unique requirements of our clients. Our team of experts can work with you to design and implement a water treatment system that is tailored to your specific needs and budget.'
        },
        {
          question: 'How do you determine pricing for your products and services?',
          answer: 'Our pricing is based on several factors, including the size of the project, the complexity of the system, and the specific requirements of the client. We strive to offer competitive pricing while providing high-quality products and services.'
        },
        {
          question: 'How can I contact your customer support team?',
          answer: (
            <span>
              You can contact our customer support team by phone, email, or through our website contact form. Our team is available to assist you with any questions: <a href="mailto:info@orbitengineerings.com" className="text-[#0073bc] hover:underline">info@orbitengineerings.com</a>
            </span>
          )
        }
      ]
    }
  ];

  const toggleFAQ = (sectionIndex: number, index: number) => {
    const key = `${sectionIndex}-${index}`;
    setOpenSectionIndex(openSectionIndex === key ? null : key);
  };

  const highlightKeywords = (text: string) => {
    if (!text) return text;
    const keywords = ['WTP', 'Solar', 'Products', 'Technologies'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'g'));
    return parts.map((part, i) => keywords.includes(part) ? <span key={i} className="text-[#0073bc]">{part}</span> : part);
  };

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative text-white py-20">
        <img src={heroWaterImage} alt="Water technology background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Find answers to common questions about our services and solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-20 last:mb-0 relative">
              {/* Watermark Icon */}
              <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none z-0">
                <section.icon size={300} strokeWidth={1} className="text-[#0073bc]" />
              </div>

              <div className="mb-10 relative z-10 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 inline-block gradient-underline">
                  {highlightKeywords(section.title)}
                </h2>
              </div>

              <motion.div
                className="space-y-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {section.faqs.map((faq, index) => {
                  const isOpen = openSectionIndex === `${sectionIndex}-${index}`;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                    >
                      <button
                        onClick={() => toggleFAQ(sectionIndex, index)}
                        className="w-full px-6 py-5 flex items-start justify-between text-left hover:bg-gray-50 transition-colors group"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-8 group-hover:text-[#0073bc] transition-colors">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-6 w-6 text-gray-400 group-hover:text-[#0073bc] flex-shrink-0 transition-all duration-300 ${isOpen ? 'transform rotate-180 text-[#0073bc]' : ''
                            }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed text-base">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative text-white py-16">
        <img src={subHeadingImage} alt="Questions background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Our team is here to help. Get in touch with us for personalized assistance.
          </p>
          <button
            className="px-8 py-3 bg-white text-[#0073bc] rounded-full font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => onNavigate && onNavigate('contact#contact-form')}
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
}

