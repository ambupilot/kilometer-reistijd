// StoreContext.js
import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // Definieer standplaatsen en sorteer ze direct bij initialisatie
    const [standplaatsen] = useState(
        [
            { id: 1, naam: 'Nijmegen', kilometers: 0, reistijd: 0 },
            { id: 2, naam: 'Venlo', kilometers: 0, reistijd: 0 },
            { id: 3, naam: 'Roermond', kilometers: 0, reistijd: 0 },
            { id: 4, naam: 'Sittard', kilometers: 0, reistijd: 0 },
            { id: 5, naam: 'Heerlen', kilometers: 0, reistijd: 0 },
            { id: 6, naam: 'Maastricht', kilometers: 0, reistijd: 0 },
            { id: 7, naam: 'Tiel', kilometers: 0, reistijd: 0 },
            { id: 8, naam: 'Arnhem', kilometers: 0, reistijd: 0 },
            { id: 9, naam: 'Winterswijk', kilometers: 0, reistijd: 0 },
            { id: 10, naam: 'Zutphen', kilometers: 68, reistijd: 45 },
            { id: 11, naam: 'Goor', kilometers: 104, reistijd: 45 },
            { id: 12, naam: 'Hengelo', kilometers: 0, reistijd: 0 },
            { id: 13, naam: 'Zwolle', kilometers: 0, reistijd: 0 },
            { id: 14, naam: 'Emmen', kilometers: 0, reistijd: 0 },
            { id: 15, naam: 'Marienberg', kilometers: 0, reistijd: 0 },
            { id: 16, naam: 'Groningen', kilometers: 0, reistijd: 0 },
            { id: 17, naam: 'Leeuwarden', kilometers: 0, reistijd: 0 },
        ].sort((a, b) => a.naam.localeCompare(b.naam)) // Sorteer hier
    );

    // Basisinfo zoals uurloon en kilometervergoeding
    const [basisinfo] = useState({
        uurloon: 55,
        kilometervergoeding: 0.25,
    });

    return (
        <StoreContext.Provider value={{ standplaatsen, basisinfo }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
/*
2024 waarden
            { id: 1, naam: 'Nijmegen', kilometers: 0, reistijd: 0 },
            { id: 2, naam: 'Venlo', kilometers: 0, reistijd: 0 },
            { id: 3, naam: 'Roermond', kilometers: 0, reistijd: 0 },
            { id: 4, naam: 'Sittard', kilometers: 0, reistijd: 0 },
            { id: 5, naam: 'Heerlen', kilometers: 0, reistijd: 0 },
            { id: 6, naam: 'Maastricht', kilometers: 0, reistijd: 0 },
            { id: 7, naam: 'Tiel', kilometers: 0, reistijd: 0 },
            { id: 8, naam: 'Arnhem', kilometers: 0, reistijd: 0 },
            { id: 9, naam: 'Winterswijk', kilometers: 0, reistijd: 0 },
            { id: 10, naam: 'Zutphen', kilometers: 68, reistijd: 45 },
            { id: 11, naam: 'Goor', kilometers: 104, reistijd: 45 },
            { id: 12, naam: 'Hengelo', kilometers: 0, reistijd: 0 },
            { id: 13, naam: 'Zwolle', kilometers: 0, reistijd: 0 },
            { id: 14, naam: 'Emmen', kilometers: 0, reistijd: 0 },
            { id: 15, naam: 'Marienberg', kilometers: 0, reistijd: 0 },
            { id: 16, naam: 'Groningen', kilometers: 0, reistijd: 0 },
            { id: 17, naam: 'Leeuwarden', kilometers: 0, reistijd: 0 },
*/