import React, { Component } from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';
import LoginForm from 'react-redux-modules/lib/components/LoginForm';

import { authenticate } from '../store/user/action';

import './LoginPage.css';

class LoginPage extends Component {
  render() {
    return (
      <Card className="LoginPage-card">
        <CardTitle
          title="Login"
          subtitle="Authenticate to view user content."
        />
        <CardText className="LoginPage-card-text">
          <LoginForm
            model="loginForm"
            apiUrl={process.env.REACT_APP_API_URL}
            loginSuccessAction={authenticate}
            textFieldComponent={TextField}
            buttonComponent={Button}
            buttonProps={{ raised: true, primary: true }}
            buttonClassName="LoginPage-login-button"
          />
        </CardText>
      </Card>
    );
  }
}

export default LoginPage;
