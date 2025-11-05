import { useEffect, useState } from "react"
import styles from "./MovieInfo.module.css"
import { useParams } from "react-router-dom"
import { APP_CONFIG } from '../../../env'

function MovieInfo({ info }) {
    const [genres, setGenres] = useState("")
    const [actors, setActors] = useState("")
    const { id } = useParams()
    useEffect(() => {
        fetch(`${APP_CONFIG.API_URL}/Genre/GetGenreWithStrategy?MoviesIds=${id}`)
            .then(response => response.json())
            .then(data => { setGenres(data.map(genre => genre.title).join(' ')) })
            .catch(err => console.log(err))

        fetch(`${APP_CONFIG.API_URL}/Actor/GetActorWithStrategy?MoviesIds=${id}`)
            .then(response => response.json())
            .then(data => { setActors(data.map(actor => actor.firstName + " " + actor.lastName).join(' ')) })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <div className={`${styles.img}`}>
                <img src={info.posterPath} />
            </div>
            <div className={`${styles.description}`} >
                <h1> {info.title} </h1>
                <span> {info.adult} </span>
                <span>Year: {
                    isNaN(new Date(info.releaseDate))
                        ? 'Invalid date'
                        : new Date(info.releaseDate).toISOString().split('T')[0]
                } </span>
                <span>Genres: {genres} </span>
                <span>Actors: {actors} </span>
                <span>Language: {info.language} </span>
                <span>Description: {info.discription} </span>
                <span>Score: {info.score} </span>
            </div >
        </>
    )
}

export default MovieInfo
