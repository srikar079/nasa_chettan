// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Global Warning!</h1>
      <p>Our mission is to spread awareness about global warming and its impact on our planet.</p>
      <p>We will help you understand how it's affecting different areas and provide solutions.</p>
      <Link to="/conversation">Go to Conversation</Link>
    </div>
  );
};

export default HomePage;
