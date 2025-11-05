import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import Layout from '../layout/Layout.jsx'


import createRoute from './routes/createRoute.js'

function RouteHandler() {
    // Check what kind of user uses web app
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: createRoute()// this component adds routes depending on user role Guest -> commonRoute, User -> [...commonRoute, ...userRoute], Admin ->[...commonRoute, ...userRoute, ...commonRoute] 
        }
    ])
    return <RouterProvider router={router} />
}

export default RouteHandler
