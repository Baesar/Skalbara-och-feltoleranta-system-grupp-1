import './Components/WebsiteStyle.css';
/// here we import pages (view)
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import TestingGround from './Pages/TestingGround';
///here we import components (model)
import Sidebar from './Components/Sidebar';
import './Components/WebsiteStyle.css';
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
              <Route path = "/TestingGround" element={<TestingGround/>}/> 
            </Routes>
        <Sidebar/>
          </div>
        
      </div>
    </Router>
  );
}

export default App;
