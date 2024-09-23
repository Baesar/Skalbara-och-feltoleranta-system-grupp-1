import React from 'react';
import '../Components/WebsiteStyle.css';  // Adjust this path as necessary

import logo from '../Images/logo.png';  // Adjust this path to your logo file
import therapySessionImage from '../Images/therapy_session.jpg'; // Path to your image

const Homepage = () => {
  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} style={{ height: '30px' }} alt="Logo" />
        </div>

        <nav className="navbar background">
          <div className="navbar">
            <a className="active" href="#"><i className="home"></i> Home</a>
            <a href="#"><i className="envelope"></i> Contact</a>
            <a href="#"><i className="user"></i> Login</a>
            <input type="text" id="search-bar" name="search" placeholder="Search..." />
          </div>
        </nav>

        <div className="content">
          <img src={therapySessionImage} alt="Side Picture" className="side-image" />
          <h1>Welcome to GetBetter!</h1>
        </div>
      </header>

      <nav>
        <ul>
          <li><a href="#About-us">About Us</a></li>
          <li><a href="#Contact-us">Contact Us</a></li>
        </ul>
      </nav>

      <section id="About-us">
        <h2>About Us</h2>
        <p>
          Welcome to GetBetter!<br /><br />
          At GetBetter, we are dedicated to supporting your journey towards improved well-being. Our platform features a distinguished team of four highly skilled therapists, each specializing in key areas of expertise: trauma, couples therapy, stress management, and rehabilitation. Whether you are working through past trauma, seeking to strengthen your relationship, managing stress, or pursuing recovery, our professionals are here to provide personalized and effective support. Our mission is to facilitate your path to feeling better and achieving a balanced, fulfilling life.
        </p>
      </section>

      <section id="Contact-us">
        <h2>Contact Us</h2>
        <p>
          Therapist 1 : Rama <br /><br />
          Therapist 2 : Julius <br /><br />
          Therapist 3 : Darina <br /><br />
          Therapist 4 : Ash <br /><br />
        </p>
      </section>

      <footer>
        <p>© 2024 GetBetter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;