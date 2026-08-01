#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const sampleOnly = process.argv.includes("--sample");
const outRoot = path.join(root, sampleOnly ? "verification/frame-samples" : "site/assets/film-frames");
const desktopSource = path.join(root, "site/assets/rings-film-desktop-smooth.mp4");
const mobileSource = path.join(root, "site/assets/rings-film-mobile-smooth.mp4");
const desktopDir = path.join(outRoot, "desktop");
const mobileDir = path.join(outRoot, "mobile");
const localInstaller = path.join(root, ".codex-tools/node_modules/@ffmpeg-installer/ffmpeg");

function findFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try { return require(localInstaller).path; } catch (_) { return "ffmpeg"; }
}

const ffmpeg = findFfmpeg();

function run(args) {
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (result.error) {
    throw new Error(`FFmpeg is required to extract the film frames. Set FFMPEG_PATH to its executable. (${result.error.message})`);
  }
  if (result.status !== 0) process.exit(result.status || 1);
}

fs.mkdirSync(desktopDir, { recursive: true });
fs.mkdirSync(mobileDir, { recursive: true });

const common = ["-hide_banner", "-loglevel", "error", "-y"];

if (sampleOnly) {
  [0, 2.72, 5.44, 7.96].forEach((time, index) => {
    const number = String(index + 1).padStart(4, "0");
    run([...common, "-ss", String(time), "-i", desktopSource, "-frames:v", "1", "-vf", "scale=1600:900:flags=lanczos", "-c:v", "libwebp", "-quality", "90", path.join(desktopDir, `f_${number}.webp`)]);
    run([...common, "-ss", String(time), "-i", mobileSource, "-frames:v", "1", "-vf", "scale=900:900:flags=lanczos", "-c:v", "libwebp", "-quality", "90", path.join(mobileDir, `f_${number}.webp`)]);
  });
} else {
  run([...common, "-i", desktopSource, "-vf", "fps=24,scale=1600:900:flags=lanczos", "-frames:v", "220", "-c:v", "libwebp", "-quality", "90", path.join(desktopDir, "f_%04d.webp")]);
  run([...common, "-i", mobileSource, "-vf", "fps=24,scale=900:900:flags=lanczos", "-frames:v", "220", "-c:v", "libwebp", "-quality", "90", path.join(mobileDir, "f_%04d.webp")]);
}

console.log(JSON.stringify({
  sampleOnly,
  frameCount: sampleOnly ? 4 : 220,
  desktop: "1600x900",
  mobile: "900x900",
  source: { desktop: desktopSource, mobile: mobileSource },
  outRoot
}, null, 2));
