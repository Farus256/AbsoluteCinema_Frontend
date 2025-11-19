import { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'

import styles from './MoviesFilter.module.css'
import Button from '../../SharedComponents/Button/Button'
import { APP_CONFIG } from '../../../env'

function MoviesFilter({ setMovies }) {
    const [genres, setGenres] = useState([])
    const [moviesFilter, setMovieFilter] = useState({
        movieName: "",
        actors: "",
        ageRestriction: false,
        releaseDateRange: [2015, 2025],
        genres: []
    })
    function findMovies() {
        const encodedTitle = encodeURIComponent(moviesFilter.movieName || '')
        const url = `${APP_CONFIG.API_URL}/Movie/GetMovieWithStrategy?Title=${encodedTitle}&Adult=${moviesFilter.ageRestriction}&ReleaseDateFrom=${moviesFilter.releaseDateRange[0] + "-01-01"}&ReleaseDateTo=${moviesFilter.releaseDateRange[1] + "-12-31"}${moviesFilter.genres.map(id => `&GenresIds=${id}`).join("")}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (setMovies) {
                    setMovies(Array.isArray(data) ? data : [])
                }
            })
            .catch(error => console.log(error))

    }

    useEffect(() => {
        fetch(`${APP_CONFIG.API_URL}/Genre/GetGenreAll`)
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(err => console.log(err))
    }, []);

    function updateGenres(e, genreId) {
        if (e.target.checked) {
            if (!moviesFilter.genres.includes(genreId)) {
                setMovieFilter({ ...moviesFilter, genres: [...moviesFilter.genres, genreId] })
            }
        } else {
            if (moviesFilter.genres.includes(genreId)) {
                setMovieFilter({ ...moviesFilter, genres: moviesFilter.genres.filter(genre => genre !== genreId) })
            }

        }
    }

    function setAgeRestriction(e) {
        const value = e.target.value === 'true' || e.target.value === true
        setMovieFilter({ ...moviesFilter, ageRestriction: value })
    }


    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_title}>
                Filter movies
            </div>
            <hr />
            <div className={styles.filter_genres_container}>
                <label htmlFor='movieName'> Movie name</label>
                <input name='movieName' value={moviesFilter.movieName} onChange={(e) => setMovieFilter({ ...moviesFilter, movieName: e.target.value })} />
                <div>
                    <div> Age restriction </div>
                    <label>
                        <input checked={moviesFilter.ageRestriction === true} type='radio' name='age' value='true' onChange={setAgeRestriction} /> Yes
                    </label>
                    <label>
                        <input checked={moviesFilter.ageRestriction === false} type='radio' name='age' value='false' onChange={setAgeRestriction} /> No
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
                                <input type="checkbox" id={`genre-${genre.id}`} name={genre.title} onChange={(e) => updateGenres(e, genre.id)} />
                                <label htmlFor={`genre-${genre.id}`}>{genre.title}</label>
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
