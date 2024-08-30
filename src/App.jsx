import React, { useState } from 'react'
import Userroutes from './routes/Userroutes';
import Nonuserroutes from './routes/Nonuserroutes';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { isLoggedIn, login, logout } = useAuth();
  return (
    <div className='bg-black'>
      {isLoggedIn ? <Userroutes /> : <Nonuserroutes />}
    </div>
  )
}
