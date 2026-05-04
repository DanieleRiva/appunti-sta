---
title: Matrici
description: Cosa sono le matrici in programmazione, come immaginarle e come usarle nel codice C++ per Arduino.
---

## Cos'è una Matrice?

Fino ad ora abbiamo visto gli Array (o vettori), che possiamo immaginare come una singola riga di cassetti, dove ogni cassetto ha una sua posizione (indice) e contiene un dato. 

Ma cosa succede se abbiamo bisogno di organizzare i dati in una griglia, come per esempio un foglio Excel? Qui entrano in gioco le Matrici, note in programmazione come Array Bidimensionali (a due dimensioni).

Una matrice non è altro che un "array di array". Ha delle Righe e delle Colonne.

Immagina una matrice di numeri fatta così:

```text
          Colonna 0   Colonna 1   Colonna 2
        -----------------------------------
Riga 0 |     10          20          30
Riga 1 |     40          50          60
```

Per trovare un dato specifico, non ci basta più un solo numero (l'indice dell'array normale), ma ce ne servono due: le coordinate. Un esempio "stupido" potrebbe essere il campo di battaglia navale.

---

## Come Dichiarare una Matrice

Con Arduino, per creare una matrice bisogna specificare il tipo di dato, il nome, e due paia di parentesi quadre: le prime per le righe, le seconde per le colonne. Pensandoci un attimo, stiamo combinando due Array.

```cpp
// Dichiara una matrice di numeri interi con 2 righe e 3 colonne
int miaMatrice[2][3];
```

È inoltre possibile riempire immediatamente una matrice con dei valori, proprio come succede quando inizializziamo un Array. Per farlo, si usano parentesi graffe annidate, una per ogni riga:

```cpp
int miaMatrice[2][3] = {
  {10, 20, 30}, // Valori della Riga 0
  {40, 50, 60}  // Valori della Riga 1
};
```

:::note[Tipi di dato]
Esattamente come per gli array normali, una matrice può contenere solo dati dello stesso tipo. Non è possibile mischiare, per esempio, numeri (`int`) e lettere (`char`) nella stessa matrice.
:::

---

## Leggere i dati nelle Matrici

La regola delle matrici è identica a quella degli array: si inizia sempre a contare da zero.
La prima riga è la riga `0`, la prima colonna è la colonna `0`.

Per leggere o modificare un valore, si usa il nome della matrice seguito dalle sue coordinate `[riga][colonna]`.

```cpp
int valore = miaMatrice[1][2]; 
// Vai alla riga 1 (la seconda), colonna 2 (la terza).
// In questo caso, la variabile 'valore' conterrà 60.

// Possiamo anche modificare un valore esistente:
miaMatrice[0][0] = 99; 
// Ora il numero 10 in alto a sinistra è diventato 99.
```

:::danger[Attenzione ai limiti!]
Se una matrice ha 2 righe, cercare di leggere `miaMatrice[2][0]` causerà un errore nel programma, perché si sta cercando di accedere a un'area di memoria che non esiste (errore "*Out of Bounds*").
:::

---

## Scorrere una Matrice: I Cicli Annidati

Per leggere un array normale usiamo un ciclo `for`... Per leggere una matrice servono invece due cicli `for` uno dentro l'altro; si parla di cicli annidati. Pensandoci un attimo, questa "*regola*" segue proprio la definizione delle matrici: una matrice è un insieme bidimensionale di array e, se per leggere 1 singolo array è necessario 1 ciclo `for`, per leggere 1 matrice saranno necessari 2 cicli `for` innestati.

Il ciclo esterno scorre le righe, quello interno scorre le colonne di quella specifica riga.

```cpp
int griglia[3][3] = {
  {1, 2, 3},	// Valori della Riga 0
  {4, 5, 6},	// Valori della Riga 1
  {7, 8, 9}		// Valori della Riga 2
};

void setup() {
  Serial.begin(9600);

  // Ciclo esterno: conta le righe (da 0 a 1)
  for (int i = 0; i < 3; i++) {
    
    // Ciclo interno: conta le colonne (da 0 a 2)
    for (int j = 0; j < 3; j++) {
      Serial.print("[");
      // Stampa il valore in riga i e colonna j
      Serial.print(griglia[i][j]);
      Serial.print("]");
    }
    
    Serial.println();
  }
}
```

Questo codice stamperà tutti i valori in ordine, leggendo prima tutta la riga 0 da sinistra a destra, e poi tutta la riga 1. L'output di questo programma è il seguente:
```
[1][2][3]
[4][5][6]
[7][8][9]
```

## Modificare i dati in una Matrice

Come abbiamo accennato in precedenza, per modificare un singolo valore basta usare le sue coordinate e l'operatore di assegnazione `=`. Ad esempio, se stiamo programmando un gioco e vogliamo piazzare una 'X' esattamente al centro di una griglia 3x3:

```cpp
char griglia[3][3] = {
  {' ', ' ', ' '},
  {' ', ' ', ' '},
  {' ', ' ', ' '}
};

// Inserisco una X al centro (Riga 1, Colonna 1)
griglia[1][1] = 'X';
```

Quindi, dopo questa assegnazione, la matrice diventa:
```cpp
char griglia[3][3] = {
  {' ', ' ', ' '},
  {' ', 'X', ' '},
  {' ', ' ', ' '}
};
```

**Ma cosa succede se vogliamo modificare TUTTI i valori contemporaneamente?** Immagina di voler "resettare" la griglia per iniziare una nuova partita, svuotando tutte le caselle. Farlo a mano richiederebbe di scrivere 9 righe di codice che si ripetono (`griglia[0][0] = ' '; griglia[0][1] = ' ';` e così via). 

La soluzione è sfruttare di nuovo i **cicli annidati**. Esattamente come li usiamo per leggere ogni singolo cassetto, possiamo usarli per "riempire" ogni singolo cassetto.

```cpp
// Funzione per svuotare tutta la griglia
void resettaGriglia() {
  // Scorro le righe
  for (int i = 0; i < 3; i++) {
    // Scorro le colonne
    for (int j = 0; j < 3; j++) {
      // Inserisco uno spazio vuoto nella cella corrente
      griglia[i][j] = ' '; 
    }
  }
}
```

Questa tecnica è fondamentale e importante da capire.