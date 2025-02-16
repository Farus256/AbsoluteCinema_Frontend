import InputForm from "../../../components/SharedComponents/InputForm/InputForm"
import Button from "../../../components/SharedComponents/Button/Button"
import Input from "../../../components/SharedComponents/Input/Input"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./styles/SignUpPage.module.css"

function SignUpPage() {
    const navigate = useNavigate()
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: null
    })

    function onFormChange(e) {
        console.log(signUpData)
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }

    function onDateChange(e) {
        const rawDate = e.target.value; // "YYYY-MM-DD"
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB");
        setSignUpData({ ...signUpData, age: formattedDate })
    }

    function onSubmit(e) {
        e.preventDefault()
        fetch("https://localhost:7118/api/Auth/SignUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.result.succeeded) {
                    localStorage.setItem("token", data.token)
                    navigate('/')
                } else {
                    console.log(data.result.errors)
                }
            })
            .catch(err => console.log(err))
    }


    function onFormChange(e) {
        console.log(signUpData)
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }

    function onDateChange(e) {
        const rawDate = e.target.value; // "YYYY-MM-DD"
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB");
        setSignUpData({ ...signUpData, age: formattedDate })
    }

    function onSubmit(e) {
        e.preventDefault()
        fetch("https://localhost:7118/api/Auth/SignUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signUpData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.result.succeeded) {
                    localStorage.setItem("token", data.token)
                    navigate('/')
                } else {
                    console.log(data.result.errors)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={`${styles.wrapper}`}>
            <InputForm title={"Registration"} onSubmit={onSubmit}>
                <Input onChange={onFormChange} placehoder={"First Name"} required={true} name={"firstName"} />
                <Input onChange={onFormChange} placehoder={"Last Name"} required={true} name={"lastName"} />
                <Input onChange={onFormChange} placehoder={"E-mail"} required={true} name={"email"} />
                <Input onChange={onFormChange} placehoder={"Password"} required={true} name={"password"} type={"password"} />
                <Input onChange={onFormChange} placehoder={"Password"} required={true} name={"confirmPassword"} type={"password"} />
                <Input onChange={onDateChange} placehoder={"Age"} required={true} type={"date"} name={"age"} />
                <Button> Sign up </Button>
            </InputForm>
        </div>
    )
}



export default SignUpPage
