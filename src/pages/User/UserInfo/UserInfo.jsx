import { useState, useEffect } from "react";
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

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch("https://localhost:7118/api/User", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setSignUpData({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        age: userData.age
                    });
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, [token]);

    function onFormChange(e) {
        console.log(signUpData)
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }

    function onDateChange(e) {
        const rawDate = e.target.value; // "YYYY-MM-DD"
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB");
        setSignUpData({ ...signUpData, age: formattedDate })
    }

    async function changeUserInfo(e) {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:7118/api/User", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    firstName: signUpData.firstName,
                    lastName: signUpData.lastName,
                    email: signUpData.email,
                    birthDate: signUpData.age, 
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("User information updated successfully!");
            } else {
                console.error("Update failed:", data);
                alert("Failed to update user information.");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
        }

    }

    return (
        <div className={`${styles.container}`}>
            <form onSubmit={changeUserInfo} className={` ${styles.form_container}`}>
                <label htmlFor="firstName"> First Name </label>
                <Input onChange={onFormChange} placehoder={"First Name"} required={true} name={"firstName"} />
                <label htmlFor="Last Name"> Last Name </label>
                <Input onChange={onFormChange} placehoder={"Last Name"} required={true} name={"lastName"} />
                <label htmlFor="email"> E-mail </label>
                <Input onChange={onFormChange} placehoder={"E-mail"} required={true} name={"email"} />
                <label htmlFor="age"> Birth Date </label>
                <Input onChange={onDateChange} placehoder={"Age"} required={true} type={"date"} name={"age"} value={signUpData.age || ""}/>
                <Button> Update </Button>
            </form>
        </div>
    )
}

export default UserInfo
