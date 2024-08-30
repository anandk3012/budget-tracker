import React from 'react'
import Mainheading from '../components/Mainheading'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {

  const {isLoggedIn,user,login,logout} = useAuth();
  const head = user?  "Welcome " + user.username + " !!" : "Welcome !!";
  return (
    <div className='min-h-screen text-[#1F1F1F] flex flex-col items-center'>
      <Mainheading name="DASHBOARD" />
      <Mainheading name={head} />
    </div>
  )
}
