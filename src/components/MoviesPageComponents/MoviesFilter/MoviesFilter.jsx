import styles from './MoviesFilter.module.css'

function MoviesFilter() {
    // TODO: add state array to keep track of all checked genres
    // TODO: retrive genres from backend api in a state then show
    return (
        <div className={styles.filter_container}>
            <div className={styles.filter_title}> 
                Genres
            </div>
        <hr/>
            <div className={styles.filter_genres_container}>
                <div className={styles.filter_genre}>
                    <input type="checkbox" id="genre" name="Drama"/>
                    <lable for="genre">Drama</lable>
                </div>
                <div className={styles.filter_genre}>
                    <input type="checkbox" id="genre" name="Drama"/>
                    <lable for="genre">Drama</lable>
                </div>
            </div>
        </div>
    )
}

export default MoviesFilter
