import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/SolutionButton.css'; // Assuming you're using a separate CSS file for styling

const SolutionButton = ({ text, link }) => {
  return (
    <Link to={link} className="solution-button">
      {text}
    </Link>
  );
};

export default SolutionButton;