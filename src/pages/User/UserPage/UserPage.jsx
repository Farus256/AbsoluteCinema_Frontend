import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

import userUtils from '../../../helpers/userUtils'

import styles from './styles/UserPage.module.css'

function UserPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.title}`}>Welcome, <b>{userUtils.GetUserName()}</b></div>
            <div className={`${styles.data}`}>
                <nav className={`${styles.navbar}`}>
                    <Link className={`${styles.link}`} to={`/user/${id}/info`}> Personal information </Link>
                    <Link className={`${styles.link}`} to={`/user/${id}/tickets`}> Tickets </Link>
                    <div className={`${styles.logout_btn}`} onClick={logOut}> Log Out </div>
                </nav>
                <div className={`${styles.info}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default UserPage
