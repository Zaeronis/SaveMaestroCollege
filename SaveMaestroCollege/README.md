# Modernize the Rule — Students for AI-Native Learning

A single-page Vite + React site making a student-led policy case: the federal
distance-education rule ("regular and substantive interaction," 34 CFR 600.2)
should recognize AI-mediated instruction that demonstrably works, instead of
defining the instructor as necessarily human.

It is deliberately **not** a "save my school" campaign. The testimonials are
reform evidence — concrete skills and testimonies students gained through AI-native
instruction — which is the winnable framing.

## Run it

```bash
npm install
cp .env .env.local   # fill in EmailJS keys
npm run dev                  # http://localhost:5173
npm run build                # -> dist/  (Vercel serves this)
```

Vercel auto-detects Vite. Add the four `VITE_*` vars under
Project → Settings → Environment Variables.

## Structure

```
src/
├─ main.jsx / App.jsx        entry + section composition
├─ styles/                   tokens.css, base.css
├─ data/
│  ├─ argument.js            the reform claim + points + honest boundaries
│  ├─ actions.js             how-to-help channels, weighted by real leverage
│  └─ testimonials.json      ← published reform-evidence accounts (you edit)
├─ lib/                      config.js, sanitize.js, record.js (email text)
└─ components/               Masthead, TheCase, Testimonials, SubmitForm,
                             Actions, Boundaries, Footer  (one .jsx + .css each)
```

## Adding a testimonial

Add an object to `src/data/testimonials.json` after verifying enrollment:

```json
{
  "no": "002",
  "name": "J.R.",
  "program": "Maestro College — AAS, AI Software Engineering",
  "skill": "Built and deployed a full React app to production",
  "filed": "2026-07-10",
  "verified": true,
  "sample": false,
  "outcome": "Before the program I had never written JavaScript.\n\nThrough the coursework I learned React and Vite, and I deployed my first app to Vercel."
}
```

Use `\n\n` for paragraph breaks. Set `"verified": true` only after confirming the
student is real — it drives the verified chip and the header count. React escapes
all rendered text, so no manual sanitizing is needed.

## Framing discipline (read before editing copy)

- Keep it a **policy argument**, not a school defense. The moment it reads as
  "save my school," a reviewer or reporter discounts it.
- The honest boundaries in `argument.js` are load-bearing. Don't remove them.
- The footer's "protect yourself first" note is intentional: don't ask
  Pell-dependent students to sign public things before they've checked their aid.

## EmailJS

Plain-text template with variables:
`{{name}} {{program}} {{skill}} {{outcome}} {{contact}} {{filed}}`.
Public key + IDs are publishable; real abuse protection is the EmailJS dashboard
(domain allowlist, rate limits, optional reCAPTCHA).
