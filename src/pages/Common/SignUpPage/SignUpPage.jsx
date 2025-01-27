import InputForm from "../../../components/SharedComponents/InputForm/InputForm"
import Button from "../../../components/SharedComponents/Button/Button"
import Input from "../../../components/SharedComponents/Input/Input"

import styles from "./styles/SignUpPage.module.css"

function SignUpPage() {

    function onSubmit(e) {
        e.preventDefault()
        console.log("Try to register user")
    }

    return (
        <div className={`${styles.wrapper}`}>
            <InputForm title={"Registration"} onSubmit={onSubmit}>
                <Input placehoder={"First Name"} required={true} />
                <Input placehoder={"Last Name"} required={true} />
                <Input placehoder={"E-mail"} required={true} />
                <Input placehoder={"Password"} required={true} />
                <Input placehoder={"Password"} required={true} />
                <Button> Sign up </Button>
            </InputForm>
        </div>
    )
}

export default SignUpPage
