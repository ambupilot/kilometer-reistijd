import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Zorg ervoor dat Tailwind CSS hier wordt ingeladen
import App from './App';

// Zoek het root-element in de HTML
const container = document.getElementById('root');

// Gebruik de nieuwe createRoot API
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
