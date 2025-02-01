import MovieInfo from '../../../components/MoviePageComponents/MovieInfo/MovieInfo'
import SessionSchedule from '../../../components/MoviePageComponents/SessionSchedule/SessionSchedule'
import MovieTrailer from '../../../components/MoviePageComponents/MovieTrailer/MovieTrailer'

import styles from "./styles/MoviePage.module.css"

function MoviePage() {
    //on page load get movie id from the url and fetch data form api
    return (
        <div className={`wrapper`}>
            <div className={` ${styles.movieinfo}`} >
                <MovieInfo
                    img="https://i.redd.it/ta69batycg4b1.jpg"
                    title="Captain America: Brave New World"
                    adult="16"
                    year="2025"
                    genre="action, adventure"
                    language="English"
                    director="Julius Ona"
                    cast="Anthony Mackie, Harrison Ford, Danny Ramirez, Shira Haas, Zoë Rócke-Lowitja, Carl Lumbly, as well as Giancarlo Esposito, Liv Tyler, Tim Blake Nelson, and others."
                    description="Sam Wilson, the new Captain America, finds himself in the middle of an international incident and must discover the motive behind a nefarious global plan."
                    score="4.75"
                />
                <SessionSchedule />
            </div>
            <MovieTrailer title={"Captain America: brave New World"} />
        </div>
    )
}

export default MoviePage
