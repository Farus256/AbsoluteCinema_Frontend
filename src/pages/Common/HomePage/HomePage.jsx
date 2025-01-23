import Slider from '../../../components/HomePageComponents/Slider/Slider'
import SessionCard from '../../../components/SharedComponents/SessionCard/SessionCard'
import styles from './styles/HomePage.module.css'

function HomePage() {
    return (
        <>
        <div className={`${styles.home_body}`}>
            <Slider>
                <SessionCard/>
                <SessionCard/>
                <SessionCard/>
            </Slider>
        </div>
        </>
    )
}

export default HomePage
