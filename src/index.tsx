import * as React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { configureAppStore } from '@plugins/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

const store = configureAppStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

reportWebVitals();
