import './App.css';
import './Components/WebsiteStyle.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import React, { useEffect, useState } from 'react';

// here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import TestingGround from './Pages/TestingGround';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Userpage from './Pages/Userpage';
import Confirmation from './Components/Confirmation';

// here we import components (model)
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <Router>
      <div className = "app">
        <div className = "content">
          <Routes>
            <Route path = "/" element={<Homepage/>}/>
            <Route path = "/Home" element={<Homepage/>}/>
            <Route path = "/Admin" element={<Adminpage/>}/> 
            <Route path = "/Testing" element={<TestingGround/>}/> 
            <Route path="/User" element={<Userpage />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path = "/SignIn" element={<SignInPage/>}/>
            <Route path = "/SignUp" element={<SignUpPage/>}/>
          </Routes>
          <Sidebar/>
        </div>
      </div>
    </Router>
  );
}

export default App;