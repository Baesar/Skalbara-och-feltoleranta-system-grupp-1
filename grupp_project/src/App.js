<<<<<<< HEAD

import './App.css';
import './Components/WebsiteStyle.css';
/// here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import Testing_ground from './Pages/Testing_ground';
///here we import components 
import Sidebar from './Components/Sidebar';

////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Userpage from './Pages/Userpage';
=======
import './Components/WebsiteStyle.css';
/// here we import pages (view)
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import Testing_ground from './Pages/Testing_ground';
///here we import components (model)
import Sidebar from './Components/Sidebar';
import './Components/WebsiteStyle.css';
////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 8c10174e720d589d8b741890b7f8c19f580b849e


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
              <Route path = "/Testing_ground" element={<Testing_ground/>}/> 
<<<<<<< HEAD
              <Route path="/User" element={<Userpage />} />
              <Route path="/confirmation" element={<Confirmation />} />

=======
>>>>>>> 8c10174e720d589d8b741890b7f8c19f580b849e
            </Routes>
        <Sidebar/>
          </div>
        
      </div>
    </Router>
  );
}

export default App;
