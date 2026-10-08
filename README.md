# Polylolli Art & Lik

Customer-facing children's events website for **Polylolli Art & Lik**, designed as a specialised vertical powered by **Kerniva**.

## Architecture

- **Polylolli** owns the brand, marketing experience, public website and customer-facing presentation.
- **Kerniva** is the operational source of truth for customers, enquiries, bookings, quotes, payments, availability and business workflows.
- Integration-specific code belongs behind the centralised Kerniva service layer rather than being duplicated throughout UI components.

## Local development

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

The Vite development server runs on port `3000` and listens on `0.0.0.0`.

## Validation

```bash
npm run lint
npm run build
```

## Environment

Copy `.env.example` to `.env.local` only when environment-specific values are required. Never commit `.env.local`, API keys or credentials.
