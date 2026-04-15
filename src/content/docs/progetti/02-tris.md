---
title: "Tic-Tac-Toe (Tris)"
description: Crea il gioco del Tris utilizzando il Keypad come controller e due LED per la gestione dei turni.
---

## L'Obiettivo

Invece della solita "cassaforte", utilizzeremo il Keypad per creare un vero gioco interattivo: il **Tris** (Tic-Tac-Toe). Il computer gestirà la scacchiera, i turni dei giocatori e controllerà chi vince, comunicando tutto tramite il Monitor Seriale.

Useremo i tasti dall' **1** al **9** del keypad per indicare le 9 caselle della griglia.

---

## Componenti Necessari

* 1x Arduino Uno
* 1x Keypad
* 2x LED di colori diversi (es. Rosso e Blu)
* 2x Resistenze da 220Ω

---

## Specifiche del Progetto

### 1. Interfaccia Seriale
Il gioco non ha uno schermo, quindi "disegneremo" la griglia sul **Monitor Seriale**. Ogni volta che un giocatore fa una mossa, Arduino deve pulire simbolicamente la console e ristampare la griglia aggiornata.
* Le caselle vuote mostrano degli spazi.
* Le caselle occupate mostrano la `X` o la `O`.

Usa i seguenti esempi di griglie stampate per copiare e incollare i caratteri e ricreare le griglie:
```
+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+
|   |   |   |
+---+---+---+
```
```
+---+---+---+
| X |   | O |
+---+---+---+
|   |   | O |
+---+---+---+
| O |   | X |
+---+---+---+
```

### 2. Gestione Turni (I LED)
Per rendere il gioco chiaro anche senza guardare lo schermo:
* **LED 1 acceso:** È il turno del Giocatore 1 (X).
* **LED 2 acceso:** È il turno del Giocatore 2 (O).
I LED devono alternarsi automaticamente dopo ogni mossa valida.

### 3. Logica di Gioco e Errori
* **Controllo Casella:** Se un giocatore preme il tasto di una casella già occupata, Arduino deve ignorare il comando e **mantenere il turno** allo stesso giocatore (il LED non deve cambiare).
* **Vittoria:** Il programma deve controllare dopo ogni mossa se qualcuno ha fatto tris (3 simboli uguali in riga, colonna o diagonale). Se c'è un vincitore, il gioco si ferma e lo proclama sul monitor.
* **Pareggio:** Se tutte le 9 caselle sono piene e nessuno ha vinto, il gioco termina in pareggio.

---

## Suggerimenti per il Codice

1.  **Pulire il Monitor Seriale:** L'IDE di Arduino non ha un vero comando per cancellare lo schermo. Il trucco? Usa un semplice ciclo `for` per stampare una cinquantina di righe vuote (`Serial.println();`), così da spingere il vecchio testo in alto e fuori dalla vista. Scrivere questa logica dentro una funzione `pulisciMonitor()` permette di creare il nostro personale comando da richiamare dove vogliamo senza ripetere codice.
2.  **Stato del gioco (La Matrice):** Per tenere traccia delle mosse, usa una matrice 3x3 (es. `char selezioni[3][3];`) inizializzata con degli spazi vuoti `' '`. Quando un giocatore preme un numero, converti quel numero in coordinate (riga e colonna) per inserire la `X` o la `O` nella matrice.
```
char selezioni[3][3] = {
    {' ', ' ', ' '},
    {' ', ' ', ' '},
    {' ', ' ', ' '}
};
```

Dopo qualche azione, la matrice diventa per esempio:
```
char selezioni[3][3] = {
    {'X', ' ', 'O'},
    {' ', ' ', 'O'},
    {'O', ' ', 'X'}
};
```

3.  **Evita di ripetere 2000 volte il codice:** Crea una funzione dedicata chiamata `stampaGriglia()`. Al suo interno, usa due cicli `for` annidati per scorrere la tua matrice `selezioni` e stampare i bordi e i caratteri della griglia riga per riga. Ti basterà richiamare questa funzione dopo ogni mossa, mantenendo il `loop()` pulito.
4.  **Alternare i turni:** Usa una variabile booleana `bool turnoG1 = true;`. Dopo una mossa valida, usa l'operatore NOT per cambiarla: `turnoG1 = !turnoG1;`.
5.  **Controllo Vittoria:** Crea un'altra funzione chiamata `controllaVittoria()` e falla girare alla fine di ogni mossa. Usa due cicli `for` annidati per controllare sistematicamente le righe e le colonne della matrice `selezioni` alla ricerca di 3 simboli uguali (ricordati di fare un controllo anche per le due diagonali).