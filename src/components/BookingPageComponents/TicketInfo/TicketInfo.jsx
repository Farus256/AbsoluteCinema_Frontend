import styles from "./TicketInfo.module.css"

function TicketInfo({ dateTime, row, place, hallName, title, deleteItem }) {
    return (
        <div
            className={`${styles.ticket_container}`}
            onClick={() => deleteItem(row, place)}
        >
            <div className={`${styles.tickets}`}>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Date & Time</span>
                    <span className={`${styles.value}`}>{dateTime}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Movie</span>
                    <span className={`${styles.value}`}>{title}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Hall</span>
                    <span className={`${styles.value}`}>{hallName}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Row</span>
                    <span className={`${styles.value}`}>{row}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Place</span>
                    <span className={`${styles.value}`}>{place}</span>
                </div>
                <div className={`${styles.row}`}>
                    <span className={`${styles.label}`}>Price</span>
                    <span className={`${styles.value}`}>150 ₴</span>
                </div>
            </div>

        </div>
    )
}

export default TicketInfo
