import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import heroSectionImage from '../assets/products/hero-section.jpg';
import indiamartLogo from '../assets/indiamart-logo.png';
import { MotionFadeUp, MotionStagger, AnimatedHeading } from '../components/Animated';
import LeadConsentFields from '../components/LeadConsentFields';
import ClickToLoadMap from '../components/ClickToLoadMap';
import { submitLead } from '../lib/leadSubmission';
import { business } from '../data/legalContent.mjs';
// iconContact removed; hero uses shared HeroSection

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const pending = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending.current) return;
    const form = e.currentTarget;
    pending.current = true;
    setIsSubmitting(true);
    setIsSubmitted(false);
    setError('');
    try {
      await submitLead(new FormData(form), 'contact', window.location.pathname);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Your message could not be sent. Please try again.');
    } finally {
      pending.current = false;
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <SEO
        title="Contact Orbit Engineering Solutions Bhopal | Free Consultation for Water Treatment & Automation"
        description="Contact Orbit Engineering Solutions (often referred to as Orbit Engineering Company or Orbit Engineering Consultants) for water treatment, SCADA & PLC automation needs. Phone: +91 70241 28029, +91 90390 75049. Email: info@orbitengineerings.com, service@orbitengineerings.com"
        canonicalPath="/contact"
        keywords="contact Orbit Engineering Solutions, Orbit Engineering Solutions Bhopal address, Orbit Engineering Bhopal address, orbit engineering contact number, orbit engineering phone number, water treatment consultation Bhopal, SCADA automation quote, orbitengineerings contact, orbit engineering solutions contact, orbit bhopal contact, orbit bhopal office, orbit engineering solutions phone, orbit engineering solutions email, info@orbitengineerings.com, service@orbitengineerings.com, +91 9039075049, orbit engineering, orbit engineering bhopal, orbit engineering company, orbit engineering company bhopal, orbit engineering consultants, orbit engineering consultants bhopal, orbit consultants bhopal, orbit engineering solutions, orbit engineering solutions bhopal, orbit"
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Contact Orbit Engineering Solutions Bhopal | Office address, phone numbers, and email for water treatment experts</h1>

      <HeroSection
        title="Contact Us"
        subtitle="We're here to help you solve your water infrastructure challenges"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div id="contact-form">
              <AnimatedHeading level={2} className="text-3xl font-bold text-gray-900 mb-6">
                Get In Touch
              </AnimatedHeading>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're planning a new water treatment facility, looking to upgrade existing infrastructure, or need technical consultation, our team at Orbit Engineering Solutions is ready to help. Send us your business inquiry and our team will respond during business hours.
              </p>

              <MotionStagger className="space-y-6" stagger={0.06}>
                <MotionFadeUp className="flex items-start space-x-4">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-xl p-3">
                    <MapPin className="h-6 w-6 text-[#0073bc]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Offices</h3>
                    <div className="text-gray-600 text-sm space-y-3">
                      <div>
                        <strong className="block text-gray-900">Working Office:</strong>
                        <a href="https://www.google.com/maps?q=23.216892,77.424965" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">
                          Root Space, Char Imli, Mannipuram,<br />
                          Bhopal, 462016 MP
                        </a>
                      </div>
                      <div>
                        <strong className="block text-gray-900">Branch Office:</strong>
                        <a href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">
                          Flat No.2, Block 12, Shalimar Enclave,<br />
                          E3 Arera Colony, Bhopal, 462016
                        </a>
                      </div>
                      <div>
                        <strong className="block text-gray-900">Business Address:</strong>
                        <a href="https://maps.google.com/?q=E-45,+Pride+City,+Katara+Hills,+Bhopal,+Madhya+Pradesh,+462043" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">
                          {business.address}
                        </a>
                      </div>
                    </div>
                  </div>
                </MotionFadeUp>

                <MotionFadeUp className="flex items-start space-x-4">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-xl p-3">
                    <Mail className="h-6 w-6 text-[#0073bc]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <div className="text-gray-600 space-y-1">
                      <div><a href="mailto:info@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors font-medium">info@orbitengineerings.com</a></div>
                      <div><a href="mailto:service@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors font-medium">service@orbitengineerings.com</a></div>
                      <div><a href="mailto:vijaytiwari@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors">vijaytiwari@orbitengineerings.com</a></div>
                      <div><a href="mailto:sales@orbitengineerings.com" className="hover:text-[#0073bc] transition-colors">sales@orbitengineerings.com</a></div>
                    </div>
                  </div>
                </MotionFadeUp>

                <MotionFadeUp className="flex items-start space-x-4">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-xl p-3">
                    <Phone className="h-6 w-6 text-[#0073bc]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <div className="text-gray-600 space-y-1">
                      <div><a href="tel:7024128029" className="hover:text-[#0073bc] transition-colors">+91 70241 28029</a></div>
                      <div><a href="tel:9039075049" className="hover:text-[#0073bc] transition-colors">+91 9039075049</a></div>
                    </div>
                  </div>
                </MotionFadeUp>

                <MotionFadeUp className="flex items-start space-x-4 pt-2">
                  <div className="bg-[#002F52] text-white rounded-xl p-2.5 shadow-md flex items-center justify-center">
                    <img src={indiamartLogo} alt="IndiaMART Marketplace" className="w-7 h-7 object-contain bg-white rounded-full p-0.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span>IndiaMART Storefront</span>
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">View complete product catalog & instant RFQs</p>
                    <a
                      href="https://www.indiamart.com/orbit-engineering-solutions-bhopal/?srsltid=AfmBOoqv0uyKZ1nbWyrYQsROXsB8pmT8cHLbpbeCFKcDaUv1ZOyLiEcV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#002F52] hover:text-[#0073bc] underline transition-colors"
                    >
                      Visit our IndiaMART profile ↗
                    </a>
                  </div>
                </MotionFadeUp>
              </MotionStagger>

              <div className="mt-8 bg-gradient-to-br from-[#0073bc] to-[#005a94] rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2 text-blue-100">
                  <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <AnimatedHeading level={3} className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</AnimatedHeading>

                <form
                  onSubmit={handleSubmit}
                  aria-busy={isSubmitting}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      disabled={isSubmitting}
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent transition-all outline-none"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      disabled={isSubmitting}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent transition-all outline-none"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      disabled={isSubmitting}
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent transition-all outline-none"
                      placeholder="+91 70241 28029"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      disabled={isSubmitting}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent transition-all outline-none resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <LeadConsentFields formType="contact" disabled={isSubmitting} />
                  {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                  {isSubmitted && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Your message was accepted. Our team will respond during business hours.</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0073bc] text-white py-4 rounded-lg font-semibold hover:bg-[#005a94] transition-colors flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl overflow-hidden mb-12">
            <img src={heroSectionImage} alt="Section background" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 py-10 px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Our Locations
              </h2>
              <p className="text-blue-100">
                Visit us at our offices
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Working Office Map */}
            <div className="flex flex-col group h-full">
              <div className="relative rounded-t-2xl overflow-hidden border-x border-t border-gray-200 shrink-0">
                <img src={heroSectionImage} alt="Working Office Header" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/50" />
                <div className="relative z-10 p-6 min-h-[140px] flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Working Office</h3>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Root Space, Char Imli, Mannipuram, Bhopal, 462016 MP
                  </p>
                </div>
              </div>
              <ClickToLoadMap title="Orbit Working Office - Bhopal" embedUrl="https://www.google.com/maps?q=23.216892,77.424965&z=17&output=embed" mapUrl="https://www.google.com/maps?q=23.216892,77.424965" />
            </div>

            {/* Branch Office Map */}
            <div className="flex flex-col group h-full">
              <div className="relative rounded-t-2xl overflow-hidden border-x border-t border-gray-200 shrink-0">
                <img src={heroSectionImage} alt="Branch Office Header" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/50" />
                <div className="relative z-10 p-6 min-h-[140px] flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Branch Office</h3>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Flat No.2, Block 12, Shalimar Enclave, E3 Arera Colony, Bhopal, 462016
                  </p>
                </div>
              </div>
              <ClickToLoadMap title="Orbit Branch Office - Bhopal" embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.432328148812!2d77.4286159!3d23.2162985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4273069151db%3A0xe549a909796677f2!2sShalimar%20Enclave%2C%20E3%2C%20Arera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh%20462016!5e0!3m2!1sen!2sin!4v1703413554823!5m2!1sen!2sin" mapUrl="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016" />
            </div>

            {/* Head Office Map */}
            <div className="flex flex-col group h-full">
              <div className="relative rounded-t-2xl overflow-hidden border-x border-t border-gray-200 shrink-0">
                <img src={heroSectionImage} alt="Head Office Header" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 transition-colors group-hover:bg-black/50" />
                <div className="relative z-10 p-6 min-h-[140px] flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Business Address</h3>
                  </div>
                  <p className="text-blue-100 text-sm">
                    {business.address}
                  </p>
                </div>
              </div>
              <ClickToLoadMap title="Orbit Head Office - Bhopal" embedUrl="https://www.google.com/maps?q=E-45,+Pride+City,+Katara+Hills,+Bhopal,+Madhya+Pradesh,+462043&output=embed" mapUrl="https://maps.google.com/?q=E-45,+Pride+City,+Katara+Hills,+Bhopal,+Madhya+Pradesh,+462043" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
