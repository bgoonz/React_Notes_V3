import { Movies, Stocks, Home } from './components';
import { Route, Switch, NavLink } from 'react-router-dom';
function App() {
  return (
    <div className="comp main">
      <h1>App Component</h1>
      <nav className="comp nav">
        <ul>
          <li>
            <NavLink exact activeClassName="purple" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="purple" to="/stocks">
              Stocks
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="purple" to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      {/* <Home />
      <Stocks />
      <Movies />
      <MovieDetails /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/stocks">
          <Stocks />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
