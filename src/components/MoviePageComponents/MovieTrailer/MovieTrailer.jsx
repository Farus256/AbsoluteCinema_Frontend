import styles from './MovieTrailer.module.css'


function MovieTrailer({ title, url }) {
    function convertToEmbedUrl(youtubeUrl) {
        const videoId = youtubeUrl.split('v=')[1].split('&')[0]; // Extract video ID
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return (
        <div className={`${styles.movies_trailer_container}`}>
            <p> Watch trailer: {title} </p>
            <div className={`${styles.trailer_container}`}>
                <iframe
                    className={`${styles.trailer_iframe}`}
                    src={convertToEmbedUrl(url)}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}

export default MovieTrailer
