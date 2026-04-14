---
title: "millis()"
description: Esercizi pratici per consolidare l'uso di millis() con LED e pulsanti, senza mai usare delay().
---

:::danger[Regola fondamentale]
In tutti questi esercizi è **vietato usare `delay()`**. Ogni gestione del tempo deve essere fatta esclusivamente con `millis()`.
:::

---

## Esercizio 1 - Due LED, due velocità

Collega due LED. Il primo deve lampeggiare ogni **500 ms**, il secondo ogni **1200 ms**. I due LED devono essere completamente indipendenti: il ritmo dell'uno non deve influenzare l'altro in nessun modo.

**Componenti:** 2 LED

**Obiettivo:** avere due timer `millis()` separati che girano in parallelo.

---

## Esercizio 2 - Tre LED a cascata

Collega tre LED. Devono lampeggiare a velocità diverse e crescenti:
- LED 1: ogni **300 ms**
- LED 2: ogni **600 ms**
- LED 3: ogni **1200 ms**

Organizza il codice con **una funzione dedicata per ogni LED**, in modo che il `loop()` sia composto da sole tre chiamate a funzione.

**Componenti:** 3 LED

**Obiettivo:** consolidare il pattern `millis()` e l'organizzazione del codice in funzioni.

:::note[Cosa noti?]
Osserva il comportamento dei tre LED insieme: ogni quanto si sincronizzano e si accendono tutti contemporaneamente?
:::

---

## Esercizio 3 - Pulsante che cambia velocità

Collega un LED e un pulsante. Il LED lampeggia normalmente ogni **1000 ms**. Ogni volta che si preme il pulsante, la velocità di lampeggio si **dimezza**: da 1000 ms passa a 500 ms, poi a 250 ms, poi a 125 ms. Quando si arriva al valore minimo, la pressione successiva riporta tutto a 1000 ms e il ciclo ricomincia.

**Componenti:** 1 LED, 1 pulsante

**Obiettivo:** usare `millis()` per il lampeggio e gestire la pressione del pulsante con il debounce.

---

## Esercizio 4 - Pulsante ON/OFF senza blocchi

Collega un LED e un pulsante. Il LED lampeggia continuamente ogni **400 ms**. Quando si preme il pulsante, il lampeggio si **ferma** e il LED rimane spento. Premendo di nuovo il pulsante, il lampeggio **riprende**.

Il comportamento deve essere fluido: la pressione del pulsante viene rilevata immediatamente, senza ritardi o momenti in cui Arduino "non risponde".

**Componenti:** 1 LED, 1 pulsante

**Obiettivo:** combinare il toggle di uno stato booleano con il timer `millis()`.

---

## Esercizio 5 - Semaforo

Collega tre LED (rosso, giallo, verde) e simula un semaforo con i seguenti tempi:

| Fase | LED acceso | Durata |
|:---|:---|:---|
| 1 | Verde | 3000 ms |
| 2 | Giallo | 800 ms |
| 3 | Rosso | 3000 ms |

Aggiungi un **pulsante pedonale**: quando viene premuto, il semaforo deve completare la fase corrente e poi passare direttamente al rosso, indipendentemente da quant'altro tempo sarebbe rimasto. Dopo il rosso, il ciclo normale riprende.

**Componenti:** 3 LED (rosso, giallo, verde), 1 pulsante

**Obiettivo:** gestire una sequenza di stati con `millis()` e reagire a un evento esterno (il pulsante) senza bloccare il ciclo.