---
title: switch
description: Come gestire elegantemente molti casi distinti con il costrutto switch-case, alternativa pulita a lunghe catene di else if.
---

## Il Problema delle Catene di If

Immagina di dover gestire quattro modalità operative di una bici elettrica: 
- `0` spenta
- `1` lenta
- `2` veloce
- `3` boost. 

Con `if` e `else if` si scriverebbe così:

```cpp
if (modalita == 0) {
  // spenta
} else if (modalita == 1) {
  // lenta
} else if (modalita == 2) {
  // veloce
} else if (modalita == 3) {
  // boost
}
```

Funziona, ma diventa lungo e ripetitivo. Quando si deve confrontare **una stessa variabile** con **molti valori diversi**, esiste un costrutto più pulito: `switch`.

---

## La Sintassi di `switch`

```cpp
switch (variabile) {
  case valore1:
    // istruzioni
    break;

  case valore2:
    // istruzioni
    break;

  default:
    // istruzioni eseguite se nessun case corrisponde
    break;
}
```

### Analogia: manopola di una lavatrice

Pensa alla rotella di una lavatrice: hai una manopola che puoi girare su `Cotone`, `Sintetici`, `Delicati`, `Lana`. In base alla posizione selezionata, parte un programma diverso. `switch` funziona esattamente così: guarda il valore della variabile e salta direttamente al caso corrispondente.

---

## `case` e `break`

Ogni `case` rappresenta un possibile valore della variabile. Se il valore corrisponde, Arduino esegue le istruzioni di quel blocco.

La parola `break` è **fondamentale**: dice ad Arduino di uscire dallo `switch` dopo aver eseguito il caso corrispondente. Senza `break`, Arduino continuerebbe ad eseguire anche i `case` successivi, uno dopo l'altro, indipendentemente dal loro valore, un comportamento quasi sempre indesiderato.

```cpp
int modalita = 2;

switch (modalita) {
  case 0:
    Serial.println("Bici spenta.");
    break;

  case 1:
    Serial.println("Modalità eco.");
    break;

  case 2:
    Serial.println("Modalità trail."); // Questo viene eseguito
    break;

  case 3:
    Serial.println("Modalità boost");
    break;
}
```

---

## `default`: Il Caso Finale

`default` è opzionale ed è il caso "tutto il resto": viene eseguito se nessuno dei `case` precedenti corrisponde al valore della variabile. È l'equivalente dell'`else` finale in una catena di `else if`.

```cpp
int giorno = 8; // Non esiste il giorno 8

switch (giorno) {
  case 1:
    Serial.println("Lunedì");
    break;
  case 2:
    Serial.println("Martedì");
    break;
  // ...altri giorni...
  default:
    Serial.println("Giorno non valido.");
    break;
}
```

:::note[Quando usare `switch` e quando `if`?]
* Usare **`switch`** quando si confronta **una variabile** con **valori esatti** (`== 1`, `== 2`, `== 3`...)
* Usare **`if`** quando le condizioni sono **intervalli** o espressioni complesse (`> 25`, `< 0`, `&& ||`...)
:::

:::danger[Non dimenticare il `break`]
Dimenticare `break` alla fine di un `case` è uno degli errori più comuni quando si utilizza il costrutto `switch`.
:::