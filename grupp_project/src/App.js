
import './App.css';

/// here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';

///here we import components 
import Sidebar from './Components/Sidebar';

////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

///
function App() {
  return (
    <Router>
      <div className = "app">
        <Sidebar/>
          <div className = "content">
            <Routes>
              <Route path = "/" element={<Homepage/>}/>
              <Route path = "/Home" element={<Homepage/>}/>
              <Route path = "/Admin" element={<Adminpage/>}/>
              <Route path = "/SignIn" element={<SignInPage/>}/>
              <Route path = "/SignUp" element={<SignUpPage/>}/> 
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
