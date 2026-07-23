import { useState } from 'react';
import { Mail, Briefcase, Target, Award, Users, Building2, Sparkles, MapPin, Maximize2, Compass, Layers } from 'lucide-react';
import subHeadingImage from '../assets/products/sub-heading.jpg';
import HeroSection from '../components/HeroSection';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionFadeUp, MotionStagger, AnimatedHeading } from '../components/Animated';
import SEO from '../components/SEO';
// ourTeamIcon removed: using shared HeroSection component instead
import manojImg from '../assets/team/manoj-tiwari.jpeg';
import vijayImg from '../assets/team/vijay-tiwari-2.jpg';
import officeExterior from '../assets/root-space-exterior-im.jpeg';
import officeInterior from '../assets/root-space-interior-img.jpeg';

function OfficeImages() {
  const [activeTab, setActiveTab] = useState<'all' | 'exterior' | 'interior'>('all');

  return (
    <div className="w-full max-w-6xl mx-auto px-1 sm:px-4 relative">
      {/* Ambient Silk Light Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[200px] sm:h-[320px] bg-gradient-to-r from-blue-400/15 via-cyan-400/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Glass Tab Switcher (Single Line on Mobile) */}
      <div className="flex justify-center mb-6 sm:mb-10 py-1">
        <div className="inline-flex flex-nowrap justify-center items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-full bg-slate-900/5 backdrop-blur-xl border border-slate-200/80 shadow-inner max-w-full overflow-x-auto no-scrollbar">
          {[
            { id: 'all', fullLabel: 'Overview Grid', shortLabel: 'Overview', icon: Layers },
            { id: 'exterior', fullLabel: 'Exterior Architecture', shortLabel: 'Exterior', icon: Building2 },
            { id: 'interior', fullLabel: 'Interior Workspace', shortLabel: 'Interior', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-colors duration-300 flex items-center gap-1 sm:gap-1.5 whitespace-nowrap shrink-0 touch-manipulation ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-[#0073bc] rounded-full shadow-md z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1 sm:gap-1.5">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                  <span className="inline sm:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll-triggered Entrance Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <motion.div
          layout
          className={`grid gap-6 sm:gap-8 items-center ${
            activeTab === 'all'
              ? 'grid-cols-1 lg:grid-cols-2'
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          <AnimatePresence mode="wait">
            {(activeTab === 'all' || activeTab === 'exterior') && (
              <motion.div
                key="exterior-card"
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[36px] border border-white/80 bg-white shadow-xl sm:shadow-2xl transition-all duration-500 cursor-pointer w-full transform-gpu"
              >
                {/* Floating Top Badge (Mobile Overview + All Desktop) */}
                <div className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-20 items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium shadow-lg ${
                  activeTab === 'all' ? 'flex' : 'hidden md:flex'
                }`}>
                  <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
                  <span>Root Space • Exterior HQ</span>
                </div>

                {/* Main Image View */}
                <div className={`w-full overflow-hidden relative ${
                  activeTab === 'exterior'
                    ? 'aspect-[4/3] sm:aspect-[16/10] min-h-[260px] sm:min-h-[360px]'
                    : 'aspect-[4/3] sm:aspect-[16/10]'
                }`}>
                  <img
                    src={officeExterior}
                    alt="Root Space Exterior"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out transform-gpu group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-500 ${
                    activeTab === 'all' ? 'block' : 'hidden md:block'
                  }`} />

                  {/* Bottom Architectural Info Banner (Mobile Overview + All Desktop) */}
                  <div className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex-col sm:flex-row sm:items-end justify-between text-white gap-2 items-start ${
                    activeTab === 'all' ? 'flex' : 'hidden md:flex'
                  }`}>
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-300 font-semibold mb-0.5 sm:mb-1 block">
                        Architectural Elevation
                      </span>
                      <h4 className="text-base sm:text-xl font-bold leading-tight">Root Space Exterior</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs shrink-0">
                      <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-300" />
                      <span>Prime Location</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {(activeTab === 'all' || activeTab === 'interior') && (
              <motion.div
                key="interior-card"
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-[36px] border border-white/80 bg-white shadow-xl sm:shadow-2xl transition-all duration-500 cursor-pointer w-full transform-gpu"
              >
                {/* Floating Top Badge (Mobile Overview + All Desktop) */}
                <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-medium shadow-lg ${
                  activeTab === 'all' ? 'flex' : 'hidden md:flex'
                }`}>
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                  <span>Modern Co-Working Hub</span>
                </div>

                {/* Main Image View */}
                <div className={`w-full overflow-hidden relative ${
                  activeTab === 'interior'
                    ? 'aspect-[4/3] sm:aspect-[16/10] min-h-[260px] sm:min-h-[360px]'
                    : 'aspect-[4/3] sm:aspect-[16/10]'
                }`}>
                  <img
                    src={officeInterior}
                    alt="Root Space Interior"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out transform-gpu group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-50 transition-opacity duration-500 ${
                    activeTab === 'all' ? 'block' : 'hidden md:block'
                  }`} />

                  {/* Bottom Architectural Info Banner (Mobile Overview + All Desktop) */}
                  <div className={`absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 flex-col sm:flex-row sm:items-end justify-between text-white gap-2 items-start ${
                    activeTab === 'all' ? 'flex' : 'hidden md:flex'
                  }`}>
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 font-semibold mb-0.5 sm:mb-1 block">
                        Workspace Environment
                      </span>
                      <h4 className="text-base sm:text-xl font-bold leading-tight">Root Space Interior</h4>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs shrink-0">
                      <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                      <span>Ergonomic Setup</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function TeamPage() {
  interface TeamMember {
    name: string;
    role: string;
    experience: string;
    email: string;
    description: string;
    photo: string;
    imagePosition?: string;
  }

  const team: TeamMember[] = [
    {
      name: 'Manoj Tiwari',
      role: 'Managing Director',
      experience: '40+ Years Experience',
      email: 'mktiwari@orbitengineering.com',
      description: 'Visionary leader with expertise in water infrastructure and sustainable technology solutions',
      photo: manojImg
    },
    {
      name: 'Vijay Tiwari',
      role: 'Co-Founder & CTO',
      experience: '18+ Years Experience',
      email: 'vijay@orbitengineerings.com',
      description: 'Technical expert specializing in automation, IoT, and advanced water treatment systems',
      photo: vijayImg,
      imagePosition: 'top'
    }
  ];

  const teamStats = [
    {
      icon: <Award className="h-6 w-6 text-[#0073bc]" />,
      title: "40-Year Legacy",
      description: "Built on decades of steel staging and chlorination expertise"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-[#0073bc]" />,
      title: "27-Year Automation Experience",
      description: "Orbit Engineering's strength in automation and SCADA systems"
    },
    {
      icon: <Users className="h-6 w-6 text-[#0073bc]" />,
      title: "Multi-Disciplinary Team",
      description: "Engineers, project leads, marketing strategists, and finance experts"
    }
  ];

  const statVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      rotate: -180
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        damping: 15,
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Meet Our Team | Manoj Tiwari & Vijay Tiwari - Water Infrastructure Leaders | Orbit Engineering Solutions"
        description="Meet the visionaries at Orbit Engineering Solutions Bhopal. Founded by Manoj Tiwari (MD, 40+ years) and led by Vijay Tiwari (CTO, 18+ years), our ISO 9001 certified team brings decades of expertise in WTP, STP, SCADA automation & IoT-based water management."
        canonicalPath="/team"
        keywords="Manoj Tiwari Orbit Engineering, Manoj Tiwari, Vijay Tiwari CTO, Vijay Tiwari, Orbit Engineering Solutions team, water engineering experts Bhopal, Rohit Arora Orbit, Amit Tiwari Orbit, Manoj Tiwari engineering Bhopal, Vijay Tiwari engineering, orbit engineering team, orbit engineering solutions team, manoj tivari, vijay tivari, manoj tewari, vijay tewari, orbit engineering, orbit engineering bhopal, orbit engineering company, orbit engineering company bhopal, orbit engineering consultants, orbit engineering consultants bhopal, orbit consultants bhopal, orbit engineering solutions, orbit engineering solutions bhopal, orbit"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Solutions Team | Manoj Tiwari, Vijay Tiwari, Rohit Arora & Amit Tiwari - Experts in Water Infrastructure & Automation</h1>

      <HeroSection title="Our Team" subtitle="Meet the visionaries driving water innovation" />

      <section className="py-24 bg-gray-50 border-y border-gray-100">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <AnimatedHeading level={2} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Meet the Visionaries
            </AnimatedHeading>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our leadership team brings decades of combined experience in water technology and infrastructure
            </p>
          </div>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto" stagger={0.06}>
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >


                {member.photo ? (
                  <div className="w-48 h-48 mx-auto mb-8 overflow-hidden rounded-2xl shadow-lg border-2 border-gray-100 flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={`${member.name} - ${member.role} at Orbit Engineering Solutions Bhopal`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                      style={{ objectPosition: member.imagePosition || 'center' }}
                    />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-[#0073bc] to-[#005a94] rounded-2xl w-48 h-48 flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <span className="text-4xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-[#0073bc] font-bold text-center mb-3 uppercase tracking-wider text-sm">
                  {member.role}
                </p>
                <div className="flex justify-center mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold shadow-sm bg-gray-50/50">
                    {member.experience}
                  </span>
                </div>
                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                  {member.description}
                </p>

                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4 text-[#0073bc]" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm hover:text-[#0073bc] transition-colors font-semibold text-gray-700"
                  >

                    {member.email}
                  </a>
                </div>
              </motion.div>

            ))}
          </MotionStagger>

          {/* Team Stats Section */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 border border-[#0073bc] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-blue-50 rounded-full p-4 mb-6">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-[#0073bc]" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of a team that's making a real difference in water infrastructure and sustainability
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Join Orbit?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Meaningful Work</h4>
                    <p className="text-sm text-gray-600">
                      Work on projects that impact millions of lives
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Innovation Culture</h4>
                    <p className="text-sm text-gray-600">
                      Work with cutting-edge technology
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Growth Opportunities</h4>
                    <p className="text-sm text-gray-600">
                      Continuous learning and career development
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-lg p-2">
                    <Target className="h-5 w-5 text-[#0073bc]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Collaborative Team</h4>
                    <p className="text-sm text-gray-600">
                      Work with passionate, talented professionals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Our Working Office section inserted below Join Our Team */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <AnimatedHeading level={2} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Working Office
            </AnimatedHeading>
            <MotionFadeUp>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Modern, inspiring, and built for excellence.
              </p>
            </MotionFadeUp>
          </div>

          <OfficeImages />
        </div>
      </section>


      <section className="relative text-white py-16">
        <img src={subHeadingImage} alt="Careers background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="mailto:careers@orbitengineerings.com"
            className="inline-block px-8 py-3 bg-white text-[#0073bc] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Email Your Resume
          </a>
        </div>
      </section>
    </div>
  );
}
