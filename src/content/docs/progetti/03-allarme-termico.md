---
title: "Allarme Termico Intelligente Multilivello"
description: Monitoraggio della temperatura con display LCD e segnalazione acustica dinamica tramite buzzer, gestito interamente in multitasking con millis().
---

## Il Progetto

L'obiettivo è realizzare un sistema di monitoraggio ambientale avanzato. Il dispositivo non solo deve mostrare la temperatura attuale e registrarne il picco massimo, ma deve anche gestire tre diversi livelli di criticità, adattando i segnali visivi e acustici di conseguenza.

L'intero sistema deve essere rigorosamente **non-bloccante**: il campionamento, l'aggiornamento del display e i pattern sonori del buzzer devono coesistere in multitasking.

---

## Componenti

- 1 Sensore di temperatura **TMP36**
- 1 Display **LCD 16x2** (connessione parallela o I2C)
- 1 **Buzzer** (Piezo)
- 1 Potenziometro (10kΩ) per il contrasto LCD
- 1 Resistenza da 220Ω (per il LED di retroilluminazione LCD)
- Breadboard e cavetti jumper

---

## Funzionamento

Il sistema deve essere gestito tramite la funzione `millis()` e rispettare le seguenti specifiche:

1.  **Campionamento e Logica**: La temperatura deve essere letta ogni **500 millisecondi**. Il sistema deve tenere in memoria la **Temperatura Massima** raggiunta dall'accensione.
2.  **Display**: 
    - La prima riga deve mostrare la temperatura attuale e lo stato (es. `24.5C - NORMALE`).
    - La seconda riga deve mostrare il picco massimo registrato (es. `Max: 26.8C`).
3.  **Livelli di Criticità**:
    - **< 30°C (Stato NORMALE)**: Il buzzer è muto. Lo schermo mostra "NORM".
    - **Tra 30°C e 35°C (Stato ATTENZIONE)**: Il buzzer emette un "beep" lento (es. 500ms acceso, 500ms spento). Lo schermo mostra "ATTN".
    - **> 35°C (Stato PERICOLO)**: Il buzzer emette un "beep" rapido e insistente (es. 150ms acceso, 150ms spento). Lo schermo mostra "PERC".
4.  **Ripristino Dinamico**: Il sistema deve poter passare in modo fluido da uno stato all'altro (salendo o scendendo) adattando istantaneamente il comportamento del buzzer e del display.

---

## Requisiti Tecnici

1.  **Divieto Assoluto di `delay()`**: Tutto il cronometraggio deve essere gestito esclusivamente con `millis()`. L'uso di un singolo `delay()` comporterà una forte penalizzazione.
2.  **Gestione Multitasking**: Avrai bisogno di almeno due timer basati su `millis()` indipendenti: uno per il campionamento/display (500ms) e uno per il pattern del buzzer (frequenza variabile in base allo stato).
3.  **State Machine (Buzzer)**: Il buzzer va gestito come una macchina a stati per permetterne l'intermittenza a velocità diverse senza bloccare l'aggiornamento dell'LCD.
4.  **Modularità**: Organizza il codice in funzioni specifiche (es. `leggiSensore()`, `aggiornaSchermo()`, `gestisciAllarme()`). Non inserire tutta la logica nel `loop()`.