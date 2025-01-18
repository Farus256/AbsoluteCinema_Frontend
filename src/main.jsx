import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RouteHandler from './routing/RouteHandler'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouteHandler/>
  </StrictMode>,
)
