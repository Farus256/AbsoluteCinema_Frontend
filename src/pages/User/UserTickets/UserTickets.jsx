import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "./styles/UserTickets.module.css"

function UserTickets() {
    const { id } = useParams()
    const [userTickets, setUserTickets] = useState([])

    useEffect(() => {
        fetch(`https://localhost:7118/api/Ticket/GetTicketWithStrategy?UserId=${id}`)
            .then(response => response.json())
            .then(tickets => setUserTickets(tickets))
            .catch(err => console.log(err))

        //console.log(userTickets)
    }, [id])

    useEffect(() => {
        console.log(userTickets) 
    }, [userTickets])

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
                {userTickets.map((ticket, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{ticket.date}</td>
                            <td>{ticket.movie}</td>
                            <td>{ticket.hall}</td>
                            <td>{ticket.row}</td>
                            <td>{ticket.place}</td>
                            <td>{ticket.status}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default UserTickets
