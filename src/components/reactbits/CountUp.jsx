/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './CountUp.css';

export default function CountUp({
  to = 0,
  duration = 2,
  className = ""
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [value, setValue] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    let hasStarted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStarted) {
        hasStarted = true;
        animate(count, to, { duration, ease: "easeOut" });
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [to, duration, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setValue(latest.toLocaleString());
    });
  }, [rounded]);

  return (
    <span ref={ref} className={`count-up-value ${className}`}>
      {value}
    </span>
  );
}
