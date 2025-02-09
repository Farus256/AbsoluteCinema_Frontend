import { Link } from 'react-router-dom'

import utils from '../helpers/userUtils'

import styles from './stylemodules/Header.module.css'

function Header() {
    const isUser = utils.GetUserRoles().includes("User")
    const userId = utils.GetUserId()

    return (
        <nav class={`navbar navbar-dark ${styles.container}`}>
            <div class="container-fluid">
                <div>
                    <Link to="/" class="navbar-brand"> <b>AbsoluteCinema</b></Link>
                    <Link to="/movies" class="navbar-brand">Movies</Link>
                </div>
                {
                    isUser ?
                        (<Link to={`/user/${userId}`} class="btn btn-outline-light" type="submit">User</Link>) :
                        (<Link to="/signin" class="btn btn-outline-light" type="submit">Sign In</Link>)
                }
            </div>
        </nav>
    )
}

export default Header
