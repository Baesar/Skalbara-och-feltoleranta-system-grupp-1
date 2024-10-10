import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BookingContextProvider } from './context/BookingContext';
import { AuthContextProvider } from './context/AuthContext';

// Importing fonts for MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <UserContextProvider>
          <BookingContextProvider>
            <App />
          </BookingContextProvider>
        </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
  );
