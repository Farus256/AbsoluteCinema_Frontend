import { adminPages } from './../../pages/'

const adminRoute = [
    {
        path: '/admindashboard',
        element: <adminPages.AdminDashboard />,
        children: [
            {
            }
        ]
    },
]

export default adminRoute
