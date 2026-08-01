# Juwelier C. Rehn website

Production-ready static website source is in `site/`. No build framework or runtime package installation is required. The supplied eight-second H.264 film uses native browser decoding for smooth playback, plays once, exposes no player controls, and never loops. Phones use a feathered contain treatment that keeps both rings visible without magnification or a hard media boundary. Two supplied editorial photographs and twelve watch-brand marks are included.

## Local preview

From the project root:

```powershell
python -m http.server 4173 --directory site
```

Open `http://127.0.0.1:4173/` for normal one-shot playback. Deterministic review positions use `?jump=<scrollY>`, for example:

```text
http://127.0.0.1:4173/?jump=4050
```

## Production build

The `site/` directory is the static production artifact. It contains HTML, CSS, JavaScript, locally vendored animation libraries and fonts, official logo, favicon, supplied brand marks, optimized editorial imagery, and the native source film. Raw supplied assets and verification files remain outside that directory.

Run these checks before publication:

```powershell
node C:\Users\Reyan\.codex\skills\scroll-film-studio\scripts\copy-gate.js site\index.html
$env:NODE_PATH='C:\Users\Reyan\.codex\skills\scroll-film-studio\scripts\node_modules'
node scripts\verify_runtime.js http://127.0.0.1:4173/?jump=0
node C:\Users\Reyan\.codex\skills\scroll-film-studio\scripts\verify.js jank http://127.0.0.1:4173/?jump=0
```

## Deployment

No public deployment was performed. The `site/` directory can be deployed to the business's own static host or Vercel project.

## Production decisions still requiring the business

- Confirm whether the appointment form should remain an email-client handoff or connect to an approved server-side form endpoint.
- Supply verified official social links if they should appear.
- Supply a preferred verified map destination if a direct map link should be added.

The footer links to the existing official Impressum and Datenschutz pages rather than copying or inventing legal text.
