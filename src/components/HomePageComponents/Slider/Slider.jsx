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
    useEffect(() => {
        fetch(`${APP_CONFIG.API_URL}/Movie/GetMovieAll?OrderByProperty=releaseDate&OrderDirection=desc`)
            .then(response => response.json())
            .then(data => setHomePageMovies(data))
            .catch(err => console.log(err))

    }, [])
    return (
        <Swiper
            className={`${styles.swiper_container}`}
            modules={[Navigation, A11y, Mousewheel]}
            spaceBetween={0}
            slidesPerView={4}
            navigation
            mousewheel
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                homePageMovies.map(movie => (
                    <SwiperSlide><SliderBanner banner={movie.posterPath} id={movie.id} /></SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Slider
