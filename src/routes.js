import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProtectedRouteLogin from "./ProtectedRouteLogin";
import ProtectedRouteGenre from "./ProtectedRouteGenre";

import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Genres from "./components/Genres";
import Artists from "./components/Artists";

export default (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRouteLogin exact path="/genres" component={Genres} />
        <ProtectedRouteGenre exact path="/artists" component={Artists} />
    </Switch>
)

