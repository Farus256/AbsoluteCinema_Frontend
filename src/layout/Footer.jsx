import { Link } from "react-router-dom"
import ContactInfo from "../components/FooterComponents/ContactInfo/ContactInfo"
import styles from "./stylemodules/Footer.module.css"

function Footer() {
    return (
        <footer>
            <ContactInfo title={"Contact Us"}>
                <span> AbsoluteCinema@gmail.com</span>
                <span> +380-00-00-00</span>
            </ContactInfo>
            <ContactInfo title={"Follow Us"}>
                <Link to={"http://facebook.com"} className={`link-light`}> FaceBook </Link>
                <Link to={"http://instagram.com"} className={`link-light`}> Instagram </Link>
            </ContactInfo>
        </footer>
    )
}

export default Footer

