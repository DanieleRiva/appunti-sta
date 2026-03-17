---
title: Introduzione
description: Cos'è la programmazione, il limite dell'hardware, il C++ e gli strumenti di sviluppo per Arduino.
---

## Cos'è la programmazione?

Fino ad ora si è lavorato come degli elettricisti: preso una fonte di energia, dei cavi, degli interruttori, dei LED e dei pulsanti e li abbiamo collegati.
Un circuito del genere è ***"stupido"***. Premendo il pulsante, la corrente passa e il LED si accende. Rilasciandolo, si spegne. Il circuito fa esattamente ed esclusivamente ciò che la sua struttura fisica gli impone di fare.

***Programmare significa dare un "cervello" a questi circuiti:*** <br>
Immaginiamo di avere a disposizione un robot lava pavimenti, completamente cieco e assolutamente stupido; non sa fare nulla se non gli viene spiegato tutto nei minimi dettagli. 
Se gli diciamo *"Pulisci il soggiorno"*, il robot non capisce niente. Bisogna infatti usare una serie di istruzioni precise e ben definite: 
1. Scansiona il pavimento
2. Controlla zone pericolose
3. Aspira
4. Lava il pavimento.
5. Asciuga il pavimento

***Programmare un Arduino è proprio questo***: 
scrivere una sequenza logica di istruzioni, passo dopo passo, per spiegare a una macchina stupida come comportarsi nelle diverse situazioni.

---

## ❓ Perché usare il codice?

Fino alle precedenti lezioni, l'obiettivo è stato collegare un pulsante a un LED. Bello, ma limitato, perché quel circuito è "scolpito nella pietra". Volendo cambiare il modo in cui quel LED si accende, bisogna staccare i fili, cambiare le resistenze e rimetterci mano fisicamente.

Passare alla programmazione significa smettere di costruire **oggetti a funzione singola** e iniziare a creare **sistemi universali**.

### L'analogia: Il Lettore CD vs Spotify
Per far capire la differenza tra Elettronica Pura e Programmazione, possiamo pensare alla musica:
* **Elettronica Pura (Hardware):** È come un vecchio mangianastri. Volendo ascoltare un'altra canzone, bisogna fisicamente cambiare la cassetta. La macchina sa fare una cosa sola e per cambiare serve intervenire meccanicamente.
* **Programmazione (Software):** È come Spotify. L'hardware (il telefono) rimane lo stesso, non viene smontato ogni volta. Cambiando il "codice" (cliccando un'altra canzone), lo stesso identico oggetto fisico produce un risultato completamente diverso. 

**L'elettronica fornisce i muscoli e i sensi (sensori e LED), ma la programmazione è il sistema nervoso che decide come usarli.**

---

## 🖥️ C++ e il Compilatore

Le macchine (e i microcontrollori come Arduino) non parlano italiano, inglese o cinese, ma capiscono solo una cosa: **elettricità o non elettricità**, che noi traduciamo in **1 e 0**, il famoso ***Linguaggio Macchina*** o ***Sistema Binario***.

Ovviamente, scrivere un programma composto da milioni di "01101001" risulta praticamente impossibile. Per questo sono stati inventati i **linguaggi di programmazione**. <br>
Per comunicare con Arduino noi utilizzeremo il linguaggio **C++**, che usa parole in inglese (come `if`, `while`, `for`) che noi umani possiamo leggere e scrivere facilmente.

Abbiamo però detto che le macchine come Arduino capiscono solamente gli 0 e gli 1, quindi, come fa Arduino a capire queste parole inglesi che scriviamo tramite **C++**? <br>
Qui entra in gioco il **Compilatore**. Il compilatore è un programma che fa da traduttore: legge il nostro codice C++, controlla che non ci siano errori di grammatica, e lo traduce in un insieme equivalente di zeri e uni pronto per essere inserito dentro Arduino.

La struttura base di un codice Arduino è la seguente:
```
// C++ code
//
void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000); // Wait for 1000 millisecond(s)
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000); // Wait for 1000 millisecond(s)
}
```

---

## 🛠️ Tool utilizzati

Per scrivere codici e dare funzionalità alla scheda Arduino, useremo due ambienti di lavoro diversi. 

### 1. Tinkercad (simulatore)
Prima di toccare circuiti Arduino veri, componenti costosi e schede fisiche, progetteremo i nostri sistemi su <a href="https://www.tinkercad.com/" target="_blank">Tinkercad</a>.
Oltre a permettere il posizionamento dei componenti, Tinkercad ha una sezione "Codice" dove è possibile programmare l'Arduino virtuale e simularne l'esecuzione.

:::note[Perché usare un simulatore?]
Il simulatore è sicuro. Sbagliando a scrivere il codice o collegando erroneamente qualcosa creando un cortocircuito, su Tinkercad non succede nulla, appare infatti un simbolo che rappresenta una potenziale rottura del componente. Nella realtà, si rischia di bruciare la scheda che si è pagato. La logica è costruire tutto nel simulatore Tinkercad, per poi replicare ogni cosa sul circuito reale, ovviamente dopo aver verificato opportunamente che tutto funziona correttamente.
:::

### 2. Arduino IDE
L'**IDE** (Integrated Development Environment, ovvero *Ambiente di Sviluppo Integrato*) è il programma ufficiale Arduino.

Questo software fa tre cose fondamentali:
1. Permette di stendere codice C++
2. Contiene il *Compilatore* che traduce il codice in zeri e uni
3. Collegando la scheda Arduino al PC, viene caricato il codice all'interno del microcontrollore

---

## Regole Basi della Programmazione

1. **Si legge dall'alto verso il basso:** Arduino legge ed esegue le istruzioni esattamente nell'ordine in cui le scrivete, una riga alla volta. Non salta passaggi e non torna indietro da solo.
2. **Attenzione alle maiuscole (Case Sensitive):** Per Arduino, scrivere `LED`, `Led` o `led` significa indicare tre cose completamente diverse. Sbagliare una maiuscola bloccherà il programma.
3. **Il Punto e Virgola (;)**: In italiano le frasi finiscono col punto. In C++, quasi tutte le istruzioni **devono** finire con un punto e virgola `;`. Dimenticandone uno, il compilatore non riuscirà a tradurre il codice e mostrerà un rosso sullo schermo.

:::danger[Nota Importante]
Se, scrivendo del codice C++, dovessero apparire degli errori a schermo, è **ESSENZIALE** leggere. Nel 95% dei casi, la spiegazione dell'errore è scritta precisamente.
:::

:::note[Nota Importante]
Tutti i comandi di programmazione non si imparano a memoria. Quando si ha un dubbio, ci si dimentica una parola chiave o non si conosce di preciso una funzione, basta consultare la <a href="https://docs.arduino.cc/language-reference/" target="_blank">Documentazione Ufficiale Arduino</a>.
:::

:::note[Informazione]
Quando scriviamo del codice, possiamo scrivere dei "commenti"; questi commenti sono delle frasi a noi utili che non vengono eseguiti dall'Arduino, ma ci possono servire per appuntare qualcosa. <br>
Esempio di commento:
```
// Questo è un commento! Non viene eseguito, ma può essere utile
```
:::