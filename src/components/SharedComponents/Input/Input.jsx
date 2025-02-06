import styles from "./Input.module.css"

function Input({ type, placehoder, onChange, value, required = false }) {
    return (
        <input
            className={`${styles.input}`}
            type={type ? type : "text"}
            value={value}
            onChange={onChange}
            placeholder={placehoder}
            required={required}
        />
    )
}

export default Input
