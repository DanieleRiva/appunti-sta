---
title: Display a 7 Segmenti
description: Come funziona, come si collega e come si programma un display a 7 segmenti con Arduino.
---

## Cos'è un Display a 7 Segmenti?

Un display a 7 segmenti è semplicemente un insieme di **8 LED normali** (7 segmenti + il punto decimale) racchiusi in una scatola di plastica e disposti a formare una cifra. Probabilmente li hai già visti in vita tua nei supermercati per mostrare il numero della persona in attesa, nelle sveglie digitali, nei display industriali.

Ogni segmento ha un nome preciso, dalla lettera **A** alla lettera **G**, più **DP** per il punto decimale:

```
     A
   -----
F |     | B
   --G--
E |     | C
   -----
     D    · DP
```

Per disegnare un numero si accendono solo i segmenti necessari. Per fare il numero **"1"** si accendono i segmenti B e C, mentre per fare il numero **"8"** si accendono tutti. Per fare il numero **"3"** si accendono A, B, G, C e D.

---

## Catodo Comune vs Anodo Comune

Prima di collegare qualsiasi cosa, bisogna sapere che esistono **due varianti** di display a 7 segmenti, confonderle significa avere un display che non funziona o che mostra cifre invertite.

La differenza sta nel piedino **COM** (Comune), quello centrale:

### Catodo Comune (Common Cathode)
Il COM è collegato al **GND** (negativo). Per accendere un segmento si porta il suo pin a **HIGH** (5V).

```cpp
digitalWrite(pinA, HIGH); // Segmento A acceso ✅
digitalWrite(pinA, LOW);  // Segmento A spento
```

### Anodo Comune (Common Anode)
Il COM è collegato al **5V** (positivo). La logica è **invertita**: per accendere un segmento si porta il suo pin a **LOW** (0V).

```cpp
digitalWrite(pinA, LOW);  // Segmento A acceso ✅
digitalWrite(pinA, HIGH); // Segmento A spento
```

:::danger[Prima di scrivere codice]
Verificare quale delle due modalità è selezionata. Nelle esercitazioni useremo per comodità e facilità il **Catodo Comune**.
:::

---

## Collegamento

Il display ha **10 piedini** (5 nella fila superiore, 5 in quella inferiore). Ecco come collegarli:

**Il Comune (COM):** il piedino centrale di entrambe le file è il COM. Va collegato al **GND** di Arduino tramite una **resistenza da 220Ω**. I due COM sono collegati internamente, quindi basta usarne uno.

**I Segmenti (A-G e DP):** gli altri 8 piedini controllano i singoli segmenti e vanno collegati a 7 (o 8, se si vuole usare anche il punto) **pin digitali** di Arduino. Una scelta comoda è usare i pin dal 2 all'8.

---

## Codice

### Definire i Pin

Come sempre, i pin vanno dichiarati con `#define` in cima al file:

```cpp
#define PIN_A  2
#define PIN_B  3
#define PIN_C  4
#define PIN_D  5
#define PIN_E  6
#define PIN_F  7
#define PIN_G  8
```

### Setup

```cpp
void setup() {
  pinMode(PIN_A, OUTPUT);
  pinMode(PIN_B, OUTPUT);
  pinMode(PIN_C, OUTPUT);
  pinMode(PIN_D, OUTPUT);
  pinMode(PIN_E, OUTPUT);
  pinMode(PIN_F, OUTPUT);
  pinMode(PIN_G, OUTPUT);
}
```

### Scrivere una Cifra

Controllare i segmenti è identico al controllo di un LED normale. Per scrivere il numero **"3"** (segmenti A, B, G, C, D accesi):

```cpp
digitalWrite(PIN_A, HIGH);
digitalWrite(PIN_B, HIGH);
digitalWrite(PIN_C, HIGH);
digitalWrite(PIN_D, HIGH);
digitalWrite(PIN_E, LOW);
digitalWrite(PIN_F, LOW);
digitalWrite(PIN_G, HIGH);
```

### Usare le Funzioni per Ogni Cifra

Scrivere sette `digitalWrite()` ogni volta che si vuole mostrare un numero diventa rapidamente caotico. La soluzione naturale è creare **una funzione per ogni cifra**:

```cpp
void spegniTutto() {
  digitalWrite(PIN_A, LOW);
  digitalWrite(PIN_B, LOW);
  digitalWrite(PIN_C, LOW);
  digitalWrite(PIN_D, LOW);
  digitalWrite(PIN_E, LOW);
  digitalWrite(PIN_F, LOW);
  digitalWrite(PIN_G, LOW);
}

void scriviZero() {
  spegniTutto();
  digitalWrite(PIN_A, HIGH);
  digitalWrite(PIN_B, HIGH);
  digitalWrite(PIN_C, HIGH);
  digitalWrite(PIN_D, HIGH);
  digitalWrite(PIN_E, HIGH);
  digitalWrite(PIN_F, HIGH);
}

void scriviUno() {
  spegniTutto();
  digitalWrite(PIN_B, HIGH);
  digitalWrite(PIN_C, HIGH);
}

void scriviDue() {
  spegniTutto();
  digitalWrite(PIN_A, HIGH);
  digitalWrite(PIN_B, HIGH);
  digitalWrite(PIN_G, HIGH);
  digitalWrite(PIN_E, HIGH);
  digitalWrite(PIN_D, HIGH);
}

void scriviTre() {
  spegniTutto();
  digitalWrite(PIN_A, HIGH);
  digitalWrite(PIN_B, HIGH);
  digitalWrite(PIN_G, HIGH);
  digitalWrite(PIN_C, HIGH);
  digitalWrite(PIN_D, HIGH);
}
```

La funzione `spegniTutto()` all'inizio di ogni cifra garantisce che i segmenti della cifra precedente vengano spenti prima di accendere quelli nuovi.

Il `loop()` risultante è quindi pulito e leggibile:

```cpp
void loop() {
  scriviZero();
  delay(1000);
  scriviUno();
  delay(1000);
  scriviDue();
  delay(1000);
  scriviTre();
  delay(1000);
}
```