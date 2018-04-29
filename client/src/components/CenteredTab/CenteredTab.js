import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import EntryList from '../EntryList/EntryList'

const styles = {
  root: {
    flexGrow: 1,
  },
};

class CenteredTabs extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: 0,
        filteredEntryResults: this.props.entryResults.filter(entry => entry.unlockTime < Date.now()),
      };

      this.handleChange = this.handleChange.bind(this)

    }

    // componentWillMount(){
    //   this.filterResults(0).then((filteredResults) => {
    //     this.setState({
    //       filteredEntryResults: filteredResults,
    //     });
    //   });
    // }

  handleChange = (event, value) => {
    this.setState({
      value: value,
      filteredEntryResults: this.filterResults(value),
    });
  };

  filterResults = (value) => {
    // filter based on time
    // 0 is released
    // 1 is available to be release but not yet released
    // 2 is still counting down
    switch(value) {
        case 1:
            return this.props.entryResults.filter(entry => entry.unlockTime > Date.now());
        default:
            return this.props.entryResults.filter(entry => entry.unlockTime < Date.now());
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="The Library" />
          <Tab label="The Vault" />
        </Tabs>
      </Paper>
      <EntryList entryResults={this.state.filteredEntryResults}
        amsterdamContractInstance={this.props.amsterdamContractInstance}
        loadAllEntries={this.props.loadAllEntries}
        account={this.props.account}
      />
      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);