import { spawn } from "child_process";
import assert from "assert";

console.log("🚀 Starting Next.js production server on port 3002...");

const nextProcess = spawn("npx", ["next", "start", "-p", "3002"], {
  shell: true,
  env: { ...process.env, PORT: "3002", TESTING: "true" }
});

nextProcess.stdout.on("data", (data) => console.log(`[Next.js stdout] ${data}`));
nextProcess.stderr.on("data", (data) => console.error(`[Next.js stderr] ${data}`));

let testTimeout = setTimeout(() => {
  console.error("❌ Server startup timeout.");
  nextProcess.kill("SIGTERM");
  process.exit(1);
}, 30000); // 30 seconds timeout limit

const runTests = async () => {
  try {
    console.log("📡 Querying /api/status...");
    const statusRes = await fetch("http://localhost:3002/api/status");
    const statusData = await statusRes.json();
    console.log("Status Response:", statusData);
    
    assert.strictEqual(statusRes.status, 200);
    assert.strictEqual(statusData.status, "active");
    assert.ok(statusData.version);
    
    console.log("📡 Querying /api/health...");
    const healthRes = await fetch("http://localhost:3002/api/health");
    console.log("Health Response Status:", healthRes.status);
    
    assert.ok([200, 503].includes(healthRes.status));

    console.log("🎉 All integration tests passed successfully!");
    clearTimeout(testTimeout);
    nextProcess.kill("SIGTERM");
    process.exit(0);
  } catch (err) {
    console.error("❌ Integration test failed:", err.message);
    clearTimeout(testTimeout);
    nextProcess.kill("SIGTERM");
    process.exit(1);
  }
};

// Wait 12 seconds for Next.js to fully start up before sending requests
setTimeout(runTests, 12000);
