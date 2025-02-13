import { Outlet } from "react-router-dom"
import Sidebar from "../../../components/AdminDashboardComponents/Sidebar/Sidebar"
import styles from "./styles/AdminDashboard.module.css"

function AdminDashboard() {
    return (
        <div>
            <Sidebar/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminDashboard
