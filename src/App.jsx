import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import { ToastContainer } from 'react-toastify'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'
import Blogs from './Pages/Blogs'
import BlogDetails from './Pages/BlogDetails'
import CreateBlog from './Pages/CreateBlog'
import NotFound from './Pages/NotFound'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        <Route path='/' element={<Navigate to="/blogs" />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

        {/* Protected routes */}

        <Route path='/blogs' element={<ProtectedRoute><Blogs /></ProtectedRoute>}  />
        <Route path='/blogs/:id' element={<ProtectedRoute><BlogDetails /></ProtectedRoute>}  />
        <Route path='/create' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>}  />
        <Route path='/edit/:id' element={<ProtectedRoute><CreateBlog /></ProtectedRoute>}  />

        <Route path='*' element={<NotFound />}  />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App