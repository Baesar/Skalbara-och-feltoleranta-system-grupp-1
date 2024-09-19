import './App.css';
import './Components/WebsiteStyle.css';
/// here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import Testing_ground from './Pages/Testing_ground';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';

///here we import components 
import Sidebar from './Components/Sidebar';

////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userpage from './Pages/Userpage';
import Confirmation from './Components/Confirmation';


///
function App() {
  return (
    <Router>
      <div className = "app">
        
          <div className = "content">
            <Routes>
              <Route path = "/" element={<Homepage/>}/>
              <Route path = "/Home" element={<Homepage/>}/>
<<<<<<< HEAD
              <Route path = "/Admin" element={<Adminpage/>}/> 
              <Route path = "/Testing_ground" element={<Testing_ground/>}/> 
              <Route path="/User" element={<Userpage />} />
              <Route path="/confirmation" element={<Confirmation />} />

            </Routes>
        <Sidebar/>
=======
              <Route path = "/Admin" element={<Adminpage/>}/>
              <Route path = "/SignIn" element={<SignInPage/>}/>
              <Route path = "/SignUp" element={<SignUpPage/>}/> 
            </Routes>
>>>>>>> Julius
          </div>
      </div>
    </Router>
  );
}

export default App;
