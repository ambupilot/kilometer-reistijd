// App.js
import React from 'react';
import { StoreProvider } from './StoreContext';
import WeekOverview from './WeekOverview';

const App = () => {
    return (
        <StoreProvider>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <WeekOverview />
            </div>
        </StoreProvider>
    );
};

export default App;
