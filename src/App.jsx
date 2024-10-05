// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ConversationPage from './components/ConversationPage';
import CausesPage from './components/CausesPage'; // Import the new page


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conversation" element={<ConversationPage />} />
          <Route path="/causes" element={<CausesPage />} /> {/* Causes Page */}

        </Routes>
      </div>
    </Router>
  );
};

export default App;
