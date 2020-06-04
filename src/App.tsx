import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import Routers from "./routers";
import './assets/style/common.less'

export default () => (
  <Router basename="/">
    <Routers />
  </Router>
);
