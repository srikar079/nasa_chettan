// src/components/ConversationPage.jsx
import React, { useState } from 'react';
import CharacterDialog from './CharacterDilaog';
import '../styles/ConversationPage.css';

const ConversationPage = () => {
  const [slide, setSlide] = useState(0);

  const conversations = [
    { question: "What is global warming?", answer: "Global warming refers to the rise in Earth's average temperature due to increased greenhouse gases." },
    { question: "How is it affecting us?", answer: "It leads to climate change, rising sea levels, and extreme weather conditions." },
    { question: "What can we do?", answer: "We can reduce carbon emissions, adopt renewable energy, and practice sustainable living." }
  ];

  const nextSlide = () => setSlide((prev) => (prev + 1) % conversations.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + conversations.length) % conversations.length);

  return (
    <div className="conversation-page">
      <img src="/images/earth-burning.jpg" alt="Earth burning" className="burning-earth" />
      <div className="conversation-container">
        <CharacterDialog character="right" text={conversations[slide].question} />
        <CharacterDialog character="left" text={conversations[slide].answer} />
      </div>
      <div className="nav-arrows">
        <button onClick={prevSlide}>←</button>
        <button onClick={nextSlide}>→</button>
      </div>
    </div>
  );
};

export default ConversationPage;
