import { commonPages } from '../../pages/'

const commonRoute = [
    {
        path: '/example',
        element: <commonPages.ExampleCommonPage/>
    },
    {
        path: '/',
        element: <commonPages.HomePage/>
    },
    {
        path: '/movies',
        element: <commonPages.MoviesPage/>
    },
    {
        path: '/movie/:id',
        element: <commonPages.MoviePage/>
    },
    {
        path: 'signup',
        element: <commonPages.SignUpPage/>
    },
    {
        path: 'signin',
        element: <commonPages.SignInPage/>
    },
]

export default commonRoute
