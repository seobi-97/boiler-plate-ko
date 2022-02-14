import React from 'react';
import {
  BrowerRouter as Router,
  Switch,
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
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/LoginPage" component={LoginPage}/>
          <Route exact path="/RegisterPage" component={RegisterPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
