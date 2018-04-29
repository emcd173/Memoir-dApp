import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddIcon from '@material-ui/icons/Add';

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
    const { classes } = this.props;
    return (
      <div>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  {this.props.owner}
                </Typography>
                <Typography variant="headline" component="h2">
                  {this.props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {this.props.type}
                </Typography>
                <Typography component="p">
                  {this.props.desc}
                </Typography>
                <Typography component="p">
                  {this.props.ipfs}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">{this.props.countdown}</Button> */}
              </CardActions>
             <Button variant="raised" component="span" className={classes.button}>
               Upload
             </Button>
             <Button variant="fab" color="primary" aria-label="add" onClick={this.requestUnlock}className={classes.button}>
               <AddIcon />
             </Button>
            </Card>
      </div>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
