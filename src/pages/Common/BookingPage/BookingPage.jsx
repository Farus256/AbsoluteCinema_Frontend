import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import * as signalR from '@microsoft/signalr'

import Place from "../../../components/BookingPageComponents/Place/Place"
import TicketInfo from "../../../components/BookingPageComponents/TicketInfo/TicketInfo"
import Button from "../../../components/SharedComponents/Button/Button"

import timeUtils from "../../../helpers/timeUtils"
import userUtils from "../../../helpers/userUtils"
import { jwtDecode } from "jwt-decode"

import styles from "./styles/BookingPage.module.css"
import { APP_CONFIG } from "../../../env"

function BookingPage() {
    const { id } = useParams()
    const selectedMovie = sessionStorage.getItem("movieTitle")
    const [sessionInfo, setSessionInfo] = useState({})
    const [placement, setPlacement] = useState({ hallName: 0, rowCount: 0, placeCount: 0 })
    const [selectedTickets, setSelectedTickets] = useState([])
    const [bookedTickets, setBookedTickets] = useState([])
    const [ticketsPrice, setTicketsPrice] = useState(0)
    const [isConnected, setIsConnected] = useState(false)
    const token = localStorage.getItem("token")
    const connectionRef = useRef(null)

    useEffect(() => {
        const url = `${APP_CONFIG.API_URL}/Session/GetSessionById?id=${id}`
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setSessionInfo(data)
            })
            .catch(err => {
                console.error('Error loading session:', err)
            })
    }, [id])

    useEffect(() => {
        if (!sessionInfo.hallId) {
            return
        }
        
        fetch(`${APP_CONFIG.API_URL}/Hall/GetHallById?id=${sessionInfo.hallId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => setPlacement({ hallName: data.name, rowCount: data.rowCount, placeCount: data.placeCount }))
            .catch(err => {
                console.error('Error loading hall:', err)
            })
    }, [sessionInfo.hallId])

    useEffect(() => {
        if (!id) return

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${APP_CONFIG.HUB_URL}/realtimehub`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .build()

        connectionRef.current = connection

        connection.on('BookedSeatsLoaded', (sessionId, seats) => {
            if (sessionId === Number(id)) {
                setBookedTickets(seats.map(s => ({ row: s.row, place: s.place })))
            }
        })

        connection.on('SeatBooked', (sessionId, row, place) => {
            if (sessionId === Number(id)) {
                setBookedTickets(prev => {
                    const exists = prev.some(t => t.row === row && t.place === place)
                    if (!exists) {
                        return [...prev, { row, place }]
                    }
                    return prev
                })
            }
        })

        connection.on('SeatReleased', (sessionId, row, place) => {
            if (sessionId === Number(id)) {
                setBookedTickets(prev => prev.filter(t => !(t.row === row && t.place === place)))
            }
        })

        connection.on('BookedSeatsError', (sessionId, error) => {
            console.error('Error loading booked seats:', error)
        })

        connection.start()
            .then(() => {
                setIsConnected(true)
                connection.invoke('JoinSessionGroup', Number(id))
                    .then(() => {
                        connection.invoke('GetBookedSeats', Number(id))
                    })
                    .catch(err => console.error('Error joining group:', err))
            })
            .catch(err => {
                console.error('Error connecting to SignalR:', err)
                setIsConnected(false)
            })

        return () => {
            if (connectionRef.current) {
                connectionRef.current.invoke('LeaveSessionGroup', Number(id))
                    .catch(err => console.error('Error leaving group:', err))
                connectionRef.current.stop()
            }
        }
    }, [id])

    useEffect(() => {
        const totalPrice = selectedTickets.reduce((acc, ticket) => acc + ticket.price, 0);
        setTicketsPrice(totalPrice)
    }, [selectedTickets])

    function onClick(row, place) {
        if (isBooked(row, place)) {
            return
        }

        if (connectionRef.current && isConnected) {
            connectionRef.current.invoke('CheckSeatAvailability', Number(id), row, place)
                .catch(err => console.error('Error checking seat availability:', err))
        }

        const result = selectedTickets.find(ticket => ticket.row === row && ticket.place === place)
        if (!result) {
            const newTicket = {
                sessinId: id,
                userId: userUtils.GetUserId(),
                row: row,
                place: place,
                statusId: 1,
                title: selectedMovie,
                hallName: placement.hallName,
                price: 150
            }
            setSelectedTickets(
                [...selectedTickets, newTicket]
            )
        } else {
            deleteItem(row, place)
        }
    }
    function deleteItem(row, place) {
        const updatedTickets = selectedTickets.filter(ticket => !(ticket.row === row && ticket.place === place))
        setSelectedTickets(updatedTickets)
    }

    function isBooked(row, place) {
        return bookedTickets.some(ticket => ticket.row === row && ticket.place === place)
    }

    function isTokenValid(token) {
        if (!token) return false
        try {
            const decoded = jwtDecode(token)
            const currentTime = Date.now() / 1000
            if (decoded.exp && decoded.exp < currentTime) {
                return false
            }
            return true
        } catch (error) {
            console.error('Error decoding token:', error)
            return false
        }
    }

    async function bookTickets() {
        if (selectedTickets.length === 0) {
            alert('Please select seats to book')
            return
        }

        if (!token) {
            alert('You need to log in to book tickets')
            window.location.href = '/signin'
            return
        }

        if (!isTokenValid(token)) {
            alert('Your session has expired. Please log in again.')
            localStorage.removeItem('token')
            window.location.href = '/signin'
            return
        }

        const userId = userUtils.GetUserId()
        if (!userId || userId === -1) {
            alert('You need to log in to book tickets')
            window.location.href = '/signin'
            return
        }

        console.log('Starting ticket booking:', selectedTickets)

        try {
            const promises = selectedTickets.map(ticket => {
                const requestBody = {
                    sessionId: Number(id),
                    userId: ticket.userId,
                    row: ticket.row,
                    place: ticket.place,
                    statusId: ticket.statusId,
                    price: ticket.price,
                }
                console.log('Sending request for ticket:', requestBody)
                
                return fetch(`${APP_CONFIG.API_URL}/Ticket/CreateTicket`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody)
                })
            })

            const responses = await Promise.all(promises)
            console.log('Received responses:', responses.map(r => ({ status: r.status, ok: r.ok })))
            
            const errors = []
            let hasUnauthorized = false
            
            for (let i = 0; i < responses.length; i++) {
                if (!responses[i].ok) {
                    let errorText = `HTTP ${responses[i].status}`
                    if (responses[i].status === 401) {
                        errorText = 'Unauthorized - Please log in again'
                        hasUnauthorized = true
                        localStorage.removeItem('token')
                    }
                    try {
                        const clonedResponse = responses[i].clone()
                        const errorData = await clonedResponse.json()
                        errorText = errorData.title || errorData.message || errorText
                        console.error('Error response:', errorData)
                    } catch (parseError) {
                        try {
                            const clonedResponse = responses[i].clone()
                            const text = await clonedResponse.text()
                            if (text) errorText = text
                            console.error('Error text:', text)
                        } catch (textError) {
                            console.error('Failed to read error:', textError)
                        }
                    }
                    errors.push(`Row ${selectedTickets[i].row}, Seat ${selectedTickets[i].place}: ${errorText}`)
                } else {
                    try {
                        const result = await responses[i].json()
                        console.log('Successfully booked ticket:', result)
                    } catch (parseError) {
                        console.log('Ticket created but failed to read response')
                    }
                }
            }

            if (hasUnauthorized) {
                alert('Your session has expired. Please log in again.')
                localStorage.removeItem('token')
                window.location.href = '/signin'
                return
            }

            if (errors.length > 0) {
                console.error('Booking errors:', errors)
                alert(`Failed to book some seats:\n${errors.join('\n')}`)
                return
            }

            setSelectedTickets([])
            alert('Tickets successfully booked!')
            
            if (connectionRef.current && isConnected) {
                await connectionRef.current.invoke('GetBookedSeats', Number(id))
                    .catch(err => console.error('Error updating seats:', err))
            }
        } catch (err) {
            console.error('Booking error:', err)
            alert(`Error booking tickets: ${err.message || 'Unknown error'}`)
        }
    }


    return (
        <div className={`${styles.booking_wrapper}`}>
            <div className={`${styles.title}`}>
                <h1>{selectedMovie ? selectedMovie : "Unknown"}</h1>
                <span>{timeUtils.stripDateTime(sessionInfo.date)} {timeUtils.convertToHourMinute(sessionInfo.date)}</span>
                <span>Hall {placement.hallName}</span>
            </div>
            <div className={`${styles.booking_container}`}>
                <div className={`${styles.placement_container}`} style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${placement.rowCount}, 1fr)`,
                    gridTemplateColumns: `repeat(${placement.placeCount}, 1fr)`,
                    gap: "10px",
                    width: "800px",
                    alignItems: "start",
                }}>
                    {Array.from({ length: placement.rowCount }, (_, i) => (
                        <>
                            {Array.from({ length: placement.placeCount }, (_, j) => (
                                <Place key={i + j} row={i} place={j} isBooked={isBooked(i + 1, j + 1)}
                                    isSelected={selectedTickets.find(ticket => ticket.row === i + 1 && ticket.place === j + 1)} onClick={onClick} />
                            ))}
                        </>
                    ))}
                </div>
                <div className={`${styles.tickets_booking_container}`}>
                    <div className={`${styles.tickets_container_title}`}> Tickets </div>
                    <div className={`${styles.tickets_container}`}>
                        {
                            selectedTickets.map(ticket => (
                                <TicketInfo
                                    deleteItem={deleteItem}
                                    dateTime={timeUtils.stripDateTime(sessionInfo.date) + " " + timeUtils.convertToHourMinute(sessionInfo.date)}
                                    row={ticket.row}
                                    place={ticket.place}
                                    title={ticket.title}
                                    hallName={ticket.hallName} />
                            ))
                        }
                    </div>
                    <div className={`${styles.interaction_section}`}>
                        <span> Total Price: {ticketsPrice} </span>
                        <Button onClick={bookTickets}> Book tickets </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingPage
