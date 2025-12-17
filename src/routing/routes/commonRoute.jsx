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
        path: '/graphql-movies',
        element: <commonPages.GraphQLMoviesPage />
    },
    {
        path: '/movie/:id/booking',
        element: <commonPages.BookingPage />
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
        element: <commonPages.HomePage />
    },
]

export default commonRoute
