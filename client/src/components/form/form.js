import React from 'react';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import './form.scss';

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
  }
});

const ipfsApi = window.IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'})
const JSEncrypt = window.JSEncrypt;
// var encrypted = CryptoJS.AES(...);
// var encrypted = CryptoJS.SHA256(...);

console.log(window);

class Form extends React.Component {
  constructor(props) {
    super(props);
console.log("test")
    this.state = {
      open: false,
      title: "",
      description: "",
      category: "",
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
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)


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


    // // Now a simple check to see if the round-trip worked.
    // if (dec === text){
    //     alert(dec);
    // } else {
    //     alert('Something went wrong....');
    // }

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
      }).catch((err) => {
        console.error(err)
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
    var encryptBlob = new File([this.state.encText], this.state.filename, {type: "text/plain"});
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(encryptBlob);
    // write hash to block chain with rest of data
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
                  Let the world know!
                </DialogContentText>
                <div className="form-body">
                  <div className="input-group">
                    <TextField
                        id="title"
                        label="Title"
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
