import styles from './MovieTrailer.module.css'


function MovieTrailer({ title }) {
    return (
        <div className={`${styles.movies_trailer_container}`}>
            <p> Watch trailer: {title} </p>
            <div className={`${styles.trailer_container}`}>
                <iframe
                    className={`${styles.trailer_iframe}`}
                    src="https://www.youtube.com/embed/1pHDWnXmK7Y"
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default MovieTrailer
