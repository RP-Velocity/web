#!/usr/bin/env node
/**
 * Generates public/adatvedelmi-tajekoztato.pdf from the /adatvedelem page.
 * Uses headless Chrome when available; starts Next.js unless SKIP_SERVER=1.
 */
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const port = process.env.PORT || "3000";
const baseUrl = `http://127.0.0.1:${port}`;
const outputPath = path.join(root, "public", "adatvedelmi-tajekoztato.pdf");

const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
];

async function resolveChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }
  throw new Error("Headless Chrome not found. Install Chrome or set CHROME_PATH.");
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server not reachable at ${url}`);
}

async function main() {
  const chrome = process.env.CHROME_PATH || (await resolveChrome());
  await mkdir(path.join(root, "public"), { recursive: true });

  let server;
  if (process.env.SKIP_SERVER !== "1") {
    server = spawn("npm", ["run", "start", "--", "-p", port], {
      cwd: root,
      stdio: "ignore",
      env: { ...process.env, PORT: port },
    });
  }
  await waitForServer(baseUrl);

  await new Promise((resolve, reject) => {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=5000",
      `--print-to-pdf=${outputPath}`,
      `${baseUrl}/adatvedelem`,
    ];
    const proc = spawn(chrome, args, { stdio: "inherit" });
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Chrome exited with code ${code}`));
    });
  });

  console.log(`PDF written to ${outputPath}`);
  if (server) server.kill("SIGTERM");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
