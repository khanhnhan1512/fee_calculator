# Revenue Fee Calculator — Implementation Plan
Date: 2026-03-27 | Status: ✅ Implemented

## Project Summary
Single-page web app. React 19 + Vite 5 + Tailwind CSS v3 + Firebase Firestore. Deploy to Vercel.
Glassmorphism card on teal→dark-green gradient. Brand: teal (#05B4C9) headings, dark green (#1A322F) buttons.

## Tech Stack
- React 19 + Vite 5 (Node 20 compatible)
- Tailwind CSS v3
- Firebase Firestore (modular SDK v9+), getDocs strategy
- Vercel (static SPA)
- Font: Arial throughout

## Implementation Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | Project Setup | ✅ Done |
| 2 | UI Components | ✅ Done |
| 3 | Firestore Integration | ✅ Done |
| 4 | Calculation Logic | ✅ Done |
| 5 | GitHub + Vercel Deploy | 🔲 Needs Firebase config from user |

## File Tree
```
fee_calculator/
├── src/
│   ├── components/
│   │   ├── BusinessTypeSelector.jsx
│   │   ├── FeeCalculator.jsx
│   │   ├── FeeTierTable.jsx
│   │   ├── EditTierRow.jsx
│   │   └── AddTierForm.jsx
│   ├── lib/firebase.js
│   ├── services/feeTierService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env.local        (user must create — gitignored)
├── .gitignore
├── vercel.json
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Next Step for User
1. Create Firebase project → enable Firestore → copy SDK config to `.env.local`
2. `npm run dev` to test locally
3. Push to GitHub → deploy on Vercel with env vars
