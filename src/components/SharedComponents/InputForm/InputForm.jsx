import styles from "./InputForm.module.css"

function InputForm({ title, onSubmit, children, style }) {
    return (
        <form
            className={`${styles.form}`}
            onSubmit={onSubmit}
            style={style}
        >
            <h1 className={`${styles.title}`}> {title} </h1>
            {children}
        </form>
    )
}

export default InputForm
