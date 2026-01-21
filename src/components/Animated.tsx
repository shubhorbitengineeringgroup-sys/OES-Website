import React from 'react';
import { motion, Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
};

export const fadeScale: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
};

export const staggerContainer: (stagger?: number) => Variants = (stagger = 0.06) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } }
});

type MotionProps = React.ComponentProps<typeof motion.div> & { children?: React.ReactNode };

export const MotionFadeUp: React.FC<MotionProps> = ({ children, className, ...rest }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeUp}
    className={className}
    style={{ willChange: 'opacity, transform' }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const MotionScaleIn: React.FC<MotionProps> = ({ children, className, ...rest }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={scaleIn}
    className={className}
    style={{ willChange: 'opacity, transform' }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const MotionFadeScale: React.FC<MotionProps> = ({ children, className, ...rest }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeScale}
    className={className}
    style={{ willChange: 'opacity, transform' }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const MotionStagger: React.FC<MotionProps & { stagger?: number }> = ({ children, className, stagger = 0.06, ...rest }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={staggerContainer(stagger)}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const AnimatedHeading: React.FC<{
  level?: 1 | 2 | 3;
  className?: string;
  children?: React.ReactNode;
}> = ({ level = 2, className = '', children }) => {
  const Tag = `h${level}` as any;
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
};

export default MotionFadeUp;
