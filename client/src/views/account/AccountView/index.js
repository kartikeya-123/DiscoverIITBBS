import React, { Component } from 'react';
import { Container, Grid, withStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';

const useStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
});

class Account extends Component {
  state = {
    user: [],
    isLoading: true
  };
  updateProfile = values => {
    this.setState({ isLoading: true });
    const data = { ...values };
    console.log(data);
    axios
      .patch('/v1/user/profile', data, {
        withCredentials: true
      })
      .then(response => {
        this.setState({ user: response.data.data.user, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });

    axios
      .get('/v1/user/profile', {
        withCredentials: true
      })
      .then(response => {
        // console.log(response.data.data.user);
        this.setState({ user: response.data.data.user, isLoading: false });
        console.log(this.state.user);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.user);
    return (
      <div>
        {!this.state.isLoading ? (
          <Page className={classes.root} title="Account">
            <Container maxWidth="lg">
              <Grid align="center">
                <Grid item lg={12} md={10} xs={12}>
                  <Profile profile={this.state.user} />
                </Grid>
                {/* <Grid item lg={7} md={6} xs={12}>
                  <ProfileDetails
                    profile={this.state.user}
                    update={this.updateProfile}
                  />
                </Grid> */}
              </Grid>
            </Container>
          </Page>
        ) : null}
      </div>
    );
  }
}

export default withStyles(useStyles)(Account);