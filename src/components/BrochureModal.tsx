import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, CheckCircle, Loader2, Building2, User, Mail, Phone } from 'lucide-react';
import LeadConsentFields from './LeadConsentFields';
import { submitLead } from '../lib/leadSubmission';

type Props = {
    open: boolean;
    onClose: () => void;
    brochureUrl: string;
};

export default function BrochureModal({ open, onClose, brochureUrl }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const pending = useRef(false);

    useEffect(() => {
        if (open && !pending.current) {
            setSubmitted(false);
            setLoading(false);
            setError('');
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current || pending.current) return;
        const form = formRef.current;
        pending.current = true;
        setLoading(true);
        setError('');

        try {
            await submitLead(new FormData(form), 'brochure', window.location.pathname);
            setSubmitted(true);
            form.reset();
            const link = document.createElement('a');
            link.href = brochureUrl;
            link.download = 'Orbit_Brochure.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Your request could not be sent. Please try again.');
        } finally {
            pending.current = false;
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => { if (!pending.current) onClose(); }}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] border border-gray-100"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="brochure-title"
                >
                    <div className="bg-gradient-to-r from-[#0073bc] to-[#005a94] px-8 py-6 flex justify-between items-center text-white">
                        <div>
                            <h3 id="brochure-title" className="text-2xl font-bold">Download Brochure</h3>
                            <p className="text-blue-100 text-sm mt-1">Please provide your details to get the PDF.</p>
                        </div>
                        <button onClick={onClose} disabled={loading} aria-label="Close brochure request" className="hover:bg-white/20 p-2 rounded-xl transition-all active:scale-90 disabled:opacity-50">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-8">
                        {submitted ? (
                            <div role="status" className="text-center py-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="h-10 w-10" />
                                </motion.div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Submission Successful!</h4>
                                <p className="text-gray-600 mb-6">Your request was accepted. Your browser should start the brochure download.</p>
                                <a href={brochureUrl} download="Orbit_Brochure.pdf" className="font-semibold text-[#0073bc] underline">Download the brochure if it did not start</a>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} aria-busy={loading} className="space-y-5">
                                <input type="hidden" name="_subject" value="Brochure Download Lead" />

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                            <User className="w-4 h-4 mr-2 text-[#0073bc]" />
                                            Full Name *
                                        </label>
                                        <input
                                            disabled={loading}
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                            <Mail className="w-4 h-4 mr-2 text-[#0073bc]" />
                                            Email Address *
                                        </label>
                                        <input
                                            disabled={loading}
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder="john@company.com"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                                <Phone className="w-4 h-4 mr-2 text-[#0073bc]" />
                                                Phone Number (optional)
                                            </label>
                                            <input
                                                disabled={loading}
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                                <Building2 className="w-4 h-4 mr-2 text-[#0073bc]" />
                                                Company Name (optional)
                                            </label>
                                            <input
                                                disabled={loading}
                                                type="text"
                                                name="company"
                                                id="company"
                                                placeholder="Acme Corp"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <LeadConsentFields formType="brochure" disabled={loading} />
                                {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#0073bc] text-white py-4 rounded-xl font-bold hover:bg-[#005a94] transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 mt-4"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin h-5 w-5" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-5 h-5" />
                                            <span>Submit & Download</span>
                                        </>
                                    )}
                                </button>

                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
