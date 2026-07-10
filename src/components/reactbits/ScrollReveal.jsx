/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { motion } from 'framer-motion';
import './ScrollReveal.css';

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6
}) {
  return (
    <motion.div
      className={`scroll-reveal-container ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
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
