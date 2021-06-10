import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../components/Layout";
import AddShop from "../screens/AddShop";
import EditShop from "../screens/EditShop";
import { Home } from "../screens/Home";
import routes from "./routes";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.home} exact>
          <Layout>
            <Home />
          </Layout>
        </Route>
        <Route path={routes.shop}>
          <Layout>
            <EditShop />
          </Layout>
        </Route>
        <Route path={routes.add}>
          <Layout>
            <AddShop />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};
