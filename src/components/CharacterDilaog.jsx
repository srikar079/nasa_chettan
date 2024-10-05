// src/components/CharacterDialog.jsx
import React from 'react';
import '../styles/CharacterDialog.css';

const CharacterDialog = ({ character, text }) => {
  return (
    <div className={`character-dialog ${character}`}>
      <p>{text}</p>
    </div>
  );
};

export default CharacterDialog;
