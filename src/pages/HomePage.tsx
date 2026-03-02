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
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
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
    <section className="py-20 bg-white overflow-hidden">
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
              Orbit Engineering Solutions specialises in advanced automation — adopting state-of-the-art technologies to enhance water resource management, efficiency and sustainability:
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
                Orbit Engineering Solutions empowers communities with smarter, greener, and more reliable water infrastructure across both rural and urban settings.
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
    <div className="min-h-screen overflow-x-hidden">
      <SEO
        title="Orbit Engineering Solutions | #1 Water Treatment, SCADA & PLC Automation Company in India - Bhopal"
        description="Orbit Engineering Solutions, Bhopal – India's most trusted water engineering since 1998. Experts in WTP, STP, RO, ETP, SCADA, PLC automation & IoT. ISO 9001 certified. ₹200+ Cr portfolio. Contact: +91 70241 28029, +91 9039075049 | info@orbitengineerings.com, service@orbitengineerings.com"
        canonicalPath="/"
        keywords="Orbit Engineering Solutions, Orbit Engineering, Orbit Engineering Group, orbit engineering solutions bhopal, orbit bhopal, orbit engineering company, orbit engineering solutions india, water treatment plant Bhopal, WTP services, STP services, RO services, ETP services, WTP STP RO ETP, SCADA automation India, PLC automation water, instrumentation services, instrumentation company Bhopal, instrumentation and control, solar services, solar services Bhopal, solar energy solutions, orbitengineerings.com, water infrastructure company India, Bhopal engineering, smart water management, IoT water monitoring, water treatment company near me, best water treatment company India, water treatment plant Madhya Pradesh, SCADA system price, PLC panel manufacturer, flow meter manufacturer, level transmitter, pressure transmitter, water analyzer, chlorinator, turnkey automation, Jal Jeevan Mission, MP Jal Nigam, MPUDCL, orbit engg, orbit eng solutions, orbit engineering solutons, water treatment, water treatment plant, water purification, service@orbitengineerings.com, +91 9039075049"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Solutions Bhopal | Water Treatment Plants (WTP), SCADA, PLC Automation & Sustainable Engineering Solutions</h1>

      <section className="relative text-white overflow-hidden">
        <HeroBackgroundSlider />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="max-w-3xl lg:pr-10">
              <div className="mb-6 md:mb-8">
                <motion.h2
                  className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.8rem] font-extrabold mb-4 leading-[1.3] md:leading-[1.15] drop-shadow-2xl tracking-tight text-white flex flex-col items-start gap-y-1 md:gap-y-2"
                >
                  {/* Line 1 */}
                  <span className="flex flex-wrap gap-x-2 lg:gap-x-3">
                    {"Water Tech for a".split(" ").map((word, i) => (
                      <motion.span
                        key={`l1-${i}`}
                        initial={{ opacity: 0, y: 30, rotateX: -45 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 120, damping: 14 }}
                        className="inline-block origin-bottom shadow-black"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>

                  {/* Line 2 (Highlighted) */}
                  <span className="flex flex-wrap gap-x-2 lg:gap-x-3 text-[#5eb2eb] relative my-1">
                    {"Greener, Resilient".split(" ").map((word, i) => (
                      <motion.span
                        key={`l2-${i}`}
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.4 + (i * 0.15), ease: "easeOut" }}
                        className="inline-block font-black drop-shadow-[0_0_15px_rgba(94,178,235,0.4)]"
                      >
                        {word}
                      </motion.span>
                    ))}
                    {/* Glossy sweep effect over the highlighted words */}
                    <motion.div
                      animate={{ left: ['-10%', '110%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 z-20 pointer-events-none"
                    />
                  </span>

                  {/* Line 3 */}
                  <span className="flex flex-wrap gap-x-2 lg:gap-x-3">
                    {"and Sustainable Tomorrow".split(" ").map((word, i) => (
                      <motion.span
                        key={`l3-${i}`}
                        initial={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, delay: 0.8 + (i * 0.1), ease: "easeOut" }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.4, type: "spring", stiffness: 100 }}
                className="relative p-5 md:p-6 mb-8 md:mb-10 lg:pr-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden group"
              >
                {/* Decorative glowing left border line */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#5eb2eb] to-[#005a94] shadow-[0_0_20px_rgba(96,179,235,0.8)]"></div>

                {/* Internal subtle hover light effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out"></div>

                <p className="text-base sm:text-lg lg:text-[1.1rem] text-blue-50/90 leading-[1.7] md:leading-[1.8] font-light relative z-10 [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]">
                  <strong className="text-white font-bold tracking-wide text-lg sm:text-xl">Orbit</strong> propels water management beyond convention — harnessing cutting-edge <span className="text-white font-semibold underline decoration-[#5eb2eb] decoration-2 underline-offset-[5px]">process automation</span>, <span className="text-white font-semibold underline decoration-[#5eb2eb] decoration-2 underline-offset-[5px]">SCADA</span>, Industry 4.0, cloud technologies, and precision instrumentation to solve real-world water challenges in rural and urban India.
                </p>
              </motion.div>
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
        <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center bg-gray-900/70 backdrop-blur-md p-0 md:p-6 lg:p-12 overflow-y-auto" onClick={() => setShowLearnMore(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="w-full max-w-6xl bg-white rounded-t-[2.5rem] md:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col md:flex-row max-h-[92vh] mt-10 md:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Image Section */}
            <div className="relative w-full md:w-[45%] h-[35vh] min-h-[280px] md:h-auto flex-shrink-0">
              <img src={villageProject2} alt="About Orbit" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase mb-4 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                  Est. 1998
                </span>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] drop-shadow-lg">
                  A Legacy of <br /><span className="text-blue-400">Excellence</span>
                </h3>
              </div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-14 overflow-y-auto custom-scrollbar bg-white flex flex-col relative rounded-t-[2.5rem] md:rounded-l-none -mt-6 md:mt-0 z-20">
              <button aria-label="Close" onClick={() => setShowLearnMore(false)} className="absolute top-6 right-6 md:top-6 md:right-6 p-2 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all z-30 bg-white/50 backdrop-blur-sm shadow-sm md:shadow-none md:bg-transparent border border-gray-100 md:border-transparent">
                <X className="h-6 w-6" />
              </button>

              <div className="max-w-xl mx-auto md:mx-0 w-full h-full flex flex-col pt-2 md:pt-0">
                <div className="mb-8 md:mb-10">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0073bc] tracking-tight mb-3">
                    Orbit <span className="text-gray-900">Engineering</span>
                  </h2>
                  <p className="text-gray-500 font-medium text-lg lg:text-xl leading-relaxed">
                    Pioneering water innovation for sustainable communities
                  </p>
                </div>

                <div className="space-y-8 flex-1">
                  <p className="text-gray-600 leading-[1.8] text-[16px] md:text-[17px]">
                    Established in <strong className="text-[#0073bc] font-bold">1998</strong> in Bhopal, <strong className="text-gray-900 font-bold text-lg">Orbit Engineering Group</strong> builds on a legacy exceeding four decades of engineering excellence. We deliver turnkey systems — from design and steel fabrication to PLC/SCADA integration and long-term O&M — through an <strong className="text-[#0073bc] font-bold">ISO 9001</strong>-certified quality framework.
                  </p>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="relative pl-6 py-4 my-8 border-l-[4px] border-[#0073bc] bg-blue-50/50 rounded-r-2xl pr-6 transition-transform shadow-[inset_0_2px_10px_rgba(0,115,188,0.03)]"
                  >
                    <p className="text-[#005a94] leading-[1.8] text-[15.5px] font-medium italic">
                      "Our ambition is to lead in water innovation — offering holistic, sustainable, and affordable solutions that elevate access to clean water, optimize resource management, and uplift communities across India and beyond."
                    </p>
                  </motion.div>

                  <div className="pt-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px bg-gray-200 flex-1"></div>
                      <h4 className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase">Our Mission</h4>
                      <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <p className="text-gray-600 leading-[1.8] text-[16px] mb-6">
                      To innovate with purpose, deliver with integrity, and provide water systems grounded in environmental stewardship.
                    </p>

                    <div className="p-6 md:p-8 bg-gradient-to-br from-[#000d1a] to-[#001f3f] rounded-3xl shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 border border-white/10">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0073bc] rounded-full filter blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#005a94] rounded-full filter blur-[50px] opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
                      <p className="text-blue-50 font-light text-lg relative z-10 leading-relaxed text-center shadow-sm">
                        At <strong className="text-white font-black text-3xl italic tracking-tight drop-shadow-md mx-1 align-baseline">Orbit</strong>, every project is a promise fulfilled <br className="hidden md:block" />for a cleaner, more resilient tomorrow.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
