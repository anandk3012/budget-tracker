import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Load1 from '../pages/Loading/Load1';

export default function Nonuserroutes() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Simulate loading completion after a certain time
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 5000); // 5 seconds of bounce + 1 second for scale and fade

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-black'>
      {loadingComplete ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </>
      ) : (
        <Load1 />
      )}
    </div>
  );
}
