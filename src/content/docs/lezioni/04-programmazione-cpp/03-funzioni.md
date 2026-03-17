---
title: Blocchi di Codice e Funzioni
description: Come il codice è organizzato in blocchi delimitati da parentesi graffe, e come le funzioni permettono di riutilizzare pezzi di programma.
---

## Il Codice non è una lista infinita

Pensa a come è scritto un libro: non è un Wall of Text di testo infinito, ma è diviso in capitoli, paragrafi, sezioni. Ogni gruppo di frasi parla di una cosa precisa. Se cerchi un'informazione, sai già in quale capitolo guardare.
Il codice funziona allo stesso modo. Le istruzioni non vengono scritte tutte di fila alla rinfusa, ma organizzate in blocchi: gruppi di istruzioni che appartengono insieme e svolgono un compito specifico.

---

## I Blocchi di Codice

In C++, un blocco di codice è tutto ciò che si trova **tra una parentesi graffa aperta `{` e una chiusa `}`**.

```cpp
{
  // Tutto quello che è qui dentro
  // fa parte dello stesso blocco
  int x = 5;
  int y = 10;
}
```

I blocchi possono stare **dentro altri blocchi**: si parla in questo caso di blocchi **padre** e blocchi **figlio**. Un blocco figlio è contenuto all'interno di un blocco padre.

```cpp
// Blocco padre
{
  int x = 5;

  // Blocco figlio
  {
    int y = 10;
  }
}
```

:::note[L'indentazione]
Notare come il blocco figlio sia spostato verso destra rispetto al padre. Questo si chiama **indentazione** ed è fondamentale per rendere il codice leggibile. Arduino IDE può farlo automaticamente con la scorciatoia `Ctrl + T`, ma, purtroppo, su Tinkercad non è possibile. Esistono siti web apposta per indentare del codice, come per esempio <a href='https://codebeautify.org/cpp-formatter-beautifier' target='_blank'>CodeBeautify</a>.
:::

---

## Le Funzioni

Una **funzione** è un blocco di codice a cui viene dato un **nome**. Invece di riscrivere le stesse istruzioni ogni volta che servono, le si raccoglie in una funzione e la si **chiama** quando necessario, facendo eseguire il codice contenuto al suo interno solo quando ne abbiamo bisogno.

### Analogia: Le ricette di cucina

Pensiamo a una ricetta: una "Pasta al Pomodoro" è un insieme di istruzioni scritte una volta sola. Ogni volta che vuoi fare la pasta, non riscrivi tutti i passaggi: dici semplicemente *"faccio la pasta al pomodoro"*. La funzione funziona esattamente così.

### Come si definisce una funzione

```cpp
// Sintassi:
// tipo nomeFunzione() {
//   istruzioni...
// }

void saluta() {
  Serial.println("Ciao!");
  Serial.println("Benvenuto.");
}
```

La parola `void` davanti al nome significa che la funzione **non restituisce nessun valore**; esegue delle azioni e basta, senza un risultato. Lo vedremo meglio più avanti, per ora scriviamo solamente void.

### Come si chiama una funzione

Per eseguire il codice contenuto in una funzione, basta scrivere il suo nome seguito da `()` e `;`.

```cpp
void loop() {
  saluta(); // Arduino esegue tutto il codice dentro la funzione "saluta"
  saluta(); // Possiamo chiamarla quante volte vogliamo
}
```

---

## Perché usare le Funzioni?

Organizzare il codice in funzioni porta tre vantaggi enormi:

**1. Riutilizzo:** Scrivi il codice una volta sola e lo chiami quante volte vuoi.

**2. Leggibilità:** Un `loop()` fatto così è immediatamente comprensibile:
```cpp
void loop() {
  leggiSensori();
  aggiornaDisplay();
  controllaAllarmi();
}
```

**3. Manutenzione:** Se c'è un errore nel modo in cui si legge un sensore, sai esattamente dove andare a cercarlo: nella funzione `leggiSensori()`, non in mezzo a centinaia di righe di codice.