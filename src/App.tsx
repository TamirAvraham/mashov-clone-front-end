import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,

} from 'react-router-dom';
import './App.css';
import StudentHomePage from "./pages/student-home-page";
import Login from './pages/login';
import Signup from './pages/signup';
import User from './models/user';
import Home from './pages/home';
import { UserService } from './services/userService';
function App() {
  let [user,updateUser]=useState(UserService.errorUser);
  return (

    <Router>
      <div className="login-page">
      
        <Routes>
          <Route path='/' element={<Login updateMethod={updateUser}/>}></Route>
          <Route path='/signup' element={<Signup updateMethod={updateUser}/>}></Route>
          <Route path='/student/home/:id' element={<StudentHomePage/>}/>
        </Routes>

      </div>
    </Router>

  );
}

export default App;
