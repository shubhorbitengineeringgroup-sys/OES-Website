import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SEO from '../components/SEO';
import heroSectionImage from '../assets/products/hero-section.jpg';
import { MotionFadeUp, MotionStagger, AnimatedHeading } from '../components/Animated';
// iconContact removed; hero uses shared HeroSection

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us | Orbit Engineering Group Bhopal - Get a Free Consultation"
        description="Reach out to Orbit Engineering Group for your water treatment and automation needs. Offices in Arera Colony and Bagsewaniya, Bhopal."
      />
      {/* Hidden H1 for SEO */}
      <h1 className="sr-only">Contact Orbit Engineering Group Bhopal | Office address, phone numbers, and email for water treatment experts</h1>

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
                Whether you're planning a new water treatment facility, looking to upgrade existing infrastructure, or need technical consultation, our team is ready to help. Fill out the form and we'll get back to you within 24 hours.
              </p>

              <MotionStagger className="space-y-6" stagger={0.06}>
                <MotionFadeUp className="flex items-start space-x-4">
                  <div className="bg-[#0073bc] bg-opacity-10 rounded-xl p-3">
                    <MapPin className="h-6 w-6 text-[#0073bc]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                    <div className="text-gray-600 text-sm space-y-2">
                      <div>
                        <a href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016" target="_blank" rel="noopener noreferrer" className="hover:text-[#0073bc] transition-colors">
                          Flat No.2, Block 12, Shalimar Enclave,<br />
                          E3 Arera Colony, Bhopal, 462016
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
                      <div><a href="tel:+917440969201" className="hover:text-[#0073bc] transition-colors">+91 7440969201</a></div>
                      <div><a href="tel:9893091450" className="hover:text-[#0073bc] transition-colors">+91 98930 91450</a></div>
                    </div>
                  </div>
                </MotionFadeUp>
              </MotionStagger>

              <div className="mt-12 bg-gradient-to-br from-[#0073bc] to-[#005a94] rounded-2xl p-8 text-white">
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
                  action="https://formspree.io/f/xeeoyary"
                  method="POST"
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

                  <button
                    type="submit"
                    className="w-full bg-[#0073bc] text-white py-4 rounded-lg font-semibold hover:bg-[#005a94] transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    Flat No.2, Block 12, Shalimar Enclave, E3 Arera Colony, Bhopal, 462016
                  </p>
                </div>
              </div>
              <div className="relative bg-white rounded-b-2xl overflow-hidden shadow-lg border border-gray-200 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.432328148812!2d77.4286159!3d23.2162985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4273069151db%3A0xe549a909796677f2!2sShalimar%20Enclave%2C%20E3%2C%20Arera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh%20462016!5e0!3m2!1sen!2sin!4v1703413554823!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orbit Working Office - Bhopal"
                />

                {/* Visual Pin Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-white p-2 rounded-full shadow-lg border-2 border-[#0073bc] transform -translate-y-4">
                    <MapPin className="h-6 w-6 text-[#0073bc] fill-[#0073bc]/20" />
                  </div>
                </div>

                {/* Clickable Overlay */}
                <a
                  href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  title="Open in Google Maps"
                >
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[#0073bc] text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Google Maps
                  </div>
                </a>
              </div>
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
                    <h3 className="text-xl font-bold text-white">Head Office</h3>
                  </div>
                  <p className="text-blue-100 text-sm">
                    B-32/A Priyadershini Society, Sant Asharam Nagar, Bagsewaniya, Bhopal - 462043
                  </p>
                </div>
              </div>
              <div className="relative bg-white rounded-b-2xl overflow-hidden shadow-lg border border-gray-200 h-[400px]">
                <iframe
                  src="https://www.google.com/maps?q=B-32/A Priyadershini Society, Sant Asharam Nagar, Bagsewaniya, Bhopal - 462043&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Orbit Head Office - Bhopal"
                />

                {/* Visual Pin Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="bg-white p-2 rounded-full shadow-lg border-2 border-[#0073bc] transform -translate-y-4">
                    <MapPin className="h-6 w-6 text-[#0073bc] fill-[#0073bc]/20" />
                  </div>
                </div>

                {/* Clickable Overlay */}
                <a
                  href="https://maps.google.com/?q=B-32/A+Priyadershini+Society,+Sant+Asharam+Nagar,+Bagsewaniya,+Bhopal+-+462043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  title="Open in Google Maps"
                >
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[#0073bc] text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View on Google Maps
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
