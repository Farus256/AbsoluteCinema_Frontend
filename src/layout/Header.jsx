import styles from './stylemodules/Header.module.css'
import { Link } from 'react-router-dom'

function Header() {

    return (
        <nav class={`navbar navbar-dark ${styles.container}`}>
            <div class="container-fluid">
                <div>
                    <Link to="/" class="navbar-brand"> <b>AbsoluteCinema</b></Link>
                    <Link to="/movies" class="navbar-brand">Movies</Link>
                </div>
                <form class="d-flex" role="search">
                    {/*<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                    {/*<button class="btn btn-outline-success" type="submit">Search</button>*/}
                    <Link to="/signin" class="btn btn-outline-light" type="submit">Sign In</Link>
                </form>
            </div>
        </nav>
    )
}

export default Header
