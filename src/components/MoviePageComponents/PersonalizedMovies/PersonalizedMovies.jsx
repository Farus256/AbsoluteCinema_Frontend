import { useEffect, useState } from "react";
import styles from "./PersonalizedMovies.module.css";
import utils from '../../../helpers/userUtils';
import { APP_CONFIG } from '../../../env'

function PersonalizedMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = utils.GetUserId();

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    fetch(`${APP_CONFIG.API_URL}/Movie/GetPersonalizedMovieSuggestions?userId=${userId}`)
      .then(response => {
        if (!response.ok) throw new Error("Ошибка загрузки");
        return response.json();
      })
      .then(data => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [userId]);

  return (
      <div className={styles.moviesGrid}>
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className={styles.movieCard}>
              <img
                src={movie.posterPath || "/no-poster.jpg"}
                alt={movie.title}
                className={styles.poster}
              />
              <div className={styles.info}>
                <h3>{movie.title}</h3>
                <p>Рейтинг: {movie.score}</p>
                <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>None</p>
        )}
      </div>
  );
}

export default PersonalizedMovies;