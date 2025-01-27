import MoviesFilter from '../../../components/MoviesPageComponents/MoviesFilter/MoviesFilter'
import MoviesContainer from '../../../components/SharedComponents/MoviesContainer/MoviesContainer'
import SessionCard from '../../../components/SharedComponents/SessionCard/SessionCard'
import styles from './styles/MoviesPage.module.css'

function MoviesPage() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.movies_header}> Movies </h1>
            <div className={styles.movies_wrapper}>
                <div>
                    <MoviesContainer>
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                        <SessionCard title="The Shawshank Redemption" image="https://static.hdrezka.ac/i/2021/3/6/o41759bd352dazn54q16d.jpeg" />
                    </MoviesContainer>
                </div>
                <MoviesFilter />
            </div>
        </div>
    )

}


export default MoviesPage

