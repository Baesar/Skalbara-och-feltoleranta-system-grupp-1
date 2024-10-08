import React from 'react';
import '../Components/WebsiteStyle.css';  // Adjust this path as necessary
import therapySessionImage from '../Images/therapy_session.jpg'; // Path to your image

const Homepage = () => {
  return (
    <div>
      <header>
        <div className="content">
          <h1>Welcome to GetBetter!</h1>
          <img src={therapySessionImage} alt="okej" className="side-image" />
        </div>
      </header>

      <section id="About-us">
        <h2>About Us</h2>
        <p>
          Welcome to GetBetter!<br /><br />

          At GetBetter, we are dedicated to supporting your journey towards improved well-being. Our platform features a distinguished team of four highly skilled therapists, each specializing in 
          key areas of expertise: trauma, couples therapy, stress management, and rehabilitation. Whether you are working through past trauma, seeking to strengthen your relationship, 
          managing stress, or pursuing recovery, our professionals are here to provide personalized and effective support. Our mission is to facilitate your path to feeling better and achieving a 
          balanced, fulfilling life.
        </p>
      </section>

      <section id="Contact-us">
        <h2>Contact Us</h2>
        <p>
          Therapist 1 : Rama <br /><br />
          Therapist 2 : Julius <br /><br />
          Therapist 3 : Darina <br /><br />
          Therapist 4 : Ash <br /><br />
          Email: information.getbetter@gmail.com<br /><br />

        </p>
      </section>
      <p>© 2024 GetBetter. All rights reserved.</p>
    </div>
  );
};

export default Homepage;