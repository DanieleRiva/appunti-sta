---
title: "Smart Desk Station"
description: Progetto libero di fine anno - costruire una stazione ambientale intelligente da scrivania usando i componenti e i concetti visti durante l'anno.
---

## Il Progetto

Il progetto prevede di costruire un sistema di Smart Desk realmente utilizzabile a nella propria casa, non semplicemente simulato su Tinkercad.

Il dispositivo deve monitorare l'ambiente in cui si trova, rilevare la presenza di una persona e comunicare informazioni utili tramite display, segnali luminosi e sonori. L'obiettivo finale è un oggetto che abbia senso usare davvero.

**Non esiste una soluzione unica.** Ognuno decide cosa mostrare, come organizzare le informazioni, quali soglie impostare e quali messaggi visualizzare. In questo progetto finale, l'obiettivo principale è essere creativi con gli strumenti visti durante l'anno.

---

## Componenti Disponibili

Potete scegliere liberamente tra i componenti visti durante l'anno. Il vincolo è rispettare i **requisiti tecnici minimi** elencati più avanti.

Componenti da usare come base di partenza:

- Sensore **DHT11** - temperatura e umidità
- **Display LCD 16x2** - pannello informazioni principale
- Sensore a **Ultrasuoni HC-SR04** - rilevamento presenza

---

## Requisiti Tecnici Minimi

Il progetto deve obbligatoriamente includere tutti i seguenti elementi.

**1. Lettura ambientale** <br/>
Leggere temperatura e umidità dal DHT11 e mostrarle sul display LCD. La lettura deve essere temporizzata con `millis()`; **__nessun `delay()`__**.

**2. Almeno una soglia di allarme** <br/>
Definire almeno una condizione critica (es. temperatura troppo alta, oppure umidità eccessiva) che attivi un segnale visivo o sonoro.

**3. Rilevamento di presenza** <br/>
Usare il sensore a ultrasuoni per rilevare se qualcuno è seduto alla scrivania. Il comportamento del sistema deve cambiare in base alla presenza o assenza di una persona, anche in modo semplice.

**4. Nessun `delay()`** <br/>
Tutta la gestione del tempo deve avvenire esclusivamente con `millis()`. Volendo, è possibile usare il delay dentro il setup() per esempio per sequenze di 
avvio LCD (vedi [Idee per Andare Oltre](#idee-per-andare-oltre))

**5. Codice organizzato in funzioni** <br/>
Ogni componente o funzionalità deve avere la propria funzione dedicata. Il `loop()` deve essere pulito e leggibile.

---

## Idee per Andare Oltre

Questi elementi non sono obbligatori, ma possono rendere il progetto più interessante e completo.

- **Mostrare un'animazione sull'LCD all'avvio**
- **Usare una melodia di avvio**
- Mostrare un messaggio diverso sull'LCD quando nessuno è presente (es. screensaver, citazione, ecc...)
- Usare il pulsante per cambiare modalità di visualizzazione (es. temperatura → umidità → messaggio personalizzato)
- Far lampeggiare i LED in modo diverso in base al livello di allarme
- Aggiungere un indicatore visivo del livello di comfort ambientale (verde = ottimo, giallo = attenzione, rosso = critico)

:::note[Pin analogici come digitali]
Se i pin digitali non sono abbastanza, i pin analogici **A0–A5** possono essere usati 
come pin digitali normali. Basta dichiararli con `#define` e usarli con 
`pinMode()`, `digitalWrite()` e `digitalRead()` esattamente come si fa 
con un pin digitale.

```cpp
#define BUTTON_PIN A2
pinMode(BUTTON_PIN, INPUT);
digitalRead(BUTTON_PIN);
```
:::

:::note[Consiglio]
Iniziare dal minimo funzionante: DHT11 che legge e LCD che mostra. Una volta che quello funziona, aggiungere un pezzo alla volta.
:::