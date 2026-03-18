---
title: millis()
description: Come gestire eventi temporizzati in modo non bloccante usando millis(), per fare più cose contemporaneamente senza fermare Arduino.
---

## Il Limite di `delay()`

Nelle lezioni precedenti abbiamo usato `delay()` per gestire i tempi. Funziona, ma ha un difetto enorme: **blocca tutto**.

Durante un `delay(1000)`, Arduino si congela per un secondo intero: non legge pulsanti, non aggiorna variabili, non esegue altre funzioni.

Questa cosa è accettabile per circuiti semplici, ma nella realtà si vuole spesso fare **più cose contemporaneamente**: far lampeggiare due LED a velocità diverse, leggere un pulsante mentre un LED è in attesa, gestire più eventi con tempistiche indipendenti.

La soluzione è il `millis()`.

---

## Cos'è `millis()`?

`millis()` è una funzione che restituisce il numero di **millisecondi** trascorsi da quando Arduino si è acceso. È un orologio interno che conta senza sosta, indipendentemente da tutto il resto.

```cpp
unsigned long adesso = millis();
Serial.println(adesso); // Stampa i ms trascorsi dall'accensione
```

### Perché `unsigned long`?

`millis()` restituisce sempre un valore `unsigned long`. Le variabili che lo memorizzano devono essere dello stesso tipo. Ma perché proprio questo?

Partiamo dal problema: Arduino si accende e inizia a contare i millisecondi. Se girasse per molte ore, quel contatore diventerebbe un numero enorme. Con un `int` normale si arriverebbe a **overflow** — il numero supera il massimo consentito e riparte da zero — dopo appena **32 secondi**. Chiaramente inutilizzabile.

Serve quindi un tipo più capiente. La parola chiave `unsigned` sposta tutta la capacità del tipo sui soli numeri positivi (il tempo non può essere negativo), raddoppiando il range disponibile. Combinata con `long`, che occupa il doppio della memoria di `int`, si ottiene un contatore che regge fino a circa **4 miliardi di millisecondi** — equivalenti a quasi **50 giorni** di funzionamento continuo.

| Tipo | Range | Overflow dopo... |
|:---|:---|:---|
| `int` | da -32.768 a 32.767 | ~32 secondi |
| `unsigned int` | da 0 a 65.535 | ~65 secondi |
| `long` | da -2.147.483.648 a 2.147.483.647 | ~24 giorni |
| `unsigned long` | da 0 a 4.294.967.295 | ~49 giorni ✅ |

:::danger[Usa sempre `unsigned long` con `millis()`]
Usare `int` o `long` al posto di `unsigned long` per memorizzare valori di `millis()` causerebbe calcoli sbagliati non appena il contatore supera il massimo del tipo scelto. Il comportamento risultante sarebbe un bug sottile e difficilissimo da trovare.
:::

---

## L'Idea: Confrontare il Tempo

Invece di dire ad Arduino *"aspetta 1 secondo"*, gli diciamo: *"ogni volta che è passato almeno 1 secondo dall'ultima volta che hai eseguito questa azione, eseguila di nuovo — e segna quando l'hai fatto."*

```cpp
unsigned long lastBlink = 0; // Momento dell'ultima esecuzione

void loop() {
  if (millis() - lastBlink >= 1000) { // È passato almeno 1 secondo?
    lastBlink = millis();              // Sì → aggiorno il riferimento
    // ... eseguo l'azione
  }
}
```

Il calcolo `millis() - lastBlink` è la differenza tra "adesso" e "l'ultima volta che ho agito": cioè il **tempo trascorso**. Quando questa differenza supera la soglia, è ora di agire di nuovo.

---

## Esempio Completo

Questo programma gestisce tre eventi indipendenti **senza nessun `delay()`**:
- **LED1**: lampeggia ogni **500 ms**
- **LED2**: lampeggia ogni **1000 ms**
- **Pulsante**: rilevato con debounce da **200 ms**

