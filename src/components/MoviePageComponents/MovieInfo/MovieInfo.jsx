import styles from "./MovieInfo.module.css"

function MovieInfo({ img, title, adult, year, genre, language, director, cast, description, score }) {
    return (
        <>
            <div className={`${styles.img}`}>
                <img src={img} />
            </div>
            <div className={`${styles.description}`} >
                <h1> {title} </h1>
                <span> {adult} </span>
                <span>Year: {year} </span>
                <span>Genre: {genre} </span>
                <span>Language: {language} </span>
                <span>Director: {director} </span>
                <span>Starring: {cast} </span>
                <span>Description: {description} </span>
                <span>Score: {score} </span>
            </div >
        </>
    )
}

export default MovieInfo
