// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes
import CenteredTab from '../../components/CenteredTab/CenteredTab';

// Import Components

// Import Styles
// import './Personal.scss';

// Import Services
import {
  getWeb3Service,
  getWeb3Object,
  getAmsterdamContractInstance,
  getCurrentAccount
} from '../../services/providerService'

class Personal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entryResults: [
      {
        id: 1, 
        title: "Title",
        description: "This is the description",
        type: "type",
        countdown: "5 minutes",
      },
      {
        id: 2,
        title: "Title",
        description: "This is the description",
        type: "type",
        countdown: "5 minutes",
      }],
    };

    getWeb3Service().then(() => {
      console.log("Got web3");
      this.setState({
       web3: getWeb3Object(),
       amsterdamContractInstance: getAmsterdamContractInstance(),
      });

      getCurrentAccount().then( (accountResult) => {
       this.setState({
         account: accountResult,
       })
      })

      this.state.amsterdamContractInstance.getTotalEnteries.call().then((result) => {
         //console.log("Total Number of Entries: ", result.toNumber() );
         this.setState({
             totalEntries: result.toNumber(),
         }); 
         // Load and show all Entries 
         // this.loadAllEntries()
      }).catch((error) => {
        console.log(error);
      });
      // this.listenToEvents();

      })
  }

  // We want to load all Entries. Currently no backend function that returns all entry ids for all Entries on blockchain
  // ASSUMPTION for this function: there will always be a entry for every ID in 1...n; n = total number of Entries
  loadAllentries(){
      var entryObjects = [];
      var idsProcessed = 0;

      var entryIdList = []
      for (var i = 1; i <= this.state.totalEntries; i++){
          entryIdList.push(i);
      }

      // Loop through each ID, get that entry from backend, save info in readable format on front-end, add each entry info to entryObjects array
      entryIdList.forEach( (entryId, index) => {
          this.state.getAmsterdamContractInstance.Entries(entryId).then((entry) => {
              // console.log(entry)
              if (entry[6] === this.state.account){
                idsProcessed++;
                var entryData = {
                "id" : entry[0].toNumber(),
                "unlockTime" : entry[1].toNumber(),
                "owner" : "You",
                "ipfs" : entry[3],
                "title" : entry[4],
                "descrip" : entry[5],
                }
                entryObjects.push(entryData);
                // If we have looped through all Entries, set state
                // Need to refactor this to account for async call within for loop. For loop finishes before async call does, so this is a workaround.
                if (idsProcessed === this.state.totalEntries){
                 //console.log('Results',entryObjects)
                 this.setState({
                     entryResults: entryObjects
                 });     
                }; 
              }
          });
      });
  }


  render() {
    return (
      <div className="Home">
        <h1>Personal entries</h1>
        <h3>Current Account: {this.state.account}</h3>
        <CenteredTab entryResults={this.state.entryResults}/>
      </div>
    );
  }
}

export default Personal;
