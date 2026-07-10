/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { motion } from 'framer-motion';
import './AnimatedContent.css';

export default function AnimatedContent({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  yOffset = 25
}) {
  return (
    <motion.div
      className={`animated-content-container ${className}`}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
