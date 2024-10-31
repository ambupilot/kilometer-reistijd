// WeekOverview.js
import React, { useState, useRef } from 'react';
import { useStore } from './StoreContext';
import html2canvas from 'html2canvas';

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

    // Maak een schermafbeelding van de tabel met styling
    const handleScreenshot = () => {
        if (tableRef.current) {
            html2canvas(tableRef.current, {
                scale: 2, // Verhoog de resolutie van de afbeelding
                useCORS: true, // Toestemming voor externe CSS (zoals Tailwind)
                logging: true,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `weekoverzicht-${selectedWeek}.png`;
                link.click();
            });
        }
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

            {/* Screenshot-knop */}
            <button
                onClick={handleScreenshot}
                className="mt-3 w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
                Maak schermafbeelding
            </button>
        </div>
    );
};

export default WeekOverview;
