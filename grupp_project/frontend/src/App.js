import './App.css';
import './Components/WebsiteStyle.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Here we import Navigation functions
import { NavigateAppUsage } from './navigate/NavigateAppUsage';

// Here we import pages
import Homepage from './Pages/Homepage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import MyPage from './Pages/MyPage';
import Adminpage from './Pages/Adminpage';
import AdminList from './Pages/AdminListPage';
import Userpage from './Pages/Userpage';
import StaffPage from './Pages/StaffPage';
import Confirmation from './Components/Confirmation';

// Here we import components (model)
import Navbar from './Components/Navbar';

function App() {
  const { user } = useAuthContext()

  return (
    <Router>
      <div className = "app">
        <div className = "content">
          <Navbar/>
          <Routes>
            <Route path = "/" element={<Homepage/>}/>
            <Route path = "/Home" element={<Homepage/>}/>
            <Route path = "/SignIn" element={!user ? <SignInPage/> : <Navigate to="/Home"/>}/>
            <Route path = "/SignUp" element={!user ? <SignUpPage/> : <Navigate to="/Home"/>}/>
            <Route path = "/MyPage" element={user ? <MyPage/> : <Navigate to="/SignIn"/>} />
            <Route path="/User" element={user ? (user.role === 'member' ? <Userpage/> : <NavigateAppUsage />) : <Navigate to="/SignIn"/>}/>
            <Route path = "/Staff" element= {user ? (user.role === 'staff' ? <StaffPage/> : <NavigateAppUsage />) : <Navigate to="/SignIn"/>}/>
            <Route path = "/Admin" element={user ? (user.role === 'admin' ? <Adminpage/> : <NavigateAppUsage />) : <Navigate to="/SignIn"/>}/>
            <Route path = "/AdminList" element={user ? (user.role === 'admin' ? <AdminList/> : <NavigateAppUsage />) : <Navigate to="/SignIn"/>}/>
            <Route path="/confirmation" element={<Confirmation />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;