```cpp
#define LED1   13
#define LED2   12
#define button 11

unsigned long lastBlink  = 0;
unsigned long lastBlink2 = 0;
unsigned long lastPress  = 0;
bool blinkState2 = false;

void setup() {
  Serial.begin(9600);
  pinMode(LED1,   OUTPUT);
  pinMode(LED2,   OUTPUT);
  pinMode(button, INPUT);
}

void loop() {
  led1();
  led2();
  press();
}

void led1() {
  if (millis() - lastBlink >= 500) {
    lastBlink = millis();
    digitalWrite(LED1, !digitalRead(LED1));
  }
}

void led2() {
  if (millis() - lastBlink2 >= 1000) {
    lastBlink2 = millis();
    blinkState2 = !blinkState2;
    if (blinkState2 == true) {
      digitalWrite(LED2, HIGH);
    } else {
      digitalWrite(LED2, LOW);
    }
  }
}

void press() {
  if (millis() - lastPress > 200) {
    lastPress = millis();
    if (digitalRead(button) == HIGH) {
      Serial.println("Premuto");
    }
  }
}
```

---

## Analisi del Codice

### Le variabili `lastBlink`, `lastBlink2`, `lastPress`

Ogni evento ha la sua variabile `unsigned long` che memorizza **l'ultimo momento in cui quell'evento si è verificato**. Sono dichiarate fuori da tutte le funzioni perché devono mantenere il loro valore tra una chiamata di `loop()` e la successiva — se fossero dentro `led1()` o `led2()`, verrebbero azzerate a ogni iterazione.

### `loop()` come direttore d'orchestra

```cpp
void loop() {
  led1();
  led2();
  press();
}
```

Il `loop()` è volutamente vuoto di logica: si limita a chiamare le tre funzioni. Ognuna porta avanti il proprio compito in modo indipendente, senza bloccare le altre.

### Il Toggle di LED1

```cpp
digitalWrite(LED1, !digitalRead(LED1));
```

`digitalRead(LED1)` legge lo stato attuale del pin. `!` lo inverte. `digitalWrite` scrive il risultato. In una sola riga, il LED cambia stato senza bisogno di una variabile di appoggio.

### Il Toggle di LED2

```cpp
blinkState2 = !blinkState2;
if (blinkState2 == true) {
  digitalWrite(LED2, HIGH);
} else {
  digitalWrite(LED2, LOW);
}
```

Questa variante usa una variabile `bool` dedicata per tenere traccia dello stato. È più verbosa ma più esplicita — utile quando lo stato del LED serve anche altrove nel programma.

### Il Debounce del Pulsante

```cpp
void press() {
  if (millis() - lastPress > 200) {
    lastPress = millis();
    if (digitalRead(button) == HIGH) {
      Serial.println("Premuto");
    }
  }
}
```

:::note[Cos'è il Debounce?]
Quando si preme un pulsante fisico, ci si aspetta un segnale pulito: prima LOW, poi HIGH. In realtà, le lamelle metalliche interne al pulsante non si toccano in modo netto — **rimbalzano** meccanicamente per qualche millisecondo, producendo una raffica di segnali HIGH e LOW rapidissimi prima di stabilizzarsi.

Per Arduino, che legge milioni di volte al secondo, ogni rimbalzo sembra una pressione separata. Un singolo click fisico può quindi essere interpretato come 10, 20 o 30 pressioni distinte.

Il **debounce** risolve il problema ignorando tutti i segnali successivi al primo per una finestra di tempo (tipicamente 50–200 ms), il tempo sufficiente al pulsante per stabilizzarsi meccanicamente.
:::

---

## Il Pattern da Memorizzare

Lo schema di `millis()` è sempre lo stesso per qualsiasi evento temporizzato:

```cpp
unsigned long lastEvento = 0;    // 1. Variabile globale inizializzata a 0
const long intervallo = 1000;    // 2. Intervallo desiderato in ms

void loop() {
  if (millis() - lastEvento >= intervallo) { // 3. È passato abbastanza tempo?
    lastEvento = millis();                   // 4. Aggiorna il riferimento
    // 5. Esegui l'azione
  }
}
```

Questo pattern va imparato a memoria. Sarà usato in quasi ogni progetto Arduino di media complessità.

:::danger[Non mescolare `delay()` e `millis()`]
Usare `delay()` in un programma che si affida a `millis()` vanifica completamente il vantaggio. Se c'è un `delay()` da qualche parte nel codice, Arduino si blocca ugualmente e i calcoli temporali risulteranno sfasati e imprecisi. La scelta è una: o `delay()` per tutto (programmi semplici a evento singolo), o `millis()` per tutto (programmi che gestiscono più eventi contemporaneamente).
:::