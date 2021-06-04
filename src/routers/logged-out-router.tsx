import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <h1>Login</h1>
        </Route>
        <Route path={routes.signUp}>
          <h1>SignUp</h1>
        </Route>
      </Switch>
    </Router>
  );
};
