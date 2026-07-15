# TastyGo — Food Delivery System

A responsive food ordering web app built for the Sqrock IT Solutions Web
Development Internship — Phase 2, Task 1.

Built strictly with the technologies listed as allowed in the internship
brief — no external backend or database.

## Tech stack (matches the brief exactly)
- **React 18 + Vite**
- **React Bootstrap / Bootstrap 5** for UI
- **React Router v6** for navigation
- **LocalStorage** for persistence (cart, accounts, orders) — the brief's
  own optional persistence method
- Live food photography via the free [Foodish API](https://foodish-api.com)
  (covered by the brief's "static data or JSON data" allowance)

## Features
- Homepage with hero, categories, popular restaurants, featured dishes
- Restaurant listing with search + sort
- Restaurant menu page with search, category filter, and price-range filter
- Cart with add/remove/increase/decrease quantity, live totals, and
  LocalStorage persistence (survives a page refresh)
- Checkout form with validation, saves the order to LocalStorage
- Order confirmation screen
- Demo auth: sign up / log in / log out, stored in LocalStorage
  (this is a UI/UX demo per the brief's optional "Login/Signup UI" bonus
  feature — not a secured backend, see note below)
- "My Orders" page (protected route), reading order history back out of
  LocalStorage for the signed-in account
- Fully responsive (mobile, tablet, desktop)

## Getting started

```bash
npm install
npm run dev
```

No environment variables, no external services to configure — it runs
immediately.

## How data persists

Everything lives in the browser's LocalStorage, under a few keys:
- `tastygo_cart` — current cart contents
- `tastygo_users` — accounts created via Sign up
- `tastygo_session` — the currently signed-in account
- `tastygo_orders` — placed orders, scoped to the account that placed them

This means data is per-browser (clearing site data or switching browsers
resets it) and there's no real security — passwords aren't hashed, and
nothing is validated server-side. That's expected for a frontend demo
project, not a bug: the brief explicitly scopes this as a frontend
assignment, with LocalStorage named as the intended persistence tool.

## Project structure

```
src/
├── components/       # Reusable UI (cards, navbar, footer, route guard)
├── context/           # Auth + Cart React context (both LocalStorage-backed)
├── data/               # Static restaurant/food data (JSON-like JS objects)
├── lib/                 # INR currency formatter
├── pages/               # Route-level pages
├── App.jsx
└── main.jsx
```

## Deployment
Build with `npm run build`, then deploy the `dist/` folder to Vercel,
Netlify, or GitHub Pages — no server or database to provision.
