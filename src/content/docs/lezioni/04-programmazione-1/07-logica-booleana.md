---
title: Logica Booleana
description: Come combinare più condizioni con gli operatori AND, OR e NOT, e come usare l'inversione per gestire stati binari.
---

## Una Sola Condizione non Basta Sempre

Nella lezione precedente abbiamo usato `if` con una sola condizione alla volta. Nella realtà, le decisioni spesso dipendono da **più fattori insieme**.

*"Accendi il riscaldamento se la temperatura è bassa **E** la finestra è chiusa."*
*"Suona l'allarme se rilevo movimento **O** se la porta viene aperta."*

Per esprimere questo tipo di logica esistono gli **operatori booleani**, che permettono di combinare più condizioni in una sola.

---

## Gli Operatori Booleani

| Operatore | Simbolo | Descrizione |
| :-------- | :-----: | :------------------------------------------------- |
| **AND**   |  `&&`   | Tutto deve essere vero |
| **OR**    | `\|\|`  | Almeno uno è vero |
| **NOT**   |   `!`   | Inverte il valore (Vero diventa Falso e viceversa) |

---

## AND - `&&`

La condizione complessiva è vera **solo se tutte le condizioni** sono vere contemporaneamente. Basta che una sola sia falsa perché il risultato sia falso.

### Analogia: Cassaforte a due Chiavi
Una cassaforte con due serrature: si apre solo se si inserisce **sia** la chiave A **sia** la chiave B. Una sola chiave non basta.

```cpp
bool running = true;
int contatore = 75;

// AND: Devo correre E il contatore deve essere maggiore di 50
if (running && contatore > 50) {
  Serial.println("Sto correndo e contatore > 50");
}
```

**Tabella della verità AND:**

| Condizione A | Condizione B | Risultato |
|:---:|:---:|:---:|
| `true` | `true` | ✅ `true` |
| `true` | `false` | ❌ `false` |
| `false` | `true` | ❌ `false` |
| `false` | `false` | ❌ `false` |

---

## OR - `||`

La condizione complessiva è vera se **almeno una** delle condizioni è vera. Diventa falsa solo se sono tutte false.

```cpp
bool running = false;
int contatore = 75;

// OR: Devo correre, oppure il contatore è maggiore di 50
if (running || contatore > 50) {
  Serial.println("Sto correndo, oppure contatore > 50");
}
```

**Tabella della verità OR:**

| Condizione A | Condizione B | Risultato |
|:---:|:---:|:---:|
| `true` | `true` | ✅ `true` |
| `true` | `false` | ✅ `true` |
| `false` | `true` | ✅ `true` |
| `false` | `false` | ❌ `false` |

---

## NOT - `!`

Inverte il valore booleano di una condizione. Ciò che era `true` diventa `false` e viceversa.

```cpp
bool running = true;

// NOT: Se NON sto correndo
if (!running) {
  Serial.println("NON sto correndo");
}
// In questo caso, running è true, quindi !running è false
// -> Il messaggio NON verrà stampato
```

### Scritture abbreviate con i booleani

Con le variabili `bool`, esistono due scritture equivalenti e più pulite:

```cpp
// Queste due righe sono identiche:
if (running) {}         // Uguale a: if (running == true)  {}
if (!running) {}        // Uguale a: if (running == false) {}
```

---

## Toggle - Invertire gli Stati

Uno degli usi più potenti del NOT è il **toggle**: invertire uno stato booleano ogni volta che viene eseguita una riga.

### Analogia: interruttore della luce
Ogni volta si preme l'interruttore, cambia stato: se era acceso si spegne, se era spento si accende. Non importa lo stato attuale; il risultato è sempre l'opposto.

```cpp
bool running = true;

running = !running;
// running era true -> ora è false

running = !running;
// running era false -> ora è true
```

In italiano:
1. Se **sto correndo** → `!running` → **non sto correndo**
2. Se **non sto correndo** → `!running` → **sto correndo**

Questo pattern è utilissimo per far lampeggiare un LED, alternare tra due stati, o registrare ogni pressione di un pulsante:

```cpp
#define LED_PIN 5

bool ledAcceso = false;

void loop() {
  // Ad ogni iterazione di loop, il LED cambia stato
  ledAcceso = !ledAcceso;
  digitalWrite(LED_PIN, ledAcceso);
  delay(500);
}
```

---

## Combinare più Operatori

Si possono combinare AND, OR e NOT nella stessa condizione. Usare le **parentesi tonde** per rendere esplicito l'ordine di valutazione:

```cpp
bool sistemaAttivo = true;
bool allarmeManuale = false;
int temperatura = 85;

// Suona l'allarme se:
// - il sistema è attivo E la temperatura è critica
// - OPPURE se l'allarme manuale è stato attivato
if ((sistemaAttivo && temperatura > 80) || allarmeManuale) {
  Serial.println("ALLARME!");
}
```

:::note[Le parentesi tonde sono belle]
Come in matematica, le parentesi cambiano l'ordine di valutazione e rendono il codice più chiaro. Quando si combinano `&&` e `||` nella stessa condizione, usarle sempre è una buona abitudine.
:::