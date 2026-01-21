import { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Users, Star } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { MotionFadeUp, AnimatedHeading } from '../components/Animated';
import mpJalNigam from '../assets/clients/mp-jal-nigam.png';
import bharatSarkar from '../assets/clients/bharat-sarkar.png';
import mpudclIndoreDistrict from '../assets/clients/mpudcl-indore-district.png';
import lupinPharmaceuticals from '../assets/clients/lupin-pharmaceuticals.png';
import vindhayachalDistillery from '../assets/clients/vindhayachal-distillery.png';
import dblBuildcon from '../assets/clients/dbl-buildcon.png';
import tejasConstructions from '../assets/clients/tejas-constructions.png';
import prismCement from '../assets/clients/prism-cement.png';
import centralIndia from '../assets/clients/central-india-pvt-ltd.png';
import cmrLogo from '../assets/clients/cmr_logo.jpg';
import hegLimited from '../assets/clients/HEG.png';
import indianRailways from '../assets/clients/Indian Railways.png';
import laxmiCivilEngineering from '../assets/clients/laxmii.png';
import omConstruction from '../assets/clients/om.jpeg';
import sbem from '../assets/clients/SBEM.jpg';
import indoreMunicipal from '../assets/clients/indore municipal corporation.png';
import larsenToubro from "../assets/clients/larsen- toubro's.png";
import bmcLogo from '../assets/clients/mpudcl-bhopal.jpg';
import heroSectionImage from '../assets/products/hero-section.jpg';

