// Components/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import sampleGrid from "./pages/sampleGrid";
import sampleBoard from "./pages/sampleBoard";

export default () => (
  <Router>
    <Route exact path="/" component={sampleBoard} />
    <Route path="/sampleBoard" component={sampleBoard} />
    <Route path="/sampleGrid" component={sampleGrid} />
  </Router>
)