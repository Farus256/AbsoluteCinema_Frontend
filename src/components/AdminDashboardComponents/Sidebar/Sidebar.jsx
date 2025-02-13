import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Sidebar.module.css"

function Sidebar() {
    return ( 
        <div className={styles.sidebar_container} style={{width: "17.5%"}}>
            <ul className='nav d-flex flex-column'>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard'}>Dashboard</Link>
                </li>
                <hr className={styles.hr}/>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/movies'}>Movies</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/genres'}>Genres</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/actors'}>Actors</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/sessions'}>Sessions</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/halls'}>Halls</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/tickets'}>Tickets</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to={'/admindashboard/users'}>Users</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;