---
title: 'Sistema di Monitoraggio Ambientale'
description: Sistema di allarme per temperatura e umidità con DHT11, buzzer passivo, LED e pulsante di silenziamento.
---

## Il Progetto

Realizzare un sistema di **monitoraggio ambientale** che legga continuamente temperatura e umidità dalla stanza, segnali situazioni di allarme tramite LED e buzzer, e permetta all'utente di silenziare l'allarme sonoro con un pulsante.

Il progetto integra tutti i componenti e i concetti visti finora: `millis()` per la gestione del tempo, variabili di stato booleane, lettura di sensori, controllo di LED e buzzer, e gestione di un pulsante in tempo reale.

---

## Componenti

- 1 Sensore **DHT11** - temperatura e umidità
- 1 **Buzzer passivo** - allarme sonoro
- 1 **LED giallo** - segnale umidità > 75%
- 1 **LED rosso** - segnale umidità > 90% o allarme temperatura
- 1 **Pulsante** - silenziamento allarme

---

## Funzionamento

### Lettura del sensore

Il DHT11 viene interrogato ogni **2 secondi** tramite `millis()`. Ad ogni lettura, temperatura e umidità vengono stampate sul Monitor Seriale.

### Logica LED - Umidità

I LED reagiscono al livello di umidità letta:

| Umidità | LED giallo | LED rosso |
| :------ | :--------: | :-------: |
| ≤ 75%   |   Spento   |  Spento   |
| > 75%   |   Acceso   |  Spento   |
| > 90%   |   Acceso   |  Acceso   |

### Logica Buzzer - Temperatura

Se la temperatura supera i **30°C**, il buzzer inizia a suonare come allarme. Il suono si ferma in due situazioni:

- Il **pulsante** viene premuto: l'allarme viene **silenziato manualmente** e il buzzer si spegne anche se la temperatura è ancora alta.
- La **temperatura scende** sotto i 30°C: l'allarme si resetta automaticamente. La prossima volta che la temperatura supera la soglia, il buzzer ripartirà.

### Il Pulsante di Silenziamento

Il pulsante viene letto **ad ogni iterazione di `loop()`**, indipendentemente dal timer del sensore. Questo garantisce che la risposta alla pressione sia istantanea. Quando viene premuto:

- Il buzzer si spegne immediatamente con `noTone()`
- Viene utilizzata una variabile booleana per imperdire al buzzer di ripartire finché la temperatura non scende sotto la soglia

:::note[Libreria necessaria]
Questo progetto richiede la libreria **DHT sensor library** di Adafruit installata nell'Arduino IDE.
:::
