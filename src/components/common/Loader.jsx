"use client";

export default function Loader({
  text = "Loading..."
}) {
  return (
    <div className="loader-container">

      <div className="loader-spinner"></div>

      <h3>
        Please Wait
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}