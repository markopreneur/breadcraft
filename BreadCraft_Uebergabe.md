# BreadCraft — Übergabe an den nächsten Chat

## Was du im neuen Chat hochlädst

1. `BreadCraft_Bilder_41.zip` — die 41 fertigen Illustrationen
2. `Bread_Visual_Language_v2.md` — die Bildsprache
3. `breadcraft-deploy.zip` — die App (Vite/React, baut fehlerfrei)
4. Dieses Dokument

Ohne das ZIP sind die Bilder verloren — sie liegen nur im alten Container.

---

## Stand

**41 von 49 Illustrationen fertig.** Alle normalisiert: quadratisch beschnitten, Weißabgleich auf `(252,241,225)`, 600 px, WebP Q86. Gesamt 1,4 MB.

Die App ist gebaut und deploybar, nutzt aber noch die alte SVG-Bibliothek. Die Bilder sind **noch nicht eingebunden**.

### Noch offen — 8 Motive

`formen_rund` · `formen_lang` · `bemehlen` · `gaerkorb_lang` · `leinen` · `stueckgare_abgedeckt` · `fingerprobe` · `kalte_gare`

Dazu **eine offene Entscheidung**: `einschneiden` gibt es in zwei Fassungen (Messer / Rasierklinge), keine ist abgelegt.

---

## Generierung — was funktioniert

**ChatGPT-Bildgenerator.** Claude Design taugt dafür nicht.

**Regel: höchstens fünf Bilder ohne Neuanker.** Die Kette driftet, und die Drift verstärkt sich selbst. Nach etwa fünfzig Bildern war der Stil komplett gekippt — von Illustration zu Food-Fotografie.

**Bei jeder Charge das Ankerbild anhängen** (z. B. `mehl_schuessel` oder `anschneiden`) mit:

```
[Ankerbild anhängen]

Match this style exactly. Plain flat cream background, hand-drawn
painterly illustration, fine warm outlines, soft shading.
No people, no torso, no apron — hands only, cropped at the wrist.
No kitchen, no room, no furniture, no photorealism.
No text, no numbers, no digits, no brand names anywhere.
Subject fills about 65% of the frame. Square format.

One image at a time:
23 formen_rund — two hands tightly shaping a round dough ball
24 formen_lang — two hands rolling dough into a long loaf
25 bemehlen — a hand dusting flour over a dough ball
26 gaerkorb_lang — an oval rattan proofing basket with elongated dough
27 leinen — a folded linen couche with baguette dough between the folds
28 stueckgare_abgedeckt — a rattan proofing basket covered with a striped cloth
29 fingerprobe — a finger pressing into risen dough in a proofing basket
30 kalte_gare — a covered dough container on a fridge shelf
```

### Wiederkehrende Fehler

| Symptom | Gegenmittel |
|---|---|
| Text im Bild (`220°C`) | `the oven is switched off, display completely dark and empty` |
| Person mit Schürze im Hintergrund | `hands only, cropped at the wrist, no torso` |
| Küchenszene, Fotorealismus | Neuanker mit Bild |
| Vierertafel statt Einzelbild | `one image per reply, never a grid` |
| Markenname sichtbar | `no brand names` |
| Format nicht quadratisch | mittiger Beschnitt reicht, bisher nie ein Motiv verletzt |

---

## Nachbearbeitung — Rezept

Jedes neue Bild so verarbeiten:

```python
from PIL import Image
import numpy as np
T = np.array([252,241,225], dtype=float)

def verarbeite(pfad, szenen_id, ziel):
    im = Image.open(pfad).convert('RGB')
    w, h = im.size; s = min(w, h)
    im = im.crop(((w-s)//2, (h-s)//2, (w-s)//2+s, (h-s)//2+s))
    a = np.asarray(im, dtype=float); k = 24
    c = np.concatenate([a[:k,:k].reshape(-1,3), a[:k,-k:].reshape(-1,3),
                        a[-k:,:k].reshape(-1,3), a[-k:,-k:].reshape(-1,3)])
    b = np.clip(a * (T / c.mean(axis=0)), 0, 255).astype(np.uint8)
    Image.fromarray(b).resize((600,600), Image.LANCZOS).save(
        f'{ziel}/{szenen_id}.webp', 'WEBP', quality=86, method=6)
```

Der Weißabgleich ist nötig: Der Hintergrund wird über die Kette immer wärmer, von `(254,246,228)` auf `(248,226,208)`. Ohne Abgleich sieht man das nebeneinander.

---

## Danach: Einbau in die App

**Nicht** die Bilder ins Repo kopieren und fertig — die Schrittkarte fehlt noch.

1. Bilder nach `public/szenen/<id>.webp`
2. Komponente `StepCard` bauen nach BVL §12:
   - Karte weiß, Radius 12, Haarlinie `#E5E0D6`
   - Nummer-Badge: Kreis 22 px, `#8FA98A`, weiße Ziffer
   - Überschrift Versalien 13/700, Sperrung 0.06em
   - Illustration links 112 px, Radius 8; Text rechts, max. 2 Zeilen
   - Zeit-/Temperatur-Badges unten
3. `StepList` in `App.jsx` umstellen: statt `StepIllustration` (SVG) das WebP laden, mit Rückfall auf die SVG-Szene wenn kein Bild existiert
4. `SZENEN_LISTE` im KI-Prompt auf die tatsächlich vorhandenen IDs setzen

Ein Layout-Mockup bei iPhone-Breite existierte bereits und trug — Illustration bei 112 px gut lesbar.

---

## Bekannte Altlasten in der App

- **Zwei Küchenmaschinen**: `kneten_maschine` (grau, Ankersatz) und `kneten_maschine_weiss` (neuer, sauberer). Die weiße passt besser zu Rührgerät und Thermomix. Eine verwerfen.
- **`anstellgut_hell` / `anstellgut_dunkel`** und **`vorteig_*`**: absichtlich getrennt, die App kann aus dem Mehlvorrat ableiten welches passt.
- **Fermentolyse und Saltolyse** teilen sich das `autolyse`-Bild — als Illustration nicht unterscheidbar.
- **`bruehstueck_uebergiessen`** ist ein Zusatz, stand nicht in der ursprünglichen Liste.
- **Deployment**: GitHub + Vercel vorbereitet, `api/claude.js` als Proxy, `ANTHROPIC_API_KEY` als Environment Variable. Noch nicht ausgeführt.

---

## Arbeitsweise, die sich bewährt hat

Nicht nur Klammern zählen — **kompilieren und hinschauen**. Zwei Fehler wären sonst durchgerutscht: abgebrochene String-Literale und ein stiller Rechenfehler, bei dem `x + w` Strings aneinanderhängte statt zu addieren. Beides fiel erst beim Rendern und Ansehen auf.

Dasselbe gilt für die Bilder: Kontaktbogen bauen, anschauen, dann entscheiden. Messwerte allein reichen nicht — die Facetten eines 3D-Renders zeigten sich in keiner Kennzahl, nur im Ausschnitt.
