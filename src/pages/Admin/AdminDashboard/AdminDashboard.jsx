import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/AdminDashboardComponents/Sidebar/Sidebar";
import styles from "./styles/AdminDashboard.module.css";

function AdminDashboard() {
  return (
    <div className="container-fluid d-flex flex-row px-0" style={{minHeight: '90vh'}}>
        <Sidebar />
        <Outlet />
    </div>
  );
}

export default AdminDashboard;
