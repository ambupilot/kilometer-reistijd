// StoreContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // Definieer standplaatsen met reistijd en kilometers
    const [standplaatsen] = useState([
        /*
        // Dit zijn de werkelijke en actuele tijden
        */
       /*
        { id: 1, naam: 'Nijmegen', kilometers: 7, reistijd: 20 }, // reistijd is 20
        { id: 2, naam: 'Venlo', kilometers: 60, reistijd: 55 }, // reistijd is 55
        { id: 3, naam: 'Roermond', kilometers: 87, reistijd: 60 }, // reistijd is 60
        { id: 4, naam: 'Sittard', kilometers: 113, reistijd: 77 }, // reistijd is 77
        { id: 5, naam: 'Heerlen', kilometers: 132, reistijd: 85 }, // reistijd is 85
        { id: 6, naam: 'Maastricht', kilometers: 131, reistijd: 87 }, // reistijd is 87
        { id: 7, naam: 'Tiel', kilometers: 39, reistijd: 35 }, // reistijd is 35
        { id: 8, naam: 'Arnhem', kilometers: 36, reistijd: 40 }, // reistijd is 40
        { id: 9, naam: 'Winterswijk', kilometers: 92, reistijd: 80 }, // reistijd is 80
        { id: 10, naam: 'Zutphen', kilometers: 68, reistijd: 45 }, // reistijd is 55
        { id: 11, naam: 'Goor', kilometers: 104, reistijd: 45 }, // reistijd is 65
        { id: 12, naam: 'Hengelo', kilometers: 121, reistijd: 75 }, // reistijd is 75
        { id: 13, naam: 'Zwolle', kilometers: 102, reistijd: 62 }, // reistijd is 62
        { id: 14, naam: 'Emmen', kilometers: 178, reistijd: 116 }, // reistijd is 116
        { id: 15, naam: 'Marienberg', kilometers: 135, reistijd: 93 }, // reistijd is 93
        { id: 16, naam: 'Groningen', kilometers: 200, reistijd: 120 }, // reistijd is 120
        { id: 17, naam: 'Leeuwarden', kilometers: 193, reistijd: 115 }, // reistijd is 115
          /* */ 
        // Dit zijn de tijden en afstanden tot 31-12-2024
        { id: 1, naam: 'Nijmegen', kilometers: 0, reistijd: 0 }, // reistijd is 20
        { id: 2, naam: 'Venlo', kilometers: 0, reistijd: 0 }, // reistijd is 55
        { id: 3, naam: 'Roermond', kilometers: 0, reistijd: 0 }, // reistijd is 60
        { id: 4, naam: 'Sittard', kilometers: 0, reistijd: 0 }, // reistijd is 77
        { id: 5, naam: 'Heerlen', kilometers: 0, reistijd: 0 }, // reistijd is 85
        { id: 6, naam: 'Maastricht', kilometers: 0, reistijd: 0 }, // reistijd is 87
        { id: 7, naam: 'Tiel', kilometers: 0, reistijd: 0 }, // reistijd is 35
        { id: 8, naam: 'Arnhem', kilometers: 0, reistijd: 0 }, // reistijd is 40
        { id: 9, naam: 'Winterswijk', kilometers: 0, reistijd: 0 }, // reistijd is 80
        { id: 10, naam: 'Zutphen', kilometers: 68, reistijd: 45 }, // reistijd is 55
        { id: 11, naam: 'Goor', kilometers: 104, reistijd: 45 }, // reistijd is 65
        { id: 12, naam: 'Hengelo', kilometers: 0, reistijd: 0 }, // reistijd is 75
        { id: 13, naam: 'Zwolle', kilometers: 0, reistijd: 0 }, // reistijd is 62
        { id: 14, naam: 'Emmen', kilometers: 0, reistijd: 0 }, // reistijd is 116
        { id: 15, naam: 'Marienberg', kilometers: 0, reistijd: 0 }, // reistijd is 93
        { id: 16, naam: 'Groningen', kilometers: 0, reistijd: 0 }, // reistijd is 120
        { id: 17, naam: 'Leeuwarden', kilometers: 0, reistijd: 0 }, // reistijd is 115

    ]);

    // Basisinfo zoals uurloon en kilometervergoeding
    const [basisinfo] = useState({
        uurloon: 55,
        kilometervergoeding: 0.25,
    });

    useEffect(() => {
        // Sorteer de array op basis van het 'naam' attribuut in alfabetische volgorde
        const sortedStandplaatsen = [...standplaatsen].sort((a, b) => 
            a.naam.localeCompare(b.naam)
        );
    
        setStandplaatsen(sortedStandplaatsen);
    }, []); // Lege afhankelijkheden-array zorgt ervoor dat dit alleen bij de eerste render gebeurt

    return (
        <StoreContext.Provider value={{ standplaatsen, basisinfo }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
