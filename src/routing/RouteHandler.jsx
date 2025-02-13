import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'

import Layout from '../layout/Layout.jsx'

import commonRoute from './routes/commonRoute'
import userRoute from './routes/UserRoute'
import adminRoute from './routes/adminRoute'

function RouteHandler() {
    const currentRoute = [...commonRoute, ...userRoute, ...adminRoute]
    console.log(currentRoute)
    // Check what kind of user uses web app
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: currentRoute// this component adds routes depending on user role Guest -> commonRoute, User -> [...commonRoute, ...userRoute], Admin ->[...commonRoute, ...userRoute, ...commonRoute] 
        }
    ])
    return <RouterProvider router={router}/>
}

export default RouteHandler
