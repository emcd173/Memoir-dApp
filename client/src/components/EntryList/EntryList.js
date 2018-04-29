// Import React Modules
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import imagesLoaded from 'imagesloaded'

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


  // resizeGridItem(item){
  //    var grid = document.getElementsByClassName("grid")[0];
  //    var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  //    var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  //    var rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  //    item.style.gridRowEnd = "span "+rowSpan;
  // }

  // resizeAllGridItems(){
  //    var allItems = document.getElementsByClassName("entryItem");
  //    for(var x=0; x<allItems.length;x++){
  //       this.resizeGridItem(allItems[x]);
  //    }
  // }

  // resizeInstance(instance){
  //    var item = instance.elements[0];
  //    this.resizeGridItem(item);
  // }

  // componentDidUpdate(){

  // }

  // setGrid() {
  //   //wait for a paint to do scrolly stuff
  //   window.requestAnimationFrame(function() {
  //     this.resizeAllGridItems();
  //     window.addEventListener("resize", this.resizeAllGridItems);
  //     var allItems = document.getElementsByClassName("entryItem");
  //     for(var x=0;x<allItems.length;x++){
  //        imagesLoaded( allItems[x], () => this.resizeInstance);
  //     }
  //   });
  // }

  render() {
    // Dyanmically generate each table row based on data received from api
    console.log(this.props.entryResults);
    const entryListTable = this.props.entryResults.map((entry) => {
      return (
            <div className="entryItem">
              <div className="content" key={entry.id}>
              <Card
               title={entry.title}
               ipfs={entry.ipfs}
               descrip={entry.descrip}
               unlockTime={entry.unlockTime} 
               type={entry.type}
               id={entry.id}
               amsterdamContractInstance={this.props.amsterdamContractInstance}
               loadAllEntries={this.props.loadAllEntries}
               account={this.props.account}
              />
              </div>
            </div>)
    });

    // window.onload = this.resizeAllGridItems();
    // window.addEventListener("resize", this.resizeAllGridItems);
    // var allItems = document.getElementsByClassName("entryItem");
    // for(var x=0;x<allItems.length;x++){
    //    imagesLoaded( allItems[x], this.resizeInstance);
    // }



    return (
      <div className="grid">
            {entryListTable}
      </div>  
    );
  }
}

export default entryList;
