---
title: Array
description: Come raggruppare più valori dello stesso tipo in un'unica struttura indicizzata e come scorrerne gli elementi con i cicli.
---

## Il Problema delle Variabili Multiple

Supponiamo di voler salvare i valori letti da 5 sensori di temperatura. Con quello che sappiamo, dovremmo fare così:

```cpp
int temp1 = 0;
int temp2 = 0;
int temp3 = 0;
int temp4 = 0;
int temp5 = 0;
```

Cinque variabili separate, cinque nomi diversi, cinque righe di dichiarazione. Se diventassero 50? O 100? Il codice diventerebbe ingestibile. Esiste una soluzione molto più elegante: l'**array**.

---

## Cos'è un Array?

Un array è una **sequenza di valori dello stesso tipo**, raccolti sotto un unico nome e accessibili tramite un numero chiamato **indice**.

### L'analogia: Un palazzo di appartamenti

Un palazzo ha un unico nome (es. "Palazzo Rossi") ma al suo interno ci sono tanti appartamenti, ognuno con un numero: appartamento 0, appartamento 1, appartamento 2... Per trovare un inquilino specifico basta dire il nome del palazzo e il numero dell'appartamento.

Un array funziona esattamente così: ha un nome unico e ogni elemento ha un indice numerico.

---

## Come si Dichiara un Array

```cpp
// Sintassi: tipo nome[dimensione] = {val0, val1, val2, ...};

int temperature[5] = {22, 19, 25, 21, 23};
```

Questo crea un array chiamato `temperature` che contiene 5 numeri interi.

:::danger[L'indice parte da 0!]
In C++, il primo elemento di un array ha sempre indice **0**, non 1. Un array di 5 elementi ha quindi indici da **0 a 4**. Accedere all'indice 5 sarebbe un errore: si andrebbe a leggere una zona di memoria che non appartiene all'array.
:::

---

## Leggere e Modificare gli Elementi

Per accedere a un elemento specifico si usa il nome dell'array seguito dall'indice tra parentesi quadre `[]`.

```cpp
int temperature[5] = {22, 19, 25, 21, 23};

// Leggere un elemento
Serial.println(temperature[0]); // Stampa: 22 (primo elemento)
Serial.println(temperature[2]); // Stampa: 25 (terzo elemento)
Serial.println(temperature[4]); // Stampa: 23 (ultimo elemento)

// Modificare un elemento
temperature[1] = 30;
Serial.println(temperature[1]); // Ora stampa: 30
```

---

## Array e Ciclo `for`: La Coppia Perfetta

Il vero potere degli array emerge quando li si combina con i cicli `for`. Anziché accedere agli elementi uno per uno, si usa il contatore `i` come indice per scorrere automaticamente tutti gli elementi.

```cpp
int temperature[5] = {22, 19, 25, 21, 23};

// Stampa tutti gli elementi dell'array
for (int i = 0; i < 5; i++) {
  Serial.print("Sensore ");
  Serial.print(i);
  Serial.print(": ");
  Serial.println(temperature[i]);
}
```

Questo approccio funziona con 5 elementi come con 500: basta cambiare il numero nella condizione del `for`.

---

## Array di Altri Tipi

Gli array possono contenere qualsiasi tipo di dato, non solo `int`:

```cpp
float misure[3] = {3.14, 2.71, 1.41};
bool stati[4] = {true, false, true, true};
```

---

## Esempio Pratico: Gestire più LED

Gli array sono perfetti per gestire più pin o più componenti insieme. Invece di accendere ogni LED singolarmente, si raccolgono i pin in un array e si usa un ciclo.

```cpp
// I pin dei tre LED
int ledPins[3] = {5, 6, 7};

void setup() {
  // Configura tutti i pin in un solo ciclo
  for (int i = 0; i < 3; i++) {
    pinMode(ledPins[i], OUTPUT);
  }
}

void loop() {
  // Accende i LED uno alla volta con un effetto "scala"
  for (int i = 0; i < 3; i++) {
    digitalWrite(ledPins[i], HIGH);
    delay(200);
    digitalWrite(ledPins[i], LOW);
  }
}
```

Senza l'array, questo codice richiederebbe tre `pinMode()` e sei `digitalWrite()` scritti a mano. Con l'array, il ciclo fa tutto automaticamente — e se aggiungessimo un quarto LED, basterebbe modificare due righe.

---

## Trovare la Dimensione di un Array

Per sapere quanti elementi contiene un array senza doverlo ricordare a memoria, si usa l'operatore `sizeof`:

```cpp
int valori[8] = {1, 2, 3, 4, 5, 6, 7, 8};

int dimensione = sizeof(valori) / sizeof(valori[0]);
// sizeof(valori)    → numero totale di byte occupati dall'array
// sizeof(valori[0]) → byte occupati da un singolo elemento
// Il risultato è il numero di elementi: 8

for (int i = 0; i < dimensione; i++) {
  Serial.println(valori[i]);
}
```

:::note[Perché questa formula?]
`sizeof` restituisce i **byte** totali, non il numero di elementi. Un `int` occupa 2 byte su Arduino, quindi un array di 8 interi occupa 16 byte. Dividendo 16 per 2 si ottiene correttamente 8. Questa formula funziona per qualsiasi tipo di dato e qualsiasi dimensione.
:::