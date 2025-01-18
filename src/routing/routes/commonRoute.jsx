import {commonPages } from '../../pages/'

const commonRoute = [
    {
        path: '/',
        element: <commonPages.ExampleCommonPage/>
        // loader:          <-- Import preloader form loaders folder if needed
    },
    /*
     {
        path: '*', represents wrong url
        element : Some kind of error page  
    }
    */
]

export default commonRoute
