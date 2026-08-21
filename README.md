# BreadCraft 🍞

Dein persönlicher KI-Bäckermeister – powered by Claude AI.

## Deployment auf Vercel

### Schritt 1: GitHub Repository
1. github.com → „New repository" → Name: `breadcraft` → Public → Create
2. Alle Dateien aus diesem Ordner hochladen (drag & drop in GitHub UI)

### Schritt 2: Vercel verbinden
1. vercel.com → „Sign up with GitHub"
2. „Add New Project" → dein `breadcraft` Repository auswählen
3. Framework: **Vite** (wird automatisch erkannt)
4. Deploy klicken → erste Version läuft in ~2 Minuten

### Schritt 3: API Key hinterlegen (wichtig!)
1. In Vercel: Settings → Environment Variables
2. Name: `ANTHROPIC_API_KEY`
3. Value: dein Anthropic API Key (von console.anthropic.com)
4. „Save" → dann „Redeploy"

### Schritt 4: Als iPhone App installieren
1. URL in Safari öffnen (z.B. breadcraft.vercel.app)
2. Teilen-Symbol → „Zum Home-Bildschirm"
3. BreadCraft erscheint als App-Icon

## Anthropic API Key holen
1. console.anthropic.com → Account erstellen
2. API Keys → „Create Key"
3. Key kopieren und in Vercel eintragen

## Lokale Entwicklung
```bash
npm install
npm run dev
```
