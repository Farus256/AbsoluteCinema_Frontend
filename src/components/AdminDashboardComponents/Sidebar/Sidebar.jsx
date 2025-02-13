import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("movies");

  return (
    <div className="bg-white w-25 pt-4">
      <div className="fs-4 ms-4 pb-2">
        <Link
          className={` w-100 d-flex px-3 py-1 ${styles.link}`}
          to={"/admindashboard"}
          onClick={() => setActiveLink("")}
        >
          Dashboard
        </Link>
      </div>
      <hr className={styles.hr} />
      <ul className="nav flex-column mb-sm-auto align-items-center align-items-sm-start fs-4 mx-4 py-2">
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "movies" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("movies")}
            to={"/admindashboard/movies"}
          >
            Movies
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "genres" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("genres")}
            to={"/admindashboard/genres"}
          >
            Genres
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "actors" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("actors")}
            to={"/admindashboard/actors"}
          >
            Actors
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "sessions" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("sessions")}
            to={"/admindashboard/sessions"}
          >
            Sessions
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "halls" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("halls")}
            to={"/admindashboard/halls"}
          >
            Halls
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "tickets" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("tickets")}
            to={"/admindashboard/tickets"}
          >
            Tickets
          </Link>
        </li>
        <li className="nav-item w-100 my-2">
          <Link
            className={`w-100 d-flex px-3 py-1 ${
              activeLink === "users" ? styles.active_link : styles.link
            }`}
            onClick={() => setActiveLink("users")}
            to={"/admindashboard/users"}
          >
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
