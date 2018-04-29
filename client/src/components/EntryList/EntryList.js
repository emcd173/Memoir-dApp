// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes

// Import Components
import Card from '../Card/Card'

// Import Styles
// import './entryList.scss';

// Import Services

class entryList extends Component {
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
    const entryListTable = this.props.entryResults.map((entry) => {
      return (
            <Card
             key={entry.id}
             title={entry.title}
             ipfs={entry.ipfs}
             descrip={entry.descrip}
             unlockTime={entry.unlockTime} 
             type={entry.type}
            />)
    });
    return (
      <div className="">
        {entryListTable}
      </div>
    );
  }
}

export default entryList;
