import MovieInfo from '../../../components/MoviePageComponents/MovieInfo/MovieInfo'
import SessionSchedule from '../../../components/MoviePageComponents/SessionSchedule/SessionSchedule'
import MovieTrailer from '../../../components/MoviePageComponents/MovieTrailer/MovieTrailer'

import { useMovie } from '../../../helpers/Providers/MovieContext'

import styles from "./styles/MoviePage.module.css"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function MoviePage() {
    const { id } = useParams()
    const { selectedMovie, setSelectedMovie } = useMovie()

    useEffect(() => {
        fetch(`https://localhost:7118/api/Movie/GetMovieById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setSelectedMovie(data)
                sessionStorage.setItem("movieTitle", data.title)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className={`wrapper`}>
            <div className={` ${styles.movieinfo}`} >
                <MovieInfo
                    info={selectedMovie}
                />
                <SessionSchedule />
            </div>
            <MovieTrailer title={selectedMovie.title} url={selectedMovie.trailerPath} />
        </div >
    )
}

export default MoviePage
