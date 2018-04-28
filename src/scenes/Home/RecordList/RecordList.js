// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes

// Import Components
import CenteredTab from '../../../components/CenteredTab'
import Card from '../../../components/Card'

// Import Styles
// import './RecordList.scss';

// Import Services

class RecordList extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	    title: "",
      type: "",
      description: "",
      countdown: "",
	  };
	}

  render() {
    // Dyanmically generate each table row based on data received from api
    const recordListTable = this.props.RecordResult.map((record) => {
      return (
            <Card
             title={record.title}
             type={record.type}
             description={record.description}
             countdown={record.countdown} 
            />)
    });
    return (
      <div className="Home">
        <CenteredTab/>
        {recordListTable}
      </div>
    );
  }
}

export default RecordList;
