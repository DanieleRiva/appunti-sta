---
title: "F1 Reaction Test"
description: Simulatore di partenza in stile Formula 1 con display a 7 segmenti, millis() e macchina a stati finiti.
---

## Il Progetto

L'obiettivo è costruire un **videogioco su Arduino** che misuri il tempo di reazione del giocatore, simulando la partenza di una gara di Formula 1.

Il giocatore preme Start, aspetta il segnale di via, e preme il pulsante Azione il più velocemente possibile. Il sistema misura il tempo esatto in millisecondi, lo mostra sul display, e giudica la reazione con un LED verde o rosso. Se si preme troppo presto, scatta la **falsa partenza**.

Per gestire tutto questo senza bloccare mai Arduino, è **obbligatorio** usare `millis()` al posto di `delay()`, e strutturare il codice come una **Macchina a Stati Finiti**.

---

## Come funziona la partenza in Formula 1?

Per capire cosa dobbiamo replicare, serve capire come funziona il vero semaforo di F1.

Sul rettilineo di partenza c'è una serie di **5 luci rosse**. La procedura è sempre la stessa:

1. Le luci si accendono **una alla volta**, a intervalli di circa 1 secondo: prima la prima, poi la seconda, poi la terza, la quarta e infine la quinta.
2. Quando tutte e 5 sono accese, i piloti sanno che la partenza è imminente.
3. Dopo un tempo **casuale** (tra 1 e 4 secondi circa), tutte le luci si **spengono contemporaneamente**: è il segnale di VIA.
4. I piloti devono partire **il prima possibile** dal momento in cui le luci si spengono.
5. Se un pilota si muove **prima** che le luci si spengano, commette una **falsa partenza** e viene penalizzato.

Il tempo casuale tra l'accensione dell'ultima luce e lo spegnimento è fondamentale: impedisce ai piloti di anticipare meccanicamente il segnale. È esattamente questo meccanismo che rende il reaction test interessante... ma anche difficile da implementare.

---

## La nostra versione con Arduino

Invece di usare 5 LED rossi, adattiamo il concetto usando il **display a 7 segmenti** per il conto alla rovescia e i **LED** per i segnali di stato.

### Componenti

- 1 Display a 7 segmenti -> conto alla rovescia
- 1 LED giallo -> segnale di VIA (equivalente allo spegnimento delle luci rosse)
- 1 LED verde -> reazione ottima (≤ 350 ms)
- 1 LED rosso -> reazione lenta (> 350 ms) o falsa partenza
- 2 Pulsanti -> **START** (avvia la sequenza) e **AZIONE** (reazione del pilota)

---

## Funzionamento Dettagliato

**Fase 1: Avvio**

Il giocatore preme il pulsante **START**. Tutti i LED si spengono e il display inizia a mostrare i numeri da `1` a `5`, uno al secondo esatto, gestiti con `millis()`.

**Fase 2: Suspense**

Mostrato il `5`, il display visualizza un trattino centrale (`-`) per indicare che il sistema è in attesa. Da questo momento parte un timer con una durata **casuale** tra 1000 ms e 3500 ms; così il giocatore non sa quando arriverà il via.

**Fase 3a: Falsa Partenza**

Se il giocatore preme **AZIONE** durante la fase di suspense, il test si interrompe immediatamente:
- Si accende il **LED rosso**
- Il display mostra la lettera `F`
- Sul Monitor Seriale compare `FALSA PARTENZA`

**Fase 3b: Via!**

Scaduto il tempo casuale, si accende il **LED giallo**: è il segnale di VIA. Da questo preciso momento `millis()` inizia a misurare il tempo di reazione.

**Fase 4: Risultato**

Il giocatore preme **AZIONE**. Il sistema:
- Stampa il **tempo di reazione esatto** in millisecondi sul Monitor Seriale
- Accende il **LED verde** se il tempo è ≤ 350 ms, il **LED rosso** se è > 350 ms

---

## Macchina a Stati Finiti

Questo progetto è troppo complesso per essere gestito con una serie di `if` annidati. La soluzione è strutturare il `loop()` come una **Macchina a Stati Finiti**: il programma si trova sempre in uno stato preciso, e passa da uno all'altro solo quando avviene l'evento giusto.

Usare uno `switch-case` sulla variabile di stato rende il codice leggibile e ogni stato indipendente dagli altri.

```
ATTESA_START -> CONTO_ALLA_ROVESCIA -> SUSPENSE -> ATTESA_REAZIONE -> RISULTATO
```

| Stato | Il sistema sta... | Evento di uscita |
|:---|:---|:---|
| `ATTESA_START` | Aspettando che il giocatore prema Start | Pressione di Start |
| `CONTO_ALLA_ROVESCIA` | Mostrando 1->5 sul display, un numero al secondo | Ha mostrato il 5 |
| `SUSPENSE` | Aspettando il tempo casuale, monitorando la falsa partenza | Timer scaduto oppure Azione premuto |
| `ATTESA_REAZIONE` | LED giallo acceso, cronometro avviato | Pressione di Azione |
| `RISULTATO` | Mostrando il risultato, aspettando un nuovo Start | Pressione di Start |

:::note[Suggerimento implementativo]
Usate una variabile intera per tenere traccia dello stato corrente, e definite ogni stato con un `#define`:

```cpp
#define ATTESA_START        0
#define CONTO_ALLA_ROVESCIA 1
#define SUSPENSE            2
#define ATTESA_REAZIONE     3
#define RISULTATO           4

int stato = ATTESA_START;
```

Il `loop()` diventa quindi un `switch (stato)` con un `case` per ogni fase. All'interno di ogni `case`, invece di usare `delay()`, si controlla `millis()` per gestire i tempi - esattamente come visto nella lezione su `millis()`.
:::