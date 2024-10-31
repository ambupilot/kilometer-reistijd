// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Zorg ervoor dat Tailwind hier is opgenomen
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
