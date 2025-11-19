import { useEffect, useState, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { APP_CONFIG } from '../../../env'
import styles from './ServerStatusComponent.module.css'

function ServerStatusComponent() {
    const [isConnected, setIsConnected] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('Disconnected')
    const [timer, setTimer] = useState(0)
    const [serverStats, setServerStats] = useState({ Connections: { Active: 0 } })
    const [lastUpdate, setLastUpdate] = useState(null)
    const connectionRef = useRef(null)
    const timerIntervalRef = useRef(null)
    const statsIntervalRef = useRef(null)

    const requestServerStats = async () => {
        if (connectionRef.current && connectionRef.current.state === signalR.HubConnectionState.Connected) {
            try {
                console.log('Requesting server statistics...')
                await connectionRef.current.invoke('GetServerStatistics')
            } catch (err) {
                console.error('Error requesting statistics:', err)
            }
        } else {
            console.warn('Cannot request stats - connection not ready. State:', connectionRef.current?.state)
        }
    }

    const startStatsPolling = () => {
        if (statsIntervalRef.current) {
            clearInterval(statsIntervalRef.current)
        }
        statsIntervalRef.current = setInterval(() => {
            requestServerStats()
        }, 5000)
    }

    const startTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
        }
        setTimer(0)
        timerIntervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
    }

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${APP_CONFIG.HUB_URL}/realtimehub`)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    if (retryContext.elapsedMilliseconds < 60000) {
                        return 2000
                    } else {
                        return 10000
                    }
                }
            })
            .build()

        connectionRef.current = connection

        connection.on('ServerStatistics', (stats) => {
            console.log('Received server statistics:', stats)
            if (stats) {
                setServerStats(stats)
                setLastUpdate(new Date())
            } else {
                console.warn('Received empty statistics')
                setServerStats({ Connections: { Active: 0 } })
            }
        })

        connection.on('ConnectionStatus', (connected, message) => {
            console.log('ConnectionStatus received:', connected, message)
            setIsConnected(connected)
            setConnectionStatus(message || (connected ? 'Connected' : 'Disconnected'))
            if (connected) {
                startTimer()
                setTimeout(() => {
                    requestServerStats()
                    startStatsPolling()
                }, 500)
            } else {
                setServerStats({ Connections: { Active: 0 } })
            }
        })

        connection.onclose(() => {
            setIsConnected(false)
            setConnectionStatus('Disconnected')
            setServerStats({ Connections: { Active: 0 } })
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
                timerIntervalRef.current = null
            }
            if (statsIntervalRef.current) {
                clearInterval(statsIntervalRef.current)
                statsIntervalRef.current = null
            }
        })

        connection.onreconnecting(() => {
            setConnectionStatus('Reconnecting...')
            setServerStats({ Connections: { Active: 0 } })
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
                timerIntervalRef.current = null
            }
        })

        connection.onreconnected(() => {
            setIsConnected(true)
            setConnectionStatus('Connected')
            startTimer()
            setTimeout(() => {
                requestServerStats()
                startStatsPolling()
            }, 500)
        })

        connection.start()
            .then(() => {
                console.log('SignalR connected successfully')
                setIsConnected(true)
                setConnectionStatus('Connected')
                startTimer()
                setTimeout(() => {
                    requestServerStats()
                    startStatsPolling()
                }, 500)
            })
            .catch(err => {
                console.error('SignalR connection error:', err)
                setConnectionStatus('Connection Error')
                setServerStats({ Connections: { Active: 0 } })
            })

        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
            if (statsIntervalRef.current) {
                clearInterval(statsIntervalRef.current)
            }
            if (connectionRef.current) {
                connectionRef.current.stop()
            }
        }
    }, [])


    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Server Status</h2>
                <div className={`${styles.status_badge} ${isConnected ? styles.connected : styles.disconnected}`}>
                    <span className={styles.status_dot}></span>
                    <span>{connectionStatus}</span>
                </div>
            </div>

            <div className={styles.stats_grid}>
                <div className={styles.stat_card}>
                    <div className={styles.stat_label}>Connection Time</div>
                    <div className={`${styles.stat_value} ${!isConnected ? styles.disconnected_text : ''}`}>
                        {formatTime(timer)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServerStatusComponent



