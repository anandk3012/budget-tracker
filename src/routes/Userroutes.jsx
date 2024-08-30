// Nonuserroutes.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Navbar from '../components/Navbar';
import Load1 from '../pages/Loading/Load1';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Transactions from '../pages/Transactions';

export default function Nonuserroutes() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='bg-black'>
      {loadingComplete ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/dashboard' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </>
      ) : (
        <Load1 />
      )}
    </div>
  );
}
