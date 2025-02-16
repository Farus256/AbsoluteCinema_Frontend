import styles from "./Input.module.css"

function Input({ type, placeholder, onChange, value, name, required = false }) {
    return (
        <input
            className={`${styles.input}`}
            type={type ? type : "text"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
        />
    )
}

export default Input
