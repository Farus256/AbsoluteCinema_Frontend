import styles from "./Input.module.css"

function Input({ placehoder, onChange, value, required = false }) {
    return (
        <input
            className={`${styles.input}`}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placehoder}
            required={required}
        />
    )
}

export default Input
