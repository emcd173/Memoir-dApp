import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import './form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
    // this.fileUpload = this.fileUpload.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // fileUpload(file){
  //   const url = 'http://example.com/file-upload';
  //   const formData = new FormData();
  //   formData.append('file',file)
  //   const config = {
  //       headers: {
  //           'content-type': 'multipart/form-data'
  //       }
  //   }
  //   return  post(url, formData,config)
  // }

  onChange(e) {
    this.setState({file:e.target.files[0]});

    console.log(e.target.files[0]);
  }

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button className="upload-btn" onClick={this.handleClickOpen} variant="raised" color="default">
          Upload
          <FileUpload />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
            <input type="file" id="myFile" onChange={this.onChange}/>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Form.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(Form);
