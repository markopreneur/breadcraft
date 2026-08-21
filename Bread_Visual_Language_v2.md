# Bread Visual Language v2.0

Verbindliche Bildsprache für BreadCraft.
Grundlage: die drei Referenzgrafiken (Sauerteig-Sandwich-Toast, Emmer-Dinkel-Laib, Mildes Roggenmischbrot).

**Zweck:** Eine Person soll ein Brot allein anhand der Illustrationen backen können.

**Charakter:** Illustriertes Kochbuch. Warm, freundlich, hochwertig. Nicht Editorial-Magazin, nicht Kinderbuch.

---

## Was sich gegenüber v1 umkehrt

| v1 | v2 |
|---|---|
| Keine Umrisslinien | Feine warme Konturen — vorhanden, aber leicht |
| Entsättigt und kühl | Warm, cremig, Salbeigrün als Akzent |
| Hart abgesetzte Schattenseite | Weiche, malerische Schattierung |
| Hand als neutrales Symbol | Hand naturalistisch, mit Hautton |
| Frontalansicht | Dreiviertelansicht mit leichter Aufsicht |

Unverändert bleibt die wichtigste Regel: **kein Text im Bild.**

---

## 1 Farben

Warm, cremig, mit einem einzigen grünen Akzent. Sättigung bleibt moderat — freundlich, nicht bunt.

### Grund

| Rolle | Hex |
|---|---|
| Papier / Bildgrund | `#FAF8F3` |
| Kartenfläche | `#FFFFFF` |
| Haarlinie / Trenner | `#E5E0D6` |

### Akzent — Salbeigrün

Trägt Nummern, Marker und Bestätigungen. Nie auf Objekten.

| Rolle | Hex |
|---|---|
| Salbei hell | `#A9BFA4` |
| Salbei Grundton | `#8FA98A` |
| Salbei dunkel | `#6E8A69` |
| Salbei Fläche (Badge) | `#E8EFE6` |

### Warnton

Nur für „noch nicht bereit", Fehler, Achtung. Höchstens ein Element pro Karte.

| Rolle | Hex |
|---|---|
| Terrakotta | `#C2683A` |

### Materialien

Jedes Material in drei Stufen. Die mittlere ist der Grundton.

| Material | Licht | Grundton | Schatten |
|---|---|---|---|
| Teig | `#F0E4CC` | `#E3D2B0` | `#C9B389` |
| Kruste | `#D9A468` | `#B87B3F` | `#8E5828` |
| Krume | `#F5EFE2` | `#E9DFCB` | `#D3C6AC` |
| Keramik | `#EDF1F2` | `#D7DFE2` | `#B4C0C6` |
| Edelstahl | `#E2E5E7` | `#C9CFD3` | `#A3ABB1` |
| Dunkelmetall *(Kastenform)* | `#6B6F73` | `#4E5256` | `#3A3D40` |
| Peddigrohr *(Gärkorb)* | `#E8D4B0` | `#D4B98C` | `#B0966A` |
| Holz | `#E5D3B3` | `#CDB48C` | `#A99169` |
| Textil | `#F2EDE3` | `#E6DFD1` | `#C9BFAC` |
| Textilstreifen | — | `#9BB0BF` | — |
| Wasser | `#DCE8EE` | `#B9CFDB` | `#93AFC0` |
| Haut | `#F5DCC4` | `#EBC7A4` | `#D3A67E` |

### Schrift und Symbole

| Rolle | Hex |
|---|---|
| Text dunkel | `#4A423A` |
| Text mittel | `#7A7266` |
| Symbol grau | `#9A9488` |
| Kontur | `#8A7F6E` |

---

## 2 Linien

Konturen sind vorhanden — das ist die Umkehr gegenüber v1. Sie sind aber **warm und fein**, nie schwarz und nie schwer.

