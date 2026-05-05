---
title: Display LCD 16x2
description: Come collegare e programmare un display LCD 16x2 con Arduino usando la libreria LiquidCrystal.
---

## Il Display LCD

Il display **LCD 16x2** è uno schermo che può mostrare testo su **2 righe** da **16 caratteri** ciascuna. È uno dei componenti più usati nei progetti Arduino per mostrare informazioni all'utente, come per esempio temperature, punteggi, messaggi, menu, senza dover aprire il Monitor Seriale.

La sigla LCD sta per *Liquid Crystal Display*: lo stesso tipo di tecnologia usata nelle vecchie calcolatrici e nei display digitali.

---

## Componenti Necessari

- 1 Display LCD 16x2
- 1 Potenziometro (da 10kΩ) - per regolare il contrasto
- Cavi di collegamento

---

## Collegamento

Il display LCD ha **16 pin**. Nella tabella seguente sono indicati i collegamenti necessari per il funzionamento standard con Arduino:

| Pin LCD | Nome | Collegamento |
|:---:|:---|:---|
| 1 | **GND** | GND di Arduino |
| 2 | **VCC** | 5V di Arduino |
| 3 | **VO** (contrasto) | Uscita centrale del potenziometro |
| 4 | **RS** | Pin digitale Arduino (es. 11) |
| 5 | **RW** | GND di Arduino |
| 6 | **EN** | Pin digitale Arduino (es. 10) |
| 7-10 | **D0-D3** | Non collegati |
| 11 | **D4** | Pin digitale Arduino (es. 5) |
| 12 | **D5** | Pin digitale Arduino (es. 4) |
| 13 | **D6** | Pin digitale Arduino (es. 3) |
| 14 | **D7** | Pin digitale Arduino (es. 2) |
| 15 | **LED+** | 5V di Arduino (retroilluminazione) con resistenza 220Ω |
| 16 | **LED-** | GND di Arduino (retroilluminazione) |

Il potenziometro va collegato con i due piedini esterni a **5V** e **GND**, e il piedino centrale al **pin VO** del display. Ruotando il potenziometro si regola il contrasto dei caratteri sullo schermo.

:::danger[Pin RW sempre a GND]
Il pin **RW** (Read/Write) va collegato a GND e non ad Arduino. Questo forza il display in modalità di sola scrittura. Se lasciato scollegato, il display può comportarsi in modo imprevedibile.
:::

---

## La Libreria LiquidCrystal

Su Tinkercad, la libreria necessaria per utilizzare il display LCD **LiquidCrystal** è già installata. Va solo inclusa in cima al file:

```cpp
#include <LiquidCrystal.h>
```

### Inizializzazione

Dopo l'inclusione, si crea un oggetto `lcd` specificando i pin nell'ordine: **RS, EN, D4, D5, D6, D7**:

```cpp
#include <LiquidCrystal.h>

#define RS 11
#define EN 10
#define D4 5
#define D5 4
#define D6 3
#define D7 2

LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
```

---

## Setup

Nel `setup()`, si avvia il display dichiarando il numero di colonne e righe (16 e 2):

```cpp
void setup() {
  lcd.begin(16, 2);
}
```

Questo è l'unico passaggio obbligatorio. Non serve `pinMode()` per i pin del display - la libreria se ne occupa autonomamente.

---

## Scrivere sul Display

### `lcd.print()` - Scrivere testo

```cpp
lcd.print("Ciao mondo");   // Testo
lcd.print(42);             // Numero intero
lcd.print(23.5);           // Numero decimale
```

### `lcd.setCursor()` - Posizionare il cursore

Prima di scrivere, si può spostare il cursore in una posizione precisa. Il cursore indica **dove verrà scritto** il prossimo carattere.

```cpp
// Sintassi: lcd.setCursor(colonna, riga)
// Colonne: 0-15   Righe: 0-1

lcd.setCursor(0, 0);  // Inizio della prima riga
lcd.setCursor(0, 1);  // Inizio della seconda riga
lcd.setCursor(5, 1);  // Colonna 5, seconda riga
```

:::danger[Colonne e righe partono da 0]
Come per gli array, la numerazione parte da zero. La prima riga è la riga **0**, la seconda è la riga **1**. La prima colonna è la colonna **0**, l'ultima è la colonna **15**.
:::

### `lcd.clear()` - Cancellare lo schermo

```cpp
lcd.clear(); // Cancella tutto il display e riporta il cursore a (0,0)
```

---

## Esempio Completo

```cpp
#include <LiquidCrystal.h>

const int rs = 11, en = 10, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

int contatore = 0;
unsigned long lastAggiornamento = 0;

void setup() {
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Contatore:");
}

void loop() {
  if (millis() - lastAggiornamento >= 1000) {
    lastAggiornamento = millis();
    contatore++;

    lcd.setCursor(0, 1);  // Seconda riga
    lcd.print(contatore);
  }
}
```

Questo programma scrive "Contatore:" sulla prima riga una volta sola nel `setup()`, e aggiorna il numero sulla seconda riga ogni secondo usando `millis()`.

---

## Funzioni Utili

| Funzione | Cosa fa |
|:---|:---|
| `lcd.begin(16, 2)` | Avvia il display (16 colonne, 2 righe) |
| `lcd.print("testo")` | Scrive a partire dalla posizione corrente del cursore |
| `lcd.setCursor(col, riga)` | Sposta il cursore in una posizione precisa |
| `lcd.clear()` | Cancella tutto lo schermo |
| `lcd.noDisplay()` | Spegne il display (i dati rimangono in memoria) |
| `lcd.display()` | Riaccende il display |
| `lcd.noCursor()` | Nasconde il cursore lampeggiante |

:::note[Attenzione al testo che si sovrappone]
Se si scrive un testo più corto di quello precedente nella stessa posizione senza chiamare `lcd.clear()`, i caratteri vecchi rimangono visibili. Per esempio, scrivere `"12"` sopra `"100"` produce `"120"`. Usare `lcd.clear()` prima di riscrivere, oppure sovrascrivere con spazi i caratteri in eccesso.
:::