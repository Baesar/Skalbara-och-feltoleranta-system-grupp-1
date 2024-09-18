import './Components/WebsiteStyle.css';
/// here we import pages (view)
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import Testing_ground from './Pages/Testing_ground';
///here we import components (model)
import Sidebar from './Components/Sidebar';

////////////////
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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
            </Routes>
        <Sidebar/>
          </div>
        
      </div>
    </Router>
  );
}

export default App;
