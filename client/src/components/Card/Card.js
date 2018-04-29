import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import AddIcon from '@material-ui/icons/Lock';

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
    this.copyToClipboard = this.copyToClipboard.bind(this);
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
            transactionHash: results['tx'],
            privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDrEgQdf2FEYKRI08Mu5lkPa+0hlBOHsicJ43jviet6rEZ/QQSb
5k963gzjWZqBuFD7k5pBvm1cFrsc3Wv82cxdfPKtMoX0l1ftUJ29PF453tV7fInj
Dy6rXyh9l24OsoL2MFwH/zowLKiXOc3Os7DZbiwnB9QbzUjueIhlfKI78wIDAQAB
AoGAb3JQLyf4FnH3EWwMaozdBnm1qCjLBZeJ+J828+IgmT1aAvTxWXRclDT4SUVv
Ajc/dbap+Kdus603Mt0rWGpt/7AgnYzg12hbm5pwrPsC7nPlKrax5WTcucSNl6ky
8zOZeX2OvibQrZYKKW28ccd1COy2MJ+NghYKCEfNhjqSVaECQQD4PArKcYdSc03E
hArNOWql7POZeU4Diiago4+jgS2yUVfpo20fgFX3e+ZifYMJVFU8706izl9qVnuA
HJQofedjAkEA8myM22RvbzOBbsAEpbzHDwX9OPQOsODypP/ffI0DOMqgqlS/ky9u
PEMp17wiVqcYK5v/OmIspBoE8g/mpqLmMQJBAKtMe8HR8CkUioDnAbE3QwI3bq7l
B9HnftpxpEiXdxpLidgfv8jyPeCnrocex9MjUCLZnTE6KpvuDBGPJyp+H7MCQQDD
j5XBli/ewOn08anOGY9rKyWvQBJp1c1oFZGv5AFpWuxo+5zfmy+OJZAnnHkG9hyl
cV5fNrtUVjkPHIyweFDBAkAOFZstgeG8ihk4FVisXvkGn3EMWPxku/OQK2iXPZ8b
MWDXVvho4PYA5Lt9KK3bKtIFRd9M5DRAzcr8QOCtlZ7T
-----END RSA PRIVATE KEY-----`
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
              // privateKey: event['args']._key,
          });
          // this.props.loadAllEntries();
        }
      })
  }

  copyToClipboard = str => {
    var string = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDrEgQdf2FEYKRI08Mu5lkPa+0hlBOHsicJ43jviet6rEZ/QQSb
5k963gzjWZqBuFD7k5pBvm1cFrsc3Wv82cxdfPKtMoX0l1ftUJ29PF453tV7fInj
Dy6rXyh9l24OsoL2MFwH/zowLKiXOc3Os7DZbiwnB9QbzUjueIhlfKI78wIDAQAB
AoGAb3JQLyf4FnH3EWwMaozdBnm1qCjLBZeJ+J828+IgmT1aAvTxWXRclDT4SUVv
Ajc/dbap+Kdus603Mt0rWGpt/7AgnYzg12hbm5pwrPsC7nPlKrax5WTcucSNl6ky
8zOZeX2OvibQrZYKKW28ccd1COy2MJ+NghYKCEfNhjqSVaECQQD4PArKcYdSc03E
hArNOWql7POZeU4Diiago4+jgS2yUVfpo20fgFX3e+ZifYMJVFU8706izl9qVnuA
HJQofedjAkEA8myM22RvbzOBbsAEpbzHDwX9OPQOsODypP/ffI0DOMqgqlS/ky9u
PEMp17wiVqcYK5v/OmIspBoE8g/mpqLmMQJBAKtMe8HR8CkUioDnAbE3QwI3bq7l
B9HnftpxpEiXdxpLidgfv8jyPeCnrocex9MjUCLZnTE6KpvuDBGPJyp+H7MCQQDD
j5XBli/ewOn08anOGY9rKyWvQBJp1c1oFZGv5AFpWuxo+5zfmy+OJZAnnHkG9hyl
cV5fNrtUVjkPHIyweFDBAkAOFZstgeG8ihk4FVisXvkGn3EMWPxku/OQK2iXPZ8b
MWDXVvho4PYA5Lt9KK3bKtIFRd9M5DRAzcr8QOCtlZ7T
-----END RSA PRIVATE KEY-----`
    const el = document.createElement('textarea');
    el.value = string;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  render() {
    String.prototype.trunc = String.prototype.trunc ||
          function(n){
              return (this.length > n) ? this.substr(0, n-1) + '' : this;
          };

    const check = this.props.type;
    let type;
    if(check==1){
      type = "Image";
    } else if(check==2){
      type="Text"
    } else {
      type="Video"
    }
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
                <div className="group">
                  <div className="type">
                    {this.props.type}
                  </div>
                  <div className="pk">
                    {this.props.isReleased ? 
                     <Button href="#flat-buttons" onClick={this.copyToClipboard} className={classes.button}>
                       Copy Key
                     </Button>
                     : "Key Hidden" }
                   </div>
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
