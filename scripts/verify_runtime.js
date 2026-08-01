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
    const video = document.querySelector("#hero-film");
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
      video: {
        readyState: video.readyState,
        opacity: getComputedStyle(video).opacity,
        display: getComputedStyle(video).display,
        width: video.getBoundingClientRect().width,
        height: video.getBoundingClientRect().height,
        controls: video.controls,
        loop: video.loop
      },
      overflowX: doc.scrollWidth > doc.clientWidth,
      textOverflow,
      clippedDisplay,
      heroInsideViewport: hero.left >= 0 && hero.right <= doc.clientWidth && hero.top >= 0,
      firstServiceExpanded: document.querySelector(".service-trigger").getAttribute("aria-expanded")
      ,brandLogos: [...document.querySelectorAll('.watch-brand:not([aria-hidden="true"]) img')].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
      ,brandClones: document.querySelectorAll('.watch-brand[aria-hidden="true"]').length
      ,brandAnimation: getComputedStyle(document.querySelector('.brand-grid')).animationName
      ,storyImages: [...document.querySelectorAll(".story-media img")].map((image) => ({ complete: image.complete, width: image.naturalWidth, alt: image.alt }))
      ,scrollTriggers: window.ScrollTrigger?.getAll?.().length || 0
      ,visibleNumbers: [...document.querySelectorAll(".section-index,.service-number,.materials-list>div>span,.consultation-topics li>span,.configurator-links a>span")].some((element) => getComputedStyle(element).display !== "none")
      ,mobileDockDisplay: document.querySelector(".mobile-dock") ? getComputedStyle(document.querySelector(".mobile-dock")).display : "absent"
      ,mobileHeroButtons: getComputedStyle(document.querySelector('.hero-buttons')).display
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
  assert(state.ready, `${width}x${height}: ready gate did not fire`);
  assert(!state.overflowX, `${width}x${height}: horizontal overflow`);
  assert(state.textOverflow.length === 0, `${width}x${height}: text overflow: ${state.textOverflow.join(", ")}`);
  assert(state.clippedDisplay.length === 0, `${width}x${height}: display text uses hidden overflow`);
  assert(state.heroInsideViewport, `${width}x${height}: hero copy leaves viewport`);
  assert(state.film.mode === "native-video-one-shot", `${width}x${height}: native film engine did not initialize`);
  assert(state.video.readyState >= 2 && state.video.width > 0 && state.video.height > 0 && Number(state.video.opacity) > .9, `${width}x${height}: film video is not ready and visible`);
  assert(state.video.display === "block", `${width}x${height}: film video is hidden`);
  assert(!state.video.controls, `${width}x${height}: native video controls are visible`);
  assert(!state.video.loop, `${width}x${height}: film video still loops`);
  assert(reducedMotion ? state.film.paused : true, `${width}x${height}: reduced-motion film should stay paused`);
  assert(state.firstServiceExpanded === "true", `${width}x${height}: service accordion initial state invalid`);
  assert(state.brandLogos.length === 12, `${width}x${height}: expected 12 watch-brand logos`);
  assert(state.brandLogos.every((logo) => logo.alt), `${width}x${height}: a watch-brand logo is missing alternative text`);
  assert(state.brandLogos.every((logo) => logo.complete && logo.width > 0), `${width}x${height}: a watch-brand logo did not load`);
  assert(state.storyImages.length === 2 && state.storyImages.every((image) => image.complete && image.width > 0 && image.alt), `${width}x${height}: an editorial product image did not load`);
  assert(state.scrollTriggers === 0, `${width}x${height}: scrubbed ScrollTriggers should remain disabled for native-scroll smoothness`);
  assert(!state.visibleNumbers, `${width}x${height}: section numbering is still visible`);
  assert(state.mobileDockDisplay === "absent" || state.mobileDockDisplay === "none", `${width}x${height}: mobile dock is still visible`);
  assert(state.bridgeRings === 0, `${width}x${height}: signature circles are still present`);
  assert(state.openServiceBackground === "rgba(0, 0, 0, 0)", `${width}x${height}: open service row still has a background fill`);
  if (width <= 760 && !reducedMotion) {
    assert(state.mobileHeroButtons === "none" && state.mobileHeroSupport === "none", `${width}x${height}: mobile hero actions or support copy are still visible`);
    assert(state.brandClones === 12 && state.brandAnimation !== "none", `${width}x${height}: automatic brand marquee did not initialize`);
  }
  assert(errors.length === 0, `${width}x${height}: console errors: ${errors.join(" | ")}`);
  await page.close();
  return { viewport: `${width}x${height}`, reducedMotion, ...state };
}

async function inspectOneShot(browser) {
  const page = await browser.newPage();
  const playbackUrl = new URL(url);
  playbackUrl.search = "";
  playbackUrl.hash = "film";
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(playbackUrl.href, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction("window.__ready === true", { timeout: 15000 });
  await page.waitForFunction("window.__filmState().ended === true", { timeout: 12000 });
  const state = await page.evaluate(() => ({ film: window.__filmState(), video: { controls: document.querySelector("#hero-film").controls, loop: document.querySelector("#hero-film").loop } }));
  assert(state.film.paused && state.film.ended, "one-shot film did not settle at its final frame");
  assert(state.film.currentTime >= state.film.duration - .05, "one-shot film stopped before its final frame");
  assert(!state.video.controls && !state.video.loop, "film controls or looping were re-enabled");
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
    const oneShot = await inspectOneShot(browser);
    console.log(JSON.stringify({ pass: true, results, oneShot }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
