import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./Pages/Public/Login/Login"
import Profile from './Pages/Private/Profile/Profile';
import Home from './Pages/Public/Home/Home'
import SignUp from './Pages/Public/SignUp/SignUp'
import Account from './Pages/Private/Account/Account';
import Schedule from './Pages/Private/Schedule/Schedule'
import Tips from './Pages/Private/Tips/Tips'
import OwnerProfile from './Pages/Owner/Profile/Profile';
import OwnerAcount from './Pages/Owner/Account/Account'
import CreatedTable from './Pages/Owner/CreatedTable/Table'
import Summary from './Pages/Owner/Summary/Summary'
import Verify from './Pages/Public/VerifyingCode/Verify';

function App() {  
  // let navigate = useNavigate() 
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login'  element={<Login/>}/>
          <Route path='/signup'  element={<SignUp/>}/>
          <Route path='/verify'  element={<Verify/>}/>
          <Route path='/account'  element={<Account/>}/>
          <Route path='/myschedule'  element={<Schedule/>}/>
          <Route path='/tips'  element={<Tips/>}/>
          <Route path='/profile'  element={<Profile/>}/>
          <Route path='/owner/company'  element={<OwnerProfile/>}/>
          <Route path='/owner/account'  element={<OwnerAcount/>}/>
          <Route path='/owner/summary'  element={<Summary/>}/>
          <Route path='/owner/tableArea'  element={<CreatedTable/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
