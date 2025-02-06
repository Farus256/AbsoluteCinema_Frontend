import styles from "./MovieInfo.module.css"

function MovieInfo({ info }) {
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
                <span>Genre: {/*genre*/} </span>
                <span>Language: {info.language} </span>
                <span>Director: {info.director} </span>
                <span>Starring: {/*cast*/} </span>
                <span>Description: {info.discription} </span>
                <span>Score: {info.score} </span>
            </div >
        </>
    )
}

export default MovieInfo
