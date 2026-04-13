---
title: Sensore di Temperatura
description: Come collegare e leggere il sensore di temperatura TMP36 con Arduino, con la formula di conversione del segnale analogico.
---

## Il Sensore di Temperatura

Il sensore che utilizziamo è il **TMP36**, un componente che misura la temperatura dell'ambiente circostante e la restituisce sotto forma di segnale elettrico. È uno dei sensori più semplici e diffusi in ambito Arduino: tre piedini, nessuna libreria necessaria, collegamento diretto.

:::note[TMP36 su Tinkercad vs DHT11 reale]
Il sensore fisico reale spesso usato nei kit Arduino è il **DHT11**, che misura sia la **temperatura** che l'**umidità**. Su Tinkercad, il componente disponibile è il **TMP36**, che misura la **sola temperatura**. I collegamenti e la logica di lettura sono identici, ma il DHT11 reale richiede una libreria dedicata per gestire anche l'umidità. Per ora lavoriamo con il TMP36 su Tinkercad.
:::

---

## Collegamento

Il TMP36 ha **3 piedini**, che vanno collegati in questo ordine guardando il componente da sinistra a destra:

| Piedino | Collegamento |
|:---:|:---|
| Sinistro | **5V** (alimentazione) |
| Centrale | **Pin analogico** di Arduino (es. A0) |
| Destro | **GND** (massa) |

---

## Analogico vs Digitale - Ripasso

Abbiamo già visto che i pin digitali ragionano in termini di **acceso o spento**: HIGH (5V) oppure LOW (0V), nient'altro. Un LED si accende o si spegne, un pulsante è premuto o non lo è; valori netti e binari.

La temperatura ovviamente non funziona così. Non è "fa caldo" oppure "fa freddo": può essere 18.3°C, 24.7°C, 31.1°C, ecc..., ovvero un valore continuo con infinite possibilità intermedie. Per rappresentare questo tipo di informazione serve un **pin analogico**.

I pin analogici di Arduino (da **A0** ad **A5**) non leggono solo 0 o 1, ma un valore intero compreso tra **0 e 1023**, proporzionale alla tensione presente sul pin (da 0V a 5V). Più la temperatura è alta, più tensione produce il sensore, più alto sarà il numero letto da `analogRead()`.

---

## Leggere il Sensore: `analogRead()`

Per leggere il valore grezzo del sensore si usa `analogRead()`:

```cpp
#define TEMP_PIN A0

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valoreGrezzo = analogRead(TEMP_PIN);
  Serial.println(valoreGrezzo); // Stampa un numero tra 0 e 1023
  delay(1000);
}
```

Il problema è che `1023` non significa nulla in termini di temperatura: bisogna convertire il numero in gradi Celsius.

---

## La Formula di Conversione

Il valore restituito da `analogRead()` va convertito in temperatura applicando questa formula:

```
Temperatura (°C) = ( analogRead() × (5.0 / 1024.0) - 0.5 ) × 100
```

In codice:

```cpp
#define TEMP_PIN A0

void setup() {
  Serial.begin(9600);
}

void loop() {
  int valoreGrezzo = analogRead(TEMP_PIN);
  float temperatura = (valoreGrezzo * 5.0 / 1024.0 - 0.5) * 100.0;

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  delay(1000);
}
```

:::note[Perché `float` e non `int`?]
La temperatura risultante dalla formula ha la virgola (es. 23.4°C). Bisogna quindi usare `float` per la variabile che la contiene, altrimenti la parte decimale verrebbe troncata e si perderebbe precisione.
:::

---

## Esempio Completo con Soglia di Allarme

```cpp
#define TEMP_PIN   A0
#define LED_VERDE  9
#define LED_ROSSO  10
#define SOGLIA     28.0  // Gradi oltre i quali scatta l'allarme

void setup() {
  Serial.begin(9600);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_ROSSO, OUTPUT);
}

void loop() {
  float temperatura = leggiTemperatura();

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  if (temperatura > SOGLIA) {
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_ROSSO, HIGH);
    Serial.println("ATTENZIONE: temperatura elevata!");
  } else {
    digitalWrite(LED_ROSSO, LOW);
    digitalWrite(LED_VERDE, HIGH);
  }

  delay(1000);
}

float leggiTemperatura() {
  int valoreGrezzo = analogRead(TEMP_PIN);
  return (valoreGrezzo * 5.0 / 1024.0 - 0.5) * 100.0;
}
```

La lettura del sensore è raccolta in una funzione dedicata `leggiTemperatura()` che restituisce direttamente un `float` - così il `loop()` rimane pulito e la formula è scritta in un posto solo.