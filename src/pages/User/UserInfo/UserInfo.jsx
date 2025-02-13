import { useState } from "react";
import Input from "../../../components/SharedComponents/Input/Input"

import styles from "./styles/UserInfo.module.css"
import Button from "../../../components/SharedComponents/Button/Button";

function UserInfo() {
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
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

    function changeUserInfo() {
    }

    return (
        <div className={`${styles.container}`}>
            <form onSubmit={changeUserInfo} className={` ${styles.form_container}`}>
                <label for="firstName"> First Name </label>
                <Input onChange={onFormChange} placehoder={"First Name"} required={true} name={"firstName"} />
                <label for="Last Name"> Last Name </label>
                <Input onChange={onFormChange} placehoder={"Last Name"} required={true} name={"lastName"} />
                <label for="email"> E-mail </label>
                <Input onChange={onFormChange} placehoder={"E-mail"} required={true} name={"email"} />
                <label for="age"> Birth Date </label>
                <Input onChange={onDateChange} placehoder={"Age"} required={true} type={"date"} name={"age"} />
                <Button> Update </Button>
            </form>
        </div>
    )
}

export default UserInfo
