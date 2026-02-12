import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, CheckCircle, Loader2, Building2, User, Mail, Phone } from 'lucide-react';

type Props = {
    open: boolean;
    onClose: () => void;
    brochureUrl: string;
};

export default function BrochureModal({ open, onClose, brochureUrl }: Props) {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (open) {
            setSubmitted(false);
            setLoading(false);
        }
    }, [open]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;
        setLoading(true);

        const formData = new FormData(formRef.current);

        try {
            // Using a generic Formspree endpoint or similar if you have one, 
            // otherwise using the same as QuoteModal or a placeholder.
            // For now, I'll use the same endpoint as QuoteModal but with a different subject.
            const response = await fetch("https://formspree.io/f/xeeoyary", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
                formRef.current.reset();

                // Trigger the download
                const link = document.createElement('a');
                link.href = brochureUrl;
                link.download = 'Orbit_Brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    onClose();
                }, 4000);
            } else {
                alert("There was a problem sending your request. Please try again.");
            }
        } catch (error) {
            alert("There was a network error. Please try again.");
        } finally {
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
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] border border-gray-100"
                >
                    <div className="bg-gradient-to-r from-[#0073bc] to-[#005a94] px-8 py-6 flex justify-between items-center text-white">
                        <div>
                            <h3 className="text-2xl font-bold">Download Brochure</h3>
                            <p className="text-blue-100 text-sm mt-1">Please provide your details to get the PDF.</p>
                        </div>
                        <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-xl transition-all active:scale-90">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="p-8">
                        {submitted ? (
                            <div className="text-center py-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <CheckCircle className="h-10 w-10" />
                                </motion.div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-3">Submission Successful!</h4>
                                <p className="text-gray-600 mb-6">Your brochure download has started. We've also received your details.</p>
                                <div className="text-sm text-gray-400">Closing in a few seconds...</div>
                            </div>
                        ) : (
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                                <input type="hidden" name="_subject" value="Brochure Download Lead" />

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                            <User className="w-4 h-4 mr-2 text-[#0073bc]" />
                                            Full Name *
                                        </label>
                                        <input
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
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                required
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="flex items-center text-sm font-semibold text-gray-700 mb-1.5">
                                                <Building2 className="w-4 h-4 mr-2 text-[#0073bc]" />
                                                Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="company"
                                                id="company"
                                                required
                                                placeholder="Acme Corp"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073bc] focus:bg-white focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

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

                                <p className="text-xs text-center text-gray-500 mt-4">
                                    By clicking download, you agree to our privacy policy.
                                </p>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
