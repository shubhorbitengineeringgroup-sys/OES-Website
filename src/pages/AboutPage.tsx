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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="About Orbit Engineering Solutions | 25+ Years of Water Engineering & Instrumentation Excellence in Bhopal, India"
        description="Discover Orbit Engineering Solutions' (formerly Orbit Engineering Group) legacy since 1998. ISO 9001 certified water engineering company in Bhopal specializing in WTP, STP, RO, ETP, SCADA & PLC automation, instrumentation & solar solutions. ₹200+ Cr portfolio. Trusted by MP Jal Nigam, MPUDCL & leading industries across India."
        canonicalPath="/about"
        keywords="about Orbit Engineering Solutions, Orbit Engineering Solutions history, Orbit Engineering Group, water engineering company Bhopal, ISO certified water treatment company, Orbit Engineering Solutions mission vision, orbit engineering about, orbit bhopal about, instrumentation company Bhopal, solar energy company Bhopal, orbit engineering solutions about us, orbit engineering about us"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">About Orbit Engineering Solutions Bhopal | Innovating water infrastructure since 1998 with advanced engineering and technology</h1>

      <HeroSection title="About Orbit Engineering Solutions" subtitle="Pioneering water innovation for sustainable communities" />

      <section className="py-12 md:py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* ── Heading (Full Width Top) ── */}
          <div className="mb-12 md:mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-[1.2] md:leading-[1.1]">
              <span className="flex flex-wrap justify-center lg:justify-start">
                {"Pioneering Water Innovation".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.015, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <span className="text-[#0073bc] relative flex flex-wrap justify-center lg:justify-start overflow-hidden mt-1 md:mt-2">
                {"for a Sustainable Future".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 1.5, x: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + (i * 0.015) }}
                    className="inline-block z-10 relative text-[#0073bc]"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-20 mix-blend-overlay animate-shine" />
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── LEFT COLUMN: The Story ── */}
            <div className="space-y-10">
              {/* Para 1: Fade and Slide In */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1, y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
                className="relative pl-6 md:pl-8 border-l-[5px] border-[#0073bc] bg-white rounded-r-3xl py-8 md:py-10 pr-6 md:pr-10 shadow-[10px_10px_40px_-15px_rgba(0,115,188,0.15)] md:shadow-[20px_20px_60px_-15px_rgba(0,115,188,0.15)] group"
              >
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  transition={{ delay: 0.2 }}
                  className="text-[18px] leading-[1.8] text-gray-700 relative z-10"
                >
                  <strong className="text-[#0073bc] text-2xl font-black block mb-3 tracking-tight">The Orbit Impact</strong>
                  Orbit is at the forefront of transforming&nbsp;
                  <span className="relative inline-block px-1">
                    <span className="bg-gradient-to-r from-[#0073bc] to-[#005a94] bg-clip-text text-transparent font-black text-xl italic">India's water infrastructure</span>
                    <motion.div animate={{ width: ['0%', '100%', '0%'] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-0 left-0 h-0.5 bg-blue-400/30" />
                  </span>&nbsp;
                  through innovative technology. We create
                  <span className="font-bold text-gray-900 border-b-2 border-dashed border-blue-200 ml-1 italic"> intelligent, scalable solutions</span>.
                </motion.div>
              </motion.div>

              {/* Mission & Vision Card (Image Background) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative rounded-[2.5rem] overflow-hidden text-white shadow-2xl group md:h-[500px] min-h-[450px]"
              >
                <img src={subHeadingImage} alt="Mission and Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
                <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight text-blue-300 uppercase text-xs tracking-[0.3em]">Our Mission</h3>
                      <p className="text-white mb-6 leading-relaxed text-[17px] font-medium opacity-90">
                        To provide innovative, sustainable, and accessible water management solutions that empower communities, protect natural resources, and build a resilient future for all.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black mb-3 tracking-tight text-blue-300 uppercase text-xs tracking-[0.3em]">Our Vision</h3>
                      <p className="text-white leading-relaxed text-[17px] font-medium opacity-90">
                        To be India's most trusted partner in water infrastructure, recognized for technological excellence, environmental responsibility, and unwavering commitment to community welfare.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: Capabilities & Impact ── */}
            <div className="space-y-12 lg:pt-8">

              {/* Expertise Spectrum */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-6 md:pl-8 border-l-[5px] border-emerald-500 bg-white rounded-r-3xl py-6 md:py-8 pr-6 md:pr-8"
              >
                <p className="text-[17px] leading-[1.8] mb-6 font-medium text-gray-700">
                  Our expertise spans the <span className="text-emerald-700 font-bold px-2 py-0.5 bg-emerald-50 rounded-lg">complete spectrum</span> of water management:
                </p>
                <div className="flex flex-wrap gap-3">
                  {['PLC Automation', 'SCADA Systems', 'IoT Monitoring', 'Cloud Platforms', 'Real-time Control'].map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0], backgroundColor: '#ecfdf5' }}
                      className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-wider px-5 py-2.5 rounded-2xl bg-gray-50 border border-emerald-100 text-emerald-800 shadow-sm cursor-pointer transition-colors"
                    >
                      <motion.span animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Stats Grid (Magnetic Lens) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { val: '₹200+ Cr', label: 'Portfolio', color: 'amber' },
                  { val: 'Millions', label: 'Affected', color: 'blue' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotateY: i === 0 ? 10 : -10, rotateX: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br ${stat.color === 'amber' ? 'from-amber-400 to-orange-500' : 'from-blue-500 to-indigo-600'} text-white shadow-2xl overflow-hidden group`}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-5xl font-black block mb-1 tracking-tighter leading-none">{stat.val}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-80">{stat.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Vision Sequence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-6 md:pl-8 border-l-[5px] border-violet-500 bg-white rounded-r-3xl py-8 md:py-10 pr-6 md:pr-10 shadow-xl"
              >
                <p className="text-[18px] leading-[1.8] mb-8 text-gray-700">
                  We believe water management is the cornerstone of
                  <span className="text-violet-700 font-black block text-3xl tracking-tighter mt-2 italic">Sustainable Growth.</span>
                </p>
                <div className="grid grid-cols-1 gap-5">
                  {['Excellence', 'Innovation', 'Social Impact'].map((v, i) => (
                    <motion.div
                      key={v}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 + (i * 0.08) }}
                      className="flex items-center gap-5 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-black text-lg group-hover:rotate-12 transition-transform shadow-lg shadow-violet-200">
                        {i + 1}
                      </div>
                      <div className="flex-grow">
                        <span className="text-sm font-black uppercase tracking-widest text-violet-900 group-hover:translate-x-2 transition-transform block">{v}</span>
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 0.5, delay: 0.3 + (i * 0.08) }} className="h-1 bg-violet-100 mt-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#0073bc] mb-3">✦ Our Strengths</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Orbit Stands Apart
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Our unique combination of expertise, innovation, and commitment sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {whyChooseUs.map((item, index) => {
              const accentColors = ['#0073bc', '#d97706', '#059669', '#7c3aed', '#0891b2', '#dc2626'];
              const accent = accentColors[index] || '#0073bc';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-0 hover:shadow-[0_40px_80px_rgba(0,0,0,0.12)] transition-all duration-500 border-2 border-gray-50 group overflow-hidden relative"
                >
                  {/* Ultra-Unique: Holographic Sheen Wipe */}
                  <motion.div
                    initial={{ x: '-100%', skewX: -45 }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10"
                  />

                  {/* Top Animated Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="h-2 w-full absolute top-0 left-0"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${accent}33)` }}
                  />

                  <div className="p-6 md:p-10 relative z-20">
                    {/* Icon Portal Reveal */}
                    {/* Icon Portal Reveal */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mb-8 w-24 h-24 mx-auto relative group-hover:after:opacity-100 after:opacity-0 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-tr after:from-white/20 after:to-transparent after:transition-opacity after:duration-500"
                    >
                      <div
                        className="absolute inset-0 rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse"
                        style={{ backgroundColor: accent }}
                      />
                      <div
                        className="relative z-10 w-full h-full rounded-3xl flex items-center justify-center border-2 overflow-hidden bg-white shadow-inner"
                        style={{ borderColor: `${accent}20` }}
                      >
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-contain group-hover:scale-125 transition-transform duration-500" />
                      </div>
                    </motion.div>

                    {/* Staggered Title Assembly */}
                    <div className="text-center mb-6">
                      <div className="flex flex-wrap justify-center gap-x-1 mb-2">
                        {item.title.split(" ").map((word, wi) => (
                          <div key={wi} className="flex">
                            {word.split("").map((char, ci) => (
                              <motion.span
                                key={ci}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + (wi * 0.04) + (ci * 0.015) }}
                                className="text-xl font-black text-gray-900 tracking-tight"
                              >
                                {char}
                              </motion.span>
                            ))}
                            {wi < item.title.split(" ").length - 1 && <span className="w-1.5" />}
                          </div>
                        ))}
                      </div>

                      {/* Kinetic Separator */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '40%' }}
                        className="h-1 mx-auto rounded-full"
                        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                      />
                    </div>

                    {/* Enhanced Description */}
                    <div className="text-center">
                      <p className="text-[15px] text-gray-500 leading-[1.8] font-medium">
                        {item.description.split(" ").map((word, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 + (idx * 0.01) }}
                            className="inline-block mr-1"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </p>
                    </div>

                    {/* Bottom Kinetic Dots */}
                    <div className="flex justify-center items-center gap-2 mt-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                      ))}
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] ml-2 text-gray-400">
                        Orbit Elite
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">

        {/* Header content with background image */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-16 flex items-center justify-center overflow-hidden">
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
