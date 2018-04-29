// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import imagesLoaded from 'imagesloaded'

// Import Scenes

// Import Components
import Card from '../Card/Card'

// Import Styles
import './EntryList.scss';

// const masonry = window.Masonry;

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
    // console.log(this.props.entryResults);
    const entryListTable = this.props.entryResults.map((entry) => {
      return (
            <div className="entryItem" key={entry.id}>
              <div className="content">
              <Card
               title={entry.title}
               ipfs={entry.ipfs}
               desc={entry.descrip}
               unlockTime={entry.unlockTime} 
               type={entry.type}
               isReleased={entry.id % 3 ? true : false}
               id={entry.id}
               amsterdamContractInstance={this.props.amsterdamContractInstance}
               loadAllEntries={this.props.loadAllEntries}
               account={this.props.account}
              />
              </div>
            </div>)
    });

    return (
      <div className="grid">
            {entryListTable}
      </div>  
    );
  }
}

export default entryList;
