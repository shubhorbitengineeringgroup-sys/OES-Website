import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';

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
            <div className="flex space-x-4">
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
                href="https://www.instagram.com/orbitengineering98?igsh=MWIzZ3BxNzF3NmplMw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on Instagram"
                className="text-gray-400 hover:text-[#E4405F] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919039075048?text=Hello,%20I%20am%20interested%20in%20Orbit%20Engineering's%20services.%20Can%20you%20please%20tell%20me%20more%20about%20your%20work%20and%20how%20you%20can%20help%20me?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orbit Engineering on WhatsApp"
                className="text-gray-400 hover:text-[#25D366] transition-colors"
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
                  className="h-6 w-6"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                </svg>
              </a>
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
                    href="https://maps.google.com/?q=Flat+No.2,+Block+12,+Shalimar+Enclave,+E3+Arera+Colony,+Bhopal,+462016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block font-medium text-white group-hover:text-[#0073bc] transition-colors">Working Office:</span>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Flat No.2, Block 12, Shalimar Enclave,<br />E3 Arera Colony, Bhopal, 462016</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#0073bc] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <a
                    href="https://maps.google.com/?q=B-32/A+Priyadershini+Society,+Sant+Asharam+Nagar,+Bagsewaniya,+Bhopal+-+462043"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <span className="block font-medium text-white group-hover:text-[#0073bc] transition-colors">Head Office:</span>
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">B-32/A Priyadershini Society,<br />Sant Asharam Nagar, Bagsewaniya,<br />Bhopal - 462043</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#0073bc] flex-shrink-0" />
                <a href="tel:7024128029" className="text-sm hover:text-[#0073bc] transition-colors">+91 70241 28029</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#0073bc] flex-shrink-0" />
                <a href="mailto:info@orbitengineerings.com" className="text-sm text-gray-400 hover:text-[#0073bc] transition-colors">
                  info@orbitengineerings.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Monday - Saturday: 10:00 AM - 7:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <button onClick={() => onNavigate('home')} className="hover:text-[#0073bc] transition-colors">Orbit Engineering Group</button>. Established in <strong className="text-[#0073bc]">1998</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
