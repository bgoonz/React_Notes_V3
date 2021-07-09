import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import Header from './Header';
import DashboardPage from './DashboardPage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RequireAuthentication from './RequireAuthentication';

import './App.css';
import 'material-design-icons/iconfont/material-icons.css';

export class App extends Component {
  checkAuthenticated(component, path) {
    const Component = component;
    return this.props.isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Component to={path} />
    );
  }

  render() {
    return (
      <div className="App">
        <Header />

        <div className="App-content">
          <Switch>
            <Route
              exact
              path="/"
              render={() => this.checkAuthenticated(Redirect, '/home')}
            />
            <Route
              path="/login"
              component={() => this.checkAuthenticated(LoginPage)}
            />
            <Route path="/home" component={HomePage} />
            <Route
              path="/dashboard"
              component={RequireAuthentication(DashboardPage)}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(App));
