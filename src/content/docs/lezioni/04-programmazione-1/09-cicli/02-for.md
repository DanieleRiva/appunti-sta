---
title: for
description: Come ripetere un blocco di istruzioni un numero preciso di volte con il ciclo for, il più usato per iterazioni contate.
---

## Ripetere un Numero Preciso di Volte

Il ciclo `while` è perfetto quando non si sa in anticipo quante volte ripetere qualcosa. Ma spesso il numero di ripetizioni è **noto fin dall'inizio**:

*"Fai lampeggiare il LED 10 volte."*
*"Stampa i numeri da 1 a 100."*
*"Esegui questa operazione per ogni elemento di una lista."*

Per questi casi esiste il ciclo `for`, che raccoglie in una sola riga tutto ciò che serve per gestire un contatore.

---

## La Sintassi del `for`

```cpp
// Sintassi:
// for (inizializzazione; condizione; aggiornamento) {
//   istruzioni ripetute
// }

for (int i = 0; i < 5; i++) {
  Serial.println(i);
}
// Stamperà: 0, 1, 2, 3, 4
```

Le tre parti dentro le parentesi, separate da `;`, hanno ciascuna un ruolo preciso:

| Parte | Cosa fa | Quando viene eseguita |
|:---|:---|:---|
| `int i = 0` | **Inizializzazione**: crea e imposta il contatore | Una volta sola, all'inizio |
| `i < 5` | **Condizione**: controlla se continuare | Prima di ogni iterazione |
| `i++` | **Aggiornamento**: modifica il contatore | Dopo ogni iterazione |

### Analogia: conto alla rovescia

*"5, 4, 3, 2, 1."* La conta ha un punto di partenza (5), una condizione di fine (quando si arriva a 1), e un passo fisso (si aggiunge 1 ogni volta). Il `for` funziona esattamente così.

---

## Il Confronto con `while`

Questi due cicli fanno esattamente la stessa cosa:

```cpp
// Con while:
int i = 0;
while (i < 5) {
  Serial.println(i);
  i++;
}

// Con for (equivalente, ma tutto in una riga):
for (int i = 0; i < 5; i++) {
  Serial.println(i);
}
```

Il `for` è preferito quando il numero di iterazioni è noto, perché tiene tutto il meccanismo del contatore in un posto solo, rendendo il codice più leggibile e meno soggetto a errori (come dimenticare l'`i++` nel `while`).

---

## Esempi

### Contare al contrario

```cpp
for (int i = 10; i > 0; i--) {
  Serial.println(i);
}
// Stamperà: 10, 9, 8, ..., 1
```

### Stampa solo i numeri pari da 0 a 10

```cpp
// Stampa solo i numeri pari da 0 a 10
for (int i = 0; i <= 10; i += 2) {
  Serial.println(i);
}
// Stamperà: 0, 2, 4, 6, 8, 10
```

`i += 2` è una scrittura abbreviata per `i = i + 2`.

### Conto alla rovescia

```cpp
for (int i = 10; i >= 0; i--) {
  Serial.println(i);
  delay(1000);
}
// Stamperà: 10, 9, 8, 7, 6, ... ogni secondo
```

---

## Esempio Pratico: LED che Lampeggia N Volte

Una funzione che fa lampeggiare un LED un numero preciso di volte è un caso d'uso classico del `for`:

```cpp
#define LED_PIN 5
int nBlinks;

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void lampeggia() {
  for (int i = 0; i < nBlinks; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }
}

void loop() {
  nBlinks = 3;
  lampeggia();  // Fa lampeggiare il LED 3 volte
  delay(1000);

  nBlinks = 5;
  lampeggia(5);  // Poi 5 volte
}
```

:::note[Il nome della variabile `i`]
Per convenzione universale, il contatore di un `for` si chiama `i` (da *index*, indice). <br>
Non è obbligatorio, ma è lo stile seguito dai programmatori e rende il codice più leggibile.
:::

:::danger[Off-by-one]
L'errore più comune con i cicli `for` è sbagliare di uno il numero di iterazioni:
* `i < 5` → esegue per 0, 1, 2, 3, 4 → **5 iterazioni**
* `i <= 5` → esegue per 0, 1, 2, 3, 4, 5 → **6 iterazioni**
:::