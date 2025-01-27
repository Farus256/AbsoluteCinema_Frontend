import InputForm from "../../../components/SharedComponents/InputForm/InputForm";
import Input from "../../../components/SharedComponents/Input/Input";
import Button from "../../../components/SharedComponents/Button/Button";

import { Link } from "react-router-dom";

import styles from "./styles/SignInPage.module.css"

function SignInPage() {
    function onSubmit(e) {
        e.preventDefault()
        console.log("Try to log user in")
    }
    return (
        <div className={`${styles.wrapper}`}>
            <InputForm title={"Login"} onSubmit={onSubmit}>
                <Input placehoder={"E-mail"} required={true} />
                <Input placehoder={"Password"} required={true} />
                <Button> Sign in </Button>
                <p className={`${styles.registrantion_link_container}`}>
                    If you don't have an account try <Link to="/signup" className={`${styles.registrantion_link}`}>Registration</Link>.
                </p>
            </InputForm>
        </div>
    )
}

export default SignInPage
