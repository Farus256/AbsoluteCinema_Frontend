import { userPages } from '../../pages/'

const userRoute = [
    {
        path: "/user/:id",
        element: <userPages.UserPage />
    },
    {
        path: "/user/:id/tickets",
        element: <userPages.UserTickets />
    },
    {
        path: "/user/:id/info",
        element: <userPages.UserInfo />
    },
]

export default userRoute
