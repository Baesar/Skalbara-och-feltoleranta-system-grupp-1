import logo from './logo.svg';
import './App.css';
import React from 'react';
import BoxBasic from './component/mybox';

function App() {
  return (
    
    <div className="App">
      {/* Background Music */}
      <BoxBasic></BoxBasic>
      <audio autoPlay loop>
        <source src="for-elevator-music-jazz-236106.mp3" type="audio/mp3" />
      </audio>

      <h1>Input Person Information</h1>
      <form action="/submit_form" method="POST">
        {/* Role Selection */}
        <label htmlFor="role">Select Role:</label>
        <select id="role" name="role" required>
          <option value="patient">Patient</option>
          <option value="member">Member</option>
          <option value="staff">Staff</option>
        </select>
        <br />
        <br />

        {/* Email Input */}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <br />

        {/* Password Input */}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <br />
        <br />

        {/* Credentials */}
        <h2>Credentials</h2>

        {/* Name Input */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <br />
        <br />

        {/* Age Input */}
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" min="0" required />
        <br />
        <br />

        {/* ID Input */}
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" required />
        <br />
        <br />

        {/* Access Level */}
        <h2>Access Level</h2>
        <p>Select the buildings you have access to and choose the corresponding access layer for each:</p>

        <div>
          {/* Building A */}
          <label>
            <input type="checkbox" name="building_access[]" value="A" />
            Building A
          </label>
          <select name="access_layer_A">
            <option value="1">Layer 1</option>
            <option value="2">Layer 2</option>
            <option value="3">Layer 3</option>
            <option value="4">Layer 4</option>
            <option value="5">Layer 5</option>
          </select>
          <br />
          <br />

          {/* Repeat for Buildings B to G */}
          {/* Building B */}
          <label>
            <input type="checkbox" name="building_access[]" value="B" />
            Building B
          </label>
          <select name="access_layer_B">
            <option value="1">Layer 1</option>
            <option value="2">Layer 2</option>
            <option value="3">Layer 3</option>
            <option value="4">Layer 4</option>
            <option value="5">Layer 5</option>
          </select>
          <br />
          <br />

          {/* Continue for Buildings C, D, E, F, G... */}

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
