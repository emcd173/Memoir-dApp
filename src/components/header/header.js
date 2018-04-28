import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import FileUpload from '@material-ui/icons/FileUpload';
import "./header.scss";
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  button: {
    borderRadius: 18
  },
  accountIcon: {
      fontSize: 36
  },
};

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className={this.props.classes.root}>
            <AppBar className="header">
              <Toolbar className="header-sub">
                <Typography variant="title" color="inherit">
                  Memoir
                </Typography>
                <div className="header-right">
                    <div className="profile">
                        <AccountCircle className={this.props.classes.accountIcon}/>
                    </div>
                    <div className="upload">
                        <Button className={this.props.classes.button} variant="raised" color="default">
                            Upload
                            <FileUpload className={this.props.classes.rightIcon} />
                        </Button>
                    </div>
                </div>
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);