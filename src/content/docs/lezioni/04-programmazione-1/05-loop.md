---
title: loop()
description: Come funziona il cuore pulsante di ogni sketch Arduino e perché il ciclo infinito è la base di qualsiasi progetto.
---

## ❤️ Il Cuore di Arduino

Dopo che `setup()` ha terminato il suo lavoro, Arduino passa all'esecuzione di `loop()` e non ne uscirà mai, a meno che non lo spegniamo.

`loop()` è una funzione che Arduino **ripete all'infinito**, dall'inizio alla fine, in un ciclo senza mai fermarsi.

---

## ▶️ Come funziona in pratica

```cpp
void loop() {
  // 1. Arduino esegue queste istruzioni, una per una, dall'alto verso il basso
  // 2. Arriva alla parentesi graffa chiusa }
  // 3. Riparte dall'inizio, immediatamente
  // 4. Ripete per sempre
}
```

La ripetizione del `loop()` è estremamente veloce: Arduino può eseguire milioni di istruzioni al secondo. Un `loop()` vuoto gira migliaia di volte al secondo.

---

## 🔍 Un Esempio Concreto

Questo programma legge continuamente lo stato di un pulsante e, se premuto, accende un LED.

```cpp
#define LED_PIN 5       // Costante per il LED
#define BUTTON_PIN 3    // Costante per il bottone

void setup() {
  Serial.begin(9600);           // Inizializzazione del Monitor Seriale
  pinMode(LED_PIN, OUTPUT);     // Imposto il LED come OUTPUT
  pinMode(BUTTON_PIN, INPUT);   // Imposto il bottone come INPUT
}

void loop() {
  if (digitalRead(BUTTON_PIN) == HIGH) {    // Leggo il pulsante
    digitalWrite(LED_PIN, HIGH);            // Pulsante premuto -> LED acceso
    delay(250);                             // debounce
  } else {
    digitalWrite(LED_PIN, LOW);             // Pulsante non premuto -> LED spento
  }
}
```

Vedremo più avanti cosa sono `if` e `else`. <br>
Senza il `loop()`, Arduino leggerebbe il pulsante **una volta sola** all'avvio e poi si fermerebbe. Grazie al ciclo, invece, la lettura avviene continuamente e il LED risponde in tempo reale a ogni pressione.

## ⚠️ Problema del Debounce
Quando si preme un pulsante fisico, ci si aspetta un segnale pulito: prima LOW, poi HIGH. In realtà, le lamelle metalliche interne al pulsante non si toccano in modo netto - **rimbalzano** meccanicamente per qualche millisecondo, producendo una raffica di segnali HIGH e LOW rapidissimi prima di stabilizzarsi.

Per Arduino, che legge milioni di volte al secondo all'interno del `loop()`, ogni rimbalzo sembra una pressione separata. Un singolo click fisico può quindi essere interpretato come 10, 20 o 30 pressioni diverse.

Il **debounce** risolve il problema ignorando tutti i segnali successivi al primo per una determinata finestra di tempo. In questo momento, dato che abbiamo a che fare con programmi semplici, è sufficiente inserire un `delay(250)` dopo aver letto il bottone. Tuttavia, la soluzione migliore sarà utilizzare `millis()`, che vedremo più avanti.

---

## 🧹 Tenere `loop()` Pulito

Quando il programma diventa più complesso, può essere tentante mettere tutto il codice dentro `loop()`. Questo lo rende però lungo, difficile da leggere e da correggere.

La buona pratica è usare `loop()` come un **direttore d'orchestra**: breve, chiaro, il cui unico compito consiste nel chiamare altre funzioni che invece svolgono il vero lavoro.

```cpp
// ❌ Difficile da leggere
void loop() {
  // 50 righe di codice tutte insieme...
}

// ✅ Chiaro e organizzato
void loop() {
  leggiSensori();
  aggiornaLED();
  inviaSerial();
}
```

---

## ⏱️ Comando `delay()`

A volte si vuole bloccare intenzionalmente l'esecuzione del programma. Il comando `delay()` mette in **pausa** Arduino per un numero di millisecondi specificato (1 secondo = 1000 millisecondi).

```cpp
void loop() {
  digitalWrite(LED_PIN, HIGH); // Accende il LED
  delay(1000);                 // Aspetta 1 secondo
  digitalWrite(LED_PIN, LOW);  // Spegne il LED
  delay(1000);                 // Aspetta 1 secondo
  // Ricomincia nel loop() -> il LED lampeggia ogni secondo
}
```

:::danger[Il problema di `delay()`]
Durante un `delay()`, Arduino **si blocca completamente** e non fa assolutamente niente. Non legge pulsanti, non aggiorna variabili, non esegue altre istruzioni. Per programmi semplici va bene, ma non appena si vuole fare più cose contemporaneamente, `delay()` diventa un problema. La soluzione è utilizzare il comando `millis()`, ma verrà spiegato più avanti in quanto complicato da comprendere all'inzio del percorso di programmazione.
:::