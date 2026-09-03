# Bekannte Probleme & Muster

## Muster: KI liefert Objekt, wo ein String erwartet wird

**Symptom.** React Error #31 — „Objects are not valid as a React child" — und die
komplette Ansicht reisst ab. Nicht nur der eine Wert fehlt: der Renderfehler
nimmt den ganzen Teilbaum mit.

**Ursache.** Das Prompt-Schema zeigt ein Beispiel, aber verbietet nichts. Wo ein
Feld im Beispiel `null` oder ein kurzer String ist, fuellt das Modell bei
komplexeren Rezepten ein Objekt hinein — sachlich richtig, strukturell falsch.
Das Feld geht als React-Child ins JSX und wirft.

**Warum es beim Testen durchrutscht.** Der Fehler haengt am Inhalt, nicht am
Code. Einfache Faelle erzeugen die reiche Struktur gar nicht erst, komplexe
schon. Wer nur den einfachen Fall klickt, sieht nie etwas.

### Beispiel 1 — `schritte` als Objekt statt Text

Die Felder `titel` und `text` eines Schritts kamen gelegentlich als Objekt
zurueck statt als String. Gegenmittel war die Hilfsfunktion `txt()` in
`StepList`: jeder Wert wird vor dem Rendern flachgeklopft.

### Beispiel 2 — `vorteig` als Objekt statt String (Vorstufen)

**Ausloeser.** Schwierigkeitsstufe „Geübt" oder „Profi". Bei „Anfänger" trat es
nie auf, weil dort keine Vorstufen erzeugt werden.

**Was passierte.** Das Schema gab `"vorteig":null` vor, ohne den Typ zu nennen.
Sobald das Rezept eine Vorstufe brauchte — Sauerteig-Vorteig, Brühstück,
Quellstück, Kochstück — lieferte das Modell dort ein Objekt:

```json
{ "name": "Sauerteig-Vorteig", "zeit": "12 Std.", "temp": "24 °C",
  "zutaten": [{ "menge": "100", "einheit": "g", "name": "Roggenmehl 1150" }] }
```

`{recipe.vorteig}` stand roh im JSX — Error #31. Dieselbe Struktur tauchte
zusaetzlich als Gruppen-Objekt *innerhalb* des flachen `zutaten`-Arrays auf.
Dort stuerzte nichts ab, die Zutaten verschwanden nur still aus der Liste, weil
das Rendering `menge`/`zutat` erwartete und beides `undefined` war. Der stille
Datenverlust ist die gefaehrlichere Haelfte des Bugs.

**Behoben in zwei Richtungen:**

1. *Prompt* — eigenes Feld `vorstufen` als Array von
   `{name, zeit, temp, zutaten:[{menge, einheit, name}]}`. `zutaten` enthaelt
   ausschliesslich flache Objekte und nur den Hauptteig. Die Regel steht
   ausformuliert in `ZUTATEN_REGELN`.
2. *Rendering* — `normZutaten()` faltet Gruppen-Objekte auf (Gruppenname als
   Zwischenzeile, verschachtelte Zutaten flach dahinter), `normVorstufen()`
   nimmt sowohl das neue `vorstufen` als auch das alte `vorteig` in beiden
   Formen entgegen. Kein KI-Feld geht ohne `txt()` ins JSX.

### Regel fuer neue Felder

- Jedes KI-Feld, das im JSX landet, laeuft durch `txt()`. Ohne Ausnahme.
- Jede Liste wird vor dem `.map()` mit `Array.isArray()` geprueft.
- Im Prompt reicht ein Beispiel nicht. Den Typ hinschreiben und das Gegenteil
  ausdruecklich verbieten („NIEMALS ein Objekt in …").
- Braucht ein Feld Struktur, bekommt es ein eigenes Feld — nicht ein
  vorhandenes flaches Feld heimlich mit Objekten fuellen.

---

## Muster: dieselbe Regel an zwei Prompt-Stellen

**Der Triebmittel-Bug.** Die Rezept-Prompts werden an mehreren Stellen
zusammengebaut. Wird eine Regel nur an einer davon nachgezogen, laeuft das
Verhalten auseinander und der Fehler kommt ueber den anderen Pfad zurueck.

Aktuell bauen drei Stellen einen Prompt:

| Stelle | Funktion | Schema |
|---|---|---|
| Karten-Call | `loadCards` | 3 Vorschlaege, ohne Zutaten |
| Voll-Rezept-Call | `openCard` | volles Rezept mit `zutaten`/`vorstufen`/`schritte` |
| Rezept-anpassen-Call | `doAdapt` | volles Rezept, zusaetzlich `anpassungen` |

**Gegenmittel.** Die Regeln stehen als Konstanten an genau einer Stelle
(`ZUTATEN_REGELN`, `SCHRITT_REGELN`, `KARTEN_REGELN`) und werden in die Prompts
interpoliert. Neue Regeln gehoeren in diese Konstanten, nicht in einen einzelnen
Prompt-String.

**Achtung bei Strukturaenderungen.** `verstoss()` prueft deterministisch, ob ein
verbotenes Triebmittel im Rezept steht. Da Sauerteig jetzt in `vorstufen` liegt
statt in `zutaten`, liest die Pruefung beide Felder plus das alte `vorteig`.
Wandert Struktur in ein neues Feld, muss `verstoss()` mitwandern — sonst greift
die Triebmittel-Kontrolle ins Leere.
