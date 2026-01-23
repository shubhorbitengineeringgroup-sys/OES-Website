import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import images
import heroBg from '../assets/products/hero-bg.jpg';
import solar from '../assets/Solar_.jpg';
import transformer from '../assets/transformer_.jpg';
import wtp1 from '../assets/wtp_hero.jpeg';
import wtp2 from '../assets/wtp__.jpg';

const images = [heroBg, solar, transformer, wtp1, wtp2];

export default function HeroBackgroundSlider() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Auto-play interval (3-5 seconds)
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            {/* Images with Fade Transition */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }} // Smooth Cross-Fade
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${images[index]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: 'auto',
                        filter: 'brightness(0.9) contrast(1.1)' // Vibrant Image Scaling
                    }}
                />
            </AnimatePresence>

            {/* Subtle Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent z-10" />
        </div>
    );
}
