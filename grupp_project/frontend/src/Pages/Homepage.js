import React from 'react';
import '../Components/WebsiteStyle.css';  // Adjust this path as necessary
import therapySessionImage from '../Images/therapy_session.jpg'; // Path to your image



// Header Component
const Header = () => (
  <header>
    <div className="content">
      <h1>Welcome to GetBetter!</h1>
    </div>
  </header>
);

const Adoration = () => (
  <section id="Adoration" className="adoration-section">
    <div className="adoration-content">
      <div className="adoration-text">
        <h3 className="checkmarks">
          ✅ Appointments available within a week <br />
          ✅ Certified and highly experienced therapists <br />
          ✅ Personalized care tailored to your needs
        </h3>
      </div>
      <div className="adoration-image">
        <img src={therapySessionImage} alt="Therapy Session" />
      </div>
    </div>
  </section>
);

// About Us Section
const AboutUs = () => (
  <section id="About-us">
    <h2>About Us</h2>
    <p>
      Welcome to GetBetter!<br /><br />
      At GetBetter, we are dedicated to supporting your journey towards improved well-being. Our platform features a
      distinguished team of four highly skilled therapists, each specializing in key areas of expertise: trauma, couples therapy,
      stress management, and rehabilitation. Our mission is to facilitate your path to feeling better and achieving a
      balanced, fulfilling life.
    </p>
  </section>
);

// Our Therapists Section
const OurTherapists = () => (
  <section id="Our-therapists">
    <h2>Our Therapists</h2>
    <p>
      <u><b>Rama</b></u> <br />
      <i>Specialization:</i> Couples Therapy<br />
      <i>Experience:</i> 8 years <br /><br />
      <u><b>Julius</b></u> <br />
      <i>Specialization:</i> Rehab and Addiction Therapy<br />
      <i>Experience:</i> 10 years <br /><br />
      <u><b>Darina</b></u> <br />
      <i>Specialization:</i> Group Therapy<br />
      <i>Experience:</i> 5 years <br /><br />
      <u><b>Ash</b></u> <br />
      <i>Specialization:</i> Trauma Therapy<br />
      <i>Experience:</i> 7 years <br /><br />
    </p>
  </section>
);

// Contact Us Section
const ContactUs = () => (
  <section id="Contact-us">
    <h2>Contact Us</h2>
    <p>
      <u>Rama </u> <br />
      ☏: +46-799-999-999 <br />
      ✉︎: rama@getbetter.com <br /><br />

      <u>Julius</u> <br />
      ☏: +46-799-999-991 <br />
      ✉︎: julius@getbetter.com <br /><br />

      <u>Darina</u> <br />
      ☏: +46-799-999-995 <br />
      ✉︎: darina@getbetter.com <br /><br />

      <u>Ash</u> <br />
      ☏: +46-799-999-997 <br />
      ✉︎: ash@getbetter.com <br /><br />
    </p>
  </section>
);

// Footer Component
const Footer = () => (
  <footer>
    <p>© 2024 GetBetter. All rights reserved.</p>
  </footer>
);

// Main Homepage Component
const Homepage = () => {
  return (
    <div>
      <Header />
      <Adoration/>
      <AboutUs />
      <OurTherapists />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Homepage;
