/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { motion } from 'framer-motion';
import './FadeContent.css';

export default function FadeContent({
  children,
  className = "",
  delay = 0,
  duration = 0.5
}) {
  return (
    <motion.div
      className={`fade-content-container ${className}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
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