| Rolle | Stärke | Farbe |
|---|---|---|
| Objektkontur | 1.2 | `#8A7F6E` |
| Binnenstruktur | 0.9 | Materialschatten |
| Symbol | 1.5 | `#9A9488` |
| Trenner im Layout | 1.0 | `#E5E0D6` |

Enden und Ecken rund. Keine Kontur ist dunkler als `#8A7F6E`.

---

## 3 Schatten

**Modellierung.** Weiche Tonwertverläufe über die Form, malerisch. Kein harter Absatz. Volumen entsteht durch Übergang, nicht durch Kante.

**Glanzlicht.** Keramik, Edelstahl und Glas tragen ein weiches weißes Licht oben links. Keine harten Reflexe, keine Sterne.

**Aufsetzschatten.** Weiche Ellipse unter jedem stehenden Objekt. Warmgrau, 12 % Deckkraft, leicht nach rechts versetzt.

Verboten: harte Schlagschatten, farbige Schatten, mehrfache Schatten.

---

## 4 Perspektive

**Dreiviertelansicht mit leichter Aufsicht.** Gefäße zeigen ihren Inhalt.

- Licht von oben links
- Öffnungen als Ellipse, Achsverhältnis etwa **1 : 0,35**
- Objekte stehen auf gemeinsamer Grundlinie
- Keine Isometrie, keine starke Untersicht
- Ein Hauptobjekt je Szene, mittig

---

## 5 Typografie

**Im Bild erscheint kein Text.** Keine Zahlen, keine Einheiten, keine Beschriftung. Das ist die härteste Regel der Sprache.

Grund: BreadCraft erzeugt für jeden Nutzer ein anderes Rezept. Grammangaben, Zeiten und Temperaturen hängen vom Mehlvorrat, Ofen und Zeitbudget ab. Text im Bild wäre falsch, sobald sich das Rezept anpasst — und beim Backen sind Zahlen keine Dekoration.

Aller Text kommt als HTML daneben:

| Rolle | Größe / Gewicht | Farbe |
|---|---|---|
| Schrittüberschrift | 13 / 700, Versalien, Sperrung 0.06em | `#4A423A` |
| Fließtext | 12.5 / 400, Zeilenhöhe 1.55 | `#7A7266` |
| Wert im Badge | 12 / 700 | `#4A423A` |
| Nummer im Badge | 12 / 700 | `#FFFFFF` auf `#8FA98A` |

Schrift: System-Sans. Ziffern tabellarisch.

---

## 6 Icons

Dünne Linienicons, `#9A9488`, Strichstärke 1.5, Raster 20 × 20. Sie stehen im Textbereich, nie in der Illustration.

Uhr · Thermometer · Schneeflocke · Tropfen · Dampfwellen · Hände · Pfeil gerade · Pfeil gebogen · Wiederholung · Waage · Häkchen · Ausrufezeichen · Prozent

Höchstens drei je Schritt.

---

## 7 Objektinventar

Jedes Objekt existiert genau einmal und sieht in allen Szenen identisch aus.

**Gefäße** — Keramikschüssel groß · Keramikschüssel klein · Weckglas mit Deckel · Messbecher mit Skala · Topf · Sieb

**Wiegen & Messen** — Digitalwaage · Teigthermometer · Kernthermometer

**Mischen & Kneten** — Holzlöffel · Teigkarte · Teigschaber · Handrührgerät · Küchenmaschine · Thermomix

**Gare & Form** — Gärkorb rund · Gärkorb länglich · Kastenform dunkel · Bäckerleinen · Geschirrtuch mit Streifen

**Backen** — Einbaubackofen · Dutch Oven · Backstein · Backblech · Brotschieber · Sprühflasche · Wasserschale

**Danach** — Gitterrost · Brotmesser · Lame

**Kälte** — Kühlschrank

**Zutaten** — Mehltüte · Mehlhaufen · Mehlstreuung · Wasserguss · Salz · Frischhefe · Anstellgut im Glas · Saaten · Nüsse · Möhren · Milch · Öl · Honig · Butter

