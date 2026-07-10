/* OFFICIAL REACT BITS CODE PLACEHOLDER - PASTE THE OFFICIAL JAVASCRIPT+CSS VARIANT HERE */
import React from 'react';
import './ScrollStack.css';

export default function ScrollStack({
  children,
  className = ""
}) {
  return (
    <div className={`scroll-stack-container ${className}`}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            position: 'sticky',
            top: `${120 + idx * 30}px`,
            zIndex: idx + 1
          },
          className: `${child.props.className || ''} scroll-stack-card`
        });
      })}
    </div>
  );
}
