import { Switch, Route, NavLink } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { movies } from '../data/movieData';

function Movies() {
  return (
    <div className="comp orange">
      <h1>Movies Component</h1>
      <nav>
        {movies.map((movie) => (
          <span style={{ paddingRight: '10px' }} key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink>
          </span>
        ))}
      </nav>

      <Switch>
        <Route path={`/movies/:id`}>
          <MovieDetails movies={movies} />
        </Route>
      </Switch>
    </div>
  );
}

export default Movies;
