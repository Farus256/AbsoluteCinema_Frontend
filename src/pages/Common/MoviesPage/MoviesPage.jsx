// src/pages/Common/MoviesPage/MoviesPage.jsx
import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import { useGraphQLQuery } from '../../../hooks/useGraphQLQuery'

import MoviesFilter from '../../../components/MoviesPageComponents/MoviesFilter/MoviesFilter'
import MoviesContainer from '../../../components/SharedComponents/MoviesContainer/MoviesContainer'
import SessionCard from '../../../components/SharedComponents/SessionCard/SessionCard'
import styles from './styles/MoviesPage.module.css'
import utils from '../../../helpers/userUtils'
import { APP_CONFIG } from '../../../env'

// GraphQL: paged movies
const GET_MOVIES_PAGED = gql`
  query GetMoviesPaged($page: Int!, $pageSize: Int!) {
    moviesPaged(page: $page, pageSize: $pageSize) {
      id
      title
      posterPath
    }
  }
`

function MoviesPage() {
  const pageSize = 6
  const API_BASE = APP_CONFIG.API_URL

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])

  const [personalMovies, setPersonalMovies] = useState([])
  const [isPersonalLoading, setIsPersonalLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  
  useEffect(() => {
    const id = utils.GetUserId()
    setUserId(id)
  }, [])

  
  const { data: moviesData, loading: moviesLoading, error: moviesError } =
    useGraphQLQuery(GET_MOVIES_PAGED, {
      variables: { page, pageSize },
      fetchPolicy: 'cache-and-network',
    })

  
  useEffect(() => {
    if (moviesData?.moviesPaged) setMovies(moviesData.moviesPaged)
    else if (!moviesLoading) setMovies([])
  }, [moviesData, moviesLoading])

  function nextPage() {
    if (movies.length === pageSize) setPage(p => p + 1)
  }
  function previousPage() {
    setPage(p => Math.max(1, p - 1))
  }

  
  useEffect(() => {
    const ac = new AbortController()
    setIsPersonalLoading(true)

    if (userId === null || userId === -1) {
      setPersonalMovies([])
      setIsPersonalLoading(false)
      return
    }

    ;(async () => {
      try {
        const res = await fetch(
          `${API_BASE}/Movie/GetPersonalizedMovieSuggestions?userId=${userId}`,
          { signal: ac.signal }
        )
        if (!res.ok) throw new Error(`Failed: ${res.status}`)
        const data = await res.json()
        setPersonalMovies(Array.isArray(data) ? data : [])
      } catch (e) {
        if (e.name !== 'AbortError') console.error(e)
        setPersonalMovies([])
      } finally {
        setIsPersonalLoading(false)
      }
    })()

    return () => ac.abort()
  }, [userId, API_BASE])

  const showRecommended =
    userId !== null && userId !== -1 && personalMovies.length > 0

  return (
    <>
      {showRecommended && (
        <div className="wrapper">
          <h1 className={styles.movies_header}>Recommended</h1>
          <div className={styles.movies_wrapper}>
            <div className={styles.movies_container_personalized}>
              {personalMovies.map(movie => (
                <SessionCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.posterPath}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {!showRecommended && !isPersonalLoading && userId !== -1 && (
        <div className="wrapper">
          <h2 className={styles.movies_header}>No personalized picks yet</h2>
        </div>
      )}

      <div className="wrapper">
        <h1 className={styles.movies_header}>Movies</h1>

        {moviesError && (
          <div className="alert alert-danger">
            Error loading movies: {moviesError.message}
          </div>
        )}

        <div className={styles.movies_wrapper}>
          <div>
            <MoviesContainer previousPage={previousPage} nextPage={nextPage}>
              {movies.map(movie => (
                <SessionCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  image={movie.posterPath}
                />
              ))}
            </MoviesContainer>

            {moviesLoading && (
              <div className="text-center my-3">Loading movies...</div>
            )}
          </div>

          
          <MoviesFilter setMovies={setMovies} />
        </div>
      </div>
    </>
  )
}

export default MoviesPage
