import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import WebFont from 'webfontloader';

import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';
import configureStore from './store/configureStore';

import './assets/stylesheets/index.scss';

// react-md utilizes Google's material icons
WebFont.load({ google: { families: ['Material Icons'] } });

// the same history instance is required in the store and ConnectedRouter
const history = createBrowserHistory();
const store = configureStore(history);

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
}

render(App);
registerServiceWorker();

// In development, hot module replacement (HMR) updates the application
// when changes are made, without having to refresh.
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}
