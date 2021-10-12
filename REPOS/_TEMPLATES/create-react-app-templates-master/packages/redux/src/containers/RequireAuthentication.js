import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

export default function RequireAuthentication(Component) {
  class Authentication extends React.Component {
    render() {
      return (
        <Route
          render={props => {
            return this.props.isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            );
          }}
        />
      );
    }
  }

  Authentication.propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated,
    };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}
