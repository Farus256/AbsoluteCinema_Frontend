import styles from "./Place.module.css"

function Place({ isBooked, row, place, onClick, isSelected }) {
    return (
        <div
            className={`${isBooked ? styles.takenSeat : styles.emptySeat} ${isSelected && styles.selectedSeat}`}
            onClick={() => { !isBooked && onClick(row + 1, place + 1) }}
        >
            {isBooked}
        </div>
    )
}

export default Place
