---
title: Buzzer Passivo
description: Come funziona un buzzer passivo, come si collega ad Arduino e come si genera suono con le funzioni tone() e noTone().
---

## Cos'è un Buzzer?

Un buzzer è un componente che converte un segnale elettrico in suono. Ne esistono due tipi, che sembrano identici dall'esterno ma funzionano in modo completamente diverso:

- **Buzzer Attivo**: contiene già un oscillatore interno. Basta alimentarlo e produce sempre lo stesso suono fisso. Semplice, ma non controllabile.
- **Buzzer Passivo**: non ha oscillatore interno. È essenzialmente un altoparlante miniaturizzato: produce suono solo se gli si invia un segnale che varia rapidamente. Questo significa che possiamo **scegliere la frequenza**, e quindi la **nota musicale**.

Nelle nostre esercitazioni useremo il **buzzer passivo**, perché ci permette di controllare il tono del suono dal codice.

---

## Collegamento

Il buzzer passivo ha due piedini:

|               Piedino               | Collegamento            |
| :---------------------------------: | :---------------------- |
| `+` (positivo, spesso il più lungo) | Pin digitale di Arduino |
|           `-` (negativo)            | **GND**                 |

Non è necessaria una resistenza. Il pin digitale si collega direttamente al buzzer.

```cpp
#define BUZZER_PIN 3
```

---

## Le Funzioni: `tone()` e `noTone()`

Arduino mette a disposizione due funzioni dedicate per il buzzer passivo:

### `tone()`: Avvia il suono

```cpp
// Sintassi:
tone(pin, frequenza);           // Suona indefinitamente
tone(pin, frequenza, durata);   // Suona per una durata in millisecondi
```

La **frequenza** si misura in **Hz** (Hertz) e determina la nota musicale: più è alta, più il suono è acuto.

```cpp
tone(BUZZER_PIN, 440);    // La4: il classico diapason
tone(BUZZER_PIN, 1000);   // Suono acuto di allarme
tone(BUZZER_PIN, 200);    // Suono grave
```

### `noTone()`: Ferma il suono

```cpp
noTone(BUZZER_PIN); // Spegne il suono immediatamente
```

`tone()` senza durata suona **finché non viene chiamato `noTone()`**. Non si spegne da solo.

:::danger[Spegnere sempre il suono esplicitamente]
Se si usa `tone()` senza il parametro durata, il buzzer continua a suonare anche dopo che il codice è andato avanti. Ricordarsi sempre di chiamare `noTone()` nel momento giusto, altrimenti il suono non si fermerà mai.
:::

---

### Frequenze delle Note Musicali (Quarta Ottava)

| Nota (Italiano) | Nota (Anglosassone) | Freq. Arrotondata (Hz) | Freq. Esatta (Hz) |
| :--- | :--- | :---: | :---: |
| **Do** | **C4** | 262 | 261.63 |
| Do♯ / Re♭ | C♯4 / D♭4 | 277 | 277.18 |
| **Re** | **D4** | 294 | 293.66 |
| Re♯ / Mi♭ | D♯4 / E♭4 | 311 | 311.13 |
| **Mi** | **E4** | 330 | 329.63 |
| **Fa** | **F4** | 349 | 349.23 |
| Fa♯ / Sol♭ | F♯4 / G♭4 | 370 | 369.99 |
| **Sol** | **G4** | 392 | 392.00 |
| Sol♯ / La♭ | G♯4 / A♭4 | 415 | 415.30 |
| **La** | **A4** | 440 | 440.00 |
| La♯ / Si♭ | A♯4 / B♭4 | 466 | 466.16 |
| **Si** | **B4** | 494 | 493.88 |

---

## Esempi Pratici

### Beep singolo

```cpp
#define BUZZER_PIN 3

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  tone(BUZZER_PIN, 1000, 500); // Suona a 1000 Hz per 500 ms
}

void loop() {}
```

### Allarme alternato con `millis()`

```cpp
#define BUZZER_PIN 3

bool suonoAlto = true;
unsigned long lastSwitch = 0;

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  if (millis() - lastSwitch >= 300) {
    lastSwitch = millis();
    suonoAlto = !suonoAlto;
    if (suonoAlto) {
      tone(BUZZER_PIN, 1200);
    } else {
      tone(BUZZER_PIN, 600);
    }
  }
}
```

### Suono attivato da pulsante

```cpp
#define BUZZER_PIN 3
#define BUTTON_PIN 2

void setup() {
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == HIGH) {
    tone(BUZZER_PIN, 880); // Suona finché il pulsante è premuto
  } else {
    noTone(BUZZER_PIN);    // Silenzio quando si rilascia
  }
}
```