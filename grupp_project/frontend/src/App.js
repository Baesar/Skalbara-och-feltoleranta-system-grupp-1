import './App.css';
import './Components/WebsiteStyle.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Here we import pages
import Homepage from './Pages/Homepage';
import Adminpage from './Pages/Adminpage';
import TestingGround from './Pages/TestingGround';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Userpage from './Pages/Userpage';
import Confirmation from './Components/Confirmation';

// Here we import components (model)
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import StaffPage from './Pages/StaffPage';

function App() {
  const { user } = useAuthContext()

  return (
    <Router>
      <div className = "app">
        <div className = "content">
          <Navbar/>
          <Routes>
            <Route path = "/" element={<Homepage/>}/>
            <Route path = "/Staff" element= {user ? (user.token === 'staff' ? <StaffPage/> : <Userpage/>) : <Navigate to="/SignIn"/>}/>
            <Route path = "/Home" element={<Homepage/>}/>
            <Route path = "/Admin" element={<Adminpage/>}/> 
            <Route path = "/Testing" element={<TestingGround/>}/> 
            <Route path="/User" element={user ? (user.token === 'staff' ? <StaffPage/> : <Userpage/>) : <Navigate to="/SignIn"/>} />
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