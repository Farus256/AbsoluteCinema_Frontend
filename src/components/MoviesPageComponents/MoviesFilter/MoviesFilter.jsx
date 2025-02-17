import { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import styles from './MoviesFilter.module.css'
import Button from '../../SharedComponents/Button/Button'

function MoviesFilter() {
    const [genres, setGenres] = useState([])
    const [moviesFilter, setMovieFilter] = useState({
        movieName: null,
        actors: "",
        ageRestriction: false,
        releaseDateRange: [2015, 2025],
        genres: null
    })
    function findMovies() {
    }

    useEffect(() => {

        fetch('https://localhost:7118/api/Genre/GetGenreAll')
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_title}>
                Filter movies
            </div>
            <hr />
            <div className={styles.filter_genres_container}>
                <label htmlFor='movieName'> Movie name</label>
                <input name='movieName' value={moviesFilter.movieName} />
                <label htmlFor='actors'>Actors</label>
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

                <div>
                    <div>Years</div>
                    <ReactSlider
                        className={styles.slider}
                        thumbClassName={styles.thumb}
                        trackClassName={styles.track}
                        value={moviesFilter.releaseDateRange}
                        onChange={(value) => setMovieFilter({ ...moviesFilter, releaseDateRange: value })}
                        min={2015}
                        max={2025}
                        pearling
                        minDistance={1}
                    />
                    <div>{moviesFilter.releaseDateRange[0]} - {moviesFilter.releaseDateRange[1]}</div>
                </div>

                <div>
                    <div>Genres</div>
                    {
                        genres && genres.map(genre => (
                            <div key={genre.id} className={styles.filter_genre}>
                                <input type="checkbox" id="genre" name={genre.title} />
                                <lable htmlFor="genre">{genre.title}</lable>
                            </div>
                        ))
                    }
                </div>
                <Button onClick={findMovies}> Search </Button>
            </div>
        </div>
    )
}

export default MoviesFilter
