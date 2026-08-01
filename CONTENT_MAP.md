# Bilingual content architecture

The complete manually maintained German and English maps are delivered in two forms:

- Runtime source: `site/script.js`, in the `translations.de` and `translations.en` objects
- Exported artifact: `CONTENT_MAP.json`

Every visible translatable node uses a stable `data-i18n`, `data-i18n-aria`, or `data-i18n-alt` key. Key families cover:

- Navigation and accessibility labels
- Hero and final film statement
- Brand introduction
- Wedding-ring consultation
- Materials
- Services
- Configurators and external-destination notices
- Store visit, parking, and opening hours
- Appointment form labels, validation errors, consent, email subject, and email body labels
- Footer, legal links, metadata, and language controls

German is the default. The chosen language is stored locally, updates the document `lang` attribute, and switches only visible strings without restarting the film. The current scroll position is restored after each switch.

