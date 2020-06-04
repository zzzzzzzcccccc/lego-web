import React from 'react';
import { Home, BuildForm } from "../views"
import { Switch, withRouter, Route, Redirect } from 'react-router-dom'

const Routers = withRouter(({ location, history }) => {
  return(
    <Switch location={location}>
      <Route path="/Home" component={Home} />
      <Route path="/BuildForm" component={BuildForm} />
      <Redirect to="/BuildForm" />
    </Switch>
  )
});

export default Routers;
