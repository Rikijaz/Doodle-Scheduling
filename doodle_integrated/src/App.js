import React from "react";
import "./App.css";
import EventManager from "./components/EventManager";
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                  <Login/>
                </Route>
                <Route exact path="/home">
                    <EventManager />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
