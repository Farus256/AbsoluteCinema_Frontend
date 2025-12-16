import MovieInfo from '../../../components/MoviePageComponents/MovieInfo/MovieInfo'
import SessionSchedule from '../../../components/MoviePageComponents/SessionSchedule/SessionSchedule'
import MovieTrailer from '../../../components/MoviePageComponents/MovieTrailer/MovieTrailer'

import { useMovie } from '../../../helpers/Providers/MovieContext'

import styles from "./styles/MoviePage.module.css"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { APP_CONFIG } from '../../../env'
import { movieGrpcClient } from '../../../grpc/movieClient'

function MoviePage() {
    const { id } = useParams()
    const { selectedMovie, setSelectedMovie } = useMovie()

    useEffect(() => {
        let ignore = false

        const loadViaGrpc = async () => {
            try {
                const response = await movieGrpcClient.getMovieById({ id: Number(id) })
                if (ignore) return
                const mappedMovie = {
                    id: response.id,
                    title: response.title,
                    discription: response.description,
                    score: response.score,
                    adult: response.adult,
                    posterPath: response.posterPath,
                    language: response.language,
                    releaseDate: response.releaseDate,
                    trailerPath: null, // gRPC-відповідь наразі не містить трейлера
                }
                setSelectedMovie(mappedMovie)
                sessionStorage.setItem("movieTitle", mappedMovie.title)
                return true
            } catch (err) {
                console.error('gRPC movie fetch failed, fallback to REST', err)
                return false
            }
        }

        const loadViaRest = async () => {
            try {
                const res = await fetch(`${APP_CONFIG.API_URL}/Movie/GetMovieById?id=${id}`)
                const data = await res.json()
                if (ignore) return
                setSelectedMovie(data)
                sessionStorage.setItem("movieTitle", data.title)
            } catch (err) {
                if (!ignore) console.error(err)
            }
        }

        ;(async () => {
            const ok = await loadViaGrpc()
            if (!ok) {
                await loadViaRest()
            }
        })()

        return () => {
            ignore = true
        }
    }, [id, setSelectedMovie])

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
