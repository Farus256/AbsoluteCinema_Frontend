import styles from './SessionSchedule.module.css'


function SessionSchedule() {
    return (
        <div className={` ${styles.container}`}>
            <div className={` ${styles.schedule_date}`}>
                <h2>Session schedule</h2>
                <select id="date" className={`${styles.date_selector}`}>
                    <option value="2025-02-13"> Thu, 13 february  </option>
                    <option value="2025-02-14"> Fri, 14 february  </option>
                </select>
            </div>
            <div className={`${styles.sessions_container}`}>
                <div className={`${styles.session_time}`}> 12:00 </div>
                <div className={`${styles.session_time}`}> 14:30 </div>
                <div className={`${styles.session_time}`}> 17:00 </div>
                <div className={`${styles.session_time}`}> 19:30 </div>
                <div className={`${styles.session_time}`}> 22:00 </div>
            </div>
        </div>
    )
}

export default SessionSchedule
