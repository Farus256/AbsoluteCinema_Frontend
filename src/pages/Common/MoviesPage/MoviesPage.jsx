import { useEffect, useState } from 'react'
import MoviesFilter from '../../../components/MoviesPageComponents/MoviesFilter/MoviesFilter'
import MoviesContainer from '../../../components/SharedComponents/MoviesContainer/MoviesContainer'
import SessionCard from '../../../components/SharedComponents/SessionCard/SessionCard'
import styles from './styles/MoviesPage.module.css'

function MoviesPage() {
    const pageSize = 6
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`https://localhost:7118/api/Movie/GetMovieAll?Page=${page}`)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.log(err))
    }, [page])

    function nextPage() {
        if (movies.length === pageSize) setPage(page + 1)
    }

    function previousPage() {
        if (page > 1) setPage(page - 1)
    }
    return (
        <div className="wrapper">
            <h1 className={styles.movies_header}> Movies </h1>
            <div className={styles.movies_wrapper}>
                <div>
                    <MoviesContainer previousPage={previousPage} nextPage={nextPage}>
                        {
                            movies.map(movie =>
                                (< SessionCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterPath} />)
                            )
                        }
                    </MoviesContainer>
                </div>
                <MoviesFilter setMovies={setMovies} />
            </div>
        </div>
    )

}


export default MoviesPage

