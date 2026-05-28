# 🧬 BioNexus — Bioinformatics Research Platform

---

## 🚀 Deploy to Vercel — Step by Step

### 1. Add your API key (for local dev)
```bash
cp .env.example .env.local
# Edit .env.local — paste your Anthropic key
```

### 2. Run locally
```bash
npm install
npm run dev
# → http://localhost:5173
```

### 3. Deploy

**Vercel CLI (fastest):**
```bash
npm install -g vercel
vercel --prod
# When prompted for env vars, enter VITE_ANTHROPIC_API_KEY
```

**GitHub → Vercel Dashboard:**
1. Push folder to GitHub repo
2. vercel.com/new → Import repo
3. Add env var: VITE_ANTHROPIC_API_KEY = sk-ant-...
4. Deploy

**Drag & Drop:**
```bash
npm run build   # creates dist/
```
Drag `dist/` to vercel.com/new, then set env var in Project Settings.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_ANTHROPIC_API_KEY` | Key from console.anthropic.com |

All 11 pages work without the key. Only the AI Lab page requires it.

---

## Tech Stack
- React 18 + Vite 5
- Three.js r128 (real WebGL 3D)
- Claude Sonnet 4 (live AI)
- Neumorphic + dark glassmorphism CSS design system
