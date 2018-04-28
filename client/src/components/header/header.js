import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import "./header.scss";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Form from '../form/form';

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
                        <Form></Form>
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