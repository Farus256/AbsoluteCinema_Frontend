import { Link, useParams } from 'react-router-dom'
import styles from './SessionSchedule.module.css'
import { useEffect, useState } from 'react'
import { APP_CONFIG } from '../../../env'

import timeUtils from '../../../helpers/timeUtils'

function SessionSchedule() {
    const { id } = useParams()
    const [sessions, setSessions] = useState([])
    const [selectedDate, setSelectedDate] = useState("")
    const [sessionsByDate, setSessionsByDate] = useState([])

    useEffect(() => {
        fetch(`${APP_CONFIG.API_URL}/Session/GetUpcomingSessionsByMovie?MovieId=${id}`)
            .then(response => response.json())
            .then(data => {
                setSessions(getUniqueSessions(data))
                setSelectedDate(timeUtils.stripDateTime(data[0]?.date) || "")
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        fetch(`${APP_CONFIG.API_URL}/Session/GetSessionWithStrategy?MovieId=${id}&Date=${selectedDate}`)
            .then(response => response.json())
            .then(data => setSessionsByDate(data))
            .catch(err => console.log(err))
    }, [selectedDate])

    function getUniqueSessions(sessions) {
        const uniqueSessions = new Map();

        sessions.forEach((session) => {
            const dateOnly = session.date.split("T")[0];
            if (!uniqueSessions.has(dateOnly)) {
                uniqueSessions.set(dateOnly, session);
            }
        });
        return Array.from(uniqueSessions.values());
    };


    function handleDateChange(e) {
        setSelectedDate(e.target.value)
    }

    return (
        <div className={` ${styles.container}`}>
            <div className={` ${styles.schedule_date}`}>
                <h2>Session schedule</h2>
                <select
                    id="date"
                    className={`${styles.date_selector}`}
                    value={selectedDate}
                    onChange={handleDateChange}
                >
                    {
                        sessions.map(session => (
                            <>
                                <option key={session.id} value={timeUtils.stripDateTime(session.date)}> {timeUtils.formatDate(session.date)}</option>
                            </>
                        ))
                    }
                </select>
            </div>
            <div className={`${styles.sessions_container}`}>
                {
                    sessionsByDate && sessionsByDate.map(session => (
                        <Link to={`/movie/${session.id}/booking`} className={`${styles.session_time}`}> {timeUtils.convertToHourMinute(session.date)} </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default SessionSchedule
