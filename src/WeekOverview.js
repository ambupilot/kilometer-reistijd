// WeekOverview.js
import React, { useState, useRef } from 'react';
import { useStore } from './StoreContext';

// Dagen van de week
const dagen = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"];

// Bereken datums voor een week gebaseerd op het jaar en weeknummer
const getDatesForWeek = (week, year) => {
    const firstDayOfYear = new Date(year, 0, 1);
    const days = (week - 1) * 7;
    const startOfWeek = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + days));

    // Zorg ervoor dat het de eerste maandag is van de week
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return date;
    });
};

// Helper functie om reistijd naar uren om te rekenen
const formatHours = (minutes) => (minutes / 60).toFixed(2);

const WeekOverview = () => {
    const { standplaatsen } = useStore();
    const [weekSelection, setWeekSelection] = useState(Array(7).fill(null));
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedYear] = useState(new Date().getFullYear());
    const tableRef = useRef(null);

    // Update de datums voor de geselecteerde week
    const weekDates = getDatesForWeek(selectedWeek, selectedYear);

    // Bereken totaal kilometers en reistijd retour op basis van selectie
    const calculateTotals = () => {
        return weekSelection.reduce(
            (totals, selected) => {
                if (selected) {
                    const standplaats = standplaatsen.find(s => s.id === selected);
                    totals.kilometers += standplaats.kilometers * 2; // Retour kilometers
                    totals.reistijd += standplaats.reistijd * 2; // Retour reistijd
                }
                return totals;
            },
            { kilometers: 0, reistijd: 0 }
        );
    };

    // Wijzig selectie voor een specifieke dag
    const handleSelectChange = (dagIndex, standplaatsId) => {
        const updatedSelection = [...weekSelection];
        updatedSelection[dagIndex] = standplaatsId;
        setWeekSelection(updatedSelection);
    };

    // Reset alle selecties naar null
    const handleReset = () => {
        setWeekSelection(Array(7).fill(null));
    };

    // Genereer en download een ASCII-tabel als .txt-bestand
    const handleDownloadTxt = () => {
        const totals = calculateTotals();
        const reistijdInUren = formatHours(totals.reistijd);

        // Tabel header
        let txtContent = `
Reistijd en Kilometervergoeding M. Kerssing - week ${selectedWeek}

+-------------+------------+-----------------------+
|   Dag       |   Datum    |    Standplaats        
+-------------+------------+-----------------------+
        `.trim();

        // Voeg de dagen en geselecteerde standplaatsen toe
        dagen.forEach((dag, index) => {
            const datum = weekDates[index].toLocaleDateString("nl-NL");
            const standplaatsId = weekSelection[index];
            const standplaats = standplaatsen.find(s => s.id === standplaatsId)?.naam || '--';

            txtContent += `\n| ${dag.padEnd(8)}    | ${datum.padEnd(10)} | ${standplaats.padEnd(21)} `;
        });

        // Voeg een afsluitende lijn en totalen toe
        txtContent += `\n`;
        txtContent += `
\n+----------+---------------+-----------------------+
| Kilometers: ${totals.kilometers.toString().padEnd(22)} km
| Reistijd: ${reistijdInUren.toString().padEnd(23)} uren
+--------------------------------------------------+
        `.trim();

        // Maak een blob en download het bestand
        const blob = new Blob([txtContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Reis-kilometer-vergoeding-Kerssing-week-${selectedWeek}.txt`;
        link.click();
    };

    const totals = calculateTotals();

    return (
        <div className="max-w-xl mx-auto p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Weekoverzicht</h1>

            {/* Dropdown om de week te kiezen */}
            <div className="flex justify-center mb-6">
                <label className="mr-3 font-medium">Kies een week:</label>
                <select
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(Number(e.target.value))}
                    className="p-2 border border-gray-300 rounded"
                >
                    {Array.from({ length: 52 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            Week {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            {/* Overzicht-tabel met extra padding boven en onder */}
            <div ref={tableRef} className="py-6">
                {dagen.map((dag, index) => (
                    <div key={index} className="flex items-center justify-between mb-4">
                        <div>
                            <label className="text-lg font-medium">{dag}</label>
                            <p className="text-sm text-gray-500">
                                {weekDates[index].toLocaleDateString("nl-NL")}
                            </p>
                        </div>
                        <select
                            className="block w-2/3 p-2 border border-gray-300 rounded"
                            value={weekSelection[index] || ''}
                            onChange={(e) => handleSelectChange(index, Number(e.target.value))}
                        >
                            <option value="">Selecteer standplaats</option>
                            {standplaatsen.map((standplaats) => (
                                <option key={standplaats.id} value={standplaats.id}>
                                    {standplaats.naam}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <h2 className="text-xl font-semibold mt-6">Weektotalen (Retour)</h2>
                <p className="mt-2">Totaal Kilometers: <span className="font-semibold">{totals.kilometers}</span> km</p>
                <p>Totaal Reistijd: <span className="font-semibold">{totals.reistijd}</span> minuten 
                    (<span className="font-semibold">{formatHours(totals.reistijd)}</span> uren)
                </p>
            </div>
            
            {/* Reset-knop */}
            <button
                onClick={handleReset}
                className="mt-6 w-full py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
            >
                Reset
            </button>

            {/* Download .txt-knop */}
            <button
                onClick={handleDownloadTxt}
                className="mt-3 w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
                Download .txt
            </button>
        </div>
    );
};

export default WeekOverview;
