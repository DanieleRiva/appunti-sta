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

`millis()` restituisce sempre un valore `unsigned long` e le variabili che lo memorizzano devono essere dello stesso tipo. Ma perché?

Arduino si accende e inizia a contare i millisecondi, se girasse quindi per molte ore, quel contatore diventerebbe un numero enorme e con un `int` normale si arriverebbe a un **overflow**: il numero supera il massimo consentito e riparte da zero, dopo appena **32 secondi** (numero max di `int` è ~32k, quindi ~32 secondi). Chiaramente inutilizzabile.

Serve quindi un tipo più capiente. La parola chiave `unsigned` sposta tutta la capacità del tipo sui soli numeri positivi (il tempo non può essere negativo), raddoppiando il range disponibile. Combinata con `long`, che occupa il doppio della memoria di `int`, si ottiene un contatore che regge fino a circa **4 miliardi di millisecondi**, equivalenti a quasi **50 giorni** di funzionamento continuo.

| Tipo            | Range                             | Overflow dopo... |
| :-------------- | :-------------------------------- | :--------------- |
| `int`           | da -32.768 a 32.767               | ~32 secondi      |
| `unsigned int`  | da 0 a 65.535                     | ~65 secondi      |
| `long`          | da -2.147.483.648 a 2.147.483.647 | ~24 giorni       |
| `unsigned long` | da 0 a 4.294.967.295              | ~49 giorni       |

:::danger[Usare sempre `unsigned long` con `millis()`]
Usare `int` o `long` al posto di `unsigned long` per memorizzare valori di `millis()` causerebbe calcoli sbagliati non appena il contatore supera il massimo del tipo scelto.
:::

---

## Logica: Confrontare il Tempo

Invece di dire ad Arduino _"aspetta 1 secondo"_, gli diciamo: _"ogni volta che è passato almeno 1 secondo dall'ultima volta che hai eseguito questa azione, eseguila di nuovo... e ricorda quando l'hai fatto."_

```cpp
unsigned long lastBlink = 0; // Momento dell'ultima esecuzione

void loop() {
  if (millis() - lastBlink >= 1000) { // È passato almeno 1 secondo dall'ultima volta?
    lastBlink = millis();              // Sì -> aggiorno il tempo di ultima esecuzione
    // ... eseguo qualcosa
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
#define LED1 13
#define LED2 12
#define button 11

unsigned long lastBlink = 0;
unsigned long lastBlink2 = 0;
unsigned long lastPress = 0;
bool blinkState2 = false;

void setup() {
  Serial.begin(9600);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
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

Ogni evento ha la sua variabile `unsigned long` che memorizza **l'ultimo momento in cui quell'evento si è verificato**. Sono dichiarate fuori da tutte le funzioni perché devono mantenere il loro valore tra una chiamata di `loop()` e la successiva; se fossero dentro `led1()` o `led2()`, verrebbero azzerate a ogni iterazione.

### `loop()` come direttore d'orchestra

```cpp
void loop() {
  led1();
  led2();
  press();
}
```

Il `loop()` è volutamente vuoto di logica: si limita a chiamare le tre funzioni. Ognuna porta avanti il proprio compito in modo indipendente, senza bloccare le altre.

Facendo in questo modo, il codice rimane pulito, ordinato e facilmente leggibile.

### Il Toggle di LED1

```cpp
digitalWrite(LED1, !digitalRead(LED1));
```

Questa riga è scritta in modo compatto ma nasconde tre operazioni che Arduino esegue in sequenza, dall'interno verso l'esterno:

1. **`digitalRead(LED1)`**: legge lo stato attuale del pin: restituisce `HIGH` se il LED è acceso, `LOW` se è spento
2. **`!`**: inverte quel valore in modo che `HIGH` diventa `LOW` e `LOW` diventa `HIGH`
3. **`digitalWrite(LED1, ...)`**: scrive il risultato invertito sullo stesso pin

In pratica, ogni volta che questa riga viene eseguita, il LED cambia stato: se era acceso si spegne, se era spento si accende, senza bisogno di una variabile di appoggio separata.

### Il Toggle di LED2

```cpp
blinkState2 = !blinkState2;
if (blinkState2 == true) {
  digitalWrite(LED2, HIGH);
} else {
  digitalWrite(LED2, LOW);
}
```

Questa logica fa la stessa cosa del Toggle per il LED1, ma in maniera meno compatta a cui siamo stati abituati fino ad ora: usa una variabile `bool` dedicata per tenere traccia dello stato. È più esplicita ma lunga e dispersiva; utile quando lo stato del LED serve anche altrove nel programma.

In questo codice sono state implementate entrambe le modalità del toggle per mostrare diverse opzioni; ovviamente si può implementare quella che si ritiene più comoda.

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

Per gestire il rimbalzo del pulsante si potrebbe essere tentati di usare `delay(200)` dopo la lettura, come sempre fatto fino ad ora. Il problema è quello già visto: durante quei 200ms Arduino si blocca completamente, e `led1()` e `led2()` smettono di girare. I LED si fermerebbero per 250ms ad ogni pressione del pulsante.

Usando `millis()` invece, il controllo del tempo non blocca nulla. Ad ogni iterazione di `loop()`, il nostro metodo `press()` controlla semplicemente se sono passati 200ms dall'ultima pressione rilevata: se non sono passati, esce immediatamente e lascia lavorare `led1()` e `led2()` senza interruzioni. I tre eventi rimangono completamente indipendenti.

---

## Il Pattern da Memorizzare

Lo schema di `millis()` è sempre lo stesso per qualsiasi evento temporizzato:

```cpp
unsigned long lastEvent = 0;    // 1. Variabile globale inizializzata a 0
const long interval = 1000;    // 2. Intervallo desiderato in ms

void loop() {
  if (millis() - lastEvent >= interval) {   // 3. È passato abbastanza tempo?
    lastEvent = millis();                   // 4. Se si, aggiorna il riferimento
    // 5. Esegui l'azione
  }
}
```