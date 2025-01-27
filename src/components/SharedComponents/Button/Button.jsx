import styles from "./Button.module.css"

function Button({ type, children, onClick, classes = "" }) {
    return (
        <button
            onClick={onClick}
            className={`${classes} ${styles.btn}`}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button
