import { X, FileText } from 'lucide-react';

interface IsoCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCertId?: '9001' | '14001' | '45001';
}

export default function IsoCertificateModal({ isOpen, onClose }: IsoCertificateModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/80 p-4" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="certification-information-title" className="relative w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close certification information" className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        <FileText className="mb-4 h-8 w-8 text-[#0073bc]" />
        <h2 id="certification-information-title" className="mb-4 text-2xl font-bold text-gray-900">Certification information</h2>
        <p className="mb-4 text-gray-600">For a project requiring a particular certification, ask our team for the current certificate and its applicable holder, scope, locations and validity before relying on it.</p>
        <p className="mb-6 text-sm text-gray-600">This website does not provide a certificate or independently verify certification status. Product approvals and test reports depend on the selected model and project requirements.</p>
        <a href="mailto:info@orbitengineerings.com?subject=Certification%20documentation%20request" className="inline-block rounded-full bg-[#0073bc] px-5 py-3 font-semibold text-white">Request documentation</a>
      </section>
    </div>
  );
}
