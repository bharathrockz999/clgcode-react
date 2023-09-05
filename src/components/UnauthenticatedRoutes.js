import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './Homepage';
import About from './About';
import Signup from './Signup';
import Signin from './Signin';

function UnauthenticatedRoutes() {
  return (
    <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/about" component={About} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup} />
    </Switch>
  );
}

export default UnauthenticatedRoutes;
