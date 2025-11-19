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
        const url = `${APP_CONFIG.API_URL}/Session/GetUpcomingSessionsByMovie?movieId=${id}`
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setSessions(getUniqueSessions(data))
                    setSelectedDate(timeUtils.stripDateTime(data[0]?.date) || "")
                } else {
                    setSessions([])
                    setSelectedDate("")
                }
            })
            .catch(err => {
                console.error('Помилка завантаження сесій:', err)
                setSessions([])
            })
    }, [id])

    useEffect(() => {
        if (!selectedDate) {
            setSessionsByDate([])
            return
        }
        
        const formattedDate = selectedDate.includes('T') ? selectedDate.split('T')[0] : selectedDate
        const url = `${APP_CONFIG.API_URL}/Session/GetSessionWithStrategy?MovieId=${id}&Date=${formattedDate}`
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setSessionsByDate(Array.isArray(data) ? data : [])
            })
            .catch(err => {
                console.error('Помилка завантаження сесій за датою:', err)
                setSessionsByDate([])
            })
    }, [selectedDate, id])

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
