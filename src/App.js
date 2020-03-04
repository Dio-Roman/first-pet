import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Desktop from "./components/Desktop/Desktop";
import Header from "./components/Header/Header";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <WelcomeScreen />
          </Route>
          <Route exact path="/felix">
            <Header />
            <Desktop />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
