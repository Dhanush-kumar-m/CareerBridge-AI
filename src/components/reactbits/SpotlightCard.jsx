/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import { useState } from 'react';
import './SpotlightCard.css';

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.15)",
  style = {}
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={`spotlight-card ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      {isFocused && (
        <div
          className="spotlight-layer"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(250px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
            zIndex: 0
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
