import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='text-center mt-5'>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <Link to="/blogs" className='btn btn-primary'>Go to Blogs</Link>
    </div>
  )
}
