export default function TestCases({
  testCases,
}) {
  return (
    <div className="testcase-box">

      <div className="testcase-header">

        <h3>
          🧪 Sample Test Cases
        </h3>

        <span>
          {testCases.length} Cases
        </span>

      </div>

      <div className="testcase-list">

        {testCases.map(
          (tc, index) => (
            <div
              key={index}
              className="testcase-card"
            >

              <h4>
                Test Case {index + 1}
              </h4>

              <div className="testcase-grid">
                <div className="testcase-section">
                  <label>Input</label>
                  <pre>{tc.input}</pre>
                </div>
                <div className="testcase-section">
                  <label>Expected Output</label>
                  <pre>{tc.expected}</pre>
                </div>
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}