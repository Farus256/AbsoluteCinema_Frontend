import styles from './SessionCard.module.css'
import {Link} from 'react-router-dom'

function SessionCard(cardData) {
    const { title, image } = cardData
    return (
        <Link to="/movie/1" className={styles.card_container}>
            <img src={image}/>
            <div>
                {title}
            </div>
        </Link>
    )
}


export default SessionCard
