// src/components/CausesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CausesPage.css'; // Import your CausesPage styles
import SolutionButton from './SolutionButton'; // Import the SolutionButton component

const CausesPage = () => {
  return (
    <div className="causes-page">
      <Link to="/" className="global-warning-heading">Global Warning!</Link> {/* Link back to home page */}
      <img src="/img/girl.jpg" alt="Girl" className="character" />
      <div className="text-box">
        Let's know about the causes.
        And the solutions for the causes.
      </div>
      
      <div className="causes-container">
        {/* Vertical Div 1 */}
        <div className="cause">
          <h3>Deforestation</h3>
          <p>Cutting down forests for urbanization or agriculture releases stored carbon dioxide and reduces the planet's ability to absorb CO2.</p>
        </div>

        {/* Vertical Div 2 */}
        <div className="cause">
          <h3>Industrial Emissions</h3>
          <p>Factories emit large quantities of greenhouse gases, such as carbon dioxide and methane, into the atmosphere, contributing to global warming.</p>
        </div>

        {/* Vertical Div 3: Gases */}
        <div className="cause">
          <h3>Greenhouse Gases</h3>
          <div className="gases">
            <div>
              <span className="gas-name">CO</span>: Contributes to air pollution, reducing oxygen availability.
            </div>
            <div>
              <span className="gas-name">CO2</span>: Causes global warming by trapping heat in the Earth's atmosphere.
            </div>
            <div>
              <span className="gas-name">CH4</span>: Methane, a potent greenhouse gas, has a much higher warming potential than CO2.
            </div>
            <div>
              <span className="gas-name">N2O</span>: Nitrous oxide contributes to ozone layer depletion and global warming.
            </div>
          </div>
        </div>
      </div>
      <SolutionButton />
    </div>
  );
};

export default CausesPage;
