---
title: setup()
description: A cosa serve setup(), come si configura la comunicazione seriale e come si dichiarano i pin come INPUT o OUTPUT.
---

## 🏗️ La Struttura Obbligatoria di Arduino

Ogni programma Arduino ha una struttura fissa e obbligatoria: deve contenere **due funzioni speciali** che Arduino si aspetta sempre di trovare.

```cpp
void setup() {
  // Eseguita UNA SOLA VOLTA all'avvio
}

void loop() {
  // Eseguita IN LOOP per sempre
}
```

Queste due funzioni non le chiamiamo noi: le esegue **Arduino stesso**, automaticamente. In questo capitolo ci concentriamo sulla prima: `setup()`.

---

## 🔧 La Funzione `setup()`

`setup()` è la funzione di **configurazione**. Viene eseguita **una volta sola**, subito dopo che Arduino si accende. Il suo scopo è preparare tutto il necessario prima che il programma inizia.

### Analogia: aprire un negozio al mattino

Prima di aprire un negozio, il titolare fa una serie di operazioni: accende le luci, sblocca il registratore di cassa, sistema le vetrine. Lo fa **una sola volta**, al mattino, poi il negozio lavora normalmente per il resto della giornata. `setup()` è esattamente questo: la routine di apertura.

---

## 📋 Cosa si fa dentro `setup()`?

### 1. Avviare la Comunicazione Seriale

La **Porta Seriale** è il canale di comunicazione tra Arduino e il computer tramite il cavo USB. Permette di inviare messaggi di testo dal programma Arduino verso il computer, visibili nell'**IDE** attraverso il Monitor Seriale. È strumento importante per inviare messaggi e comunicare con Arduino.

```cpp
void setup() {
  Serial.begin(9600); // Avvia la comunicazione a 9600 bit/secondo
}
```

Il numero `9600` è la **velocità di trasmissione** (baud rate). Non è importante capirne il dettaglio adesso: basta sapere che per poter utilizzare il Monitor Seriale bisogna scrivere questo comando dentro il `setup()`.

Per inviare messaggi si usano poi due comandi, usabili in qualsiasi punto del programma:

```cpp
Serial.println("Ciao mondo"); // Stampa il testo e va a capo
Serial.print("Senza newline"); // Stampa il testo senza andare a capo
```

:::note[A cosa serve davvero?]
La comunicazione seriale è lo strumento principale per il **debug**, ovvero trovare e correggere errori nel codice. Quando qualcosa non funziona come previsto, si inseriscono delle `Serial.println()` in posizioni strategiche per capire cosa sta succedendo dentro Arduino passo per passo.
:::

### 2. Configurare i Pin: `pinMode()`

I pin digitali di Arduino possono funzionare sia come **uscite** (OUTPUT) per controllare componenti come i LED, sia come **ingressi** (INPUT) per leggere lo stato di componenti come i pulsanti.

Arduino però non sa da solo quale componente gli abbiamo collegato: bisogna dirglielo esplicitamente usando `pinMode()`.

```cpp
// Sintassi: pinMode(pin, modalità);

pinMode(5, OUTPUT); // Il pin 5 è configurato come USCITA
pinMode(3, INPUT);  // Il pin 3 è configurato come INGRESSO
```

Ovviamente, usando le costanti `#define` definite in cima al file il codice risulta molto più leggibile. Inoltre, se dovessimo cambiare il collegamento, ci basterà modificare il valore dentro la `#define`, anziché modificare ogni singolo numero in tutto il codice.

```cpp
#define LED_PIN 5
#define BUTTON_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}
```

---

## 🎮 Controllare un Componente

Un pin configurato come `OUTPUT` può essere **acceso** (corrente alta) o **spento** (corrente bassa) usando il comando `digitalWrite()`.

```cpp
digitalWrite(LED_PIN, HIGH); // Accende il LED (5V)
digitalWrite(LED_PIN, LOW);  // Spegne il LED (0V)
```

## 📖 Leggere un Componente

Un pin configurato come `INPUT` può essere **letto** per sapere se c'è corrente o meno, usando `digitalRead()`. Il risultato sarà `HIGH` (pulsante premuto) oppure `LOW` (pulsante non premuto).

```cpp
int stato = digitalRead(BUTTON_PIN);

if (stato == HIGH) {
  Serial.println("Pulsante premuto!");
}
```

:::note[HIGH & LOW]
In C++ con Arduino, HIGH e LOW corrispondono a "***corrente***" e "***non corrente***", ma corrisponde anche a valori numerici "***1***" e "***0***".
:::

---

## ✅ Esempio Completo

```cpp
#define LED_PIN   5
#define BUTTON_PIN 3

void setup() {
  Serial.begin(9600);         // Avvia la seriale
  pinMode(LED_PIN, OUTPUT);   // LED come uscita
  pinMode(BUTTON_PIN, INPUT); // Pulsante come ingresso
  
  Serial.println("Arduino pronto!"); // Messaggio di conferma
}

void loop() {
  // Il programma vero e proprio va qui
}
```

:::danger[Regola fondamentale]
Ogni pin usato nel programma **deve** essere configurato con `pinMode()` dentro `setup()`. Dimenticare questa configurazione è una delle cause più comuni di comportamenti errati nel programma.
:::