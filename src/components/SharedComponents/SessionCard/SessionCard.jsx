import styles from './SessionCard.module.css'
import { Link } from 'react-router-dom'

function SessionCard(cardData) {
    const { id, title, image } = cardData
    console.log(cardData)
    return (
        <Link to={`/movie/${id}`} className={styles.card_container}>
            <img src={image} />
            <div>
                {title}
            </div>
        </Link>
    )
}


export default SessionCard
