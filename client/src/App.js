import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route exact path="/LoginPage" element={<LoginPage/>}/>
          <Route exact path="/RegisterPage" element={<RegisterPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
