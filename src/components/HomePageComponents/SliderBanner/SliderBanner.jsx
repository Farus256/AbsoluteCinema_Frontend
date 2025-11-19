import styles from './SliderBanner.module.css'
import { Link } from 'react-router-dom'

function SliderBanner({ banner, id }) {
    return (
        <Link to={`/movie/${id}`} className={`carousel-item active ${styles.img_container}`}>
            <img src={banner || '/no-poster.jpg'} alt="Movie poster" className="img-fluid" />
        </Link>
    )
}

export default SliderBanner

