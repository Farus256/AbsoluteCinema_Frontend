import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Input from "../../../components/SharedComponents/Input/Input"
import styles from "./styles/UserInfo.module.css"
import Button from "../../../components/SharedComponents/Button/Button";
import { APP_CONFIG } from "../../../env";

function UserInfo() {
    const { id } = useParams();
    const [signUpData, setSignUpData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: ""
    })

    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch(`${APP_CONFIG.API_URL}/User/GetUserById?id=${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    setSignUpData({
                        id: userData.id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        birthDate: (userData.birthDate || "").toString().slice(0,10)
                    });
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        if (id) {
            fetchUserData();
        }
    }, [id, token]);

    function onFormChange(e) {
        console.log(signUpData)
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    }

    function onDateChange(e) {
        const rawDate = e.target.value; // "YYYY-MM-DD"
        setSignUpData({ ...signUpData, birthDate: rawDate })
    }

    async function changeUserInfo(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${APP_CONFIG.API_URL}/User/UpdateUser`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: signUpData.id,
                    firstName: signUpData.firstName,
                    lastName: signUpData.lastName,
                    email: signUpData.email,
                    birthDate: signUpData.birthDate,
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
                <Input onChange={onFormChange} placeholder={"First Name"} required={true} name={"firstName"} value={signUpData.firstName}/>
                <label htmlFor="Last Name"> Last Name </label>
                <Input onChange={onFormChange} placeholder={"Last Name"} required={true} name={"lastName"} value={signUpData.lastName}/>
                <label htmlFor="email"> E-mail </label>
                <Input onChange={onFormChange} placeholder={"E-mail"} required={true} name={"email"} value={signUpData.email}/>
                <label htmlFor="birthDate"> Birth Date </label>
                <Input onChange={onDateChange} placeholder={"Birth Date"} required={true} type={"date"} name={"birthDate"} value={signUpData.birthDate || ""}/>
                <Button> Update </Button>
            </form>
        </div>
    )
}

export default UserInfo
