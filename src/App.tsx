import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import StudentHomePage from "./pages/student-home-page";
import Login from './pages/login';
import Signup from './pages/signup';
function App() {
  return (

    <Router>
      <div className="login-page">

        <Routes>
          <Route  path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>

      </div>
    </Router>

  );
}

export default App;
