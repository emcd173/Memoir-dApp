import React from 'react';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
// Import Services
import {
  getWeb3Service,
  getWeb3Object,
  getAmsterdamContractInstance,
  getCurrentAccount
} from '../../services/providerService';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import './form.scss';
import Select from 'material-ui/Select';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  form: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const ipfsApi = window.IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'})
const JSEncrypt = window.JSEncrypt;

console.log(window);

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      description: "",
      category: 2,
      author: "",
      added_file_hash: undefined,
      publicKey: 
        `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDrEgQdf2FEYKRI08Mu5lkPa+0h
lBOHsicJ43jviet6rEZ/QQSb5k963gzjWZqBuFD7k5pBvm1cFrsc3Wv82cxdfPKt
MoX0l1ftUJ29PF453tV7fInjDy6rXyh9l24OsoL2MFwH/zowLKiXOc3Os7DZbiwn
B9QbzUjueIhlfKI78wIDAQAB
-----END PUBLIC KEY-----`,
      privateKey: 
        `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`,
    }
    // bind methods
    this.newEntry = this.newEntry.bind(this);
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
  }

  componentDidMount() {
    getWeb3Service().then(() => {
      this.setState({
       web3: getWeb3Object(),
       amsterdamContractInstance: getAmsterdamContractInstance(),
      });

      var instance = getAmsterdamContractInstance();


      getCurrentAccount().then( (accountResult) => {
       this.setState({
         account: accountResult,
       })
      }) .catch((error) => {
      });
    })


    var crypt = new JSEncrypt();
    crypt.setKey(`-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`); //You can use also setPrivateKey and setPublicKey, they are both alias to setKey

    //Eventhough the methods are called setPublicKey and setPrivateKey, remember
    //that they are only alias to setKey, so you can pass them both a private or
    //a public openssl key, just remember that setting a public key allows you to only encrypt.

    var text = 'jQpFYY30t2kH0GWEPvvIHB8wB1QQIBDxbZNdte3vfYnlet/To4Jfw3JAka4HyKiz/Ivp6kJI7OQdXeS4A0kmYDfriZVeCIxNZFElI9BT4iOVfoIP+qcyrsC3hg1D/gzjfNXcn81JTEu7fQRT/4W6pQZHB9rdwvjCDtEgSgYfY8g=';
    var text1 = '54LxKlrUpyT2v9oDKfzF/+LOTm7BL2dae/5ZmwSEk0TNFRptUxR6Qekmv4HtL6xsCWyJKvmKUQ/z9VFTFvfE3RyfOXARWv+lQR8158y9CVPT0wHxxSMcbPNrDsm82EIjLUm3khIRuU440jBqkk/0yh3RIKoxJ0CKNGhOq4ocQJc=';

    // Encrypt the data with the public key.
    // var enc = crypt.encrypt(text);
    // Now decrypt the crypted text with the private key.
    var dec = crypt.decrypt(text);
    console.log(dec);
    var dec2= crypt.decrypt(text1);
    console.log(dec2);

  }

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    console.log(file);
    let reader = new window.FileReader()
    reader.onload = (event) => {
      this.setState({
        encText: this.encryptWithPublicKey(event.target.result),
        name: file.name + 'encrypted',
      });
      // button.disabled = false;
    }
    reader.readAsText(new Blob([file], {
      "type": "application/json"
    }));
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result);
    console.log(buffer);
    ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log("https://ipfs.io/ipfs/" + ipfsId)
        this.setState({added_file_hash: ipfsId})
         return true;
      }).then((result)=>{
        this.newEntry();      
      }).catch((err) => {
        console.error(err)
      })
  }

  newEntry(){
    const arr = this.state.endDate.split("-");
    console.log(arr);
    let steve_jobs = new Date(arr[0],arr[1],arr[2]);
    let a = Date.parse(steve_jobs)
    console.log(a);
    console.log(steve_jobs);
    this.setState({
      ed: a
    });
    console.log(this.state);
    this.state.amsterdamContractInstance.appendEntry(
      this.state.ed, // unlockTime
      "ipfs", // ipfs
      this.state.title, // title
      this.state.description, // description
      this.state.category, // entryType
      {
          from: this.state.account, 
      }
    ).then((results) => {
        // Metamask has initiated transaction
        // Now wait for transaction to be added to blockchain
        this.setState({
          open: false
        });

    }).catch((err) => {
    })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    
    const endDate = document.getElementById('date').value;
    
    const title = this.state.title;
    const des = this.state.description;
    const cat = this.state.category;

    this.setState({endDate, title, des, cat});

    var encryptBlob = new File([this.state.encText], this.state.filename, {type: "text/plain"});

    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(encryptBlob);
  };

  encryptWithPublicKey(plainFile){
    // Encrypt with the public key...
    var encrypt = new JSEncrypt();
    encrypt.setPrivateKey(this.state.privateKey);
    return encrypt.encrypt(plainFile);
  }

  decryptWithPrivateKey(encryptedFile){
    // Decrypt with the private key...
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(this.state.privateKey);
    return decrypt.decrypt(encryptedFile);
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }

  handleCatChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };




  render() {

    return (
      <div>
        <Button className="upload-btn" onClick={this.handleClickOpen} variant="raised" color="default">
          Upload
          <FileUpload />
        </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <form className={this.props.classes.container} noValidate autoComplete="off">
              <DialogTitle id="responsive-dialog-title">{"Make your memoir"}</DialogTitle>
              <DialogContent className={this.props.classes.form}>
                <DialogContentText>
                <blockquote>“Tell the truth, or someone will tell it for you.”</blockquote> ― Stephanie Klein, Straight Up and Dirty
                </DialogContentText>
                <div className="form-body">
                  <div className="input-group">
                    <TextField
                        id="title"
                        label="Title"
                        name="title"
                        className={this.props.classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                        fullWidth
                      />
                  </div>
                  <div className="input-group">
                  <TextField
                      id="multiline-flexible"
                      label="Description"
                      multiline
                      rows="3"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange('description')}
                      className={this.props.classes.textField}
                      margin="normal"
                    />
                  </div>
                  <div className="input-group">
                  <TextField
        id="date"
        name="date"
                      label="Release Date"
                      type="date"
                      defaultValue="2018-04-29"
                      className={this.props.classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  <div className="input-group">
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
            value={this.state.category}
            onChange={event => this.handleCatChange}
            input={<Input name="category" id="category" />}
          >
                      <MenuItem value={2}>Nudes of myself</MenuItem>
                      <MenuItem value={3}>Nudes of other people</MenuItem>
                      <MenuItem value={1}>Nudes of people I don't know</MenuItem>
                    </Select> 
                  </div>
                </div>
                <input type="file" id="myFile" onChange={this.captureFile}/>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary" autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </form>
          </Dialog>
      </div>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);
