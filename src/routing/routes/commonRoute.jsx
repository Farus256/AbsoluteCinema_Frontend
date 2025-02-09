import { commonPages } from '../../pages/'

const commonRoute = [
    {
        path: '/',
        element: <commonPages.HomePage />
    },
    {
        path: '/movies',
        element: <commonPages.MoviesPage />
    },
    {
        path: '/movie/:id',
        element: <commonPages.MoviePage />
    },
    {
        path: '/signup',
        element: <commonPages.SignUpPage />
    },
    {
        path: '/signin',
        element: <commonPages.SignInPage />
    },
    {
        path: '*',
        element: <commonPages.ExampleCommonPage />
    },
]

export default commonRoute
