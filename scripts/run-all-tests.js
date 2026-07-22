import { spawn } from "child_process";

console.log("⚡ Starting Unified Verification & Performance Testing Suite...");

let nextProcess = null;

// Check if server is already running on port 3002
try {
  const checkRes = await fetch("http://localhost:3002/api/status");
  if (checkRes.ok) {
    console.log("📡 Active Next.js server detected on port 3002. Reusing instance...");
  }
} catch (e) {
  console.log("🚀 Starting Next.js production server on port 3002...");
  nextProcess = spawn("npx", ["next", "start", "-p", "3002"], {
    shell: true,
    cwd: process.cwd(),
    env: { ...process.env, PORT: "3002", TESTING: "true" }
  });

  nextProcess.stdout.on("data", (data) => console.log(`[Next.js stdout] ${data}`));
  nextProcess.stderr.on("data", (data) => console.error(`[Next.js stderr] ${data}`));
}

let testTimeout = setTimeout(() => {
  console.error("❌ Orchestrator timeout: Server did not respond.");
  if (nextProcess) nextProcess.kill("SIGTERM");
  process.exit(1);
}, 35000);

const runAll = async () => {
  try {
    // 1. Integration tests
    console.log("\n==================================================");
    console.log("PHASE 1: Run Integration Tests");
    console.log("==================================================");
    const { execSync } = await import("child_process");
    process.env.TEST_ORCHESTRATED = "true";
    execSync("node scripts/test-integration.js", { stdio: "inherit" });

    // 2. Security tests
    console.log("\n==================================================");
    console.log("PHASE 2: Run Security & RLS Tests");
    console.log("==================================================");
    execSync("node scripts/test-security.js", { stdio: "inherit" });

    // 3. Performance measurements
    console.log("\n==================================================");
    console.log("PHASE 3: Run Performance Profiler");
    console.log("==================================================");
    execSync("node scripts/measure-performance.js", { stdio: "inherit" });

    console.log("\n==================================================");
    console.log("🎉 All verification phases completed successfully!");
    console.log("==================================================");
    
    clearTimeout(testTimeout);
    if (nextProcess) nextProcess.kill("SIGTERM");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Test runner orchestration failed:", err.message);
    clearTimeout(testTimeout);
    if (nextProcess) nextProcess.kill("SIGTERM");
    process.exit(1);
  }
};

// Wait 6 seconds for Next.js to start before starting tests
setTimeout(runAll, 6000);
