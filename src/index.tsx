import * as React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';

import './locales/i18n';
import { configureAppStore } from '@plugins/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = configureAppStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HelmetProvider>
  </Provider>,
);

reportWebVitals();
