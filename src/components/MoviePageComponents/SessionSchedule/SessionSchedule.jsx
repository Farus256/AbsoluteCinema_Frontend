import { Link, useParams } from 'react-router-dom'
import styles from './SessionSchedule.module.css'
import { useEffect } from 'react'


function SessionSchedule() {
    const { id } = useParams()

    useEffect(() => {
    }, [])
    return (
        <div className={` ${styles.container}`}>
            <div className={` ${styles.schedule_date}`}>
                <h2>Session schedule</h2>
                <select id="date" className={`${styles.date_selector}`}>
                    console.log(id)
                    <option value="2025-02-13"> Thu, 13 february  </option>
                    <option value="2025-02-14"> Fri, 14 february  </option>
                </select>
            </div>
            <div className={`${styles.sessions_container}`}>
                <Link to={`/movie/${id}/booking`} className={`${styles.session_time}`}> 12:00 </Link>
                <Link to={`/movie/${id}/booking`} className={`${styles.session_time}`}> 14:30 </Link>
                <Link to={`/movie/${id}/booking`} className={`${styles.session_time}`}> 17:00 </Link>
                <Link to={`/movie/${id}/booking`} className={`${styles.session_time}`}> 19:30 </Link>
                <Link to={`/movie/${id}/booking`} className={`${styles.session_time}`}> 22:00 </Link>
            </div>
        </div>
    )
}

export default SessionSchedule
