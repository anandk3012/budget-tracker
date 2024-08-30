// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Mainheading from '../components/Mainheading';
import { loginUser } from '../api/api';
import Load1 from './Loading/Load1';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const runLoadingScreen = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      if (response.status === 400) {
        setError(response.data);
        setIsLoading(false);
        logout();
        navigate('/login');
        return;
      }

      setError(null);
      login(response.data);
      console.log(response.data);
      runLoadingScreen();
      navigate('/dashboard');
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ?
        <Load1 />
        :
        <div className='min-h-screen text-[#1F1F1F] flex flex-col items-center'>
          <Mainheading name="LOGIN" />
          <div className='w-[80%] mt-5'>
            <form
              onSubmit={handleSubmit}
              className='w-1/2 bg-[#1F1F1F] text-white flex flex-col items-center justify-evenly gap-3 py-10 px-3 mx-auto rounded-[2rem]'
              action='/dashboard'
              method='post'
            >
              <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-2/3 bg-black p-4 rounded-[2rem]'
              />
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-2/3 bg-black p-4 rounded-[2rem]'
              />
              {error &&
                <p className='w-2/3 text-[#D00000] text-end' >{error}</p>}
              <button
                type="submit"
                className='w-1/3 bg-[#D00000] text-white p-3 rounded-[2rem]'
                disabled = {!password}
              >Login</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}
