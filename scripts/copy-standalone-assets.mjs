import { cpSync, existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const standaloneDir = resolve(projectRoot, ".next", "standalone");
const staticSource = resolve(projectRoot, ".next", "static");
const staticTarget = resolve(standaloneDir, ".next", "static");
const publicSource = resolve(projectRoot, "public");
const publicTarget = resolve(standaloneDir, "public");

if (!existsSync(standaloneDir)) {
  throw new Error("Next.js standalone output was not found at .next/standalone");
}

mkdirSync(resolve(standaloneDir, ".next"), { recursive: true });
cpSync(staticSource, staticTarget, { recursive: true, force: true });
cpSync(publicSource, publicTarget, { recursive: true, force: true });

console.log("Copied .next/static and public into .next/standalone");