**Teigzustände** *(tragen die Anleitung)* — Mehl-Wasser-Brei · Rohteig zäh · Teig glatt · Teig gebläht · Teigling vorgeformt · Teigling rund · Teigling lang · Teigling im Korb · Teigling eingeschnitten · Brot gebacken · Brot angeschnitten

---

## 8 Hände

Naturalistisch, mit Hautton. Vereinfacht, aber richtig proportioniert. Keine Nägel, keine Falten, keine Gesichter, keine Personen — nur Hand und Handgelenk, am Bildrand angeschnitten.

**Gesten:** auflegen · greifen und ziehen · unterheben *(Coil Fold)* · rund wirken · lang wirken · streuen · gießen · führen *(Einschneiden)* · tragen · Fingerprobe

Zwei Hände nur, wenn die Tätigkeit sie erfordert.

---

## 9 Gärkörbe

Peddigrohr, warmes Tan. Rillen als konzentrische beziehungsweise parallele Bögen, deutlich sichtbar — sie sind das Erkennungsmerkmal. Bei bemehltem Korb feine Streuung im Lichtton Teig.

Bäckerleinen als eigenes Objekt: gefaltete Bahn, weiche Faltenkanten.

---

## 10 Schüsseln

Weiße bis hellblaugraue Keramik. Weiches Glanzlicht oben links, sichtbare Innenwand durch die Dreiviertelansicht, weicher Innenschatten.

Das Geschirrtuch mit blaugrauen Streifen ist fester Bestandteil der Bildwelt — es erscheint beim Abdecken.

---

## 11 Ofen

Einbaubackofen in Edelstahl, frontal. Bedienleiste oben mit Reglern und Display. Dunkles Sichtfenster, weiche diagonale Lichtkante links, Rost erkennbar.

Zustände: geschlossen · offen · mit Brot sichtbar · mit Dampf.

Hitze zeigt sich über Dampfwellen und das Thermometersymbol im Text — nie über Flammen.

---

## 12 Layout

Kartenstruktur, abgeleitet aus den Referenzen.

**Schrittkarte:**

```
┌─────────────────────────────────────┐
│ (3)  HAUPTTEIG KNETEN               │  Salbei-Badge + Versalien
├─────────────────────────────────────┤
│  ┌───────────┐                      │
│  │           │  Kurztext, max.      │  Illustration links
│  │   Bild    │  zwei Zeilen.        │  Text rechts
│  │           │                      │
│  └───────────┘  ◷ 30 min  ◈ 24 °C   │  Meta-Icons unten
└─────────────────────────────────────┘
```

- Karte: weiß, Radius 12, Haarlinie `#E5E0D6`
- Illustration quadratisch, 96–128 px, Radius 8
- Innenabstand 14
- Bei mehreren Teilschritten: horizontale Folge kleinerer Bilder mit Pfeil dazwischen
- Nummern-Badge: Kreis 22 px, `#8FA98A`, weiße Ziffer

---

## 13 Szenenliste

Feste IDs. Die KI wählt ausschließlich aus dieser Liste.

**Vorbereitung** — `zutaten_uebersicht` · `zutaten_wiegen` · `mehl_schuessel` · `wasser_zugeben` · `salz_zugeben` · `hefe_zugeben` · `anstellgut_zugeben` · `oel_zugeben`

**Vorstufen** — `vorteig_ansetzen` · `vorteig_reif` · `quellstueck` · `bruehstueck` · `kochstueck`

**Hauptteig** — `mischen_loeffel` · `mischen_hand` · `kneten_hand` · `kneten_ruehrgeraet` · `kneten_maschine` · `kneten_thermomix` · `noknead_ruehren` · `fenstertest`

**Ruhephasen** — `autolyse` · `fermentolyse` · `saltolyse` · `fenstertest`

**Stockgare** — `stockgare_abgedeckt` · `dehnen_falten` · `coil_fold` · `teig_geblaeht`

