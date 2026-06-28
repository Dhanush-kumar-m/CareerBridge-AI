export default function OutputPanel({
  output,
}) {
  return (
    <div className="output-panel">

      <div className="output-header">

        <div className="terminal-controls">

          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>

        </div>

        <h3>
          🖥 Output Console
        </h3>

      </div>

      <div className="output-content">

        {output ? (
          <pre>
            {output}
          </pre>
        ) : (
          <div className="empty-output">

            <p>
              ▶ Run your code to see output here...
            </p>

          </div>
        )}

      </div>

    </div>
  );
}