import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { UserLogin } from './pages/UserLogin'
import { Register } from './pages/Register'
import { BookListing } from './pages/BookListing'
import { AddEditBook } from './pages/AddEditBook'
import { useAuth } from './context/AuthContext' 
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { BooksDetails } from './pages/BooksDetails'


function App() {
  const { authData } = useAuth();
  return (
  <BrowserRouter>
    <Routes>
      {/* Redirect root to /books if authenticated */}
      <Route
        path='/'
        element={authData.isAuthenticated ? <Navigate to='/books' replace /> : <UserLogin />}
      />

      {/* Public route */}
      <Route path='/register' element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes redirectTo='/' />}> 
        <Route path='/books' element={<BookListing />} />
        <Route path='/books/:id' element={<AddEditBook />} />
        <Route path='/books/add' element={<AddEditBook />} />
        <Route path='/books-details/:id' element={<BooksDetails />} />
      </Route>

      {/* Fallback */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
