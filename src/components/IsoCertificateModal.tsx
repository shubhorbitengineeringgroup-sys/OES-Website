import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ShieldCheck, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';

interface IsoCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCertId?: '9001' | '14001' | '45001';
}

const CERTS = [
  {
    id: '9001',
    title: 'ISO 9001:2015',
    name: 'Quality Management System (QMS)',
    certNo: '26/Q/MSO07201',
    color: 'blue',
    bgGradient: 'from-blue-600 to-indigo-700',
    accentColor: '#3b82f6',
    issued: '20/07/2026',
    expiry: '19/07/2029',
    description: 'Assessed and compliant for Quality Management Systems in design, manufacturing, and staging of water automation and IoT equipment.',
    highlights: ['Strict Process Quality Control', 'Turnkey Staging Verification', 'Continuous Improvement Framework']
  },
  {
    id: '14001',
    title: 'ISO 14001:2015',
    name: 'Environmental Management System (EMS)',
    certNo: '26/E/MSE07202',
    color: 'emerald',
    bgGradient: 'from-emerald-600 to-teal-700',
    accentColor: '#10b981',
    issued: '20/07/2026',
    expiry: '19/07/2029',
    description: 'Certified for environmentally responsible manufacturing, waste reduction, and eco-friendly solar water treatment solutions.',
    highlights: ['Sustainable Manufacturing', 'Eco-friendly Product Lifecycle', 'Zero Hazardous Contamination']
  },
  {
    id: '45001',
    title: 'ISO 45001:2018',
    name: 'Occupational Health & Safety (OH&S)',
    certNo: '26/O/MSS07203',
    color: 'purple',
    bgGradient: 'from-purple-600 to-violet-800',
    accentColor: '#8b5cf6',
    issued: '20/07/2026',
    expiry: '19/07/2029',
    description: 'Certified for workforce safety management, zero-hazard workplace practices, and safety during field commissioning.',
    highlights: ['Workforce Hazard Reduction', 'Strict On-site Safety Standards', 'Certified Field Commissioning']
  }
];

export default function IsoCertificateModal({ isOpen, onClose, defaultCertId = '9001' }: IsoCertificateModalProps) {
  const [selectedId, setSelectedId] = useState<'9001' | '14001' | '45001'>(defaultCertId);

  if (!isOpen) return null;

  const currentCert = CERTS.find(c => c.id === selectedId) || CERTS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-gray-300 hover:text-white transition-all shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="p-6 sm:p-8 bg-slate-950 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 border border-blue-400/20 px-3 py-1 rounded-full">
                OFFICIAL ACCREDITATION
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
                TCS-UK (UKAF Accredited)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-400" />
              Orbit Engineering Solutions — Triple ISO Certification
            </h2>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-wider shadow-inner">
              <span className="text-blue-400 font-extrabold">Certified Scope:</span>
              <span className="text-white font-black">MANUFACTURER OF AUTOMATION AND IOT EQUIPMENTS</span>
            </div>

            {/* Cert Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
              {CERTS.map((cert) => {
                const isActive = cert.id === selectedId;
                return (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedId(cert.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{cert.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body - Certificate View */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gradient-to-b from-slate-900 to-slate-950">
            {/* Left: Certificate Visual Preview Box */}
            <div className="relative rounded-2xl bg-slate-950 p-6 border border-slate-800 shadow-xl overflow-hidden group">
              <div className={`absolute top-0 right-0 left-0 h-2 bg-gradient-to-r ${currentCert.bgGradient}`} />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 block uppercase tracking-wider">CERTIFICATE NO.</span>
                  <span className="text-lg font-mono font-bold text-blue-300">{currentCert.certNo}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                  TCS
                </div>
              </div>

              <div className="space-y-4 my-6">
                <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-bold uppercase border border-blue-500/20">
                  {currentCert.title}
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">{currentCert.name}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Certified for <strong className="text-slate-200">M/S ORBIT ENGINEERING SOLUTIONS</strong><br />
                  GF, E-45, Pride City, Katara Hills, Bhopal - 462043 MP, India.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">ISSUANCE DATE</span>
                  <span className="text-slate-300 font-semibold">{currentCert.issued}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">EXPIRY DATE</span>
                  <span className="text-slate-300 font-semibold">{currentCert.expiry}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between items-center">
                <span>Verified Body: www.timescert.co.uk</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              </div>
            </div>

            {/* Right: Technical Details & Highlights */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" /> Key Standard Framework
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                  {currentCert.description}
                </p>
              </div>

              <div className="space-y-2.5">
                {currentCert.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-200">{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-3">
                <a
                  href="http://www.timescert.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <span>Verify Online at timescert.co.uk</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>Times Certification Services UK Ltd. (Regd Office: 71-75 Shelton Street, Covent Garden, London, UK)</span>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white font-bold underline text-xs"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
