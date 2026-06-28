"use client";

import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-box"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="modal-header">

          <h2>
            {title}
          </h2>

          <button
            onClick={onClose}
            className="close-btn"
          >
            ✕
          </button>

        </div>

        <div className="modal-body">

          {children}

        </div>

      </div>

    </div>
  );
}