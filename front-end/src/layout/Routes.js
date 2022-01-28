import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Reservations from "../reservations/Reservations";
import Layout from "../layout/Layout.js";
import useQuery from "../utils/useQuery";
import Tables from "../tables/Tables";
import Seating from "../seating/Seating";


/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  
  
  const date = useQuery().get("date");
  
  
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Layout />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <Seating />
      </Route>
      <Route exact={true} path="/reservations/new">
        <Reservations />
      </Route>
      <Route exact={true} path="/tables/new">
        <Tables />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
