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

const ipfsApi = window.IpfsApi("localhost","5100");

class Form extends React.Component {
  constructor(props) {
    super(props);
console.log("test")
    this.state = {
      open: false,
      title: "",
      description: "",
      category: "",
      author: ""
    }
    // bind methods
    this.captureFile = this.captureFile.bind(this)
    this.saveToIpfs = this.saveToIpfs.bind(this)
  }

  captureFile (event) {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file);
  }

  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result);
    console.log(buffer);
    ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
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
                <Button onClick={this.handleClose} color="primary" autoFocus>
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
