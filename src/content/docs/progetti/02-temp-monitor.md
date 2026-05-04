---
title: "Termometro Digitale"
description: Leggere la temperatura dal sensore TMP36 e mostrarla in tempo reale su un display LCD 16x2.
---

## Il Progetto

Realizzare un **termometro digitale** che legga continuamente la temperatura ambientale tramite il sensore TMP36 e la mostri in tempo reale sul display LCD.

---

## Componenti

- 1 Sensore di temperatura **TMP36**
- 1 Display **LCD 16x2**
- 1 Potenziometro - regolazione contrasto LCD

---

## Funzionamento

Il sensore viene letto ogni **2 secondi** tramite `millis()`. La temperatura calcolata viene aggiornata sul display LCD ad ogni lettura.

Il display deve mostrare un'etichetta fissa sulla prima riga e il valore numerico sulla seconda, in questo formato:

```
Temperatura:
23.4 C
```

---

## Requisiti

1. **Nessun `delay()`** - la lettura del sensore va gestita esclusivamente con `millis()`
2. **Funzione dedicata** per la lettura e conversione della temperatura
3. Il valore sul display deve aggiornarsi senza sfarfallii o testo sovrapposto

:::note[Ripasso: Formula di conversione TMP36]
```
Temperatura (°C) = ( analogRead(pin) × (5.0 / 1024.0) - 0.5 ) × 100
```
:::