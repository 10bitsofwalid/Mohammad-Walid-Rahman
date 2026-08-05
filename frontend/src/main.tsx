import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router';
import App from './App';
import '@styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppProviders>
        <AppRouter>
          <App />
        </AppRouter>
      </AppProviders>
    </React.StrictMode>
  );
}
