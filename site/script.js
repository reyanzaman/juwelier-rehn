(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const jumpParam = new URLSearchParams(location.search).get("jump");

  document.documentElement.classList.add("has-js");
  document.body.classList.toggle("reduced-motion", prefersReducedMotion.matches);

  const translations = {
    de: {
      "a11y.skip": "Zum Inhalt springen",
      "a11y.home": "Zur Startseite",
      "a11y.mainNav": "Hauptnavigation",
      "a11y.mobileNav": "Mobile Navigation",
      "a11y.footerNav": "Fußnavigation",
      "a11y.language": "Sprache wählen",
      "a11y.openMenu": "Menü öffnen",
      "a11y.closeMenu": "Menü schließen",
      "nav.rings": "Trauringe",
      "nav.jewelry": "Schmuck & Uhren",
      "nav.workshops": "Werkstätten",
      "nav.about": "Über uns",
      "nav.contact": "Kontakt",
      "nav.consultation": "Beratung",
      "hero.eyebrow": "JUWELIER C. REHN · SEIT 1869",
      "hero.line1": "Für immer beginnt",
      "hero.line2": "im Detail.",
      "hero.support": "Individuelle Trauringberatung im Herzen von Landau.",
      "hero.imageAlt": "Zwei Trauringe in Champagner-Roségold – ein floral gravierter Ring und ein polierter Ring",
      "hero.videoLabel": "Zwei Trauringe in Champagner-Roségold schweben in warmem Licht",
      "hero.scroll": "Entdecken",
      "hero.primary": "Trauringberatung vereinbaren",
      "hero.secondary": "Unsere Leistungen",
      "video.label": "FILM",
      "video.pause": "Film pausieren",
      "video.play": "Film abspielen",
      "video.replay": "Film erneut abspielen",
      "finale.eyebrow": "ZWEI HANDSCHRIFTEN",
      "finale.title": "Ein gemeinsames Versprechen.",
      "intro.eyebrow": "VERWURZELT IN LANDAU",
      "intro.title": "Tradition seit 1869 in Landau",
      "intro.body": "Mitten in Landau verbinden wir gewachsene Erfahrung mit einem persönlichen Blick für Schmuck, Uhren und die Stücke, die Menschen ein Leben lang begleiten.",
      "intro.statement": "„Wir lieben Schmuck.“",
      "bridge.one": "Zwei",
      "bridge.two": "Handschriften",
      "bridge.note": "Eine gemeinsame Wahl.",
      "bridge.hint": "Bewegen · zusammenführen",
      "consultation.eyebrow": "IHRE RINGE. IHRE WAHL.",
      "consultation.title": "Eine Beratung, die bei Ihnen beginnt.",
      "consultation.body": "Gemeinsam sprechen wir über die Details, die aus zwei Ringen Ihre Trauringe machen. Verfügbarkeit und Möglichkeiten klären wir persönlich im Gespräch.",
      "consultation.cta": "Trauringberatung vereinbaren",
      "consultation.topic1": "Ringgröße & Tragegefühl",
      "consultation.topic2": "Material & Oberfläche",
      "consultation.topic3": "Edelsteine & Gestaltung",
      "consultation.topic4": "Gravur & persönliche Wünsche",
      "consultation.topic5": "Tragehand & Alltag",
      "story.jewelryEyebrow": "SCHMUCK FÜR IHR JA",
      "story.jewelryTitle": "Ein Detail, das den Moment trägt.",
      "story.jewelryBody": "Ringe und Schmuckstücke, die Ihre Handschrift aufnehmen – persönlich ausgewählt und für lange Zeit gedacht.",
      "story.jewelryAlt": "Farbige Schmuckstücke mit Ringen, Anhängern und Ohrringen",
      "story.watchEyebrow": "UHRMACHERHANDWERK",
      "story.watchTitle": "Im Innersten zählt Präzision.",
      "story.watchBody": "Vom Batteriewechsel bis zur sorgfältigen Prüfung mechanischer Werke: Wir schauen genau hin, bevor wir empfehlen.",
      "story.watchAlt": "Geöffnetes historisches Taschenuhrwerk mit sichtbarer Mechanik",
      "story.inspect": "Detail ansehen",
      "story.close": "Ansicht schließen",
      "story.jewelryInspect": "Schmuckdetail vergrößern",
      "story.watchInspect": "Uhrwerkdetail vergrößern",
      "materials.eyebrow": "MATERIAL & CHARAKTER",
      "materials.title": "Acht Möglichkeiten. Unzählige Handschriften.",
      "materials.body": "Material, Farbe und Oberfläche prägen den Ausdruck eines Traurings. Welche Ausführung zu Ihnen passt, finden wir gemeinsam heraus.",
      "materials.yellow": "Gelbgold",
      "materials.white": "Weißgold",
      "materials.silver": "Silber",
      "materials.platinum": "Platin",
      "materials.tantalum": "Tantal",
      "materials.titanium": "Titan",
      "materials.steel": "Edelstahl",
      "materials.alloys": "Individuelle Legierungen",
      "services.eyebrow": "KÖNNEN, DAS BLEIBT",
      "services.title": "Für Schmuckstücke und Zeitmesser.",
      "services.rings.title": "Trauringberatung",
      "services.rings.body": "Persönliche Auswahl von Größe, Material, Oberfläche, Steinen und Gravur – orientiert an Ihren Vorstellungen.",
      "services.goldsmith.title": "Goldschmiede",
      "services.goldsmith.body": "Wir prüfen Steine, Verschlüsse, Lötstellen und getragene Schmuckstücke und besprechen, welche Reparatur fachlich sinnvoll ist.",
      "services.watch.title": "Uhrmacher&shy;werkstatt",
      "services.watch.body": "Service für mechanische und elektronische Uhren – vom Batteriewechsel bis zur Prüfung umfangreicherer Arbeiten.",
      "services.jewelry.title": "Schmuck & Uhren",
      "services.jewelry.body": "Von Perlen und Brillanten bis Gold, Silber und Uhren: Schmuckstücke für besondere Momente und den Alltag.",
      "brands.eyebrow": "AUSGEWÄHLTE UHRENMARKEN",
      "brands.title": "Zeitmesser mit Haltung.",
      "brands.body": "Von Schweizer Präzision bis zu charakterstarken Alltagsuhren: Über aktuelle Modelle und Verfügbarkeit beraten wir Sie persönlich.",
      "brands.listLabel": "Uhrenmarken",
      "configurators.eyebrow": "ERSTE IDEEN",
      "configurators.title": "Trauringe online konfigurieren.",
      "configurators.body": "Entdecken Sie Formen und Kombinationen vorab. Die Links führen zu externen Konfiguratoren; Ihre persönliche Beratung findet bei uns in Landau statt.",
      "configurators.own": "Unser Trauringkonfigurator",
      "configurators.gerstner": "Gerstner Trauringkonfigurator",
      "configurators.woerner": "Wörner Trauringkonfigurator",
      "configurators.external": "Externe Website",
      "visit.eyebrow": "MITTEN IN DER STADT",
      "visit.title": "Wir freuen uns auf Ihren Besuch.",
      "visit.body": "Sie finden uns an der Kreuzung Gerberstraße und Kronstraße – im großen Eckhaus mit dem Türmchen.",
      "visit.cta": "Besuch planen",
      "visit.hoursTitle": "Öffnungszeiten",
      "visit.monday": "Montag",
      "visit.weekdays": "Dienstag–Freitag",
      "visit.saturday": "Samstag",
      "visit.sunday": "Sonntag",
      "visit.closed": "Geschlossen",
      "visit.weekdaysHours": "09:30–13:00<br>14:00–18:00",
      "visit.saturdayHours": "09:00–14:00",
      "visit.parkingTitle": "Parkmöglichkeiten in der Nähe",
      "visit.parking": "Messplatz · VR-Bank Parkhaus · Königsstraße",
      "appointment.eyebrow": "PERSÖNLICH FÜR SIE",
      "appointment.title": "Nehmen wir uns Zeit für Ihre Ringe.",
      "appointment.body": "Senden Sie uns Ihren Terminwunsch. Ihre Anfrage ist noch keine bestätigte Buchung; wir melden uns persönlich bei Ihnen zurück.",
      "form.name": "Name *",
      "form.contact": "E-Mail oder Telefon *",
      "form.date": "Wunschtermin",
      "form.message": "Nachricht <span>(optional)</span>",
      "form.optional": "(optional)",
      "form.consent": "Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. *",
      "form.submit": "Anfrage per E-Mail senden",
      "form.note": "Die Nachricht wird in Ihrem E-Mail-Programm vorbereitet. Eine Terminbestätigung erfolgt separat durch Juwelier C. Rehn.",
      "form.errorName": "Bitte geben Sie Ihren Namen ein.",
      "form.errorContact": "Bitte geben Sie eine gültige E-Mail-Adresse oder Telefonnummer ein.",
      "form.errorConsent": "Bitte bestätigen Sie die Verarbeitung Ihrer Angaben.",
      "form.ready": "Ihr E-Mail-Programm wird geöffnet. Bitte senden Sie die vorbereitete Nachricht dort ab.",
      "form.subject": "Anfrage zur Trauringberatung",
      "form.mailName": "Name",
      "form.mailContact": "Kontakt",
      "form.mailDate": "Wunschtermin",
      "form.mailMessage": "Nachricht",
      "footer.line": "Zwei Handschriften.<br>Ein gemeinsames Versprechen.",
      "footer.hoursShort": "Di–Fr 09:30–13:00 &amp; 14:00–18:00<br>Sa 09:00–14:00 · Mo &amp; So geschlossen",
      "footer.legal": "Impressum ↗",
      "footer.privacy": "Datenschutz ↗",
      "dock.label": "Schnellzugriff",
      "dock.call": "Anrufen",
      "dock.appointment": "Termin vereinbaren",
      "meta.title": "Juwelier C. Rehn · Tradition seit 1869 in Landau",
      "meta.description": "Juwelier C. Rehn in Landau – persönliche Trauringberatung, Schmuck, Uhren sowie Goldschmiede- und Uhrmacherwerkstatt."
    },
    en: {
      "a11y.skip": "Skip to content",
      "a11y.home": "Go to homepage",
      "a11y.mainNav": "Main navigation",
      "a11y.mobileNav": "Mobile navigation",
      "a11y.footerNav": "Footer navigation",
      "a11y.language": "Choose language",
      "a11y.openMenu": "Open menu",
      "a11y.closeMenu": "Close menu",
      "nav.rings": "Wedding Rings",
      "nav.jewelry": "Jewelry & Watches",
      "nav.workshops": "Workshops",
      "nav.about": "About",
      "nav.contact": "Contact",
      "nav.consultation": "Consultation",
      "hero.eyebrow": "JUWELIER C. REHN · SINCE 1869",
      "hero.line1": "Forever begins",
      "hero.line2": "in the details.",
      "hero.support": "Personal wedding-ring consultation in the heart of Landau.",
      "hero.imageAlt": "Two champagne rose-gold wedding rings – one floral engraved ring and one polished ring",
      "hero.videoLabel": "Two champagne rose-gold rings floating in warm light",
      "hero.scroll": "Discover",
      "hero.primary": "Book a wedding-ring consultation",
      "hero.secondary": "Our services",
      "video.label": "FILM",
      "video.pause": "Pause film",
      "video.play": "Play film",
      "video.replay": "Replay film",
      "finale.eyebrow": "TWO SIGNATURES",
      "finale.title": "One shared promise.",
      "intro.eyebrow": "ROOTED IN LANDAU",
      "intro.title": "Tradition in Landau since 1869",
      "intro.body": "In the heart of Landau, we combine generations of experience with a personal eye for jewelry, watches, and the pieces people keep for a lifetime.",
      "intro.statement": "“We love jewelry.”",
      "bridge.one": "Two",
      "bridge.two": "signatures",
      "bridge.note": "One shared choice.",
      "bridge.hint": "Move · bring together",
      "consultation.eyebrow": "YOUR RINGS. YOUR CHOICE.",
      "consultation.title": "A consultation that begins with you.",
      "consultation.body": "Together, we discuss the details that turn two rings into your wedding rings. We clarify availability and possibilities personally during your consultation.",
      "consultation.cta": "Book a wedding-ring consultation",
      "consultation.topic1": "Ring size & comfort",
      "consultation.topic2": "Material & finish",
      "consultation.topic3": "Gemstones & design",
      "consultation.topic4": "Engraving & personal preferences",
      "consultation.topic5": "Wearing hand & everyday life",
      "story.jewelryEyebrow": "JEWELRY FOR YOUR YES",
      "story.jewelryTitle": "A detail that carries the moment.",
      "story.jewelryBody": "Rings and jewelry that reflect your signature – personally selected and made to stay with you.",
      "story.jewelryAlt": "Colorful jewelry with rings, pendants, and earrings",
      "story.watchEyebrow": "WATCHMAKING CRAFT",
      "story.watchTitle": "Precision begins within.",
      "story.watchBody": "From a battery change to a careful assessment of mechanical movements: we look closely before we recommend.",
      "story.watchAlt": "Open historic pocket-watch movement with visible mechanics",
      "story.inspect": "View detail",
      "story.close": "Close view",
      "story.jewelryInspect": "Enlarge jewelry detail",
      "story.watchInspect": "Enlarge watch movement detail",
      "materials.eyebrow": "MATERIAL & CHARACTER",
      "materials.title": "Eight possibilities. Countless signatures.",
      "materials.body": "Material, color, and finish shape the character of a wedding ring. Together, we find the expression that suits you.",
      "materials.yellow": "Yellow gold",
      "materials.white": "White gold",
      "materials.silver": "Silver",
      "materials.platinum": "Platinum",
      "materials.tantalum": "Tantalum",
      "materials.titanium": "Titanium",
      "materials.steel": "Stainless steel",
      "materials.alloys": "Individual alloys",
      "services.eyebrow": "SKILL THAT LASTS",
      "services.title": "For jewelry and timepieces.",
      "services.rings.title": "Wedding-ring consultation",
      "services.rings.body": "Personal guidance on size, material, finish, stones, and engraving – shaped around your preferences.",
      "services.goldsmith.title": "Goldsmith workshop",
      "services.goldsmith.body": "We assess stones, clasps, solder joints, and worn jewelry, then discuss which repair is technically appropriate.",
      "services.watch.title": "Watchmaking workshop",
      "services.watch.body": "Service for mechanical and electronic watches – from battery replacement to assessing more extensive work.",
      "services.jewelry.title": "Jewelry & watches",
      "services.jewelry.body": "From pearls and diamonds to gold, silver, and watches: pieces for special moments and everyday wear.",
      "brands.eyebrow": "SELECTED WATCH BRANDS",
      "brands.title": "Timepieces with character.",
      "brands.body": "From Swiss precision to distinctive everyday watches: we will personally advise you on current models and availability.",
      "brands.listLabel": "Watch brands",
      "configurators.eyebrow": "FIRST IDEAS",
      "configurators.title": "Configure wedding rings online.",
      "configurators.body": "Explore shapes and combinations in advance. These links lead to external configurators; your personal consultation takes place with us in Landau.",
      "configurators.own": "Our wedding-ring configurator",
      "configurators.gerstner": "Gerstner wedding-ring configurator",
      "configurators.woerner": "Wörner wedding-ring configurator",
      "configurators.external": "External website",
      "visit.eyebrow": "IN THE HEART OF THE CITY",
      "visit.title": "We look forward to welcoming you.",
      "visit.body": "You will find us at the intersection of Gerberstraße and Kronstraße – in the large corner building with the turret.",
      "visit.cta": "Plan your visit",
      "visit.hoursTitle": "Opening hours",
      "visit.monday": "Monday",
      "visit.weekdays": "Tuesday–Friday",
      "visit.saturday": "Saturday",
      "visit.sunday": "Sunday",
      "visit.closed": "Closed",
      "visit.weekdaysHours": "9:30 AM–1:00 PM<br>2:00 PM–6:00 PM",
      "visit.saturdayHours": "9:00 AM–2:00 PM",
      "visit.parkingTitle": "Nearby parking",
      "visit.parking": "Messplatz · VR-Bank parking garage · Königsstraße",
      "appointment.eyebrow": "PERSONALLY FOR YOU",
      "appointment.title": "Let us take time for your rings.",
      "appointment.body": "Send us your preferred date. Your request is not a confirmed appointment; we will contact you personally to confirm it.",
      "form.name": "Name *",
      "form.contact": "Email or telephone *",
      "form.date": "Preferred date",
      "form.message": "Message <span>(optional)</span>",
      "form.optional": "(optional)",
      "form.consent": "I agree that my details may be used to process my request. *",
      "form.submit": "Send request by email",
      "form.note": "The message will be prepared in your email application. Juwelier C. Rehn will confirm any appointment separately.",
      "form.errorName": "Please enter your name.",
      "form.errorContact": "Please enter a valid email address or telephone number.",
      "form.errorConsent": "Please consent to the processing of your details.",
      "form.ready": "Your email application will open. Please send the prepared message there.",
      "form.subject": "Wedding-ring consultation request",
      "form.mailName": "Name",
      "form.mailContact": "Contact",
      "form.mailDate": "Preferred date",
      "form.mailMessage": "Message",
      "footer.line": "Two signatures.<br>One shared promise.",
      "footer.hoursShort": "Tue–Fri 9:30 AM–1:00 PM &amp; 2:00 PM–6:00 PM<br>Sat 9:00 AM–2:00 PM · Mon &amp; Sun closed",
      "footer.legal": "Legal notice ↗",
      "footer.privacy": "Privacy policy ↗",
      "dock.label": "Quick access",
      "dock.call": "Call",
      "dock.appointment": "Book a consultation",
      "meta.title": "Juwelier C. Rehn · Tradition in Landau since 1869",
      "meta.description": "Juwelier C. Rehn in Landau – personal wedding-ring consultation, jewelry, watches, goldsmith repairs, and watchmaking services."
    }
  };

  window.__contentMap = translations;
  let activeLanguage = "de";
  const text = (key) => translations[activeLanguage][key] || translations.de[key] || key;

  function applyLanguage(language, preservePosition = false) {
    if (!translations[language]) return;
    const savedY = window.scrollY;
    activeLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const value = translations[language][node.dataset.i18n];
      if (value != null) node.innerHTML = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      const value = translations[language][node.dataset.i18nAria];
      if (value != null) node.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((node) => {
      const value = translations[language][node.dataset.i18nAlt];
      if (value != null) node.alt = value;
    });
    document.querySelectorAll(".lang-button").forEach((button) => {
      const selected = button.dataset.lang === language;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.title = text("meta.title");
    document.querySelector('meta[name="description"]')?.setAttribute("content", text("meta.description"));
    const menuButton = document.querySelector(".menu-toggle");
    if (menuButton) menuButton.setAttribute("aria-label", text(menuButton.getAttribute("aria-expanded") === "true" ? "a11y.closeMenu" : "a11y.openMenu"));
    try { localStorage.setItem("rehn-language", language); } catch (_) {}
    if (preservePosition) requestAnimationFrame(() => {
      window.scrollTo(0, savedY);
    });
  }

  try {
    if (localStorage.getItem("rehn-language") === "en") applyLanguage("en");
  } catch (_) {}
  document.querySelectorAll(".lang-button").forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang, true)));

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  function setMenu(open) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", text(open ? "a11y.closeMenu" : "a11y.openMenu"));
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    if (open) mobileMenu.querySelector("a")?.focus();
  }
  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuToggle.focus();
    }
  });

  const video = document.getElementById("hero-film");
  const returnCanvas = document.getElementById("film-return-canvas");
  const returnContext = returnCanvas.getContext("2d", { alpha: true });
  const filmSection = document.querySelector(".film");
  let filmPlaying = false;
  let filmEnded = false;
  let filmFinishFrame = 0;
  let returnScrubArmed = false;
  let returnScrubFrame = 0;
  let returnCurrentFrame = 191;
  let returnTargetFrame = 191;
  let returnDisplayedFrame = -1;
  let returnPayloadWarmed = false;
  let returnGeneration = 0;
  const returnBitmaps = new Map();
  const returnDecoding = new Set();
  const returnMobile = window.matchMedia("(max-width: 760px)");
  const RETURN_FRAME_COUNT = 192;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function playFilm() {
    if (prefersReducedMotion.matches) return;
    if (filmEnded || video.ended) {
      video.currentTime = 0;
      filmEnded = false;
    }
    video.playbackRate = 1;
    filmSection.classList.remove("is-settling", "is-settled", "is-return-scrubbing");
    const playback = video.play();
    if (playback?.then) {
      playback.then(() => { filmPlaying = true; }).catch(() => { filmPlaying = false; });
    }
  }

  video.loop = false;
  video.muted = true;
  video.playsInline = true;
  if (prefersReducedMotion.matches || jumpParam !== null) {
    video.autoplay = false;
    video.pause();
  }
  video.addEventListener("loadeddata", () => video.classList.add("is-ready"));
  video.addEventListener("playing", () => {
    filmPlaying = true;
    filmEnded = false;
    video.classList.add("is-ready");
    if (!filmFinishFrame) filmFinishFrame = requestAnimationFrame(updateFilmFinish);
  });
  video.addEventListener("pause", () => {
    filmPlaying = false;
    if (filmFinishFrame) cancelAnimationFrame(filmFinishFrame);
    filmFinishFrame = 0;
  });
  video.addEventListener("ended", () => {
    filmPlaying = false;
    filmEnded = true;
    filmSection.classList.remove("is-settling");
    filmSection.classList.add("is-settled");
    if (filmFinishFrame) cancelAnimationFrame(filmFinishFrame);
    filmFinishFrame = 0;
    window.setTimeout(warmReturnPayload, 120);
  });

  function updateFilmFinish() {
    filmFinishFrame = 0;
    if (video.paused || video.ended || !Number.isFinite(video.duration)) return;
    const remaining = Math.max(0, video.duration - video.currentTime);
    if (remaining < 2.55) {
      filmSection.classList.add("is-settling");
    } else {
      filmSection.classList.remove("is-settling");
    }
    filmFinishFrame = requestAnimationFrame(updateFilmFinish);
  }

  const returnFrameUrl = (index) => `./assets/film-frames/${returnMobile.matches ? "mobile" : "desktop"}/f_${String(index + 1).padStart(4, "0")}.webp`;

  function sizeReturnCanvas() {
    const rect = returnCanvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    if (returnCanvas.width !== width || returnCanvas.height !== height) {
      returnCanvas.width = width;
      returnCanvas.height = height;
      returnDisplayedFrame = -1;
    }
  }

  function nearestReturnBitmap(index) {
    if (returnBitmaps.has(index)) return returnBitmaps.get(index);
    for (let offset = 1; offset < 34; offset += 1) {
      if (returnBitmaps.has(index - offset)) return returnBitmaps.get(index - offset);
      if (returnBitmaps.has(index + offset)) return returnBitmaps.get(index + offset);
    }
    return null;
  }

  function drawReturnFrame(index, force = false) {
    const rounded = clamp(Math.round(index), 0, RETURN_FRAME_COUNT - 1);
    if (!force && rounded === returnDisplayedFrame) return;
    const bitmap = nearestReturnBitmap(rounded);
    if (!bitmap) return;
    sizeReturnCanvas();
    const cw = returnCanvas.width;
    const ch = returnCanvas.height;
    returnContext.clearRect(0, 0, cw, ch);
    const scale = returnMobile.matches
      ? Math.min(cw / bitmap.width, ch / bitmap.height) * 1.34
      : Math.max(cw / bitmap.width, ch / bitmap.height);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    const x = (cw - width) * (returnMobile.matches ? .47 : .61);
    const y = (ch - height) * .54;
    returnContext.drawImage(bitmap, x, y, width, height);
    returnDisplayedFrame = rounded;
  }

  function ensureReturnBitmaps(center) {
    const rounded = clamp(Math.round(center), 0, RETURN_FRAME_COUNT - 1);
    const ahead = 28;
    const keep = 42;
    const low = Math.max(0, rounded - ahead);
    const high = Math.min(RETURN_FRAME_COUNT - 1, rounded + ahead);
    for (let index = low; index <= high; index += 1) {
      if (returnBitmaps.has(index) || returnDecoding.has(index)) continue;
      returnDecoding.add(index);
      const generation = returnGeneration;
      fetch(returnFrameUrl(index), { cache: "force-cache" })
        .then((response) => response.blob())
        .then((blob) => createImageBitmap(blob))
        .then((bitmap) => {
          returnDecoding.delete(index);
          if (generation !== returnGeneration) {
            bitmap.close();
            return;
          }
          if (Math.abs(index - returnTargetFrame) > keep) {
            bitmap.close();
            return;
          }
          returnBitmaps.set(index, bitmap);
          if (Math.abs(index - returnTargetFrame) < 2) drawReturnFrame(index, true);
        })
        .catch(() => returnDecoding.delete(index));
    }
    [...returnBitmaps.keys()].forEach((index) => {
      if (Math.abs(index - rounded) <= keep) return;
      returnBitmaps.get(index).close();
      returnBitmaps.delete(index);
    });
  }

  function warmReturnPayload() {
    if (returnPayloadWarmed || prefersReducedMotion.matches) return;
    returnPayloadWarmed = true;
    ensureReturnBitmaps(RETURN_FRAME_COUNT - 1);
  }

  function tickReturnScrub() {
    returnScrubFrame = 0;
    returnCurrentFrame += (returnTargetFrame - returnCurrentFrame) * .18;
    ensureReturnBitmaps(returnCurrentFrame);
    drawReturnFrame(returnCurrentFrame);
    if (Math.abs(returnTargetFrame - returnCurrentFrame) > .12) {
      returnScrubFrame = requestAnimationFrame(tickReturnScrub);
    } else {
      returnCurrentFrame = returnTargetFrame;
      drawReturnFrame(returnTargetFrame, true);
    }
  }

  function updateReturnScrub() {
    if (prefersReducedMotion.matches || !filmEnded) return;
    const distance = window.innerHeight * .72;
    if (!returnScrubArmed && window.scrollY >= distance) {
      returnScrubArmed = true;
      returnCurrentFrame = RETURN_FRAME_COUNT - 1;
      sizeReturnCanvas();
      warmReturnPayload();
    }
    if (!returnScrubArmed) return;
    const progress = clamp(window.scrollY / distance, 0, 1);
    returnTargetFrame = progress * (RETURN_FRAME_COUNT - 1);
    filmSection.classList.add("is-return-scrubbing");
    ensureReturnBitmaps(returnTargetFrame);
    if (!returnScrubFrame) returnScrubFrame = requestAnimationFrame(tickReturnScrub);
  }

  returnMobile.addEventListener("change", () => {
    returnGeneration += 1;
    returnBitmaps.forEach((bitmap) => bitmap.close());
    returnBitmaps.clear();
    returnDecoding.clear();
    returnPayloadWarmed = false;
    returnScrubArmed = false;
    returnDisplayedFrame = -1;
    filmSection.classList.remove("is-return-scrubbing");
    video.load();
    if (!prefersReducedMotion.matches) playFilm();
  });

  const resumeFilmOnIntent = () => {
    if (!prefersReducedMotion.matches && !filmEnded && video.paused) playFilm();
  };
  document.addEventListener("pointerdown", resumeFilmOnIntent, { once: true, passive: true });
  document.addEventListener("touchstart", resumeFilmOnIntent, { once: true, passive: true });
  document.addEventListener("keydown", resumeFilmOnIntent, { once: true });
  window.addEventListener("pageshow", () => {
    if (!prefersReducedMotion.matches && !filmEnded && video.paused) playFilm();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && filmSection.getBoundingClientRect().bottom > 0 && !filmEnded && video.paused) playFilm();
  });

  const header = document.getElementById("site-header");
  const mobileDock = document.querySelector(".mobile-dock");
  const pageProgress = document.querySelector(".page-progress span");
  const storyFeatures = [...document.querySelectorAll(".story-feature")];
  const editorialBridge = document.querySelector(".editorial-bridge");
  const updateStoryMotion = () => {
    if (prefersReducedMotion.matches) return;
    storyFeatures.forEach((feature) => {
      const rect = feature.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
      const mobile = window.innerWidth <= 760;
      const isWatch = feature.classList.contains("story-watch");
      const verticalRange = mobile ? 16 : 38;
      const horizontalRange = isWatch ? (mobile ? 12 : 34) : (mobile ? 5 : 12);
      feature.style.setProperty("--story-y", `${(.5 - progress) * verticalRange * 2}px`);
      feature.style.setProperty("--story-x", `${(progress - .5) * horizontalRange * 2}px`);
      feature.style.setProperty("--story-scale", `${1.055 + Math.abs(progress - .5) * (mobile ? .025 : .04)}`);
      feature.style.setProperty("--story-rotate", `${isWatch ? (progress - .5) * .55 : 0}deg`);
      feature.style.setProperty("--story-light-x", `${24 + progress * 52}%`);
    });
    if (editorialBridge) {
      const rect = editorialBridge.getBoundingClientRect();
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0, 1);
        const travel = window.innerWidth <= 760 ? 18 : 56;
        editorialBridge.style.setProperty("--bridge-left", `${(1 - progress) * -travel}px`);
        editorialBridge.style.setProperty("--bridge-right", `${(1 - progress) * travel}px`);
        editorialBridge.style.setProperty("--bridge-light-y", `${24 + progress * 52}%`);
      }
    }
  };
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 28);
    mobileDock?.classList.toggle("is-visible", window.scrollY > window.innerHeight * .62);
    const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (pageProgress) pageProgress.style.transform = `scaleX(${Math.min(1, window.scrollY / scrollRange)})`;
    updateStoryMotion();
    updateReturnScrub();
  };
  let headerFramePending = false;
  const scheduleHeaderUpdate = () => {
    if (headerFramePending) return;
    headerFramePending = true;
    requestAnimationFrame(() => {
      headerFramePending = false;
      updateHeader();
    });
  };
  updateHeader();
  window.addEventListener("scroll", scheduleHeaderUpdate, { passive: true });

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: .1 });
  document.querySelectorAll(".section").forEach((section) => sectionObserver.observe(section));
  if (!prefersReducedMotion.matches) document.body.classList.add("motion-ready");

  const navigationLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const navigationSections = navigationLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const navigationObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-28% 0px -58% 0px", threshold: [0, .2, .5] });
  navigationSections.forEach((section) => navigationObserver.observe(section));

  document.querySelectorAll(".service-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const article = trigger.closest("article");
      const open = !article.classList.contains("is-open");
      document.querySelectorAll(".service-rows article").forEach((row) => {
        row.classList.remove("is-open");
        row.querySelector(".service-trigger").setAttribute("aria-expanded", "false");
      });
      if (open) {
        article.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  storyFeatures.forEach((feature) => {
    const button = feature.querySelector(".story-toggle");
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") !== "true";
      button.setAttribute("aria-expanded", String(expanded));
      feature.classList.toggle("is-inspecting", expanded);
      button.querySelector("span").textContent = text(expanded ? "story.close" : "story.inspect");
    });
  });

  const brandGrid = document.querySelector(".brand-grid");
  if (brandGrid && !prefersReducedMotion.matches) {
    [...brandGrid.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelector("img")?.setAttribute("alt", "");
      brandGrid.appendChild(clone);
    });
    brandGrid.classList.add("is-looping");
  }

  function setupMotion() {
    if (!window.gsap || prefersReducedMotion.matches) return;
    const heroEntrance = gsap.timeline({ delay: .06, defaults: { ease: "power2.out" } });
    heroEntrance
      .fromTo(".hero-copy .entrance", { opacity: 0 }, { opacity: 1, duration: .62, stagger: .055 });
    gsap.fromTo(".film-lustre", { opacity: .55 }, { opacity: 1, duration: .9, ease: "power1.out" });
  }

  const form = document.getElementById("appointment-form");
  const setError = (id, message) => {
    const field = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();
    const date = form.elements.date.value;
    const message = form.elements.message.value.trim();
    const consent = form.elements.consent.checked;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const validPhone = contact.replace(/\D/g, "").length >= 6;
    setError("name", name ? "" : text("form.errorName"));
    setError("contact", validEmail || validPhone ? "" : text("form.errorContact"));
    setError("consent", consent ? "" : text("form.errorConsent"));
    if (!name || (!validEmail && !validPhone) || !consent) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const lines = [
      `${text("form.mailName")}: ${name}`,
      `${text("form.mailContact")}: ${contact}`,
      `${text("form.mailDate")}: ${date || "—"}`,
      "",
      `${text("form.mailMessage")}:`,
      message || "—"
    ];
    document.getElementById("form-status").textContent = text("form.ready");
    window.location.href = `mailto:info@juwelier-rehn.de?subject=${encodeURIComponent(text("form.subject"))}&body=${encodeURIComponent(lines.join("\n"))}`;
  });

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("date").min = new Date().toISOString().split("T")[0];

  const jank = { samples: [], p95: 0, max: 0 };
  let lastRaf = performance.now();
  function measureJank(now) {
    const delta = now - lastRaf;
    lastRaf = now;
    if (delta < 250) {
      jank.samples.push(delta);
      if (jank.samples.length > 600) jank.samples.shift();
      const ordered = [...jank.samples].sort((a, b) => a - b);
      jank.p95 = ordered[Math.floor(ordered.length * .95)] || 0;
      jank.max = Math.max(jank.max, delta);
    }
    requestAnimationFrame(measureJank);
  }
  window.__jank = jank;
  requestAnimationFrame(measureJank);
  window.__filmState = () => ({
    mode: "native-video-one-shot",
    readyState: video.readyState,
    paused: video.paused,
    ended: filmEnded,
    duration: Number.isFinite(video.duration) ? video.duration : 8,
    currentTime: video.currentTime,
    playbackRate: video.playbackRate,
    loop: video.loop,
    reducedMotion: prefersReducedMotion.matches
  });

  async function waitForFilm() {
    if (video.readyState >= 2) return;
    await new Promise((resolve) => {
      const timeout = window.setTimeout(resolve, 4000);
      video.addEventListener("loadeddata", () => {
        window.clearTimeout(timeout);
        resolve();
      }, { once: true });
      video.load();
    });
  }

  async function initialize() {
    setupMotion();
    await Promise.allSettled([document.fonts?.ready || Promise.resolve(), waitForFilm()]);
    video.classList.add("is-ready");
    if (jumpParam !== null) {
      history.scrollRestoration = "manual";
      const jump = Math.max(0, Number(jumpParam) || 0);
      window.scrollTo(0, jump);
      video.pause();
    } else if (!prefersReducedMotion.matches) {
      playFilm();
    }
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    window.__ready = true;
  }

  window.addEventListener("resize", () => {
    sizeReturnCanvas();
    scheduleHeaderUpdate();
  }, { passive: true });
  initialize().catch(() => {
    video.classList.add("is-ready");
    window.__ready = true;
  });
})();
