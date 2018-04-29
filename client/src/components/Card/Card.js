import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddIcon from '@material-ui/icons/Add';

import './Card.scss'

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.requestUnlock = this.requestUnlock.bind(this)
    this.listenToEntryUnlockedEvent();
  }

  requestUnlock = () => {
    // Declaring this for later so we can chain functions.
    // Form submitted, now waiting on metamask
    this.setState({
        formSubmitted: true
    });

    // Get accounts.
    this.props.amsterdamContractInstance.release(
      this.props.id,
      {
        from: this.props.account, 
      }
    ).then((results) => {
        // Metamask has initiated transaction
        // Now wait for transaction to be added to blockchain
        this.setState({
            waitingMetamask: false,
            waitingConfirmation: true,
            transactionHash: results['tx']
        });
        
    }).catch((err) => {
    })
  }

  // Listen for events raised from the contract
  listenToEntryUnlockedEvent() {
      this.props.amsterdamContractInstance.EvtRelease({}, {fromBlock: 0,toBlock: 'latest'}).watch((error, event) => {
          // This is called after metamask initiates transaction
          // We take the transaction ID that metamask initiated compare it to that of the new log event to ensure it matches our transaction
        if (event['transactionHash'] === this.state.transactionHash){
          // event['args']._key.toNumber();
          console.log("Event: ", event);
          this.setState({
              waitingConfirmation: false,
          });
          this.props.loadAllEntries();
        }
      })
  }

  render() {
    String.prototype.trunc = String.prototype.trunc ||
          function(n){
              return (this.length > n) ? this.substr(0, n-1) + '' : this;
          };

    const { classes } = this.props;
    return (
      <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  <div className="owner">
                  {this.props.owner}
                  </div>
                </Typography>
                <Typography variant="headline" component="h2">
                <div className="title">
                  {this.props.title}
                </div>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                <div className="type">
                  {this.props.type}
                </div>
                </Typography>
                <Typography component="p">
                <div className="desc">
                  {this.props.desc}
                </div>
                </Typography>

              </CardContent>
             <div className="bottom">
               <Typography component="p">
               <div className="ipfs">
                 <a target="_blank" href={`https://ipfs.io/ipfs/${this.props.ipfs}`}>ipfs.io/{this.props.ipfs.trunc(15)}...</a>
               </div>
               </Typography>
               <div className="button">
                 <Button variant="fab" color="primary" aria-label="add" onClick={this.requestUnlock}className={classes.button}>
                   <AddIcon />
                 </Button>
               </div>
            </div>
            </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
