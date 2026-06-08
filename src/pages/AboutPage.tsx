import { Mail, Phone, MapPin, Shield, Activity, Award, Leaf, Users, ChevronRight, Target, Globe, Cpu, Wrench, Server, TrendingUp, Coins } from 'lucide-react';
import headingBg from '../assets/products/hero-section.jpg';
import manojImg from '../assets/team/manoj-tiwari.jpeg';
import vijayImg from '../assets/team/vijay-tiwari-2.jpg';
import HeroSection from '../components/HeroSection';
import { motion } from 'framer-motion';
import { AnimatedHeading } from '../components/Animated';
import SEO from '../components/SEO';
import mapGif from '../assets/my_VisitedPlaces.gif';
import { Link } from 'react-router-dom';

// Department Banners
import automationBanner from '../assets/team/automation_team_banner.png';
import servicesBanner from '../assets/team/field_services_team_banner.png';
import itBanner from '../assets/team/it_infrastructure_banner.png';
import businessBanner from '../assets/team/business_operations_banner.png';
import financeBanner from '../assets/team/finance_accounts_banner.png';

export default function AboutPage() {
  const stats = [
    {
      value: '25+',
      suffix: 'Years',
      label: 'Legacy of Trust',
      sub: 'Founded in 1998 in Bhopal'
    },
    {
      value: '₹200+',
      suffix: 'Cr',
      label: 'Project Portfolio',
      sub: 'Turnkey public & industrial works'
    },
    {
      value: '150+',
      suffix: 'Projects',
      label: 'Mega Schemes Delivered',
      sub: 'WTP, STP, SCADA & Automation'
    },
    {
      value: 'ISO',
      suffix: '9001',
      label: 'Quality Standards',
      sub: 'Certified process assurance'
    },
    {
      value: 'Millions',
      suffix: 'Lives',
      label: 'Impacted with Pure Water',
      sub: 'Pan-India rural & urban schemes'
    }
  ];

  const coreValues = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Accountability & Integrity',
      description: 'We hold ourselves to the highest standards, honoring every commitment made to our government, industrial, and community stakeholders. Transparency is our baseline.'
    },
    {
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      title: 'Technological Innovation',
      description: 'Pioneering cutting-edge systems by integrating state-of-the-art PLCs, distributed RTUs, real-time cloud SCADA, and IoT remote monitoring platforms in public water networks.'
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: 'Excellence & Precision',
      description: 'As an ISO 9001:2015 certified company, we ensure absolute precision across feasibility studies, detail engineering, components staging, and final field commission.'
    },
    {
      icon: <Leaf className="h-8 w-8 text-blue-600" />,
      title: 'Environmental Stewardship',
      description: 'Driving the circular economy by delivering highly energy-efficient STP/ETP recycling plants, smart chlorinators, and eco-friendly solar-powered water schemes.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Collaborative Synergy',
      description: 'Bringing together site planners, hydrologists, electrical experts, and instrumentation specialists into a single unified workspace to solve the toughest water challenges.'
    }
  ];

  const departments = [
    {
      name: 'Industrial Automation & Process Controls',
      tagline: 'Precision control systems & smart plant automation',
      banner: automationBanner,
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      focusAreas: [
        'PLC Staging & Ladder/FBD Logic programming',
        'SCADA HMI development & cloud telemetry integration',
        'RTU network calibration & IoT system telemetry',
        'Distributed flow & pressure instrumentation loops'
      ],
      iconBg: 'bg-blue-50'
    },
    {
      name: 'Field Services & Project Execution',
      tagline: 'On-site WTP/STP commissioning & lifecycle support',
      banner: servicesBanner,
      icon: <Wrench className="h-6 w-6 text-emerald-600" />,
      focusAreas: [
        'Turnkey water treatment systems erection & commissioning',
        'Preventative Operations & Maintenance (O&M) scheduling',
        'Electrical control panel assembly & cabling supervision',
        'Emergency breakdown support & troubleshooting cycles'
      ],
      iconBg: 'bg-emerald-50'
    },
    {
      name: 'Digital Infrastructure & Enterprise IT',
      tagline: 'Secure server administration & telemetry cloud storage',
      banner: itBanner,
      icon: <Server className="h-6 w-6 text-indigo-600" />,
      focusAreas: [
        'Enterprise database administration for water flow telemetry',
        'Corporate network security, firewalling & data audits',
        'Digital system configurations & cloud-telemetry servers',
        'Corporate helpdesk support & workplace digital tools'
      ],
      iconBg: 'bg-indigo-50'
    },
    {
      name: 'Business Development & Operations Management',
      tagline: 'Strategic bid procurement & client relationship management',
      banner: businessBanner,
      icon: <TrendingUp className="h-6 w-6 text-amber-600" />,
      focusAreas: [
        'Tender estimation & bidding for MPUDCL & Jal Nigam',
        'Strategic vendor sourcing & material procurement networks',
        'Project lifecycle scheduling & inter-department planning',
        'Client relations management & strategic business execution'
      ],
      iconBg: 'bg-amber-50'
    },
    {
      name: 'Finance, Accounts & Corporate Governance',
      tagline: 'Fiduciary governance, invoices auditing & ISO compliance',
      banner: financeBanner,
      icon: <Coins className="h-6 w-6 text-rose-600" />,
      focusAreas: [
        'Project accounting, budgeting, and cost allocations',
        'Audits management, tax compliance (GST) & ISO billing',
        'Vendor account disbursements & contract auditing',
        'Payroll administration & corporate governance compliance'
      ],
      iconBg: 'bg-rose-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="About Orbit Engineering Solutions | 25+ Years of Water Engineering & Instrumentation Excellence in Bhopal, India"
        description="Discover Orbit Engineering Solutions' legacy since 1998. ISO 9001 certified water engineering in Bhopal specializing in WTP, STP, RO, ETP, SCADA, PLC automation & solar. Phone: +91 70241 28029, +91 9039075049. Email: info@orbitengineerings.com"
        canonicalPath="/about"
        keywords="about Orbit Engineering Solutions, Orbit Engineering Solutions history, Orbit Engineering Group, water engineering company Bhopal, ISO certified water treatment company, Orbit Engineering Solutions mission vision, orbit engineering about, orbit bhopal about, instrumentation company Bhopal, solar energy company Bhopal, orbit engineering solutions about us, orbit engineering about us"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">About Orbit Engineering Solutions Bhopal | Innovating water infrastructure since 1998 with advanced engineering and technology</h1>

      <HeroSection title="About Orbit Engineering Solutions" subtitle="Pioneering water innovation for sustainable communities" />

      {/* ── SECTION 1: WHAT WE BELIEVE & STATISTICS SHOWCASE ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left intro text (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[12px] font-black uppercase tracking-[0.25em] text-[#0073bc] bg-blue-50 px-4 py-2 rounded-full inline-block">
                ✦ Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                What We Believe <br />
                <span className="text-[#0073bc] relative">at Orbit</span>
              </h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-[#0073bc] to-[#005a94] rounded-full" />
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We believe water engineering goes far beyond piping and steel staging. It is the life-sustaining foundation for economic progress and public health. 
              </p>
              <p className="text-base text-gray-500 leading-relaxed font-medium">
                Over the past 25 years, we have committed ourselves to creating intelligent, durable, and highly automated infrastructure that empowers communities and optimizes precious water resources across India.
              </p>
            </div>

            {/* Right statistics grid (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0, 115, 188, 0.12)' }}
                  className={`p-8 rounded-[2rem] border border-gray-100 transition-all duration-300 relative overflow-hidden bg-white ${
                    i === 0 ? 'sm:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-100' : ''
                  }`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 bg-gradient-to-r from-[#0073bc] to-blue-800 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                    <span className="text-xl md:text-2xl font-extrabold text-[#0073bc]">
                      {stat.suffix}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mt-3 tracking-tight">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {stat.sub}
                  </p>

                  {/* Aesthetic accent dots */}
                  <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: LAYERED MISSION & VISION SHOWCASE ── */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* MISSION CARD (What We Do) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 via-transparent to-transparent pointer-events-none" />
              <div className="h-2 w-24 bg-blue-500 rounded-full mb-8 group-hover:w-36 transition-all duration-500" />

              <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-500 block mb-2">
                WHAT WE DO
              </span>
              <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                Our Mission
              </h3>
              
              <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-6">
                To deliver technologically advanced, clean, and sustainable water treatment and SCADA-driven automation solutions.
              </p>
              
              <p className="text-base text-gray-500 leading-relaxed font-medium">
                We design and commission turnkey engineering systems that ensure absolute water purification, waste mitigation, and automated real-time control. Our focus is on supporting municipal corporations, government schemes like Jal Jeevan Mission, and premier industries with zero compromise on efficiency.
              </p>

              {/* Background badge icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                <Target className="w-48 h-48 text-[#0073bc]" />
              </div>
            </motion.div>

            {/* VISION CARD (Why We Do It) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/10 via-transparent to-transparent pointer-events-none" />
              <div className="h-2 w-24 bg-indigo-500 rounded-full mb-8 group-hover:w-36 transition-all duration-500" />

              <span className="text-xs font-black tracking-[0.3em] uppercase text-indigo-500 block mb-2">
                WHY WE DO IT
              </span>
              <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                Our Vision
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed font-semibold mb-6">
                To be India's premier, highly trusted engineering house for smart and ecologically resilient water infrastructure.
              </p>

              <p className="text-base text-gray-500 leading-relaxed font-medium">
                We envision a future where advanced cloud-telemetry and automation conserve every drop of water. Through clean STP/ETP reclamation and high-efficiency solar pumping networks, we aim to secure vital resources for growing generations, bridging technological supremacy with deep community responsibility.
              </p>

              {/* Background badge icon */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity pointer-events-none">
                <Globe className="w-48 h-48 text-indigo-800" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: PREMIUM CORE VALUES GRID ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0073bc] bg-blue-50 px-4 py-2 rounded-full inline-block">
              ✦ Guiding Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Our Core Values
            </h2>
            <div className="h-1.5 w-24 bg-[#0073bc] mx-auto rounded-full mt-4" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              We anchor our execution in a set of unwavering values that define how we construct, engineer, and deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
              >
                {/* Visual accent top edge */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-[#0073bc] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {val.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-[#0073bc] transition-colors">
                  {val.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {val.description}
                </p>
              </motion.div>
            ))}

            {/* A gorgeous placeholder card matching the grid */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-black tracking-[0.2em] uppercase text-blue-200">ISO 9001 CERTIFIED</span>
                <h3 className="text-2xl font-black tracking-tight leading-tight">
                  Partner with India's Smart Water Specialists
                </h3>
                <p className="text-sm text-blue-100 font-medium leading-relaxed">
                  Integrating dynamic SCADA, IoT automation, and high-precision instrumentation into major turnkey water schemes since 1998.
                </p>
              </div>

              <Link 
                to="/contact" 
                className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 px-6 py-3.5 rounded-2xl transition-all mt-6 w-fit"
              >
                Let's Collaborate <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 4: HIGH-IMPACT LEGACY TIMELINE CTA ── */}
      <section className="relative text-white py-24 bg-slate-900 overflow-hidden">
        {/* Background image & gradient overlay */}
        <img src={headingBg} alt="Timeline Background" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-black tracking-[0.3em] uppercase text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full inline-block border border-blue-400/20">
            EXPLORE OUR HISTORICAL TIMELINE
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight max-w-3xl mx-auto">
            Discover 25+ Years of Proven Engineering Excellence
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Since our founding in 1998, we have pioneered complex public utility schemes, advanced pumping systems, and robust automation across Central India. Click to explore our history.
          </p>
          <div className="pt-4">
            <Link
              to="/why-choose-us"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-[#0073bc] text-white rounded-2xl font-black uppercase tracking-wider hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300"
            >
              Explore Legacy & Timeline <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: LEADERSHIP SPOTLIGHT (THE PIONEERS) ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0073bc] bg-blue-50 px-4 py-2 rounded-full inline-block">
              ✦ Meet The Pioneers
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Our Leadership
            </h2>
            <div className="h-1.5 w-24 bg-[#0073bc] mx-auto rounded-full mt-4" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Decades of combined technical and management expertise driving Orbit's engineering supremacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* MD - Manoj Tiwari */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 border border-gray-150 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <div className="w-40 h-40 overflow-hidden rounded-2xl shadow-md border-2 border-gray-100 flex-shrink-0">
                <img
                  src={manojImg}
                  alt="Manoj Tiwari - Managing Director of Orbit Engineering Solutions Bhopal"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-115"
                  loading="lazy"
                />
              </div>
              <div className="space-y-3 text-center sm:text-left flex-grow">
                <h3 className="text-2xl font-bold text-gray-900">Manoj Tiwari</h3>
                <p className="text-[#0073bc] font-extrabold uppercase tracking-widest text-xs">
                  Managing Director
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-gray-600">
                  40+ Years of Industry Excellence
                </span>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  A visionary water industry stalwart leading state-level municipal staging schemes, HDPE pipelines procurement, and heavy engineering works.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 pt-2 border-t border-gray-100">
                  <Mail className="h-4 w-4 text-[#0073bc]" />
                  <a href="mailto:mktiwari@orbitengineering.com" className="text-xs hover:text-[#0073bc] transition-colors font-semibold text-gray-700">
                    mktiwari@orbitengineering.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* CTO - Vijay Tiwari */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 border border-gray-150 shadow-[0_15px_40px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <div className="w-40 h-40 overflow-hidden rounded-2xl shadow-md border-2 border-gray-100 flex-shrink-0">
                <img
                  src={vijayImg}
                  alt="Vijay Tiwari - Co-Founder & CTO of Orbit Engineering Solutions Bhopal"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-115"
                  loading="lazy"
                  style={{ objectPosition: 'top' }}
                />
              </div>
              <div className="space-y-3 text-center sm:text-left flex-grow">
                <h3 className="text-2xl font-bold text-gray-900">Vijay Tiwari</h3>
                <p className="text-[#0073bc] font-extrabold uppercase tracking-widest text-xs">
                  Co-Founder & CTO
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-gray-600">
                  18+ Years of Technological Leadership
                </span>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  An instrumentation technologist specializing in distributed SCADA monitoring, automated PLC panels, remote telemetry RTUs, and smart IoT setups.
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 pt-2 border-t border-gray-100">
                  <Mail className="h-4 w-4 text-[#0073bc]" />
                  <a href="mailto:vijay@orbitengineerings.com" className="text-xs hover:text-[#0073bc] transition-colors font-semibold text-gray-700">
                    vijay@orbitengineerings.com
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="mt-12 text-center">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 hover:border-[#0073bc] hover:text-[#0073bc] text-gray-600 rounded-2xl font-black uppercase tracking-wider transition-colors text-sm"
            >
              Meet the Full Team <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── SECTION 5.5: DETAILED FUNCTIONAL DEPARTMENTS ── */}
      <section className="py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        {/* Soft background ambient blurs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0073bc] bg-blue-50 px-4 py-2 rounded-full inline-block">
              ✦ How We Operate
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Our Functional Divisions
            </h2>
            <div className="h-1.5 w-24 bg-[#0073bc] mx-auto rounded-full mt-4" />
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Orbit\'s engineering and operations are divided into five highly specialized, non-overlapping teams executing turnkey excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[2.5rem] border border-gray-150 shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image Banner with Soft Gradient Mask */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <img 
                      src={dept.banner} 
                      alt={`${dept.name} banner`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
                    {/* Floating pill for department index */}
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-black px-3.5 py-1.5 rounded-full shadow-sm border border-gray-100">
                      DIVISION 0{idx + 1}
                    </span>
                  </div>

                  {/* Header Title & Icon */}
                  <div className="p-8 pb-0 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`${dept.iconBg} p-3 rounded-2xl flex-shrink-0 shadow-sm border border-gray-100`}>
                        {dept.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#0073bc] transition-colors duration-300">
                        {dept.name}
                      </h3>
                    </div>
                    
                    <p className="text-sm font-semibold text-gray-600 italic">
                      "{dept.tagline}"
                    </p>

                    <div className="h-[1px] w-full bg-gray-100 my-4" />
                  </div>
                </div>

                {/* Focus Areas List */}
                <div className="p-8 pt-2 flex-grow flex flex-col justify-between">
                  <ul className="space-y-3.5">
                    {dept.focusAreas.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-sm text-gray-500 font-medium leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Visual accent bottom gradient border in card */}
                  <div className="mt-8 pt-4 flex justify-between items-center border-t border-gray-50">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#0073bc]/60 group-hover:text-[#0073bc] transition-colors duration-300">
                      Professional Team Spec
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0073bc]/30 group-hover:bg-[#0073bc] group-hover:scale-125 transition-all duration-300" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 6: GEOGRAPHICAL FOOTPRINT (MAP GIF) ── */}
      <section className="bg-slate-50 py-16 border-t border-slate-100 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#0073bc] mb-3">✦ Our Footprint</span>
            <AnimatedHeading level={2} className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Trusted Across Madhya Pradesh & India
            </AnimatedHeading>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              From our main headquarters in Bhopal to water treatment assets built all over the country, our operational map showcases years of execution success.
            </p>
          </div>

          {/* Map Image/GIF Display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[2.5rem] shadow-xl overflow-hidden bg-white border border-gray-200 max-w-4xl mx-auto"
          >
            <div className="aspect-video w-full overflow-hidden relative bg-slate-900 flex items-center justify-center">
              <motion.img
                src={mapGif}
                alt="Global and National Presence Map - Orbit Engineering Solutions"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full object-contain contrast-105 saturate-105"
                style={{ clipPath: 'inset(0 4px 0 0)' }}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: DETAILED FOOTER CONTACT INFO ── */}
      <section className="py-20 bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Get In Touch
            </h2>
            <div className="h-1 bg-blue-500 w-16 mx-auto rounded-full" />
            <p className="text-slate-400 font-light max-w-lg mx-auto">
              Let's discuss how we can partner on your next smart water or instrumentation project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            
            <div className="text-center space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-full p-4 inline-block mb-2">
                <MapPin className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Address Details</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                <span className="font-black text-slate-200">Working Office:</span> <br />
                <a href="https://www.google.com/maps?q=23.216892,77.424965" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  Root Space, Char Imli, Mannipuram, Bhopal, 462016 MP
                </a>
                <br /><br />
                <span className="font-black text-slate-200">Branch Office:</span> <br />
                <a href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  Flat No.2, Block 12, Shalimar Enclave, E3 Arera Colony, Bhopal, 462016
                </a>
                <br /><br />
                <span className="font-black text-slate-200">Head Office:</span> <br />
                <a href="https://maps.google.com/?q=E-45,+Pride+City,+Katara+Hills,+Bhopal,+Madhya+Pradesh,+462043" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  E-45, Pride City, Katara Hills, Bhopal, 462043
                </a>
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-full p-4 inline-block mb-2">
                <Phone className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Direct Phone</h3>
              <div className="text-slate-400 text-sm space-y-2">
                <p><a href="tel:7024128029" className="hover:text-blue-400 transition-colors font-semibold text-slate-300 block">+91 70241 28029</a></p>
                <p><a href="tel:9039075049" className="hover:text-blue-400 transition-colors font-semibold text-slate-300 block">+91 9039075049</a></p>
                <p><a href="tel:+917440969201" className="hover:text-blue-400 transition-colors font-semibold text-slate-300 block">+91 7440969201</a></p>
                <p><a href="tel:9893091450" className="hover:text-blue-400 transition-colors block">+91 98930 91450</a></p>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-full p-4 inline-block mb-2">
                <Mail className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="font-bold text-white text-lg">Email Networks</h3>
              <div className="text-slate-400 text-sm space-y-2 font-medium">
                <p><a href="mailto:info@orbitengineerings.com" className="hover:text-blue-400 transition-colors font-bold text-slate-200 block">info@orbitengineerings.com</a></p>
                <p><a href="mailto:service@orbitengineerings.com" className="hover:text-blue-400 transition-colors text-slate-200 block">service@orbitengineerings.com</a></p>
                <p><a href="mailto:vijaytiwari@orbitengineerings.com" className="hover:text-blue-400 transition-colors block">vijaytiwari@orbitengineerings.com</a></p>
                <p><a href="mailto:sales@orbitengineerings.com" className="hover:text-blue-400 transition-colors block">sales@orbitengineerings.com</a></p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
