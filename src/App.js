// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/Homepage';
import About from './components/About';
import Signup from './components/Signup';
import Signin from './components/Signin';
import FeedsPage from './components/FeedsPage';
import PostProject from './components/PostProject';
import { AuthProvider } from './AuthContext'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/feedspage" component={FeedsPage} />
          <Route path="/postProject" component={PostProject} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;

