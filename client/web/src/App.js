import { Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import "./App.css";
import { Fragment } from "react";
import NavBar from "./layout/Navbar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Fragment>
  );
}

export default App;
