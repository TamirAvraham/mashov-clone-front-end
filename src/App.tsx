import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import StudentHomePage from "./student-home-page";
import Login from './login';
function App() {
  return (

    <Router>
      <div className="login-page">
        <p>this will be the login page still need to match it to qwik impl</p>

        <Link to="/"></Link>

        <Routes>
          <Route  path='/' element={<Login/>}></Route>
        </Routes>

      </div>
    </Router>

  );
}

export default App;
