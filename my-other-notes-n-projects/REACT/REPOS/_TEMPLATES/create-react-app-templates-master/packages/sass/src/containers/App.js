import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Counter from '../components/Counter';
import Features from '../components/Features';
import { increment, decrement, update } from '../store/count/action';

import logo from '../assets/images/logo.svg';

import './App.css';
import 'material-design-icons/iconfont/material-icons.css';

export class App extends Component {
  intro() {
    return (
      <Card className="App-intro">
        <CardTitle title="Sass Template" />
        <CardText>
          <p>
            This project was created with the <Link to="">Sass template</Link>{' '}
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
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {this.intro()}
        <Features />
        <Counter
          count={this.props.count}
          handleChange={value => this.props.dispatch(update(value))}
          handleIncrement={() => this.props.dispatch(increment())}
          handleDecrement={() => this.props.dispatch(decrement())}
        />
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.number,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  count: state.count,
});

export default connect(mapStateToProps)(App);
