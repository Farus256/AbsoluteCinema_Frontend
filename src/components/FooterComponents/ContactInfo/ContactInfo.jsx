import styles from "./ContactInfo.module.css"

function ContactInfo({ title, children }) {
    return (
        <div className={`${styles.container}`}>
            <h2 className={`${styles.title}`}> {title} </h2>
            {children}
        </div>
    )
}

export default ContactInfo
