/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { motion } from 'framer-motion';
import './SplitText.css';

export default function SplitText({
  text = "",
  className = "",
  delay = 0,
  animationDelay = 0.05
}) {
  const words = text.split(" ");
  return (
    <span className={`split-text-container ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="split-text-word" style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: delay + (wordIdx * 0.1) + (charIdx * animationDelay),
                ease: "easeOut"
              }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
