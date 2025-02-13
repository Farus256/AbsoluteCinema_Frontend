import { adminPages } from './../../pages/'
import ActorsList from '../../components/AdminDashboardComponents/ActorsList/ActorsList'
import MovieList from '../../components/AdminDashboardComponents/MoviesList/MovieList'
import GenresList from '../../components/AdminDashboardComponents/GenresList/GenresList'
import SessionsList from '../../components/AdminDashboardComponents/SessionsList/SessionList'
import HallsList from '../../components/AdminDashboardComponents/HallsList/HallsList'
import TicketsList from '../../components/AdminDashboardComponents/TicketsList/TicketsList'
import UsersList from '../../components/AdminDashboardComponents/UsersList/UsersList'

const adminRoute = [
    {
        path: '/admindashboard',
        element: <adminPages.AdminDashboard/>,
        children: [
            {
                path: "movies",
                element: <MovieList/>
            },
            {
                path: "genres",
                element: <GenresList/>
            },
            {
                path: "actors",
                element: <ActorsList/>
            },
            {
                path: "sessions",
                element: <SessionsList/>
            },
            {
                path: "halls",
                element: <HallsList/>
            },
            {
                path: "tickets",
                element: <TicketsList/>
            },
            {
                path: "users",
                element: <UsersList/>
            },
        ]
    },
]

export default adminRoute
