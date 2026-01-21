import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import { AnimatedHeading } from '../components/Animated';
import { Building2, CheckCircle2, Clock, MapPin } from 'lucide-react';

import mpudclLogo from '../assets/clients/mpudcl-indore-district.png';
import bharatSarkarLogo from '../assets/clients/bharat-sarkar.png';
import centralIndiaLogo from '../assets/clients/central-india-pvt-ltd.png';
import mpJalNigamLogo from '../assets/clients/mp-jal-nigam.png';

interface ProjectsPageProps {
  initialFilter?: 'all' | 'completed' | 'ongoing';
  onNavigate?: (page: string) => void;
}

export default function ProjectsPage({ initialFilter = 'all', onNavigate }: ProjectsPageProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'ongoing'>(initialFilter);
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const completedProjects = [
    {
      name: 'Kymore & Vijayraghavgarh (Package 5D)',
      client: 'MPUDCL Bhopal',
      location: 'Madhya Pradesh',
      status: 'Completed',
      logo: mpudclLogo
    },
    {
      name: 'Amarpatan & Ramnagar (Package 7D)',
      client: 'MPUDCL Bhopal',
      location: 'Madhya Pradesh',
      status: 'Completed',
      logo: mpudclLogo
    },
    {
      name: 'Harpalpur & Badagaon (Package 6G)',
      client: 'MPUDCL Bhopal',
      location: 'Madhya Pradesh',
      status: 'Completed',
      logo: mpudclLogo
    },
    {
      name: 'KARI & Lidhorakhas Water Meter SITC',
      client: 'Tikamgarh Nagar Parishads',
      location: 'Tikamgarh',
      status: 'Completed',
      logo: mpudclLogo
    },
    {
      name: 'Gangadhar Meher Lift Irrigation Project',
      client: 'WRD Bhopal',
      location: 'Madhya Pradesh',
      status: 'Completed',
      logo: bharatSarkarLogo
    },
    {
      name: 'Bankhedi Turnkey Project',
      client: 'Central India Pvt Ltd',
      location: 'Madhya Pradesh',
      status: 'Completed',
      logo: centralIndiaLogo
    },
  ];

  const milestoneProjects = [
    { year: '2015', name: 'Humidity & Temperature Control System', client: 'Prism Cement, Satna', description: 'Delivered a humidity and temperature control turnkey automation system, redefining industrial climate regulation.' },
    { year: '2016', name: 'RO Plant Automation', client: 'Lupin, Mandideep', description: 'Executed a turnkey automation project for the reverse osmosis plant enhancing water purity assurance' },
    { year: '2017', name: '40 KL Turnkey Automation', client: 'Vindhayachal Distillery, Pilukhedi (Bhopal)', description: 'Commissioned a 40 KL turnkey automation project, optimising distillery operations with precision control' },
    { year: '2018', name: '3 MGD Water Treatment Plant', client: 'Bhopal Municipal Corporation, Idgah Hills', description: 'Implemented a 3 MGD water treatment plant with turnkey automation, raising municipal water reliability.' },
    { year: '2020', name: 'Turnkey Instrumentation', client: 'MP Jal Nigam, Punjapura (Neemuch, Badhwani)', description: 'Completed a turnkey instrumentation project, strengthening regional water management capacity' },
    { year: '2021', name: 'Water Supply Scheme Automation', client: 'Indore District (Betma, Gautampura, Depalpur)', description: 'Delivered a fully integrated water supply scheme automation, enhancing service delivery accuracy' },
    { year: '2022', name: '45 MLD Turnkey Automation', client: 'Betul‑Bazar, Amla & Sarni Nagar Parishads (MP)', description: 'Executed a 45 MLD turnkey automation project, significantly boosting urban water infrastructure' },
    { year: '2023', name: '7.6 MLD Sewage Treatment Plant', client: 'Gobranawapra STP (Raipur, C.G.)', description: 'Commissioned a 7.6 MLD sewage treatment plant, advancing environmental compliance through turnkey instrumentation and automation.' },
  ];

  const ongoingProjects = [
    {
      name: 'Gandhisagar Package 2',
      description: 'Multi-village water supply scheme automation',
      client: 'MP Jal Nigam - Dilip Buildcon',
      location: 'District Neemach',
      status: 'Ongoing',
      logo: mpJalNigamLogo
    },
    {
      name: 'Beohari Multi-Village Scheme',
      description: 'Comprehensive village water management system',
      client: 'MP Jal Nigam - Tejas Construction',
      location: 'Shahdol',
      status: 'Ongoing',
      logo: mpJalNigamLogo
    },
    {
      name: 'Rewa Bansagar Scheme',
      description: 'Large-scale water distribution automation',
      client: 'MP Jal Nigam - Dilip Buildcon',
      location: 'District Rewa',
      status: 'Ongoing',
      logo: mpJalNigamLogo
    },
    {
      name: 'Pahargarh Multi-Village Scheme',
      description: 'Rural water supply automation project',
      client: 'MP Jal Nigam - KNK Projects',
      location: 'District Rajgarh',
      status: 'Ongoing',
      logo: mpJalNigamLogo
    },
    {
      name: 'Narmada Gabhir Multi-Village Scheme',
      description: 'Advanced water management for multiple villages',
      client: 'MP Jal Nigam - Dilip Buildcon',
      location: 'District Ujjain',
      status: 'Ongoing',
      logo: mpJalNigamLogo
    },
    {
      name: 'Gohad Water Supply Scheme',
      description: 'Modern water supply system with full automation',
      client: 'MPUDCL Bhopal - Shree Contractor',
      location: 'Madhya Pradesh',
      status: 'Ongoing',
      logo: mpudclLogo
    },
  ];


  // Refs for scroll navigation
  const completedRef = useRef<HTMLDivElement>(null);
  const ongoingRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? 50 : -50, // Move from center outwards (Left card comes from right, Right card comes from left)
      y: 0,
      scale: 0.9 // Start slightly smaller for "emerging" effect
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const, // Explicitly typed as const to fix lint error
        stiffness: 70,
        damping: 20,
        mass: 1
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Industrial & Municipal Water Projects | SCADA Automation - Orbit Engineering"
        description="Case studies of our successful water infrastructure and automation projects across India, featuring 45 MLD WTPs and advanced SCADA systems."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Projects | Completed and ongoing water infrastructure projects in India with SCADA & PLC automation</h1>

      <HeroSection title="Our Projects" subtitle="Delivering water infrastructure excellence across India with PLC, SCADA & Automation Systems" />

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8"
          >
            <button
              onClick={() => {
                setFilter('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative z-30 flex items-center px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer font-semibold ${filter === 'all'
                ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Building2 className="h-5 w-5 mr-2" />
              All Projects
            </button>
            <button
              onClick={() => {
                setFilter('completed');
              }}
              className={`relative z-30 flex items-center px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer font-semibold ${filter === 'completed'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
            >
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Completed Projects
            </button>
            <button
              onClick={() => {
                setFilter('ongoing');
              }}
              className={`relative z-30 flex items-center px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer font-semibold ${filter === 'ongoing'
                ? 'bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-[#0073bc]'
                }`}
            >
              <Clock className="h-5 w-5 mr-2" />
              Ongoing Projects
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Completed Projects Section */}
          {(filter === 'all' || filter === 'completed') && (
            <motion.div
              ref={completedRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="mb-20"
            >
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl"></div>
                <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-500 p-3 rounded-xl mr-4 shadow-lg">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900">
                        Completed Works
                      </AnimatedHeading>
                      <p className="text-gray-600 mt-2">All Executed with PLC, SCADA & Automation Systems</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {completedProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-[#2563EB] overflow-hidden"
                  >
                    <div className="mb-6">
                      <span className="border border-[#2563EB] text-[#2563EB] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm inline-block bg-white">
                        Completed
                      </span>
                    </div>

                    <div className="relative z-10 pr-4 pb-4">
                      <h3 className="text-[1.15rem] font-bold text-gray-900 leading-tight mb-6 min-h-[3.5rem] flex items-center">
                        {project.name}
                      </h3>

                      <div className="space-y-3 pr-24">
                        <div className="flex items-center text-gray-600">
                          <Building2 className="h-5 w-5 mr-3 text-gray-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-medium line-clamp-1 text-gray-700">{project.client}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-3 text-gray-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-medium text-gray-700">{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Circle Background */}
                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-gray-50 rounded-full z-0 group-hover:scale-105 transition-transform duration-500 border border-[#0073bc]/30"></div>

                    {/* Logo Container */}
                    <div className="absolute bottom-[6px] right-[6px] w-14 h-14 bg-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] p-2.5 flex items-center justify-center z-20 border border-[#0073bc]/30 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={project.logo}
                        alt={`${project.client} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Milestone Projects */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-16"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl"></div>
                  <div className="relative bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-6">
                    <div className="flex items-center">
                      <div className="bg-blue-500 p-3 rounded-xl mr-4 shadow-lg">
                        <Building2 className="h-6 w-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <AnimatedHeading level={3} className="text-2xl font-bold text-gray-900">
                          Our Milestones
                        </AnimatedHeading>
                        <p className="text-gray-600 mt-1 text-sm">These milestones illustrate our unwavering commitment to scalable turnkey automation solutions, grounded in robust project execution, technological excellence, and enduring impact across industrial, municipal, and water‑utility sectors.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  {/* Central Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-100 hidden md:block" />

                  <div className="space-y-12 relative z-10">
                    {milestoneProjects.map((project, index) => {
                      const isEven = index % 2 === 0;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                          {/* Empty Space for alignment */}
                          <div className="flex-1 w-full md:w-1/2" />

                          {/* Center Dot */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 z-20 hidden md:flex">
                            <div className="w-5 h-5 bg-white border-4 border-[#2563EB] rounded-full shadow-sm" />
                          </div>

                          {/* Content Card */}
                          <div className={`flex-1 w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`bg-white p-6 rounded-2xl border border-[#2563EB] shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden ${isEven ? 'md:text-right' : 'md:text-left'}`}
                            >
                              {/* Year Badge */}
                              <div className={`mb-4 flex ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                <span className="border border-[#2563EB] text-[#2563EB] px-4 py-1 rounded-full text-sm font-semibold inline-block bg-white">
                                  {project.year}
                                </span>
                              </div>

                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {project.name}
                              </h3>
                              <p className="text-sm font-medium text-gray-500 mb-3">
                                {project.client}
                              </p>
                              <p className="text-gray-600 leading-relaxed text-sm">
                                {project.description}
                              </p>

                              {/* Decorative Circle Background */}
                              <div className={`absolute -bottom-12 w-32 h-32 bg-blue-50 rounded-full z-0 group-hover:scale-110 transition-transform duration-500 opacity-50 ${isEven ? '-left-12' : '-right-12'}`}></div>
                            </motion.div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Ongoing Projects Section */}
          {(filter === 'all' || filter === 'ongoing') && (
            <motion.div
              ref={ongoingRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="mb-16"
            >
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl"></div>
                <div className="relative bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-500 p-3 rounded-xl mr-4 shadow-lg">
                      <Clock className="h-8 w-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900">
                        Ongoing Projects
                      </AnimatedHeading>
                      <p className="text-gray-600 mt-2">In Progress</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {ongoingProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={cardVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-[#2563EB] overflow-hidden"
                  >
                    <div className="mb-6">
                      <span className="border border-[#2563EB] text-[#2563EB] px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm inline-block bg-white">
                        Ongoing
                      </span>
                    </div>

                    <div className="relative z-10 pr-4 pb-4">
                      <h3 className="text-[1.15rem] font-bold text-gray-900 leading-tight mb-2 min-h-[3.5rem] flex items-center">
                        {project.name}
                      </h3>

                      <p className="text-gray-500 mb-6 text-sm leading-relaxed min-h-[40px]">
                        {project.description}
                      </p>

                      <div className="space-y-3 pr-24">
                        <div className="flex items-center text-gray-600">
                          <Building2 className="h-5 w-5 mr-3 text-gray-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-medium line-clamp-1 text-gray-700">{project.client}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-3 text-gray-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-sm font-medium text-gray-700">{project.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Circle Background */}
                    <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-gray-50 rounded-full z-0 group-hover:scale-105 transition-transform duration-500 border border-[#0073bc]/30"></div>

                    {/* Logo Container */}
                    <div className="absolute bottom-[6px] right-[6px] w-14 h-14 bg-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] p-2.5 flex items-center justify-center z-20 border border-[#0073bc]/30 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={project.logo}
                        alt={`${project.client} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0073bc] to-[#005a94] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedHeading level={2} className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </AnimatedHeading>
            <p className="text-lg text-blue-100 mb-8">
              Let's discuss how we can bring innovative water solutions with PLC, SCADA & Automation Systems to your community
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-8 py-3 bg-white text-[#0073bc] rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Request a Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
