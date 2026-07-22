import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import indiamartLogo from '../assets/indiamart-logo.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Projects', page: 'projects' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Products', page: 'products' },
    { label: 'Brochure', page: 'brochure' },
    { label: 'FAQ', page: 'faq' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              Orbit
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Pioneering water innovation for sustainable communities
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/orbit-engineering-co"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on LinkedIn"
                className="text-gray-400 hover:text-[#0A66C2] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/orbitengineeringsolutions?igsh=ajgzcHllc2F2bDBi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on Instagram"
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/OrbitEngg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on X"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919039075048?text=Hello,%20I%20am%20interested%20in%20Orbit%20Engineering's%20services.%20Can%20you%20please%20tell%20me%20more%20about%20your%20work%20and%20how%20you%20can%20help%20me?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on WhatsApp"
                className="text-gray-400 hover:text-[#25D366] transition-colors"
                title="Contact via WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
              <a
                href="https://www.indiamart.com/orbit-engineering-solutions-bhopal/?srsltid=AfmBOoqv0uyKZ1nbWyrYQsROXsB8pmT8cHLbpbeCFKcDaUv1ZOyLiEcV"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering Solutions on IndiaMART"
                className="text-gray-400 hover:text-[#E31E24] transition-colors inline-flex items-center justify-center"
                title="Verified Seller on IndiaMART Marketplace"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <circle cx="28" cy="24" r="11" />
                  <circle cx="68" cy="20" r="13" />
                  <path d="M 50 35 C 22 35 5 48 5 70 C 5 88 25 96 50 96 C 75 96 95 88 95 70 C 95 48 78 35 50 35 Z M 44 92 C 34 88 24 64 24 45 L 33 45 L 43 78 L 53 45 L 62 45 C 62 64 74 88 74 92 Z" />
                </svg>
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase block mb-2">Accreditations</span>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <span className="text-[10px] font-bold bg-blue-950/80 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded">ISO 9001:2015</span>
                <span className="text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded">ISO 14001:2015</span>
                <span className="text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/50 px-2 py-0.5 rounded">ISO 45001:2018</span>
              </div>
              <span className="text-[9.5px] font-medium text-slate-400 block leading-tight">Certified Scope: Manufacturer of Automation & IoT Equipments (TCS-UK / UKAF)</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-gray-400 hover:text-[#0073bc] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="https://www.google.com/maps?q=23.216892,77.424965"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block font-medium text-white group-hover:text-[#0073bc] transition-colors">Working Office:</span>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Root Space, Char Imli, Mannipuram,<br />Bhopal, 462016 MP</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block font-medium text-white group-hover:text-[#0073bc] transition-colors">Branch Office:</span>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Flat No.2, Block 12, Shalimar Enclave,<br />E3 Arera Colony, Bhopal, 462016</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="https://maps.google.com/?q=E-45,+Pride+City,+Katara+Hills,+Bhopal,+Madhya+Pradesh,+462043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block font-medium text-white group-hover:text-[#0073bc] transition-colors">Head Office:</span>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">E-45, Pride City, Katara Hills,<br />Bhopal, Madhya Pradesh, 462043</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div><a href="tel:7024128029" className="text-sm hover:text-[#0073bc] transition-colors">+91 70241 28029</a></div>
                  <div><a href="tel:9039075049" className="text-sm hover:text-[#0073bc] transition-colors">+91 9039075049</a></div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div>
                    <a href="mailto:info@orbitengineerings.com" className="text-sm text-gray-400 hover:text-[#0073bc] transition-colors">
                      info@orbitengineerings.com
                    </a>
                  </div>
                  <div>
                    <a href="mailto:service@orbitengineerings.com" className="text-sm text-gray-400 hover:text-[#0073bc] transition-colors">
                      service@orbitengineerings.com
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monday - Saturday: 10:00 AM - 7:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <a
                href="https://www.indiamart.com/orbit-engineering-solutions-bhopal/?srsltid=AfmBOoqv0uyKZ1nbWyrYQsROXsB8pmT8cHLbpbeCFKcDaUv1ZOyLiEcV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#002F52] hover:bg-[#001f38] text-white text-xs font-bold px-3 py-2 rounded-lg border border-blue-500/30 transition-all hover:scale-105 shadow-md"
              >
                <img src={indiamartLogo} alt="IndiaMART Marketplace" className="h-5 w-auto object-contain bg-white rounded-full p-0.5" />
                <span>Verified Seller on IndiaMART ↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <button onClick={() => onNavigate('home')} className="hover:text-[#0073bc] transition-colors">Orbit Engineering Solutions</button>. Established in <strong className="text-[#0073bc]">1998</strong>. All rights reserved.
          </p>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>Triple ISO Certified:</span>
            <span className="font-semibold text-gray-300">ISO 9001:2015 | 14001:2015 | 45001:2018</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
