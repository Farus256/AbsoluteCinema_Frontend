import MovieInfo from '../../../components/MoviePageComponents/MovieInfo/MovieInfo'
import SessionSchedule from '../../../components/MoviePageComponents/SessionSchedule/SessionSchedule'
import MovieTrailer from '../../../components/MoviePageComponents/MovieTrailer/MovieTrailer'

import styles from "./styles/MoviePage.module.css"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function MoviePage() {
    //on page load get movie id from the url and fetch data form api
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState({})

    useEffect(() => {
        fetch(`https://localhost:7118/api/Movie/GetMovieById?id=${id}`)
            .then(response => response.json())
            .then(data => setMovieInfo(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className={`wrapper`}>
            <div className={` ${styles.movieinfo}`} >
                <MovieInfo
                    info={movieInfo}
                />
                <SessionSchedule />
            </div>
            <MovieTrailer title={"Captain America: brave New World"} />
        </div>
    )
}

export default MoviePage
