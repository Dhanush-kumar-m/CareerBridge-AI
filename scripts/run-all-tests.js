import { spawn } from "child_process";

console.log("⚡ Starting Unified Verification & Performance Testing Suite...");

const nextProcess = spawn("npx", ["next", "start", "-p", "3002"], {
  shell: true,
  env: { ...process.env, PORT: "3002", TESTING: "true" }
});

let testTimeout = setTimeout(() => {
  console.error("❌ Orchestrator timeout: Server did not respond.");
  nextProcess.kill("SIGTERM");
  process.exit(1);
}, 30000); // 30 seconds limit

const runAll = async () => {
  try {
    // 1. Integration tests
    console.log("\n==================================================");
    console.log("PHASE 1: Run Integration Tests");
    console.log("==================================================");
    const { execSync } = await import("child_process");
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
    nextProcess.kill("SIGTERM");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Test runner orchestration failed:", err.message);
    clearTimeout(testTimeout);
    nextProcess.kill("SIGTERM");
    process.exit(1);
  }
};

// Wait 6 seconds for Next.js to start before starting tests
setTimeout(runAll, 6000);
