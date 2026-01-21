import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

type Props = {
  open: boolean;
  onClose: () => void;
  position?: string;
};

export default function ApplicationModal({ open, onClose, position }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) {
      setStatusMessage(null);
      setErrors({});
      setLoading(false);
      if (formRef.current) formRef.current.reset();
    }
  }, [open]);

  if (!open) return null;

  const validate = (form: HTMLFormElement) => {
    const nextErrors: Record<string, string> = {};
    const name = (form.elements.namedItem('fullName') as HTMLInputElement)?.value?.trim() ?? '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value?.trim() ?? '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value?.trim() ?? '';
    const resumeInput = form.elements.namedItem('resume') as HTMLInputElement | null;
    const resumeFile = resumeInput?.files?.[0] ?? null;

    if (!name) nextErrors.fullName = 'Please enter your full name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) nextErrors.email = 'A valid email address is required.';
    else if (!emailRegex.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (!phone) nextErrors.phone = 'Please enter your phone number.';
    else if (!/^\d+$/.test(phone)) nextErrors.phone = 'Phone number must contain only digits.';

    if (!resumeFile) nextErrors.resume = 'Resume file must be uploaded before submitting.';
    else {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedTypes.includes(resumeFile.type)) nextErrors.resume = 'Resume must be a PDF or DOC/DOCX file.';
      const maxBytes = 5 * 1024 * 1024; // 5MB
      if (resumeFile.size > maxBytes) nextErrors.resume = 'File size exceeds the 5MB limit.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    if (!formRef.current) return;
    const form = formRef.current;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage('Required fields missing — please fill all marked sections.');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatusMessage('Email sending is not configured. Please contact site admin.');
      return;
    }

    try {
      setLoading(true);
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setStatusMessage('✅ Your application has been submitted successfully. We will get back to you soon.');
      setErrors({});
      form.reset();
      setTimeout(() => {
        onClose();
        setStatusMessage(null);
      }, 3000);
    } catch (err: any) {
      console.error('EmailJS error', err);
      if (!navigator.onLine) setStatusMessage('Network error — please check your internet connection.');
      else if (err && err.status === 0) setStatusMessage('Email service not responding — try again later.');
      else if (err && err.text) setStatusMessage(`Email service error — ${err.text}`);
      else setStatusMessage('There was an error submitting your application. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-4 p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Apply for {position ?? 'this position'}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="position" value={position ?? ''} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-600">*</span></label>
            <input name="fullName" className="mt-1 block w-full border border-gray-200 rounded-lg p-2" aria-invalid={!!errors.fullName} />
            {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email ID <span className="text-red-600">*</span></label>
              <input name="email" type="email" className="mt-1 block w-full border border-gray-200 rounded-lg p-2" aria-invalid={!!errors.email} />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-600">*</span></label>
              <input name="phone" type="tel" inputMode="numeric" pattern="\d*" className="mt-1 block w-full border border-gray-200 rounded-lg p-2" aria-invalid={!!errors.phone} />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Resume (PDF/DOC) <span className="text-red-600">*</span></label>
            <input name="resume" type="file" accept=".pdf,.doc,.docx" className="mt-1 block w-full" aria-invalid={!!errors.resume} />
            {errors.resume && <p className="text-sm text-red-600 mt-1">{errors.resume}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message / Cover Letter (optional)</label>
            <textarea name="message" rows={4} className="mt-1 block w-full border border-gray-200 rounded-lg p-2" />
          </div>

          {statusMessage && (
            <div className={`text-sm text-center ${statusMessage.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>{statusMessage}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 bg-white">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-[#0073bc] text-white hover:bg-[#005a94]">
              {loading ? 'Sending...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
