import SliderBanner from '../SliderBanner/SliderBanner'
import {Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Mousewheel} from 'swiper/modules'

import styles from './Slider.module.css'

import 'swiper/css'
import 'swiper/css/navigation'

function Slider() {
    //TODO: Make proper image adjustment to the height of the window
    return (
        <Swiper
        className={`${styles.swiper_container}`}
        modules={[Navigation, A11y, Mousewheel]}
        spaceBetween={0}
        slidesPerView={4.5}
        navigation
        mousewheel
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/ae/5e/ae5e3866e825bf76407966662f09bbb0.jpeg"}/></SwiperSlide>
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/7a/1e/7a1e93752f93a1262923f16f1e0b92f0.jpeg"}/></SwiperSlide>
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/f3/e6/f3e638a237e295f019f1da2c713113a6.jpeg"}/></SwiperSlide>
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/aa/be/aabe4ffd4f4a1651210665df6b412709.jpeg"}/></SwiperSlide>
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/d3/e7/d3e7da5c98eb6ec361f340eb300df3df.jpeg"}/></SwiperSlide>
            <SwiperSlide><SliderBanner banner={"https://multiplex.ua/images/c6/68/c668be01af943378532067c35cddf8fd.jpeg"}/></SwiperSlide>
        </Swiper>
    )
}

export default Slider
