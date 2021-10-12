import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';
import { Link } from 'react-router-dom';

import Features from '../components/Features';

import logo from '../assets/images/logo.svg';

import './HomePage.css';

export class HomePage extends Component {
  intro() {
    return (
      <Card className="HomePage-intro">
        <CardTitle title="Redux Template" />
        <CardText>
          <p>
            This project was created with the <Link to="">Redux template</Link>{' '}
            using a forked version of{' '}
            <Link to="https://github.com/reedsa/create-react-app">
              create-react-app
            </Link>. The motivation behind this template is to use the{' '}
            <Link to="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc">
              recommended approach
            </Link>{' '}
            to integrate with Sass, a CSS Preprocessor.
          </p>
          <p>
            Learn more about react-scripts and create-react-app{' '}
            <Link to="https://github.com/facebookincubator/create-react-app">
              here
            </Link>.
          </p>
          <p>
            To get started, edit <code>src/containers/App.js</code> and save to
            reload.
          </p>
        </CardText>
      </Card>
    );
  }

  render() {
    return (
      <div className="HomePage">
        <div className="HomePage-header">
          <img src={logo} className="HomePage-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.intro()}
        <Features />
      </div>
    );
  }
}

export default HomePage;
