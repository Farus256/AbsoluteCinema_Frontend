import InputForm from "../../../components/SharedComponents/InputForm/InputForm"
import Button from "../../../components/SharedComponents/Button/Button"
import Input from "../../../components/SharedComponents/Input/Input"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/SignUpPage.module.css"
import { APP_CONFIG } from "../../../env"

function SignUpPage() {
    const navigate = useNavigate()
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: ""
    })

    function onFormChange(e) {
        console.log(signUpData)
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }

    function onDateChange(e) {
        const rawDate = e.target.value; // "YYYY-MM-DD"
        setSignUpData({ ...signUpData, birthDate: rawDate })
    }

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch(`${APP_CONFIG.API_URL}/Auth/SignUp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signUpData)
            })
            const data = await res.json()
            if (res.ok) {
                localStorage.setItem("token", data.token)
                navigate('/')
            } else {
                const errors = data?.result?.errors || data?.errors || []
                const message = Array.isArray(errors)
                    ? errors.map(e => e.description || e).join("\n")
                    : JSON.stringify(data)
                alert(message)
            }
        } catch (err) {
            console.log(err)
            alert('Registration failed')
        }
    }


    return (
        <div className={`${styles.wrapper}`}>
            <InputForm title={"Registration"} onSubmit={onSubmit}>
                <Input onChange={onFormChange} placehoder={"First Name"} required={true} name={"firstName"} />
                <Input onChange={onFormChange} placehoder={"Last Name"} required={true} name={"lastName"} />
                <Input onChange={onFormChange} placehoder={"E-mail"} required={true} name={"email"} />
                <Input onChange={onFormChange} placehoder={"Password"} required={true} name={"password"} type={"password"} />
                <Input onChange={onFormChange} placehoder={"Password"} required={true} name={"confirmPassword"} type={"password"} />
                <Input onChange={onDateChange} placehoder={"Birth Date"} required={true} type={"date"} name={"birthDate"} />
                <Button> Sign up </Button>
            </InputForm>
        </div>
    )
}



export default SignUpPage
