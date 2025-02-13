import { useEffect, useState } from 'react'
import styles from './MoviesFilter.module.css'
import Button from '../../SharedComponents/Button/Button'

function MoviesFilter() {
    const [genres, setGenres] = useState([])
    const [moviesFilter, setMovieFilter] = useState({
        movieName: null,
        actors: "",
        ageRestriction: false,
        releaseDateFrom: null,
        releaseDateTo: null,
        genres: null
    })
    function findMovies() {
    }

    useEffect(() => {

        fetch('https://localhost:7118/api/Genre/GetGenreAll')
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_title}>
                Genres
            </div>
            <hr />
            <div className={styles.filter_genres_container}>
                <label for='movieName'> Movie name</label>
                <input name='movieName' value={moviesFilter.movieName} />
                <label for='actors'>Actors</label>
                <input name='actors' value={moviesFilter.actors} />

                <div>
                    <div> Age restriction </div>
                    <label>
                        <input type='radio' name='age' value={true} /> Yes
                    </label>
                    <label>
                        <input type='radio' name='age' value={false} /> No
                    </label>
                </div>

                {
                    genres && genres.map(genre => (
                        <div className={styles.filter_genre}>
                            <input type="checkbox" id="genre" name={genre.title} />
                            <lable for="genre">{genre.title}</lable>
                        </div>
                    ))
                }
                <Button onClick={findMovies}> Search </Button>
            </div>
        </div>
    )
}

export default MoviesFilter
