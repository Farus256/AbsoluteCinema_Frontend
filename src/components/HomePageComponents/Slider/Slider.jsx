import SliderBanner from '../SliderBanner/SliderBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Mousewheel } from 'swiper/modules'

import styles from './Slider.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import { useEffect, useState } from 'react'
import { APP_CONFIG } from '../../../env'

function Slider() {
    const [homePageMovies, setHomePageMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiUrl = `${APP_CONFIG.API_URL}/Movie/GetMovieAll?OrderByProperty=releaseDate&OrderDirection=desc`
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    mode: 'cors',
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`)
                }

                const data = await response.json()
                const moviesArray = Array.isArray(data) ? data : []
                setHomePageMovies(moviesArray)
                setIsLoading(false)
            } catch (err) {
                console.error('Помилка завантаження фільмів:', err)
                const errorMessage = err.message || 'Не вдалося завантажити дані. Перевірте, чи запущений бекенд сервер.'
                setError(errorMessage)
                setIsLoading(false)
            }
        }

        fetchMovies()
    }, [])

    if (isLoading) {
        return <div>Завантаження...</div>
    }

    if (error) {
        return <div>Помилка: {error}</div>
    }

    if (homePageMovies.length === 0) {
        return <div>Фільми не знайдено</div>
    }

    return (
        <Swiper
            className={`${styles.swiper_container}`}
            modules={[Navigation, A11y, Mousewheel]}
            spaceBetween={0}
            slidesPerView={4}
            navigation
            mousewheel
        >
            {
                homePageMovies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <SliderBanner banner={movie.posterPath} id={movie.id} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Slider
