import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadConsentFields from './LeadConsentFields';
import { submitLead } from '../lib/leadSubmission';

type Props = {
    open: boolean;
    onClose: () => void;
    productName?: string;
};

export default function QuoteModal({ open, onClose, productName }: Props) {
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
            await submitLead(new FormData(form), 'quote', window.location.pathname);
            setSubmitted(true);
            form.reset();
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
                    className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quote-title"
                >
                    <div className="bg-[#0073bc] px-6 py-4 flex justify-between items-center text-white">
                        <h3 id="quote-title" className="text-xl font-bold">Get a Quote</h3>
                        <button onClick={onClose} disabled={loading} aria-label="Close quotation request" className="hover:bg-white/20 p-1 rounded-full transition-colors disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6">
                        {submitted ? (
                            <div role="status" className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                                <p className="text-gray-600">We have received your request and will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} aria-busy={loading} className="space-y-4">
                                {/* Hidden Subject Field for Formspree */}
                                <input type="hidden" name="_subject" value={`New Quote Request: ${productName}`} />

                                <div>
                                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Interested In</label>
                                    <input
                                        disabled={loading}
                                        type="text"
                                        name="productName"
                                        id="productName"
                                        defaultValue={productName}
                                        readOnly
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        disabled={loading}
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input
                                            disabled={loading}
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (optional)</label>
                                        <input
                                            disabled={loading}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            placeholder="+91 98765 43210"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        disabled={loading}
                                        name="message"
                                        id="message"
                                        rows={3}
                                        placeholder="I would like to know more about pricing and specifications..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0073bc] focus:border-transparent outline-none transition-all resize-none"
                                    ></textarea>
                                </div>

                                <LeadConsentFields formType="quote" disabled={loading} />
                                {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#0073bc] text-white py-3 rounded-lg font-bold hover:bg-[#005a94] transition-colors shadow-lg shadow-blue-900/10 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <span>Request Quote</span>
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
