import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Confirmation from './components/Confirmation';

// Main App component that sets up routing for the application
function App() {
  return (
    // Router component to wrap the application's routing logic
    <Router>
      {/* Routes component defines multiple Route paths within the app */}
      <Routes>
        {/* Route for the home page ("/") that renders the Home component */}
        <Route path="/" element={<Home />} />
        
        {/* Route for the confirmation page ("/confirmation") that renders the Confirmation component */}
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App; // Export the App component as the default export