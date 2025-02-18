import { Link } from 'react-router-dom'

import utils from '../helpers/userUtils'

import styles from './stylemodules/Header.module.css'

function Header() {
    const isUser = utils.GetUserRoles().includes("User")
    const isAdmin = utils.GetUserRoles().includes("Admin")
    const userId = utils.GetUserId()

    console.log(utils.GetUserRoles());

    return (
        <nav class={`navbar navbar-dark ${styles.container}`}>
            <div class="container-fluid">
                <div>
                    <Link to="/" class="navbar-brand"> <b>AbsoluteCinema</b></Link>
                    <Link to="/movies" class="navbar-brand">Movies</Link>
                    {
                    isAdmin && (
                        <Link to={"/admindashboard"} className="navbar-brand">AdminDashboard</Link>
                    )
                }
                </div>
                {
                    <div className='d-flex gap-2'>
                        { isUser &&
                            (<Link to={`/user/${userId}/info`} className="btn btn-outline-light" type="submit">User</Link>) }
                        { isAdmin &&
                            (<Link to={`/user/${userId}/info`} className='btn btn-outline-light'>Admin</Link>) }
                        { isUser || isAdmin ?
                            (<Link to={'/'} className='btn btn-outline-light' onClick={() => localStorage.removeItem("token")}>Log out</Link>) :
                            (<Link to="/signin" className="btn btn-outline-light" type="submit">Sign In</Link>)
                        }
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header
