import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

import styles from './stylemodules/Layout.module.css'

function Layout() {

    const location = useLocation()

    const noFooterRoutes = ["/"]
    const showFooter = !noFooterRoutes.includes(location.pathname);
    return (
        <div className={`bg-dark text-white min-vh-100 d-flex flex-column ${styles.body}`}>
            <Header />
            <Outlet />
            {showFooter && <Footer />}
        </div>
    )
}

export default Layout
