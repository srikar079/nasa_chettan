// src/components/SolutionButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SolutionButton.css'; // Import the CSS file for styling

const SolutionButton = () => {
  return (
    <div className="solution-button-container">
      <Link to="/solution" className="solution-button">
        Solution
      </Link>
    </div>
  );
};

export default SolutionButton;
