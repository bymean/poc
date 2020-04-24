// Components/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import sampleGrid from "./pages/sampleGrid";
import sampleGrid2 from "./pages/sampleGrid2";
import sampleBoard from "./pages/sampleBoard";

export default () => (
  <Router>
    <Route exact path="/" component={sampleBoard} />
    <Route path="/sampleBoard" component={sampleBoard} />
    <Route path="/sampleGrid" component={sampleGrid} />
    <Route path="/sampleGrid2" component={sampleGrid2} />
  </Router>
)
