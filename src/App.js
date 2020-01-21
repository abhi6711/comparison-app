import React, {Component} from 'react';
import './App.scss';

import ComparisonComponent from './component/ComparisonComponent';

class MainApp extends Component{
  render() {
    return (
      <div className="main-app-container">
        <ComparisonComponent></ComparisonComponent>
      </div>
    );
  }
}

export default MainApp;
