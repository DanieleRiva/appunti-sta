---
title: I Cicli
description: Cosa sono i cicli, perché esistono e quando usarli per evitare di riscrivere le stesse istruzioni più volte.
---

## Ripetere senza riscrivere

Immagina di dover accendere e spegnere un LED 100 volte. Senza i cicli, dovresti scrivere 200 righe di codice identiche:

```cpp
digitalWrite(LED_PIN, HIGH);
delay(500);
digitalWrite(LED_PIN, LOW);
delay(500);
// ...altri 196 righe uguali...
```

Ovviamente non si fa così. I **cicli** (o *loop*) sono costrutti che permettono di ripetere un blocco di istruzioni **più volte**, scrivendo quel blocco **una volta sola**.

---

## Come funziona un Ciclo?

Un ciclo ha sempre tre elementi fondamentali:

1. Una **condizione**: finché è vera, il ciclo continua a girare
2. Un **blocco di istruzioni** da ripetere
3. Un **meccanismo di uscita**: qualcosa che prima o poi fa diventare la condizione falsa, fermando il ciclo

---

## Due tipi di Ciclo

Vedremo due cicli principali, adatti a situazioni diverse:

**`while`**: *"Ripeti finché..."*
Si usa quando non si sa in anticipo quante volte ripetere. Il ciclo continua finché una condizione rimane vera, indipendentemente dal numero di iterazioni.

**`for`**: *"Ripeti N volte"*
Si usa quando il numero di ripetizioni è noto fin dall'inizio. Raccoglie in una sola riga tutto il necessario per gestire un contatore.