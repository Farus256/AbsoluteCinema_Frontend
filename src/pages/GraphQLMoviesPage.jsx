import React from 'react';
import { gql } from '@apollo/client';
import { useGraphQLQuery } from '../hooks/useGraphQLQuery';

// Define your GraphQL query
const GET_MOVIES = gql`
  query GetMovies {
    movies {
      id
      title
      description
      releaseDate
      score
      adult
      posterPath
      language
      trailerPath
    }
  }
`;

const GraphQLMoviesPage = () => {
  const { data, loading, error } = useGraphQLQuery(GET_MOVIES);

  if (loading) return <div className="text-center my-5">Loading movies...</div>;
  if (error) return <div className="alert alert-danger">Error loading movies: {error.message}</div>;

  const movies = data?.movies || [];

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Movies (GraphQL)</h2>
      
      {movies.length === 0 ? (
        <div className="alert alert-info">No movies found.</div>
      ) : (
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'} • Score: {movie.score || 'N/A'}
                  </h6>
                  <p className="card-text">
                    {movie.description?.length > 150 
                      ? `${movie.description.substring(0, 150)}...` 
                      : movie.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GraphQLMoviesPage;
