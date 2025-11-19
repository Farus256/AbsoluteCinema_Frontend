import { adminPages } from './../../pages/'
import ActorsComponent from '../../components/AdminDashboardComponents/ActorsComponent/ActorsComponent'
import MoviesComponent from '../../components/AdminDashboardComponents/MoviesComponent/MovieComponent'
import GenresComponent from '../../components/AdminDashboardComponents/GenresComponent/GenresComponent'
import SessionsComponent from '../../components/AdminDashboardComponents/SessionsComponent/SessionComponent'
import HallsComponent from '../../components/AdminDashboardComponents/HallsComponent/HallsComponent'
import TicketsComponent from '../../components/AdminDashboardComponents/TicketsComponent/TicketsComponent'
import UsersComponent from '../../components/AdminDashboardComponents/UsersComponent/UsersComponent'
import ServerStatusComponent from '../../components/AdminDashboardComponents/ServerStatusComponent/ServerStatusComponent'

const adminRoute = [
    {
        path: '/admindashboard',
        element: <adminPages.AdminDashboard/>,
        children: [
            {
                path: "server-status",
                element: <ServerStatusComponent/>
            },
            {
                path: "movies",
                element: <MoviesComponent/>
            },
            {
                path: "genres",
                element: <GenresComponent/>
            },
            {
                path: "actors",
                element: <ActorsComponent/>
            },
            {
                path: "sessions",
                element: <SessionsComponent/>
            },
            {
                path: "halls",
                element: <HallsComponent/>
            },
            {
                path: "tickets",
                element: <TicketsComponent/>
            },
            {
                path: "users",
                element: <UsersComponent/>
            },
        ]
    },
]

export default adminRoute
