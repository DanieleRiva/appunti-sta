---
title: Valori unsigned
description: Come funzionano i limiti dei tipi numerici in C++ e cosa significa la parola chiave unsigned.
---

## I Numeri hanno un Limite

In matematica, i numeri sono infiniti, ma in un microcontrollore come Arduino ogni tipo di variabile occupa una quantità determinata di memoria; questo impone un limite preciso ai valori che può contenere.

Per esempio, il tipo `int` occupa 2 byte (16 bit) di memoria. Con 16 bit si possono rappresentare in totale 2¹⁶ = 65.536 valori distinti. Ma di preciso, quali valori sono?

---

## Numeri con Segno: `int`

Per default, `int` è un numero con segno: può essere positivo, negativo o zero. I 65.536 valori disponibili vengono quindi divisi a metà tra numeri negativi e positivi:

```
int -> da -32.768 a +32.767
```

La metà della capacità viene utilizzata sui numeri negativi. Questo ha senso quando si lavora con temperature, differenze, offset, ovvero valori che possono davvero essere negativi.

---

## Numeri senza Segno: `unsigned`

Se si è certi che una variabile conterrà <ins>solo valori positivi</ins>, si può aggiungere la parola chiave `unsigned` davanti al tipo. Questo dice ad Arduino: *"non mi servono i numeri negativi, usa tutta la capacità disponibile sui positivi."*

```
unsigned int -> da 0 a 65.535
```

La capacità totale è la stessa (65.536 valori), ma ora è tutta spostata sui numeri positivi.

```cpp
int normale = -500;             // ✅ Può essere negativo
unsigned int positivo = 60000;  // ✅ Valore impossibile con int normale
unsigned int errore = -1;       // ❌ Comportamento imprevedibile
```

:::danger[Non assegnare valori negativi a una variabile `unsigned`]
Se si assegna un numero negativo a una variabile `unsigned`, Arduino non dà errore ma il risultato sarà un numero completamente sbagliato. La parola `unsigned` è una "promessa" che si fa al compilatore: *"questo valore non sarà mai negativo"* e sta al programmatore mantenerla.
:::

---

## Altri Tipi Numerici

La stessa logica si applica agli altri tipi numerici. Questa tabella mostra i più usati su Arduino:

| Tipo | Byte | Con segno | Senza segno |
|:---|:---:|:---|:---|
| `int` | 2 | da -32.768 a 32.767 | — |
| `unsigned int` | 2 | — | da 0 a 65.535 |
| `long` | 4 | da -2.147.483.648 a 2.147.483.647 | — |
| `unsigned long` | 4 | — | da 0 a 4.294.967.295 |