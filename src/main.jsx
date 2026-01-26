
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  {AuthProvider}  from './context/AuthContext.jsx'
import { NavBar } from './components/NavBar.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider >
        <NavBar />
    <App />
    </AuthProvider>
)
