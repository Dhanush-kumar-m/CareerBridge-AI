import { motion } from 'framer-motion';
import './SplitText.css';

export default function SplitText({
  text = "",
  className = "",
  delay = 0,
  animationDelay = 0.05
}) {
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

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
