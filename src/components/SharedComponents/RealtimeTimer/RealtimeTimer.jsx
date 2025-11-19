import { useEffect, useState, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { APP_CONFIG } from '../../../env'
import styles from './RealtimeTimer.module.css'

function RealtimeTimer() {
    const [isConnected, setIsConnected] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('Відключено')
    const [timer, setTimer] = useState(0)
    const [lastPong, setLastPong] = useState(null)
    const connectionRef = useRef(null)
    const timerIntervalRef = useRef(null)

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${APP_CONFIG.HUB_URL}/realtimehub`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    if (retryContext.elapsedMilliseconds < 60000) {
                        return 2000 // 2 секунди
                    } else {
                        return 10000 // 10 секунд після хвилини
                    }
                }
            })
            .build()

        connectionRef.current = connection

        connection.onclose(() => {
            setIsConnected(false)
            setConnectionStatus('Відключено')
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
                timerIntervalRef.current = null
            }
        })

        connection.onreconnecting(() => {
            setConnectionStatus('Перепідключення...')
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
                timerIntervalRef.current = null
            }
        })

        connection.onreconnected(() => {
            setIsConnected(true)
            setConnectionStatus('Підключено')
            startTimer()
        })

        connection.on('ConnectionStatus', (connected, message) => {
            setIsConnected(connected)
            setConnectionStatus(message || (connected ? 'Підключено' : 'Відключено'))
            if (connected) {
                startTimer()
            }
        })

        connection.on('Pong', (timestamp) => {
            setLastPong(new Date(timestamp))
        })

        connection.on('ReceiveMessage', (message, timestamp) => {
            console.log('Отримано повідомлення:', message, new Date(timestamp))
        })

        connection.start()
            .then(() => {
                setIsConnected(true)
                setConnectionStatus('Підключено')
                startTimer()
            })
            .catch(err => {
                console.error('Помилка підключення до SignalR:', err)
                setConnectionStatus('Помилка підключення')
            })

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
            if (connectionRef.current) {
                connectionRef.current.stop()
            }
        }
    }, [])

    const startTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
        }
        setTimer(0)
        timerIntervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
    }

    const sendPing = async () => {
        if (connectionRef.current && isConnected) {
            try {
                await connectionRef.current.invoke('Ping')
            } catch (err) {
                console.error('Помилка відправки Ping:', err)
            }
        }
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    return (
        <div className={`${styles.timer_container} ${!isConnected ? styles.disconnected_container : ''}`}>
            <div className={styles.timer_header}>
                <h3>Статус з'єднання</h3>
                <div className={`${styles.status_indicator} ${isConnected ? styles.connected : styles.disconnected}`}>
                    <span className={styles.status_dot}></span>
                    <span>{connectionStatus}</span>
                </div>
            </div>
            <div className={styles.timer_content}>
                <div className={styles.timer_display}>
                    <span className={styles.timer_label}>Час з'єднання:</span>
                    <span className={`${styles.timer_value} ${!isConnected ? styles.timer_value_disconnected : ''}`}>
                        {formatTime(timer)}
                    </span>
                </div>
                {lastPong && isConnected && (
                    <div className={styles.last_pong}>
                        Останній Pong: {new Date(lastPong).toLocaleTimeString()}
                    </div>
                )}
                {!isConnected && (
                    <div className={styles.disconnected_message}>
                        З'єднання втрачено. Таймер зупинено.
                    </div>
                )}
                <button 
                    className={styles.ping_button} 
                    onClick={sendPing}
                    disabled={!isConnected}
                >
                    Відправити Ping
                </button>
            </div>
        </div>
    )
}

export default RealtimeTimer

