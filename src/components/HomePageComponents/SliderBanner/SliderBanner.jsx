import styles from './SliderBanner.module.css'
import {Link} from 'react-router-dom'

function SliderBanner(imageData) {
    // TODO: maybe display some info while banner in hovered??
    return (
        <Link to="/movie/1" className={`carousel-item active ${styles.img_container}`}>
            <img src={imageData.banner} className="img-fluid"/>
        {/*
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        */}
        </Link>
    )
}

export default SliderBanner

