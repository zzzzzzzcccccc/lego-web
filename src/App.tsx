import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom'
import Routers from "./routers";
import './assets/style/common.less'

const App:React.FC = () => (
  <Router basename="/">
    <Routers />
  </Router>
);

export default App;
