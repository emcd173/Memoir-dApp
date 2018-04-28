// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes
import RecordList from './RecordList/RecordList';

// Import Components

// Import Styles
import './Home.scss';

// Import Services

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RecordResult: [],
    };
  }

  render() {
    return (
      <div className="Home">
        <RecordList recordList={this.state.RecordResult}/>
      </div>
    );
  }
}

export default Home;
