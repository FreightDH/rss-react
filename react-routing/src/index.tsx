import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import App from './App.tsx';

import 'styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
