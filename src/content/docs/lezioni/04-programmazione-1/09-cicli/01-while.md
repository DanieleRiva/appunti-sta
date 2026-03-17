---
title: while
description: Come ripetere un blocco di istruzioni finché una condizione rimane vera, con il ciclo while e la sua variante do-while.
---

## Ripetere senza sapere quante volte

Fino ad ora, le istruzioni che abbiamo scritto vengono eseguite una volta sola (a meno che non stiano dentro `loop()` che le ripete all'infinito). Ma spesso si ha bisogno di ripetere qualcosa un numero di volte **non definito in anticipo**, finché una certa condizione rimane vera.

*"Continua ad aspettare un comando dall'utente finché non ne arriva uno valido."*
*"Continua a leggere dati dal sensore finché il valore non supera la soglia."*

Per questo esiste il ciclo `while`.

---

## La Sintassi di `while`

```cpp
// Sintassi:
// while (condizione) {
//   istruzioni ripetute finché la condizione è vera
// }

int contatore = 0;

while (contatore < 5) {
  Serial.println(contatore);
  contatore++; // Incrementa il contatore di 1
}
// Stamperà: 0, 1, 2, 3, 4
```

### Il flusso di esecuzione

1. Arduino **valuta la condizione**
2. Se è **vera** -> esegue il blocco, poi torna al punto 1
3. Se è **falsa** -> salta il blocco e prosegue con il codice successivo

### Analogia: sveglia

Immagina una sveglia che suona ogni mattina. Il suo "programma" è: *"Finché non è ancora l'ora di svegliarsi, aspetta. Quando arriva l'ora, suona."* Il `while` funziona allo stesso modo: controlla la condizione, e finché è vera continua a eseguire il blocco.

---

## L'operatore `++` e `--`

Dentro i cicli si usa spessissimo l'operatore di **incremento** `++` e di **decremento** `--`. Sono abbreviazioni comode:

```cpp
contatore++;  // Equivale a: contatore = contatore + 1
contatore--;  // Equivale a: contatore = contatore - 1
```

---

## ⚠️ Il Ciclo Infinito

Se la condizione di un `while` non diventa mai falsa, il ciclo gira all'infinito e il programma si blocca lì, senza poter fare altro.

```cpp
// ❌ ATTENZIONE: ciclo infinito!
int x = 0;
while (x < 10) {
  Serial.println(x);
  // x non viene mai incrementato -> la condizione è sempre vera
}
```

:::danger[Controlla sempre l'uscita]
Prima di scrivere un `while`, chiediti sempre: *"Cosa farà sì che la condizione diventi falsa?"* Se non riesci a rispondere, probabilmente stai per creare un ciclo infinito. Assicurati sempre che il valore controllato nella condizione venga modificato all'interno del blocco.
:::

---

## `while (true)`: Ciclo Infinito Intenzionale

A volte un ciclo infinito è **voluto**: si scrive esplicitamente `while (true)`.

```cpp
while (true) {
  int lettura = digitalRead(BUTTON_PIN);
  
  if (lettura == HIGH) {
    Serial.println("Pulsante premuto, uscita dal ciclo.");
    
  }
}

Serial.println("Questo non verrà mai stampato.");
```

:::note[`while(true)` e `loop()`]
`loop()` è tecnicamente un `while (true)` gestito da Arduino.
:::

---

## Esempio Pratico: Attesa di un Segnale

```cpp
#define BUTTON_PIN 3
#define LED_PIN 5

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("In attesa che il pulsante venga premuto...");

  // Aspetta qui finché il pulsante non viene premuto
  while (digitalRead(BUTTON_PIN) == LOW) {
    // Non fa nulla, aspetta solo
  }

  Serial.println("Pulsante premuto! Proseguo.");
  digitalWrite(LED_PIN, HIGH);
}

void loop() {
  // Il programma arriva qui solo dopo che il pulsante è stato premuto
}
```