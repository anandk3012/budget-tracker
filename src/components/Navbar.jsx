import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='p-3  text-white font-medium'>
      <div className='py-2 px-7 bg-[#1F1F1F] flex items-center justify-between rounded-[2rem]'>
        <Link to='/' className='w-1/3'><img src={logo} className='w-10 h-10' alt="" /></Link>
        {isLoggedIn ?
          <div className='w-1/3 flex justify-evenly'>
            <Link to='/' >Home</Link>
            <Link to='/transactions' >Transactions</Link>
            <Link to='/dashboard' >Dashboard</Link>
            <button onClick={handleLogout} >Logout</button>
          </div> :
          <div className='w-1/4 flex justify-evenly'>
            <Link to='/' >Home</Link>
            <Link to='/register' >Register</Link>
            <Link to='/login' >Login</Link>
          </div>
        }
      </div>
    </div>
  )
}
