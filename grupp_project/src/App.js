import './App.css';
import './Components/WebsiteStyle.css';
/// here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';

import TestingGround from './Pages/TestingGround';
///here we import components (model)

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
              <Route path = "/Admin" element={<Adminpage/>}/> 

              <Route path = "/TestingGround" element={<TestingGround/>}/> 

              <Route path="/User" element={<Userpage />} />
              <Route path="/confirmation" element={<Confirmation />} />

            </Routes>
        <Sidebar/>
          </div>
        
      </div>
    </Router>
  );
}

export default App;
