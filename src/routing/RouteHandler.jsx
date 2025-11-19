import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import Layout from '../layout/Layout.jsx'


import createRoute from './routes/createRoute.js'

function RouteHandler() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: createRoute()
        }
    ])
    return <RouterProvider router={router} />
}

export default RouteHandler
