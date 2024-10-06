import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/IncidentsButton.css'; // Assuming you're using a separate CSS file for styling

const IncidentsButton = ({ text }) => {
  return (
    <Link to="/incidents" className="incidents-button">
      {text}
    </Link>
  );
};

export default IncidentsButton;