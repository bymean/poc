import React, { Component } from 'react';
// import GridSample from './pages/sampleGrid';
import Routes from "./Routes";

import './resource/common.scss';
import 'antd/dist/antd.css';
import './resource/DefaultLayout.scss';

class App extends Component {
  render () {
    return (
      <>
        <Routes />
      </>
    );
  }
}

export default App;
