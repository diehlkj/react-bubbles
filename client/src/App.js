import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import ProtectedRoute from './components/ProtectedRoute';
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path='/bubblepage' component={BubblePage} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