**Formen** — `teig_stuerzen` · `teilen` · `vorformen` · `entspannen` · `formen_rund` · `formen_lang` · `bemehlen` · `wasser_benetzen`

**Stückgare** — `gaerkorb_rund` · `gaerkorb_lang` · `kastenform_einlegen` · `leinen` · `stueckgare_abgedeckt` · `fingerprobe` · `kalte_gare`

**Backen** — `ofen_vorheizen` · `einschneiden` · `einschiessen` · `bedampfen` · `dutch_oven` · `backstein` · `backen` · `broetchen` · `fladen_pfanne` · `stockbrot`

**Abschluss** — `abkuehlen` · `anschneiden` · `fertig_laib` · `fertig_scheiben`

---

## 14 Negativliste

- **Text, Zahlen oder Beschriftung im Bild** — härteste Regel
- Schwarze oder schwere Konturen
- Comicästhetik, Cliparts, Sticker-Optik
- Gesichter, Figuren, ganze Personen
- Emojis, Sprechblasen
- Fotos, Fotorealistik
- 3D-Renderings, Isometrie
- Harte Schlagschatten, Sternreflexe, Glanzpunkte
- Flammen, Funken, Bewegungsstriche
- Rahmen, Ränder, Hintergrundszenen, Küchenmöbel
- Mehr als ein Warnelement je Karte
- Kalte oder graue Grundstimmung
- Grelle Sättigung

---

# Generierungs-Kit für die Rasterbibliothek

## Vorgehen

1. **Bild 1 erzeugen** — die Keramikschüssel. Sie definiert die Handschrift.
2. **Alle weiteren im selben Chat.** Nie einen neuen Chat beginnen.
3. Jeder Folgeprompt startet mit dem Anschlusssatz.
4. Bei Abweichung das beste Bild erneut hochladen, `match this exact style` dazu.
5. Reihenfolge: erst wiederkehrende Objekte, dann zusammengesetzte Szenen.

## Stilblock — nur für Bild 1

```
Illustration for a premium illustrated baking cookbook.

Subject: a white ceramic mixing bowl containing bread dough,
three-quarter view from slightly above, so the interior is visible.

Style: hand-drawn digital cookbook illustration. Fine warm
brown-grey outlines, soft painterly shading with smooth tonal
transitions, gentle white highlight on the ceramic upper left.
Soft contact shadow beneath. Warm, friendly, premium.

Colour: warm cream background. Dough in soft warm beige.
Ceramic in white with cool blue-grey shading. Muted, moderate
saturation — warm and inviting, never bright or garish.

Composition: single object, centred, filling about 70% of frame.
Plain flat cream background, no scene, no furniture, no frame.

Absolutely no text, no numbers, no labels, no lettering anywhere.
No faces, no people, no cartoon style, no photorealism, no 3D.

Square format.
```

## Anschlusssatz — für alle weiteren

```
Same style, same outlines, same shading, same palette, same
lighting as the previous image. Plain cream background.
No text, no numbers, no labels. Square format. Now show:
```

## Motive

Dahinter jeweils die englische Beschreibung setzen.

### Zuerst: wiederkehrende Objekte

| ID | Beschreibung |
|---|---|
| `mehl_schuessel` | *(Bild 1 — die Schüssel)* |
| `kneten_hand` | two hands kneading dough on a wooden counter, hands cropped at the wrist |
| `gaerkorb_rund` | a round rattan proofing basket, floured, with a dough ball inside |
| `kastenform_einlegen` | a dark rectangular loaf pan with dough inside |
| `ofen_vorheizen` | a stainless steel built-in kitchen oven, front view, door closed |
| `dutch_oven` | a cast iron dutch oven with the lid slightly raised, steam escaping |
| `kneten_maschine` | a grey stand mixer with dough hook, dough in the bowl |
| `anschneiden` | a round sourdough loaf cut open, one half showing the open crumb |

