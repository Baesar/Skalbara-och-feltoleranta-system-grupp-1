import './App.css';
import './Components/WebsiteStyle.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

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
  const { user } = useAuthContext()

  return (
    <Router>
      <div className = "app">
        <div className = "content">
          <Routes>
            <Route path = "/" element={<Homepage/>}/>
            <Route path = "/Home" element={<Homepage/>}/>
            <Route path = "/Admin" element={<Adminpage/>}/> 
            <Route path = "/Testing" element={<TestingGround/>}/> 
            <Route path="/User" element={user ? <Userpage /> : <Navigate to="/SignIn"/>} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path = "/SignIn" element={!user ? <SignInPage/> : <Navigate to="/Home"/>}/>
            <Route path = "/SignUp" element={!user ? <SignUpPage/> : <Navigate to="/Home"/>}/>
          </Routes>
          <Sidebar/>
        </div>
      </div>
    </Router>
  );
}

export default App;