export default function ClientsPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamically import all images in src/assets/partners using Vite's recommended query form
  const clients = useMemo(() => {
    const modules = import.meta.glob('../assets/partners/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
    const partnersArray = Object.entries(modules).map(([filePath, url]) => {
      const fileName = filePath.split('/').pop() || filePath;
      let name = fileName.replace(/\.(png|jpg|jpeg|svg)$/i, '').replace(/[-_]/g, ' ');

      // Title Case formatting
      name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

      // Specific Correction
      if (name.toLowerCase().includes('regada')) {
        name = 'Regada';
      }

      return { name, logo: url };
    });

    // Sort alphabetically by name
    return partnersArray.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ fullName: '', email: '', phone: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Our Clients & Partners | Trusted by Government & Industry - Orbit Engineering"
        description="Orbit Engineering Group is proud to partner with MPUDCL, MP Jal Nigam, and leading industrial organizations across India for water solutions."
        keywords="MP Jal Nigam, MPUDCL Bhopal, Bhopal Municipal Corporation, Indore District Administration, Tikamgarh Nagar Parishads, WRD Bhopal, Prism Cement, Lupin Pharmaceuticals, Vindhyachal Distillery, Central India Pvt Ltd, Dilip Buildcon, Tejas Construction, water infrastructure partners, orbit engineering clients, ecosystem partners, engineering consultants bhopal, government contractors mp"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Orbit Engineering Group Clients | Trusted by MPUDCL, MP Jal Nigam, and municipal corporations across India</h1>

      <HeroSection title="Our Trusted Clients" subtitle="Building long-term partnerships with government and private organizations" />

      {/* Named clients grid like the reference */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 border border-indigo-300 text-indigo-700 rounded-full px-4 py-2 mb-4 shadow-sm bg-white">
              <Users className="h-4 w-4" />
              <Star className="h-4 w-4 fill-indigo-400 text-indigo-400" />
              <span className="text-sm font-semibold">Valued Clients</span>
            </div>
            <AnimatedHeading level={2} className="text-3xl md:text-4xl font-bold text-gray-900">
              Serving <span className="text-indigo-600">Government & Private Enterprises</span>
            </AnimatedHeading>
            <p className="text-gray-600 mt-3">Trusted by leading organizations across India for water infrastructure solutions</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm ring-1 ring-black/5 p-6 md:p-8">
            {/* Explicit mapping of organization names to their logos (keeps layout responsive and consistent) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(() => {
                const displayNames = [
                  'MP Jal Nigam',
                  'MPUDCL Bhopal',
                  'Bhopal Municipal Corporation',
                  'Indore District Administration',
                  'Tikamgarh Nagar Parishads',
                  'WRD Bhopal',
                  'Prism Cement',
                  'Lupin Pharmaceuticals',
                  'Vindhyachal Distillery',
                  'Central India Pvt Ltd',
                  'Dilip Buildcon',
                  'Tejas Construction',
                  'CMR Infrastructure',
                  'HEG Limited',
                  'Indian Railways',
                  'Laxmi Civil Engineering',
                  'OM Construction',
                  'SBEM',
                  'Indore Municipal Corporation',
                  "Larsen & Toubro's"
                ];

                const logoMap: Record<string, string | null> = {
                  'MP Jal Nigam': mpJalNigam,
                  'MPUDCL Bhopal': bharatSarkar,
                  'Bhopal Municipal Corporation': bmcLogo,
                  'Indore District Administration': mpudclIndoreDistrict,
                  'Tikamgarh Nagar Parishads': bharatSarkar,
                  'WRD Bhopal': bharatSarkar,
                  'Prism Cement': prismCement,
                  'Lupin Pharmaceuticals': lupinPharmaceuticals,
                  'Vindhyachal Distillery': vindhayachalDistillery,
                  'Central India Pvt Ltd': centralIndia,
                  'Dilip Buildcon': dblBuildcon,
                  'Tejas Construction': tejasConstructions,
                  'CMR Infrastructure': cmrLogo,
                  'HEG Limited': hegLimited,
                  'Indian Railways': indianRailways,
                  'Laxmi Civil Engineering': laxmiCivilEngineering,
                  'OM Construction': omConstruction,
                  'SBEM': sbem,
                  'Indore Municipal Corporation': indoreMunicipal,
                  "Larsen & Toubro's": larsenToubro
                };

                return displayNames.map((name) => {
                  const logo = logoMap[name] || null;
                  return (
                    <MotionFadeUp
                      key={name}
                      whileHover={{ scale: 1.035 }}
                      className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-[0_2px_10px_rgba(99,102,241,0.06)] hover:shadow-lg transform-gpu"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
                        <div className="flex-shrink-0">
                          {logo ? (
                            <div className="h-[100px] w-[100px] rounded-lg bg-white flex items-center justify-center border border-gray-100 overflow-hidden">
                              <img src={logo} alt={`${name} logo`} className="h-[100px] w-[100px] object-contain" />
                            </div>
                          ) : (
                            <div className="h-[100px] w-[100px] rounded-lg bg-indigo-100 flex items-center justify-center">
                              <div className="h-5 w-5 rounded-full bg-indigo-300" />
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-gray-900 text-sm md:text-base text-center sm:text-left">{name}</div>
                      </div>
                    </MotionFadeUp>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Static logos (no animation) with names */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden mb-12">
            <img src={heroSectionImage} alt="Partners background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 py-16 px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                Our Partners
              </h2>
            </div>
          </div>
          <div className="space-y-12 overflow-hidden py-8">
            {/* First Row: Left-to-Right (First 6 partners) */}
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap gap-6"
                initial={{ x: 0 }}
                whileInView={{
                  x: [0, "-50%"]
                }}
                viewport={{ once: false }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
              >
                {(() => {
                  const firstRowPartners = clients.slice(0, 6);
                  return [...firstRowPartners, ...firstRowPartners].map((c, i) => (
                    <div
                      key={`row1-${c.name}-${i}`}
                      className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-100 p-6 shadow-sm text-center hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center justify-center h-24 mb-4">
                        <img src={c.logo} alt={`${c.name} logo`} className="max-h-16 w-auto object-contain transition-transform group-hover:scale-110" />
                      </div>
                      <div className="text-sm font-medium text-gray-700 truncate">{c.name}</div>
                    </div>
                  ));
                })()}
              </motion.div>
            </div>

            {/* Second Row: Right-to-Left (Remaining partners) */}
            <div className="relative flex overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap gap-6"
                initial={{ x: "-50%" }}
                whileInView={{
                  x: ["-50%", "0%"]
                }}
                viewport={{ once: false }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 55,
                    ease: "linear",
                  },
                }}
              >
                {(() => {
                  const secondRowPartners = clients.slice(6);
                  return [...secondRowPartners, ...secondRowPartners].map((c, i) => (
                    <div
                      key={`row2-${c.name}-${i}`}
                      className="flex-shrink-0 w-48 bg-white rounded-xl border border-gray-100 p-6 shadow-sm text-center hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center justify-center h-24 mb-4">
                        <img src={c.logo} alt={`${c.name} logo`} className="max-h-16 w-auto object-contain transition-transform group-hover:scale-110" />
                      </div>
                      <div className="text-sm font-medium text-gray-700 truncate">{c.name}</div>
                    </div>
                  ));
                })()}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact slice like reference */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">We are always ready to help you</h2>
            <p className="text-xl text-gray-700">and answer your questions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left contact cards */}
            <div className="space-y-6">
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm contact-item">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#0073bc] p-3 rounded-xl"><Phone className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600 text-sm mb-2">Call us directly for immediate assistance</p>
                    <div className="flex flex-col space-y-1">
                      <a href="tel:7024128029" className="text-[#0073bc] font-medium hover:text-[#005a94] transition-colors">+91 70241 28029</a>
                      <a href="tel:+917440969201" className="text-[#0073bc] font-medium hover:text-[#005a94] transition-colors">+91 7440969201</a>
                      <a href="tel:9893091450" className="text-[#0073bc] font-medium hover:text-[#005a94] transition-colors">+91 98930 91450</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm contact-item">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#0073bc] p-3 rounded-xl"><Mail className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600 text-sm mb-2">Send us an email for detailed inquiries</p>
                    <div className="flex flex-col space-y-1">
                      <a href="mailto:info@orbitengineerings.com" className="text-[#0073bc] font-medium hover:underline">info@orbitengineerings.com</a>
                      <a href="mailto:vijaytiwari@orbitengineerings.com" className="text-[#0073bc] font-medium hover:underline">vijaytiwari@orbitengineerings.com</a>
                      <a href="mailto:sales@orbitengineerings.com" className="text-[#0073bc] font-medium hover:underline">sales@orbitengineerings.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm contact-item">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#0073bc] p-3 rounded-xl"><MapPin className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600 text-sm mb-2">Visit our office for consultations</p>
                    <a
                      href="https://maps.google.com/?q=Shalimar+Enclave,+E-3+Area+Colony+Bhopal"
                      target="_blank" rel="noreferrer"
                      className="text-[#0073bc] font-medium block text-sm hover:text-[#005a94] transition-colors"
                    >
                      Working Office: Flat No.2, Block 12, Shalimar Enclave, Bhopal<br />
                      Head: B-32/A Priyadershini Society, Bagsewaniya, Bhopal
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm contact-item">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#0073bc] p-3 rounded-xl"><Clock className="h-6 w-6" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">send us a message</h3>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-600">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none"
                      placeholder="+91 70241 28029"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0073bc] text-white py-4 rounded-lg font-semibold hover:bg-[#005a94] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : (<><span>Send Message</span><Send className="h-5 w-5" /></>)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
