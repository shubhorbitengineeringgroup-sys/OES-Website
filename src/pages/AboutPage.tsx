import { Mail, Phone, MapPin } from 'lucide-react';
import iconInnovation from '../assets/icon/Innovation-Driven.png';
import iconProven from '../assets/icon/Proven Excellence.png';
import iconQuality from '../assets/icon/Quality Assurance.png';
import iconCommunity from '../assets/icon/Community Focus.png';
import iconEndToEnd from '../assets/icon/End-to-End Solutions.png';
import iconResults from '../assets/icon/Results Oriented.png';
import subHeadingImage from '../assets/products/sub-heading.jpg';
import headingBg from '../assets/products/hero-section.jpg';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { AnimatedHeading } from '../components/Animated';
import SEO from '../components/SEO';
import mapGif from '../assets/my_VisitedPlaces.gif';

export default function AboutPage() {
  const whyChooseUs = [
    {
      image: iconInnovation,
      title: 'Innovation-Driven',
      description: 'Pioneering cutting-edge water technology solutions with IoT, automation, and cloud-based monitoring systems'
    },
    {
      image: iconProven,
      title: 'Proven Excellence',
      description: 'Over 15 years of experience delivering complex water infrastructure projects across India'
    },
    {
      image: iconQuality,
      title: 'Quality Assurance',
      description: 'ISO-certified processes ensuring the highest standards in design, installation, and maintenance'
    },
    {
      image: iconCommunity,
      title: 'Community Focus',
      description: 'Dedicated to serving rural and urban communities with sustainable water management solutions'
    },
    {
      image: iconEndToEnd,
      title: 'End-to-End Solutions',
      description: 'Complete project lifecycle management from design and implementation to operation and maintenance'
    },
    {
      image: iconResults,
      title: 'Results Oriented',
      description: 'Committed to measurable outcomes that improve water access, quality, and efficiency'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About Orbit Engineering Group | 25+ Years of Engineering Excellence in Bhopal"
        description="Learn about Orbit Engineering Group's journey since 1998, our mission to revolutionize water infrastructure, and our commitment to sustainable engineering."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">About Orbit Engineering Group Bhopal | Innovating water infrastructure since 1998 with advanced engineering and technology</h1>

      <HeroSection title="About Orbit Engineerings" subtitle="Pioneering water innovation for sustainable communities" />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.3 }
                }
              }}
            >
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight"
              >
                Pioneering Water Innovation for a Sustainable Future
              </motion.h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-light">
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <strong className="text-[#0073bc]">Orbit</strong> is at the forefront of transforming India's water infrastructure through innovative technology and sustainable practices. Since our inception, we have been committed to addressing the nation's water challenges with intelligent, scalable solutions.
                </motion.p>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  Our expertise spans the complete spectrum of water management from treatment plant automation and IoT-enabled monitoring to comprehensive operation and maintenance services. We specialize in integrating cutting-edge PLC-based automation, SCADA systems, and cloud platforms to deliver real-time control and unprecedented efficiency.
                </motion.p>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  With a portfolio of projects valued at over 200 crores, we have touched millions of lives across urban municipal corporations and rural communities. Our solutions are designed not just for today, but to create resilient water infrastructure for generations to come.
                </motion.p>
                <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  At <strong className="text-[#0073bc]">Orbit</strong>, we believe that sustainable water management is the cornerstone of healthy communities and environmental stewardship. Every project we undertake reflects our commitment to excellence, innovation, and positive social impact.
                </motion.p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-2xl overflow-hidden text-white shadow-2xl"
            >
              <img src={subHeadingImage} alt="Mission and Vision background" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Our Mission</h3>
                <p className="text-blue-50/90 mb-10 leading-relaxed text-lg font-light">
                  To provide innovative, sustainable, and accessible water management solutions that empower communities, protect natural resources, and build a resilient future for all.
                </p>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Our Vision</h3>
                <p className="text-blue-50/90 leading-relaxed text-lg font-light">
                  To be India's most trusted partner in water infrastructure, recognized for technological excellence, environmental responsibility, and unwavering commitment to community welfare.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Orbit Stands Apart
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Our unique combination of expertise, innovation, and commitment sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => {
              const position = index % 3; // 0: left, 1: center, 2: right

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
                  transition: {
                    duration: 1.2,
                    ease: "easeOut" as any,
                    delay: 0.1
                  }
                }
              };

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={variants}
                  className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-8 hover:shadow-lg transition-shadow border border-gray-100 group"
                >
                  <div className="mb-6 overflow-hidden rounded-lg bg-gray-50 p-4 group-hover:bg-blue-50 transition-colors">
                    <img src={item.image} alt={`${item.title} icon`} className="h-16 w-16 object-contain mx-auto transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">

        {/* Header content with background image */}
        <div className="relative w-full h-[400px] mb-16 flex items-center justify-center overflow-hidden">
          <img src={headingBg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <AnimatedHeading level={2} className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Trusted Partner in Smart Water Management
            </AnimatedHeading>
            <p className="text-xl md:text-2xl text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
              Enhancing productivity and sustainability through smart automation.
            </p>
          </div>
        </div>

        {/* GIF Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl shadow-2xl overflow-hidden bg-white border border-gray-100 transform hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500"
          >
            <div className="aspect-video w-full overflow-hidden relative">
              <motion.img
                src={mapGif}
                alt="Global Presence Map"
                initial={{ scale: 1.02 }} // Start slightly scaled to help with general edge artifacts
                animate={{ scale: 1.08 }} // Subtle breathing/zoom animation
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="w-full h-full object-cover contrast-110 saturate-110" // Reduced contrast slightly to hide artifacts
                style={{ clipPath: 'inset(0 4px 0 0)' }} // Crops 4px from the right side to remove black border
              />
              {/* Inner shadow for depth and to mask edges further */}
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Let's discuss how we can help with your water infrastructure needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-[#0073bc] bg-opacity-10 rounded-full p-4 inline-block mb-4">
                <MapPin className="h-8 w-8 text-[#0073bc]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
              <p className="text-gray-600 text-sm">
                <span className="font-bold">Working Office:</span> <a href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">Flat No.2, Block 12, Shalimar Enclave,<br />E3 Arera Colony, Bhopal</a><br /><br />
                <span className="font-bold">Head Office:</span> <a href="https://maps.google.com/?q=B-32/A+Priyadershini+Society,+Sant+Asharam+Nagar,+Bagsewaniya,+Bhopal+-+462043" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">B-32/A Priyadershini Society,<br />Bagsewaniya, Bhopal</a>
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0073bc] bg-opacity-10 rounded-full p-4 inline-block mb-4">
                <Phone className="h-8 w-8 text-[#0073bc]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p><a href="tel:7024128029" className="hover:text-[#0073bc] transition-colors">+91 70241 28029</a></p>
                <p><a href="tel:+917440969201" className="hover:text-[#0073bc] transition-colors">+91 7440969201</a></p>
                <p><a href="tel:9893091450" className="hover:text-[#0073bc] transition-colors">+91 98930 91450</a></p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-[#0073bc] bg-opacity-10 rounded-full p-4 inline-block mb-4">
                <Mail className="h-8 w-8 text-[#0073bc]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <div className="text-gray-600 text-sm space-y-1">
                <p><a href="mailto:info@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors font-medium">info@orbitengineerings.com</a></p>
                <p><a href="mailto:vijaytiwari@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors">vijaytiwari@orbitengineerings.com</a></p>
                <p><a href="mailto:sales@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors">sales@orbitengineerings.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
