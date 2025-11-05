import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "./styles/UserTickets.module.css"

function UserTickets() {
    const { userId } = useParams()
    const [userTickets, setUserTickets] = useState([])

    useEffect(() => {
        fetch(`https://localhost:7118/api/Ticket/GetTicketsForUser?userId=${userId}`)
            .then(response => response.json())
            .then(tickets => setUserTickets(tickets))
            .catch(err => console.log(err))

        //console.log(userTickets)
    }, [userId])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Movie</th>
                        <th scope="col">Hall</th>
                        <th scope="col">Row</th>
                        <th scope="col">Place</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {userTickets.map((ticket) => (
                    <tr key={ticket.id}>
                        <th scope="row">{ticket.id}</th>
                        <td>{new Date(ticket.session.date).toLocaleString()}</td>
                            <td>{ticket.session.movie.title}</td>
                            <td>{ticket.session.hall.name}</td>
                            <td>{ticket.row}</td>
                            <td>{ticket.place}</td>
                            <td>{ticket.status.name}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default UserTickets
