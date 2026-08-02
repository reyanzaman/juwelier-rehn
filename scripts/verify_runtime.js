#!/usr/bin/env node
const puppeteer = require("puppeteer-core");

const url = process.argv[2] || "http://127.0.0.1:4173/?jump=0";
const chrome = process.env.CHROME_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function inspect(browser, width, height, reducedMotion = false) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  if (reducedMotion) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  }
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction("window.__ready === true", { timeout: 15000 });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const state = await page.evaluate(() => {
    const canvas = document.querySelector("#film-canvas");
    const hero = document.querySelector("#hero-title").getBoundingClientRect();
    const doc = document.documentElement;
    const textOverflow = [...document.querySelectorAll("h1,h2,h3,.service-title,.configurator-links strong")]
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => element.textContent.trim().slice(0, 60));
    const clippedDisplay = [...document.querySelectorAll(".hero-line,.editorial-bridge span")]
      .filter((element) => getComputedStyle(element).overflow === "hidden")
      .map((element) => element.textContent.trim());
    return {
      ready: window.__ready,
      lang: document.documentElement.lang,
      film: window.__filmState(),
      canvas: {
        opacity: getComputedStyle(canvas).opacity,
        display: getComputedStyle(canvas).display,
        width: canvas.width,
        height: canvas.height,
        frame: Number(canvas.dataset.frame),
        targetFrame: Number(canvas.dataset.targetFrame)
      },
      videoCount: document.querySelectorAll("video").length,
      overflowX: doc.scrollWidth > doc.clientWidth,
      textOverflow,
      clippedDisplay,
      heroInsideViewport: hero.left >= 0 && hero.right <= doc.clientWidth && hero.top >= 0,
      firstServiceExpanded: document.querySelector(".service-trigger").getAttribute("aria-expanded")
      ,brandLogos: [...document.querySelectorAll('.watch-brand:not([aria-hidden="true"]) img')].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
      ,brandClones: document.querySelectorAll('.watch-brand[aria-hidden="true"]').length
      ,brandAnimation: getComputedStyle(document.querySelector('.brand-grid')).animationName
      ,brandDisplay: getComputedStyle(document.querySelector('.brand-grid')).display
      ,storyImages: [...document.querySelectorAll(".story-media img")].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
      ,storyButtons: document.querySelectorAll(".story-toggle").length
      ,scrollTriggers: window.ScrollTrigger?.getAll?.().length || 0
      ,visibleNumbers: [...document.querySelectorAll(".section-index,.service-number,.materials-list>div>span,.consultation-topics li>span,.configurator-links a>span")].some((element) => getComputedStyle(element).display !== "none")
      ,mobileDockDisplay: document.querySelector(".mobile-dock") ? getComputedStyle(document.querySelector(".mobile-dock")).display : "absent"
      ,mobileHeroButtons: document.querySelector('.hero-buttons') ? getComputedStyle(document.querySelector('.hero-buttons')).display : "absent"
      ,mobileHeroSupport: getComputedStyle(document.querySelector('.hero-support')).display
      ,bridgeRings: document.querySelectorAll('.bridge-rings').length
      ,openServiceBackground: getComputedStyle(document.querySelector('.service-rows article.is-open')).backgroundColor
    };
  });
  for (const selector of [".story-jewelry", ".story-watch"]) {
    await page.evaluate((target) => document.querySelector(target).scrollIntoView(), selector);
    await page.waitForFunction(
      (target) => {
        const image = document.querySelector(`${target} img`);
        return image.complete && image.naturalWidth > 0;
      },
      { timeout: 10000 },
      selector
    );
  }
  await page.evaluate(() => document.querySelectorAll(".watch-brand img").forEach((image) => { image.loading = "eager"; }));
  await page.evaluate(() => document.querySelector("#marken").scrollIntoView());
  await page.waitForFunction(
    "[...document.querySelectorAll('.watch-brand img')].every((image) => image.complete && image.naturalWidth > 0)",
    { timeout: 10000 }
  );
  state.brandLogos = await page.evaluate(() =>
    [...document.querySelectorAll('.watch-brand:not([aria-hidden="true"]) img')].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
  );
  state.storyImages = await page.evaluate(() =>
    [...document.querySelectorAll(".story-media img")].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
  );
  const storyMotion = [];
  for (const selector of [".story-jewelry", ".story-watch"]) {
    const sectionTop = await page.$eval(selector, (section) => scrollY + section.getBoundingClientRect().top);
    await page.evaluate((y) => scrollTo(0, y), sectionTop - height * .2);
    await new Promise((resolve) => setTimeout(resolve, 60));
    const before = await page.$eval(`${selector} .story-media img`, (image) => getComputedStyle(image).transform);
    await page.evaluate((y) => scrollTo(0, y), sectionTop + height * .45);
    await new Promise((resolve) => setTimeout(resolve, 60));
    const after = await page.$eval(`${selector} .story-media img`, (image) => getComputedStyle(image).transform);
    storyMotion.push({ selector, before, after });
  }
  await page.evaluate(() => document.querySelector("#leistungen").scrollIntoView());
  await new Promise((resolve) => setTimeout(resolve, 100));
  const activeNavigation = await page.evaluate(() => document.querySelector(".desktop-nav a.is-active")?.getAttribute("href") || "");
  assert(state.ready, `${width}x${height}: ready gate did not fire`);
  assert(!state.overflowX, `${width}x${height}: horizontal overflow`);
  assert(state.textOverflow.length === 0, `${width}x${height}: text overflow: ${state.textOverflow.join(", ")}`);
  assert(state.clippedDisplay.length === 0, `${width}x${height}: display text uses hidden overflow`);
  assert(state.heroInsideViewport, `${width}x${height}: hero copy leaves viewport`);
  assert(state.film.mode === "scroll-frame-canvas", `${width}x${height}: scroll film engine did not initialize`);
  assert(state.film.ready && state.canvas.width > 0 && state.canvas.height > 0 && Number(state.canvas.opacity) > .9, `${width}x${height}: film canvas is not ready and visible`);
  assert(state.canvas.display === "block", `${width}x${height}: film canvas is hidden`);
  assert(state.videoCount === 0, `${width}x${height}: autoplay video element is still present`);
  if (reducedMotion) assert(state.film.targetFrame === 0 && state.canvas.targetFrame === 0, `${width}x${height}: reduced-motion film should remain on its opening frame`);
  assert(state.firstServiceExpanded === "true", `${width}x${height}: service accordion initial state invalid`);
  assert(state.brandLogos.length === 12, `${width}x${height}: expected 12 watch-brand logos`);
  assert(state.brandLogos.every((logo) => logo.alt), `${width}x${height}: a watch-brand logo is missing alternative text`);
  assert(state.brandLogos.every((logo) => logo.complete && logo.width > 0), `${width}x${height}: a watch-brand logo did not load`);
  assert(state.storyImages.length === 2 && state.storyImages.every((image) => image.complete && image.width > 0 && image.alt), `${width}x${height}: an editorial product image did not load`);
  assert(state.storyButtons === 0, `${width}x${height}: detail controls are still present`);
  if (!reducedMotion) {
    assert(storyMotion.every(({ before, after }) => before && after && before !== after), `${width}x${height}: an editorial image is not responding to scroll: ${JSON.stringify(storyMotion)}`);
    assert(storyMotion.every(({ before, after }) => Number(before.match(/matrix\(([^,]+)/)?.[1]) > Number(after.match(/matrix\(([^,]+)/)?.[1])), `${width}x${height}: an editorial image is not zooming out with scroll: ${JSON.stringify(storyMotion)}`);
  }
  assert(activeNavigation === "#leistungen", `${width}x${height}: navigation did not highlight the current section`);
  assert(state.scrollTriggers === 0, `${width}x${height}: scrubbed ScrollTriggers should remain disabled for native-scroll smoothness`);
  assert(!state.visibleNumbers, `${width}x${height}: section numbering is still visible`);
  assert(state.mobileDockDisplay === "absent" || state.mobileDockDisplay === "none", `${width}x${height}: mobile dock is still visible`);
  assert(state.bridgeRings === 0, `${width}x${height}: signature circles are still present`);
  assert(state.openServiceBackground === "rgba(0, 0, 0, 0)", `${width}x${height}: open service row still has a background fill`);
  if (width <= 760 && !reducedMotion) {
    assert((state.mobileHeroButtons === "none" || state.mobileHeroButtons === "absent") && state.mobileHeroSupport === "none", `${width}x${height}: mobile hero actions or support copy are still visible`);
    assert(state.brandDisplay === "flex" && state.brandClones === 12 && state.brandAnimation !== "none", `${width}x${height}: automatic brand marquee did not initialize`);
  } else if (width > 760) {
    assert(state.brandDisplay === "grid" && state.brandClones === 0 && state.brandAnimation === "none", `${width}x${height}: desktop watch brands did not restore the grid`);
  }
  assert(errors.length === 0, `${width}x${height}: console errors: ${errors.join(" | ")}`);
  await page.close();
  return { viewport: `${width}x${height}`, reducedMotion, ...state };
}

async function inspectScrollFilm(browser) {
  const page = await browser.newPage();
  const playbackUrl = new URL(url);
  playbackUrl.search = "?jump=0";
  playbackUrl.hash = "film";
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(playbackUrl.href, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction("window.__ready === true", { timeout: 15000 });
  const range = await page.$eval("#film", (section) => section.getBoundingClientRect().height - innerHeight);
  const checkpoints = [];
  for (const progress of [.1, .24, .4, .56, .72, .9, .975]) {
    await page.evaluate((y) => scrollTo(0, y), range * progress);
    await new Promise((resolve) => setTimeout(resolve, 240));
    checkpoints.push(await page.evaluate(() => ({
      ...window.__filmState(),
      headerOpaque: document.querySelector("#site-header").classList.contains("is-scrolled")
    })));
  }
  const forward = checkpoints.at(-1);
  await page.evaluate(() => scrollTo(0, 0));
  await new Promise((resolve) => setTimeout(resolve, 360));
  const reverse = await page.evaluate(() => ({
    ...window.__filmState(),
    headerOpaque: document.querySelector("#site-header").classList.contains("is-scrolled")
  }));
  const displayedFrames = checkpoints.map((state) => state.frame);
  const distinctFrames = new Set(displayedFrames).size;
  assert(distinctFrames >= 5, `scroll film did not visibly advance through enough frames: ${JSON.stringify(checkpoints)}`);
  assert(displayedFrames.every((frame, index) => index === 0 || frame > displayedFrames[index - 1]), `scroll film frames did not advance monotonically: ${JSON.stringify(displayedFrames)}`);
  assert(forward.targetFrame > 205 && forward.frame > 200, `scroll film did not reach its final movement: ${JSON.stringify(forward)}`);
  assert(checkpoints.slice(0, -1).every((state) => !state.headerOpaque), `navbar became opaque before the film finale: ${JSON.stringify(checkpoints)}`);
  assert(forward.headerOpaque, `navbar did not become opaque at the film finale: ${JSON.stringify(forward)}`);
  assert(reverse.targetFrame === 0 && reverse.frame < 12, `scroll film did not reverse to its opening: ${JSON.stringify(reverse)}`);
  assert(!reverse.headerOpaque, `navbar stayed opaque after reversing to the film opening: ${JSON.stringify(reverse)}`);
  await page.close();
  return { checkpoints, forward, reverse };
}

async function inspectDecoderFallback(browser) {
  const page = await browser.newPage();
  const playbackUrl = new URL(url);
  playbackUrl.search = "?jump=0";
  playbackUrl.hash = "film";
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(window, "createImageBitmap", { configurable: true, value: undefined });
  });
  await page.goto(playbackUrl.href, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction("window.__ready === true", { timeout: 15000 });
  const range = await page.$eval("#film", (section) => section.getBoundingClientRect().height - innerHeight);
  await page.evaluate((y) => scrollTo(0, y), range * .52);
  await new Promise((resolve) => setTimeout(resolve, 500));
  const state = await page.evaluate(() => window.__filmState());
  assert(state.decoder === "image-element", `film decoder fallback did not activate: ${JSON.stringify(state)}`);
  assert(state.ready && state.frame > 80, `film decoder fallback remained static: ${JSON.stringify(state)}`);
  await page.close();
  return state;
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: "new", args: ["--hide-scrollbars"] });
  try {
    const results = [];
    results.push(await inspect(browser, 1440, 900));
    results.push(await inspect(browser, 820, 1180));
    results.push(await inspect(browser, 390, 844));
    results.push(await inspect(browser, 390, 844, true));
    const scrollFilm = await inspectScrollFilm(browser);
    const decoderFallback = await inspectDecoderFallback(browser);
    console.log(JSON.stringify({ pass: true, results, scrollFilm, decoderFallback }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
