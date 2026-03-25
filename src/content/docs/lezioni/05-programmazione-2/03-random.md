---
title: random()
description: Come generare numeri casuali in Arduino con random() e randomSeed(), e come usarli in modo pratico nei progetti.
---

## Numeri Casuali

A volte un programma ha bisogno di comportarsi in modo imprevedibile, come per esempio estrarre un numero da un dado virtuale, scegliere una sequenza casuale di LED da accendere, generare un quiz con domande in ordine diverso ogni volta, eccetera...

Per fare questo con Arduino abbiamo a disposizione la funzione `random()`.

---

## La Funzione `random()`
```cpp
// Sintassi:
random(max)         // Numero casuale tra 0 e max-1
random(min, max)    // Numero casuale tra min e max-1
```
```cpp
int dado = random(1, 7);   // Simula un dado: da 1 a 6
int moneta = random(2);    // 0 oppure 1 (testa o croce)
int pin = random(2, 9);    // Numero casuale tra 2 e 8
```

:::danger[Range della funzione `random()`]
Notare che il valore massimo è **escluso**: `random(1, 7)` restituisce da 1 a 6, mai 7. Questo perché la funzione `random()` genera un valore casuale tra il minimo e il (massimo - 1).
:::

---

## Esempi Pratici

### Dado Digitale
```cpp
#define BUTTON_PIN 3

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == HIGH) {
    int risultato = random(1, 7);
    Serial.print("Hai tirato: ");
    Serial.println(risultato);
    delay(250);
  }
}
```

### LED Casuale tra Tre
```cpp
#define LED_R 5
#define LED_G 6
#define LED_B 7

void setup() {
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
}

void loop() {
  // Spegni tutti
  digitalWrite(LED_R, LOW);
  digitalWrite(LED_G, LOW);
  digitalWrite(LED_B, LOW);

  // Accendi uno a caso
  int scelta = random(3); // 0, 1 oppure 2
  if (scelta == 0) digitalWrite(LED_R, HIGH);
  if (scelta == 1) digitalWrite(LED_G, HIGH);
  if (scelta == 2) digitalWrite(LED_B, HIGH);

  delay(500);
}
```

### Lampeggio con Intervallo Casuale
```cpp
#define LED_PIN 5

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(random(100, 801));  // Acceso per un tempo casuale tra 100ms e 800ms
  digitalWrite(LED_PIN, LOW);
  delay(random(100, 801));  // Spento per un tempo casuale tra 100ms e 800ms
}
```