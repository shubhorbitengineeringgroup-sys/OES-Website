import { ArrowRight, Cpu, Cloud, Droplets, Settings, X } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { MotionFadeUp, MotionStagger, AnimatedHeading } from '../components/Animated';
import { useState, useRef } from 'react';
import SEO from '../components/SEO';
import heroGirl from '../assets/hero-village-girl.jpg';
import HeroBackgroundSlider from '../components/HeroBackgroundSlider';
import villageProject2 from '../assets/village-project-2.jpg';
import iconWaterTreatmentPlants from '../assets/icon/Water Treatment Plants.png';
import iconAutomationSystems from '../assets/icon/Automation Systems.png';
import iconCloudManagement from '../assets/icon/Cloud Management.png';
import iconOMServices from '../assets/icon/O&M Services.png';
import panoramicLake from '../assets/panaromic-view-of-upperlake.jpeg';
import automationHeadingBg from '../assets/products/hero-section.jpg';
// Note: Using original image for now, will be replaced with generated watermark-free version

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// (CenteredImageSection removed — replaced by DualAnimationSection in Section 2)

// Dual Animation Section Component
function DualAnimationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        staggerChildren: 0.3
      }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Text Content */}
          <motion.div variants={leftVariants} className="space-y-6">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
              Innovative Tech to Drive Sustainable Water Management
            </motion.h2>
            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0073bc] leading-tight">
              Leveraging advanced automation and cloud-based systems to revolutionize water infrastructure.
            </motion.h3>
          </motion.div>

          {/* Right Side - Image Content */}
          <motion.div variants={rightVariants} className="flex justify-center items-center">
            <img
              src={villageProject2}
              alt="Village water project in Bhopal showcasing sustainable water infrastructure by Orbit Engineering"
              className="w-full h-[400px] md:h-[500px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,115,188,0.3)] object-cover ring-1 ring-blue-100"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Automation Section Component with Enhanced Animations
function AutomationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Heading animation - fade from top
  const headingVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  // Image animation - slide from left
  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: 0.2
      }
    }
  };

  // Individual item animation for staggered content
  const contentItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Stagger container for bullet points
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  // Individual bullet animation
  const bulletVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const bulletPoints = [
    "Modernising existing infrastructure (dams, canals) to meet rising water demands.",
    "Smart water management systems combining SCADA and GIS for centralised urban water utility control.",
    "Sensor & IoT integration for real-time monitoring of flow, quality, levels, soil moisture and weather conditions.",
    "Data-driven decision-making utilising analytics and predictive maintenance to optimise resource allocation, detect leaks and plan upkeep.",
    "Enhanced conservation by precisely controlling distribution to reduce leaks, overflows and inefficient irrigation.",
    "Cost-efficiency gains via automation of pump stations, distribution networks and maintenance alerts—minimising manual labour and resource wastage."
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading with Background Image */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative mb-12 rounded-lg overflow-hidden shadow-xl"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${automationHeadingBg})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <h2 className="relative z-10 py-16 text-3xl md:text-4xl font-bold text-white leading-tight text-center px-4">
            Automation of Water Systems
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image with slide from left animation */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1 lg:-ml-8"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              src={panoramicLake}
              alt="Panoramic view of upper lake showcasing water infrastructure"
              className="w-full h-[450px] md:h-[550px] lg:h-[600px] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,115,188,0.3)] object-contain bg-gray-50 ring-1 ring-blue-100 cursor-pointer"
            />
          </motion.div>

          {/* Right Side - Content with slide from right animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2 space-y-6 lg:pl-8"
          >
            <motion.p
              variants={contentItemVariants}
              className="text-lg text-gray-600 leading-relaxed font-light"
            >
              Orbit Engineering Group specialises in advanced automation — adopting state-of-the-art technologies to enhance water resource management, efficiency and sustainability:
            </motion.p>

            {/* Bullet Points with staggered animations */}
            <motion.ul
              variants={listContainerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4"
            >
              {bulletPoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={bulletVariants}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 transition-all duration-300"
                >
                  <div className="flex-shrink-0 mt-1">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="h-6 w-6 rounded-full bg-[#0073bc] flex items-center justify-center shadow-md"
                    >
                      <Droplets className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  <span className="text-gray-700 leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Closing Statement with delayed fade-in */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="pt-4 border-t border-gray-200"
            >
              <p className="text-lg font-semibold text-[#0073bc] leading-relaxed">
                Orbit Engineering Group empowers communities with smarter, greener, and more reliable water infrastructure across both rural and urban settings.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showLearnMore, setShowLearnMore] = useState(false);
  const services = [
    { icon: Droplets, image: iconWaterTreatmentPlants, title: 'Water Treatment Plants', desc: 'Complete WTP, STP, RO, and ETP solutions' },
    { icon: Cpu, image: iconAutomationSystems, title: 'Automation Systems', desc: 'PLC panels, SCADA, and IoT sensors' },
    { icon: Cloud, image: iconCloudManagement, title: 'Cloud Management', desc: 'Real-time monitoring and control systems' },
    { icon: Settings, image: iconOMServices, title: 'O&M Services', desc: 'Comprehensive operation and maintenance' },
  ];



  return (
    <div className="min-h-screen">
      <SEO
        title="Orbit Engineering Group | Water Treatment & Automation Bhopal"
        description="Orbit Engineering Group Bhopal: Leaders in WTP, STP, RO, SCADA, and PLC automation. Solving complex water challenges in India since 1998."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Bhopal | Water Treatment Plants (WTP), SCADA, PLC Automation & Sustainable Engineering Solutions</h1>

      <section className="relative text-white overflow-hidden">
        <HeroBackgroundSlider />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl lg:pr-10">
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0 }}
              >
                Water Tech for a Greener, Resilient and Sustainable Tomorrow
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl text-white mb-8 leading-relaxed font-medium [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              >
                Orbit propels water management beyond convention — harnessing cutting-edge process automation, SCADA, Industry 4.0, cloud technologies, and precision instrumentation to solve real-world water challenges in rural and urban India.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLearnMore(true)}
                  className="px-8 py-4 bg-white text-[#0073bc] rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.03] hover:bg-blue-50"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative lg:pl-6">
              <motion.img
                src={heroGirl}
                alt="Village girl drinking clean water from Orbit Engineering's automated water supply scheme"
                className="w-full h-auto max-h-[520px] object-cover rounded-2xl shadow-2xl ring-1 ring-white/20"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
              />
            </div>
          </div>
        </div>
        {/* removed bottom white fade so background image remains fully visible */}
      </section>

      {/* Section 2: moved DualAnimationSection into this position */}
      <DualAnimationSection />

      {/* Section 3: Automation of Water Systems */}
      <AutomationSection />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedHeading level={2} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</AnimatedHeading>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive water infrastructure solutions tailored to your needs
            </p>
          </div>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.05}>
            {services.map((service, index) => (
              <MotionFadeUp key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                {service.image ? (
                  <img src={service.image} alt={`${service.title} icon`} className="h-12 w-12 object-contain mb-4 mx-auto" />
                ) : (
                  <service.icon className="h-12 w-12 text-[#0073bc] mb-4 mx-auto" />
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </MotionFadeUp>
            ))}
          </MotionStagger>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-3 bg-[#0073bc] text-white rounded-full font-semibold hover:bg-[#005a94] transition-all duration-300 transform hover:scale-[1.03] inline-flex items-center space-x-2"
            >
              <span>Explore All Services</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dual Animation Section removed from here (moved to Section 2) */}

      {showLearnMore && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50" onClick={() => setShowLearnMore(false)}>
          <div
            className="w-full md:max-w-3xl bg-white text-gray-800 rounded-t-2xl md:rounded-2xl shadow-2xl p-6 md:p-8 mx-0 md:mx-4 animate-fade-in animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-2xl font-bold text-[#0073bc] tracking-tight">About Orbit Engineering Group</h3>
              <button aria-label="Close" onClick={() => setShowLearnMore(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.div
              className="space-y-4 text-gray-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 font-light"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                Established in <strong className="text-[#0073bc]">1998</strong> in Bhopal, <strong className="text-[#0073bc]">Orbit</strong> Engineering Group builds on a legacy exceeding four decades of engineering excellence. We deliver turnkey systems — from design and steel fabrication to PLC/SCADA integration and long-term O&M — through an <strong className="text-[#0073bc]">ISO 9001</strong>-certified quality framework.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                Our ambition is to lead in water innovation — offering holistic, sustainable, and affordable solutions that elevate access to clean water, optimize resource management, and uplift communities across India and beyond.
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <strong>Our Mission:</strong> To innovate with purpose, deliver with integrity, and provide water systems grounded in environmental stewardship. At <strong className="text-[#0073bc]">Orbit</strong>, every project is a promise fulfilled — for a cleaner, more resilient tomorrow.
              </motion.p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
