import InputForm from "../../../components/SharedComponents/InputForm/InputForm";
import Input from "../../../components/SharedComponents/Input/Input";
import Button from "../../../components/SharedComponents/Button/Button";

import { Link, useNavigate } from "react-router-dom";

import styles from "./styles/SignInPage.module.css"
import { useState } from "react";

function SignInPage() {
    const [signInData, setSignInData] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    function onFormChange(e) {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    }

    function onSubmit(e) {
        e.preventDefault()
        fetch("https://localhost:7118/api/Auth/SignIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signInData)
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
            <InputForm title={"Login"} onSubmit={onSubmit}>
                <Input name="email" value={signInData.email} onChange={onFormChange} placeholder={"E-mail"} required={true} />
                <Input name="password" value={signInData.password} onChange={onFormChange} placeholder={"Password"} required={true} type={"password"} />
                <Button> Sign in </Button>
                <p className={`${styles.registrantion_link_container}`}>
                    If you don't have an account try <Link to="/signup" className={`${styles.registrantion_link}`}>Registration</Link>.
                </p>
            </InputForm>
        </div>
    )
}

export default SignInPage