### Danach: die übrigen Szenen

| ID | Beschreibung |
|---|---|
| `zutaten_wiegen` | a digital kitchen scale with a bowl of flour on it |
| `wasser_zugeben` | water being poured from a measuring jug into a bowl of flour |
| `salz_zugeben` | a hand sprinkling salt into a bowl of dough |
| `anstellgut_zugeben` | a glass jar of bubbly sourdough starter being tipped into a bowl |
| `vorteig_ansetzen` | a glass jar with a small amount of thin starter mixture, lid beside it |
| `vorteig_reif` | a glass jar with risen bubbly starter, doubled in volume |
| `quellstueck` | a bowl with seeds soaking in water |
| `kochstueck` | a small saucepan with thick flour paste, steam rising |
| `mischen_loeffel` | a wooden spoon stirring dough in a ceramic bowl |
| `kneten_thermomix` | a white food processor with a mixing bowl, dough inside |
| `kneten_ruehrgeraet` | a hand mixer with dough hooks in a bowl of dough |
| `noknead_ruehren` | a rough shaggy dough in a bowl, wooden spoon resting in it |
| `fenstertest` | two hands stretching a thin translucent piece of dough between them |
| `autolyse` | a ceramic bowl of smooth dough covered with a striped kitchen cloth |
| `stockgare_abgedeckt` | a ceramic bowl covered with a striped kitchen cloth |
| `dehnen_falten` | a hand pulling a piece of dough upward from a bowl and folding it over |
| `coil_fold` | two hands lifting dough from underneath in a bowl, letting it fold |
| `teig_geblaeht` | a ceramic bowl with risen airy dough, bubbles visible on the surface |
| `teig_stuerzen` | dough being turned out from a bowl onto a floured wooden counter |
| `teilen` | a dough piece being cut with a bench scraper on a counter |
| `vorformen` | two hands loosely shaping a round dough piece on a counter |
| `entspannen` | two rounded dough pieces resting on a floured counter |
| `formen_rund` | two hands tightly shaping a round dough ball on a counter |
| `formen_lang` | two hands rolling dough into a long loaf shape |
| `bemehlen` | a hand dusting flour over a dough ball |
| `gaerkorb_lang` | an oval rattan proofing basket with an elongated dough piece inside |
| `leinen` | a folded linen couche with baguette dough pieces between the folds |
| `stueckgare_abgedeckt` | a rattan proofing basket covered with a striped cloth |
| `fingerprobe` | a finger gently pressing into risen dough in a proofing basket |
| `kalte_gare` | a fridge with the door slightly open, a covered dough container inside |
| `einschneiden` | a hand scoring a round dough loaf with a razor blade lame |
| `einschiessen` | a bread peel sliding a dough loaf into an open oven |
| `bedampfen` | an open oven with a loaf inside and a small tray of water below, steam |
| `backstein` | an open oven with a baking stone and a loaf on it |
| `backen` | a stainless steel oven, door closed, a loaf visible baking through the glass |
| `broetchen` | three round bread rolls on a baking tray |
| `fladen_pfanne` | a flatbread in a cast iron pan, slightly puffed |
| `stockbrot` | dough wrapped in a spiral around a wooden stick over glowing embers |
| `abkuehlen` | a baked round loaf cooling on a wire rack, faint steam |
| `fertig_laib` | a finished round sourdough loaf with a scored crust |
| `fertig_scheiben` | a sliced loaf with several slices fanned out, crumb visible |

---

## Nach der Generierung

Bilder mir hochladen. Ich baue die Schrittkarte aus §12, binde die Bilder an die Szenen-IDs und stelle die App darauf um. Text, Zeiten und Temperaturen bleiben HTML und damit personalisierbar.

Danach folgt Variante A: die Bibliothek als SVG in derselben Handschrift.

---

*Version 2.0 · Ersetzt v1.0 vollständig.*
