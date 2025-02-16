import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteHandler from './routing/RouteHandler'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { MovieProvider } from "./helpers/Providers/MovieContext"

createRoot(document.getElementById('root')).render(
    <MovieProvider>
        <RouteHandler />
    </MovieProvider>
)
