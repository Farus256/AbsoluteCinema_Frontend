import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'

import Layout from '../layout/Layout.jsx'

import commonRoute from './routes/commonRoute'


function RouteHandler() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout/>,
            children: commonRoute // this component adds routes depending on user role Guest -> commonRoute, User -> [...commonRoute, ...userRoute], Admin ->[...commonRoute, ...userRoute, ...commonRoute] 
        }
    ])
    return <RouterProvider router={router}/>
}

export default RouteHandler
