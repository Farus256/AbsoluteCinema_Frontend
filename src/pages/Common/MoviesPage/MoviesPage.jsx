import { useEffect, useState } from 'react'
import MoviesFilter from '../../../components/MoviesPageComponents/MoviesFilter/MoviesFilter'
import MoviesContainer from '../../../components/SharedComponents/MoviesContainer/MoviesContainer'
import SessionCard from '../../../components/SharedComponents/SessionCard/SessionCard'
import styles from './styles/MoviesPage.module.css'
import utils from '../../../helpers/userUtils'

function MoviesPage() {
  const pageSize = 6
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [personalMovies, setPersonalMovies] = useState([])
  const [isPersonalLoading, setIsPersonalLoading] = useState(true)
  const [userId, setUserId] = useState(null)

    useEffect(() => {
        fetch(`https://localhost:44371/api/Movie/GetMovieAll?Page=${page}`)
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(err => console.log(err))
    }, [page])

    function nextPage() {
        if (movies.length === pageSize) setPage(page + 1)
    }

    function previousPage() {
        if (page > 1) setPage(page - 1)
    }

    useEffect(() => {
      const storedUserId = utils.GetUserId()
      setUserId(storedUserId)
    }, [])

    useEffect(() => {
      if (userId) {
        fetch(`https://localhost:44371/api/Movie/GetPersonalizedMovieSuggestions?userId=${userId}`)
          .then(response => response.json())
          .then(data => {
            setPersonalMovies(data)
            setIsPersonalLoading(false)
          })
          .catch(err => {
            console.log(err)
            setIsPersonalLoading(false)
          })
      } else {
        setIsPersonalLoading(false)
      }
    }, [userId])

    return (
      <>
          { userId != -1 && (
              <div className="wrapper">
                  <h1 className={styles.movies_header}> Recommended </h1>
                  <div className={styles.movies_wrapper}>
                      <div className={styles.movies_container_personalized}>
                          { personalMovies.map(movie => (
                              <SessionCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterPath} />
                          )) }
                      </div>
                  </div>
              </div>
          )}

          <div className="wrapper">
              <h1 className={styles.movies_header}> Movies </h1>
              <div className={styles.movies_wrapper}>
                  <div>
                      <MoviesContainer previousPage={previousPage} nextPage={nextPage}>
                          { movies.map(movie => (
                              <SessionCard key={movie.id} id={movie.id} title={movie.title} image={movie.posterPath} />
                          )) }
                      </MoviesContainer>
                  </div>
                  <MoviesFilter />
              </div>
          </div>
      </>
  )
}

export default MoviesPage
