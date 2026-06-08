import { Droplets, Settings, FileText, Wrench, Cloud, Cpu, Activity, ShieldCheck, Zap, Server, Factory, Database, CheckCircle2, MonitorSmartphone } from 'lucide-react';
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

const colorMap = {
  blue: { bg: 'bg-blue-500', text: 'text-[#0073bc]', lightbg: 'bg-blue-50', border: 'border-blue-100', hex: '#0073bc', glow: 'rgba(0,115,188,0.15)' },
  emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', lightbg: 'bg-emerald-50', border: 'border-emerald-100', hex: '#059669', glow: 'rgba(5,150,105,0.15)' },
  cyan: { bg: 'bg-cyan-500', text: 'text-cyan-600', lightbg: 'bg-cyan-50', border: 'border-cyan-100', hex: '#0891b2', glow: 'rgba(8,145,178,0.15)' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', lightbg: 'bg-amber-50', border: 'border-amber-100', hex: '#d97706', glow: 'rgba(217,119,6,0.15)' },
  violet: { bg: 'bg-violet-500', text: 'text-violet-600', lightbg: 'bg-violet-50', border: 'border-violet-100', hex: '#7c3aed', glow: 'rgba(124,58,237,0.15)' },
  indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', lightbg: 'bg-indigo-50', border: 'border-indigo-100', hex: '#4f46e5', glow: 'rgba(79,70,229,0.15)' },
};

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  void onNavigate;

  const services = [
    {
      icon: Droplets,
      image: iconWaterTreatmentPlants,
      title: 'Water Treatment Solutions',
      desc: 'Advanced purification and recycling systems',
      color: 'blue' as keyof typeof colorMap,
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
      desc: 'Intelligent systems for optimized operations',
      color: 'emerald' as keyof typeof colorMap,
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
      desc: 'Flawless execution from blueprint to reality',
      color: 'cyan' as keyof typeof colorMap,
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
      desc: 'Ensuring longevity and peak performance',
      color: 'amber' as keyof typeof colorMap,
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
      desc: 'Expert guidance for sustainable infrastructure',
      color: 'violet' as keyof typeof colorMap,
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
      desc: 'Seamless integration with remote cloud access',
      color: 'indigo' as keyof typeof colorMap,
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
    { name: 'Advanced PLC Programming', tool: 'Siemens, Allen Bradley, Schneider', icon: Cpu },
    { name: 'HMI/SCADA Development', tool: 'Custom Dashboarding', icon: Activity },
    { name: 'Industrial IoT Networks', tool: 'Sensor Integration & Comms', icon: Zap },
    { name: 'Cloud Platform Deployment', tool: 'AWS, Azure, Google Cloud', icon: Cloud },
    { name: 'Network Infrastructure', tool: 'Robust Industrial Comm.', icon: Server },
    { name: 'Cybersecurity', tool: 'Data Protection & Integrity', icon: ShieldCheck },
    { name: 'Data Acquisition', tool: 'High-speed logging & reporting', icon: Database },
    { name: 'Energy Management', tool: 'Optimization & Analytics', icon: Factory }
  ];

  return (
    <div className="min-h-screen bg-[#fafcfe] overflow-x-hidden relative">
      <SEO
        title="Water Treatment, SCADA Automation & Instrumentation Services | WTP, STP, Solar, O&M - Orbit Engineering Solutions"
        description="Comprehensive water engineering & instrumentation services by Orbit Engineering Solutions: WTP/STP installation & commissioning, PLC/SCADA integration, IoT setup, Operation & Maintenance (O&M), consultancy, solar energy solutions, and turnkey cloud-based automation. Serving all of India from Bhopal."
        canonicalPath="/services"
        keywords="water treatment services Bhopal, SCADA integration service, PLC programming India, O&M water treatment plant, water plant commissioning, automation consultancy, IoT water monitoring service, instrumentation services, instrumentation company Bhopal, solar services Bhopal, solar energy solutions, WTP services, STP services, RO services, ETP services, Orbit Engineering Solutions services"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Solutions Services | Water treatment solutions, PLC/SCADA automation, IoT integration, O&M services, and consultancy in Bhopal</h1>

      <HeroSection title="Our Services" subtitle="Comprehensive water infrastructure solutions from concept to maintenance" />

      {/* Infinite Marquee Strip */}
      <div className="bg-[#0073bc] text-white py-4 overflow-hidden border-y border-blue-400/30 flex relative z-20 shadow-lg">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center text-sm md:text-base font-black tracking-[0.3em] uppercase w-max"
        >
          {Array(8).fill(" ✦  INNOVATION  ✦  SUSTAINABILITY  ✦  AUTOMATION  ✦  EXCELLENCE  ✦  RELIABILITY  ✦  PRECISION").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Services Grid Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fafcfe] to-white">
        {/* Dynamic Background SVG Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" style={{ backgroundImage: 'radial-gradient(#0073bc 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M25 0L50 14.5V43.4L25 28.9L0 43.4V14.5L25 0Z" fill="none" stroke="#0073bc" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 lg:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-block text-[#0073bc] text-xs font-black uppercase tracking-[0.3em] mb-4"
            >
              ✦ What We Deliver
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0073bc] to-[#00a3ff]">Excellence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {services.map((service, index) => {
              const theme = colorMap[service.color];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -12, scale: 1.01 }}
                  className="relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 group border border-gray-100 overflow-hidden flex flex-col h-full isolate"
                >
                  {/* Glossy sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out z-20 pointer-events-none" />

                  {/* Glowing background blooms */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] opacity-[0.15] group-hover:opacity-[0.35] transition-opacity duration-700 -z-10" style={{ backgroundColor: theme.hex }}></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 -z-10" style={{ backgroundColor: theme.hex }}></div>

                  {/* Dynamic Top Gradient Border */}
                  <div className="absolute top-0 left-0 w-full h-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${theme.hex}, transparent)` }}></div>

                  {/* Icon Card with SVG Vector overlay */}
                  <div className="relative mb-8 self-start">
                    <div className="absolute inset-0 rounded-2xl scale-[1.3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ backgroundColor: theme.lightbg }}></div>
                    <div className="w-16 h-16 rounded-2xl bg-white border shadow-sm flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" style={{ borderColor: theme.hex + '30' }}>
                      {service.image ? (
                        <img src={service.image} alt={service.title} className="w-9 h-9 object-contain" />
                      ) : (
                        <service.icon className="h-8 w-8" style={{ color: theme.hex }} />
                      )}
                    </div>
                    {/* Decorative spinning ring */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] -z-0 opacity-0 group-hover:opacity-100 group-hover:rotate-[180deg] transition-all duration-[1s]" style={{ color: theme.hex }} viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                    </svg>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-[#0073bc] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
                      {service.desc}
                    </p>

                    <ul className="space-y-2 relative z-10">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-700 group/item p-2 -ml-2 rounded-xl hover:bg-gray-50/80 transition-all duration-300">
                          <CheckCircle2 className="w-[18px] h-[18px] mr-3 shrink-0 opacity-40 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all mt-0.5" style={{ color: theme.hex }} />
                          <span className="text-[14.5px] leading-snug font-bold text-gray-600 group-hover/item:text-gray-900 group-hover/item:translate-x-1 transition-all duration-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seamless Wave Divider */}
      <div className="w-full relative -mb-1 z-10 bg-white">
        <svg viewBox="0 0 1440 120" className="w-full h-auto block" preserveAspectRatio="none">
          <path fill="#f8fafc" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,121L1360,121C1280,121,1120,121,960,121C800,121,640,121,480,121C320,121,160,121,80,121L0,121Z"></path>
        </svg>
      </div>

      {/* Technical Capabilities & CMS Section - Light Theme */}
      <section className="py-24 relative bg-slate-50 overflow-hidden">
        {/* Abstract Background Vectors */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,0 L0,0 Z" fill="#0073bc" opacity="0.3" />
            <path d="M0,300 C200,400 400,100 600,300 C800,500 1000,200 1200,300 L1200,0 L0,0 Z" fill="#00a3ff" opacity="0.2" />
          </svg>
        </div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Block - Tech Grid */}
            <div className="lg:col-span-7">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                  Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0073bc] to-[#00a3ff]">Capabilities</span>
                </h2>
                <p className="text-gray-600 text-lg font-medium">
                  Mastery over industry standards and cutting-edge industrial tech.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
                {/* Dotted mesh graphic behind grid */}
                <div className="absolute inset-0 opacity-50 pointer-events-none -z-10 bg-[radial-gradient(#cbd5e1_2px,transparent_2px)] [background-size:24px_24px]"></div>

                {technicalCapabilities.map((cap, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100, damping: 15 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="relative bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-200 hover:shadow-[0_20px_40px_-10px_rgba(0,115,188,0.12)] transition-all duration-300 group z-10 overflow-hidden"
                  >
                    {/* Hover Gloss inside the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1s] pointer-events-none ease-in-out"></div>

                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-[#0073bc] flex items-center justify-center shrink-0 group-hover:bg-[#0073bc] group-hover:text-white group-hover:shadow-[0_10px_20px_-5px_rgba(0,115,188,0.4)] transition-all duration-300 relative overflow-hidden">
                      <cap.icon className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold tracking-tight text-[15px] group-hover:text-[#0073bc] transition-colors">{cap.name}</h4>
                      <p className="text-gray-500 text-[12px] font-medium mt-0.5 group-hover:text-gray-700 transition-colors duration-300">{cap.tool}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Block - CMS Card inside Light Glass Terminal */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
                className="rounded-3xl bg-white/90 border border-white overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl relative"
              >
                {/* Light reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent pointer-events-none z-0"></div>

                {/* Terminal Header - Light Mode */}
                <div className="bg-gray-50/80 px-6 py-4 flex items-center gap-3 border-b border-gray-100 relative z-10">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_5px_rgba(248,113,113,0.3)]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_5px_rgba(251,191,36,0.3)]"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_0_5px_rgba(52,211,153,0.3)]"></div>
                  </div>
                  <div className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase ml-auto mr-1 border px-3 py-1 bg-white rounded-md shadow-sm">
                    CMS.Dashboard.UI
                  </div>
                </div>

                <div className="p-8 md:p-10 space-y-8 relative z-10">
                  {/* Subtle Grid pattern */}
                  <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0073bc] to-[#00a3ff] p-0.5 shadow-[0_10px_30px_-5px_rgba(0,115,188,0.3)] relative z-10 group cursor-pointer">
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center relative overflow-hidden transition-colors duration-300">
                      <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <MonitorSmartphone className="text-[#0073bc] w-8 h-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4">
                      Content Management Systems
                    </h3>
                    <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
                      We develop <span className="text-[#0073bc] font-bold">custom web-based monitoring</span> and management platforms using modern CMS frameworks including <span className="font-bold text-gray-900 border-b-2 border-[#0073bc]/30">Drupal</span> and <span className="font-bold text-gray-900 border-b-2 border-[#0073bc]/30">Joomla</span>.
                      <br /><br />
                      These systems provide intuitive interfaces for real-time data visualization, reporting, and automated system control—accessible securely from any device.
                    </p>
                  </div>

                  <div className="pt-2 relative z-10">
                    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
                      <div className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </div>
                      <span className="group-hover:text-[#0073bc] transition-colors">Live Data Link</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
