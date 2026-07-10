/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { motion } from 'framer-motion';
import './ScrollFloat.css';

export default function ScrollFloat({
  children,
  className = "",
  delay = 0,
  duration = 0.8
}) {
  return (
    <motion.div
      className={`scroll-float-container ${className}`}
      initial={{ opacity: 0.1, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
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
