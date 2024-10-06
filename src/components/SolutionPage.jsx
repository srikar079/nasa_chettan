import React,{Link} from 'react';
import '../styles/Solution.css'; // Assuming you're using a separate CSS file for stylingimpo
import IncidentsButton from './IncidentButton'
const SolutionPage = () => {
  return (
    <div className="solution-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>The Time for Action is Now</h1>
          <p>Explore innovative solutions that can mitigate climate change and create a sustainable future.</p>
          <a href="#solution-section" className="solution-button">Discover Solutions</a>
        </div>
      </section>

      {/* Solution Sections */}
      <section id="solution-section" className="solution-sections">
        <h2>Green Technologies</h2>
        <div className="solution-grid">
          <div className="solution-card">
            <div className="solution-card-content">
              <h3>Solar Energy</h3>
              <p>Harnessing the power of the sun to generate clean energy for the world.</p>
            </div>
          </div>
          <div className="solution-card">
            <div className="solution-card-content">
              <h3>Wind Energy</h3>
              <p>Using wind turbines to produce renewable energy without harming the environment.</p>
            </div>
          </div>
          <div className="solution-card">
            <div className="solution-card-content">
              <h3>Hydro Energy</h3>
              <p>Generating power through water currents in rivers and dams to fuel sustainable power.</p>
            </div>
          </div>
        </div>
      </section>

   
      <section className="help-section">
        <h2>Ways You Can Help the Environment</h2>
        <ul className="help-list">
          <li>Reduce, Reuse, and Recycle: Minimize waste by rethinking how you use materials.</li>
          <li>Conserve Water: Use water-saving fixtures and be mindful of water usage.</li>
          <li>Use Public Transport: Reduce carbon emissions by opting for public transportation, biking, or walking.</li>
          <li>Support Renewable Energy: Choose renewable energy sources for your home whenever possible.</li>
          <li>Plant Trees: Contribute to reforestation efforts in your community.</li>
          <li>Educate Others: Share knowledge about environmental issues and sustainable practices.</li>
        </ul>
      </section>

      
      <section className="consequences-section">
        <h2>What Will Happen If We Don't Do Anything?</h2>
        <IncidentsButton text="Learn About Past Incidents" link="/incidents" />
      </section>
    </div>
  );
};


export default SolutionPage;
