import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import GetFiles from './components/GetFiles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterUser />
    <GetFiles />
  </StrictMode>
)
