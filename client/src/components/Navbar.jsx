import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-green-500 p-4 fixed w-full top-0 z-50'>
    <div className='flex justify-between items-center container mx-auto'>
      <div className='flex space-x-4 text-center'>
        <h4><Link to="/">Home</Link></h4>
        <h4><Link to="/create">Create</Link></h4>
        <h4><Link to="/all-blogs">All Blogs</Link></h4>
      </div>
      <div className='ml-auto flex space-x-4'>
        <h4><Link to="/login">Log In</Link></h4>
        <h4><Link to="/sign-up">Sign Up</Link></h4>
      </div>
    </div>
  </nav>    
  )
}

export default Navbar