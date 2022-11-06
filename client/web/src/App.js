import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Fragment>
  );
}

export default App;
