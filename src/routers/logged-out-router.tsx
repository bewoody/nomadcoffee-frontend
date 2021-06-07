import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import routes from "./routes";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <Login />
        </Route>
        <Route path={routes.signUp}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
};
