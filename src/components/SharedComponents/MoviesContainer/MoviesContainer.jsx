import styles from './MoviesContainer.module.css'

import arrow from "./../../../assets/next_arrow.svg"


function MoviesContainer(props) {
    //TODO: receive callback to load next page
    return (
        <div className={styles.movies_container_wrapper}>
            <div className={styles.movies_container}>
             {props.children}
            </div>
            <div className={styles.next_page_btn}> {/* Handle clicking*/}
                <img src={arrow} width="40" height="40"/>
            </div>
        </div>
    )
}

export default MoviesContainer
