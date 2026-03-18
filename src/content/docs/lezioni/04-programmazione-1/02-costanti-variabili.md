---
title: Costanti e Variabili
description: Come salvare e gestire i dati in Arduino attraverso costanti e variabili, con i principali tipi di dato in C++.
---

## 💾 Dove vivono i dati?

Ogni programma, anche il più semplice, ha bisogno di ricordare delle informazioni durante la sua esecuzione: la temperatura letta da un sensore, quante volte è stato premuto un pulsante, se un LED è acceso o spento, eccetera...

In C++, questi dati vengono salvati in due modi diversi a seconda di una domanda fondamentale: ***questo valore cambierà mai durante l'esecuzione del programma?***

* Se la risposta è **no** -> si usa una **Costante**
* Se la risposta è **sì** -> si usa una **Variabile**

---

## 🔒 Costanti

Una costante è un valore **fissato una volta per sempre**. Arduino lo legge, lo usa, ma non può mai modificarlo durante l'esecuzione del programma.

### Analogia: Il numero civico di casa tua
Il tuo indirizzo di casa non cambia mentre sei fuori a passeggiare. È scritto sul campanello ed è sempre quello. Una costante funziona allo stesso modo: è un'etichetta fissa che punta sempre allo stesso valore.

### Sintassi: `#define`

Per definire una costante si usa la direttiva `#define`, che va scritta **in cima al file**, prima di tutto il resto.

```cpp
// Sintassi: #define NOME valore
#define RED_LED 5
#define GREEN_LED 6
#define BUTTON_PIN 3
```

:::danger[Regola fondamentale]
Usare **sempre** `#define` per indicare ad Arduino a quale pin è collegato un componente elettronico. Un LED o un pulsante, una volta inserito nel circuito, non cambia pin mentre il programma gira: è quindi un'informazione costante per definizione. In questo modo, se un giorno si sposta fisicamente il componente su un pin diverso, basterà modificare **una sola riga** in cima al codice invece di andare a cercare il numero del pin in ogni punto del programma.
:::

:::danger[Questione del Punto e Virgola]
Ogni dichiarazione di variabile deve terminare con `;`. Le righe con `#define` sono le uniche che ***non*** vogliono il punto e virgola alla fine. Dimenticarlo è uno degli errori più comuni.
:::

:::note[Convenzione sui nomi]
Per le costanti definite con `#define`, la convenzione vuole i nomi scritti tutti in **MAIUSCOLO** con le parole separate da underscore `_`. Non è obbligatorio, ma è un'abitudine seguita dai programmatori.
:::

---

## 📦 Variabili

Una variabile è una "scatola" nella memoria di Arduino a cui diamo un nome. Il contenuto di questa scatola può essere letto e **modificato** quante volte si vuole durante l'esecuzione del programma.

### Analogia: monete in un videogioco
Pensa a un contatore di monete in un videogioco. Parte da 0, poi sale ogni volta che si raccoglie una moneta, scende se si compra qualcosa, eccetera. Il valore cambia continuamente: è una variabile.

### Come si dichiara una variabile

Per creare una variabile bisogna specificare tre cose:
1. Il **tipo** di dato che conterrà (numero intero / decimale / vero o falso)
2. Un **nome** per identificarla
3. Un **valore**

```cpp
// Sintassi: tipo nome = valore;
int monete = 0;
```

---

## 🏷️ Data Types

C++ vuole sapere che tipo di informazione si metterà in una variabile. Questo perché tipi diversi occupano quantità diverse di memoria, e le operazioni che si possono fare su di essi cambiano.

### Numeri Interi: `int`

Usato per numeri **senza virgola**, positivi o negativi. Occupa **2 byte** di memoria, il che gli impone un range preciso di valori rappresentabili.

```
int -> da -32.768 a +32.767
```

```cpp
int contatore = 0;
int temperatura = -5;
int livello = 255;
```

### Numeri Interi Grandi: `long`

Quando i valori da memorizzare superano i limiti di `int`, si usa `long`. Occupa **4 byte** di memoria (il doppio di `int`) e può quindi contenere numeri molto più grandi.

```
long -> da -2.147.483.648 a +2.147.483.647
```

```cpp
long distanzaKm = 384400;       // Distanza Terra-Luna in km
long millisecondi = 1000000;    // Un milione di ms
```

:::note[Quando usare `int` o `long`?]
Per la maggior parte delle variabili su Arduino, `int` è sufficiente. Si passa a `long` solo quando si sa che il valore potrà superare 32.767, come ad esempio contatori che crescono molto, o valori di tempo espressi in millisecondi. Usare `long` quando `int` basterebbe spreca memoria inutilmente.
:::

:::caution[Usare `long` erroneamente]
Usare una variabile `long` quando il tipo `int` può bastare in termini di spazio, comporta uno spreco memoria inutile nell'Arduino.
:::

### Numeri Decimali: `float`

Usato per numeri **con la virgola**. Attenzione: in C++ il separatore decimale è il **punto**, non la virgola.

```cpp
float temperatura = 23.5;
float tensione = 3.14;
```

:::note[Quando usare `int` o `float`?]
Se il valore può essere solo un numero intero (es. quante volte si preme un pulsante), usa sempre `int`. Il `float` è più pesante da elaborare per Arduino e va usato solo quando la virgola è davvero necessaria, ad esempio con letture di sensori di temperatura.
:::

### Logica: `bool`

Può contenere **solo due valori**: `true` (vero) oppure `false` (falso). Perfetto per tenere traccia di stati: il LED è acceso o spento? Il pulsante è premuto o no?

```cpp
bool ledAcceso = false;
bool allarmeAttivo = true;
```

### Carattere singolo: `char`

Contiene **un singolo carattere**, scritto tra **apici singoli** `' '`.

```cpp
char voto = 'A';
char iniziale = 'M';
```

### Stringa: `char[]`

Per memorizzare una sequenza di caratteri (una parola, una frase), si usa un <ins>array</ins> di `char`. Il testo va scritto tra **virgolette doppie** `" "`.

Gli <ins>array</ins> li tratteremo più avanti. Detta in breve, un array è un insieme di dati; in questo caso, una stringa è un insieme di caratteri.

```cpp
char saluto[] = "Ciao mondo";
char messaggio[] = "Temperatura OK";
```

:::note[Apici singoli Vs virgolette doppie]
È una distinzione importante: `'A'` è il singolo carattere A (tipo `char`), mentre `"A"` è una stringa usata per contenere un insieme di caratteri. Confonderli potrebbe causare errori.
:::

---

## 📋 Riepilogo

| Tipo | Cosa contiene | Range | Esempio |
|---|---|---|---|
| `#define` | Costante fissa | - | `#define LED_PIN 5` |
| `int` | Numero intero | -32.768 -> 32.767 | `int contatore = 0;` |
| `long` | Numero intero grande | -2.147.483.648 -> 2.147.483.647 | `long ms = 100000;` |
| `float` | Numero decimale | ~3.4×10⁻³⁸ -> ~3.4×10³⁸ | `float temp = 23.5;` |
| `bool` | Vero o falso | `true` / `false` | `bool acceso = false;` |
| `char` | Un singolo carattere | - | `char lettera = 'A';` |
| `char[]` | Una stringa di testo | - | `char msg[] = "Ciao";` |