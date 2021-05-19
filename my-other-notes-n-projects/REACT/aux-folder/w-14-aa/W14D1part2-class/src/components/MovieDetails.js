import { useParams, Redirect } from 'react-router-dom';
// import { movies } from '../data/movieData';

function MovieDetails(props) {
  const { id } = useParams();

  const choice = props.movies.find(
    (movie) => movie.id.toString() === id.toString()
  );

  if (!choice) {
    return <Redirect to="/" />;
  }

  return (
    <div className="comp purple">
      <h1>{choice.title}</h1>
      <p style={{ fontStyle: 'italic' }}>{choice.description}</p>
    </div>
  );
}

export default MovieDetails;
