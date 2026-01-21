import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Orbit logo_1.png';

interface LogoLoaderProps {
    isVisible: boolean;
}

/**
 * LogoLoader: Premium 3D Cinematic Animation.
 * 
 * Features:
 * 1. 3D Perspective tumble and spin.
 * 2. Dynamic lighting 'shine' that passes over the logo.
 * 3. Reactive depth shadow.
 * 4. Ambient space particles.
 */
export default function LogoLoader({ isVisible }: LogoLoaderProps) {
    const DURATION = 2.8;

    // Memoize particles to prevent re-calculating random positions on every render
    const particles = useMemo(() => {
        return [...Array(15)].map((_, i) => ({
            id: i,
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617] overflow-hidden"
                    style={{ willChange: 'opacity, transform' }}
                >
                    {/* Background Depth: Moving Stars/Particles */}
                    <div className="absolute inset-0 z-0">
                        {particles.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute bg-blue-400 rounded-full"
                                style={{
                                    width: p.width,
                                    height: p.height,
                                    left: p.left,
                                    top: p.top,
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scale: [0, 1.5, 0],
                                    z: [0, 100]
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Ambient Radial Fog */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.15)_0%,transparent_70%)]" />

                    <div className="relative w-80 h-80 flex items-center justify-center perspective-[1200px]">

                        {/* 1. Dynamic 3D Shadow (Reacts to tumble) */}
                        <motion.div
                            className="absolute w-40 h-10 bg-black/40 rounded-[100%] blur-2xl top-[90%]"
                            animate={{
                                scale: [1, 1.2, 0.9, 1],
                                opacity: [0.3, 0.5, 0.3, 0.3],
                                x: [0, 10, -10, 0]
                            }}
                            transition={{ duration: DURATION, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* 2. THE 3D LOGO CONTAINER */}
                        <motion.div
                            initial={{ rotateY: 0, rotateX: 0, scale: 0.8, opacity: 0 }}
                            animate={{
                                rotateY: [0, 360],
                                rotateX: [10, -10, 10],
                                scale: [0.8, 1, 0.9, 1],
                                opacity: 1
                            }}
                            transition={{
                                rotateY: { duration: DURATION, ease: "easeInOut", repeat: Infinity },
                                rotateX: { duration: DURATION * 1.5, ease: "easeInOut", repeat: Infinity },
                                scale: { duration: DURATION, ease: "easeInOut", repeat: Infinity },
                                opacity: { duration: 0.5 }
                            }}
                            className="relative w-full h-full preserve-3d"
                        >
                            {/* Logo Image */}
                            <img
                                src={logo}
                                alt="Orbit 3D Logo"
                                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(59,130,246,0.3)] brightness-110"
                            />

                            {/* Lighting Overlay: The 'Shine' Sweep */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{
                                    background: [
                                        'linear-gradient(110deg, transparent 0%, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%, transparent 100%)',
                                        'linear-gradient(110deg, transparent 100%, transparent 100%)' // reset
                                    ],
                                    backgroundPosition: ['-200% 0%', '200% 0%']
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    mixBlendMode: 'overlay',
                                    maskImage: `url(${logo})`,
                                    WebkitMaskImage: `url(${logo})`,
                                    maskSize: 'contain',
                                    WebkitMaskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskPosition: 'center'
                                }}
                            />
                        </motion.div>

                        {/* 3. Outer Energy Spheres (Floating detail) */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-blue-300 rounded-full blur-[1px] z-50"
                                animate={{
                                    rotate: 360,
                                    x: [Math.cos(i) * 120, Math.cos(i + 2) * 120],
                                    y: [Math.sin(i) * 120, Math.sin(i + 2) * 120],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
