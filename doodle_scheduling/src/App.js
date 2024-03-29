import React from "react";
import "./App.css";
import EventManager from "./components/EventManager";
import Login from './components/Login'
import Profile from './components/Profile'
import ViewContactProfile from './components/ViewContactProfile'
import { HashRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/home">
                    <EventManager />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route exact path="/contact">
                    <ViewContactProfile />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
