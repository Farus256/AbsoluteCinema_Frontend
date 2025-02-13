import { jwtDecode } from "jwt-decode"

function GetUserRoles() {
    const token = localStorage.getItem("token")
    if (token) {
        const decodeToken = jwtDecode(token)
        let userRole = decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        return userRole + " Guest"
    } else {
        return "Guest"
    }
}

function GetUserId() {
    const token = localStorage.getItem("token")
    if (token) {
        const decodeToken = jwtDecode(token)
        let userId = decodeToken["UserId"]
        return userId
    } else {
        return -1
    }

}
function GetUserName() {
    const token = localStorage.getItem("token")
    if (token) {
        const decodeToken = jwtDecode(token)
        let userName = decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        return userName
    } else {
        return -1
    }
}

export default {
    GetUserRoles,
    GetUserId,
    GetUserName
};
