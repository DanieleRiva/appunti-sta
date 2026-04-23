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

:::tip[Stampare la griglia delle selezioni]
Per stampare la griglia delle selezioni, possiamo utilizzare un ciclo for semplice:

```
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      Serial.print(selezioni[i][j]);
      Serial.print(" ");
    }
    
    Serial.println();
}
```

Così facendo, però, non è formattata bella come vogliamo. Ecco come stampare la tabella formattata:
```
void stampaGriglia() {
  Serial.println("+---+---+---+");
  for (int i = 0; i < 3; i++) {
    Serial.print("| ");
    Serial.print(selezioni[i][0]);
    Serial.print(" | ");
    Serial.print(selezioni[i][1]);
    Serial.print(" | ");
    Serial.print(selezioni[i][2]);
    Serial.println(" |");
    
    Serial.println("+---+---+---+");
  }
}
```
:::

:::tip[Associare bottoni a celle]
Come facciamo a dire che, se giocatore 1 preme il bottone 5, allora devo salvare il carattere 'X' nella posizione selezioni[1][1]?
Volendo, potremmo scrivere una serie molto lunga di if per controllare dove il giocatore ha premuto e salvare in quella posizione. Per risparmiare fatica e codice inutile, possiamo scrivere un calcolo:
```
// Verifichiamo che sia un tasto numerico tra 1 e 9
if (tasto >= '1' && tasto <= '9') {
    int n = tasto - '1'; // Convertiamo il carattere in indice 0-8
    int r = n / 3;       // Calcoliamo la riga
    int c = n % 3;       // Calcoliamo la colonna
}
```

Immagina il tastierino numerico o la griglia del gioco del Tris. Hai 9 caselle divise in 3 righe e 3 colonne. 

Il computer, però, **inizia sempre a contare da zero**. Quindi la prima riga non è la numero 1, ma la numero 0. 

Ecco come il codice traduce il tasto premuto (da 1 a 9) nella giusta riga e colonna, spiegato in modo semplice:

### 1. `int n = tasto - '1';` (Spostare tutto a zero)
Dato che il computer conta partendo da zero, dobbiamo trasformare i numeri da `1 a 9` in `0 a 8`. 
Sottraendo '1', "spostiamo" tutti i numeri indietro di un passo.
* Se premi **1**, il computer calcola `1 - 1 = 0`.
* Se premi **9**, il computer calcola `9 - 1 = 8`.
Ora abbiamo la nostra posizione da 0 a 8.

### 2. `int r = n / 3;` (Trovare la riga)
Qui usiamo la divisione, ma al computer interessa solo **quante volte il 3 ci sta per intero**, ignorando i decimali. Perché diviso 3? Perché ogni riga ha 3 caselle.
* Prendi il numero **7** (che nella nostra griglia spostata a zero è il tasto 8). Quante volte il 3 sta nel 7? Ci sta **2** volte. Quindi siamo nella riga **2** (che è la terza riga, in basso).

### 3. `int c = n % 3;` (Trovare la colonna)
Il simbolo `%` si chiama "modulo" e calcola semplicemente **il resto della divisione**. Ci dice di quanti passi ci siamo spostati verso destra nella riga in cui ci troviamo.
* Riprendiamo il numero **7**. Abbiamo detto che 7 diviso 3 fa 2... **con il resto di 1**. Quel resto è la nostra colonna! Quindi siamo nella colonna **1** (che è la colonna centrale).

---

### Un esempio visivo: Premiamo il tasto '6'

Il tasto '6' si trova a destra nella seconda riga. Vediamo se i calcoli tornano:

1. **Posizione base zero:** `6 - 1 = 5` (Il nostro numero di partenza ora è 5).
2. **Riga:** Il 3 nel 5 ci sta 1 volta. **Riga = 1**. (Seconda riga, corretto!)
3. **Colonna:** 5 diviso 3 fa 1, con il resto di 2. **Colonna = 2**. (Terza colonna a destra, corretto!)

Il risultato finale è la coordinata **(1, 2)**, che per il computer è esattamente l'ultima casella della seconda riga.

:::