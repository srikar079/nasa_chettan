// src/components/ConversationPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import CharacterDialog from './CharacterDilaog';
import '../styles/ConversationPage.css';

const ConversationPage = () => {
  const [slide, setSlide] = useState(0);

  const conversations = [
    { question: "What is climate?", answer: "Climate refers to the long-term average of weather conditions in a particular area." },
    { question: "What is global climate change?", answer: "Global climate change refers to significant changes in global temperatures and weather patterns over time." },
    { question: "How were things before, and how are things now?", answer: "Before industrialization, the climate was stable, while now it has become erratic." },
    { question: "How has it affected people and nature?", answer: "It has led to disasters, loss of biodiversity, and displacement of communities." },
    { question: "What are the reasons for this?", answer: "Primarily human activities like burning fossil fuels, deforestation, and industrial processes." },
  ];

  const nextSlide = () => setSlide((prev) => (prev + 1) % conversations.length);
  const prevSlide = () => setSlide((prev) => (prev - 1 + conversations.length) % conversations.length);

  return (
    <div className="conversation-page">
      <Link to="/" className="global-warning-heading">Global Warning!</Link> {/* Link to Home Page */}
      <img src="/img/earth-burning.jpg" alt="Earth burning" className="burning-earth" />
      <img src="/img/girl.jpg" alt="Girl" className="character left" />
      <img src="/img/boy.png" alt="Boy" className="character right" />
      <div className="conversation-container">
        <CharacterDialog character="right" text={conversations[slide].answer} />
        <CharacterDialog character="left" text={conversations[slide].question} />
      </div>
      <div className="nav-arrows">
        <button onClick={prevSlide}>←</button>
        <button onClick={nextSlide}>→</button>
      </div>
    </div>
  );
};

export default ConversationPage;
