import React, { useState } from 'react';
import Mainheading from '../components/Mainheading'
import { addUser } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isPwdConfirmed, setIsPwdConfirmed] = useState(false)
  const handlePwdChange = () => {
    setIsPwdConfirmed(formData.password === formData.confirmPassword);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const userData = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    };

    try {
      const newUser = await addUser(userData);
      console.log('User Added Successfully !')
      login(newUser);
      navigate('/dashboard');
    } catch (error) {
      logout();
      console.log(error);
    }

  };
  return (
    <div className='min-h-screen text-[#1F1F1F] flex flex-col items-center '>
      <Mainheading name="REGISTER" />
      <div className='w-[80%] mt-5 '>
        <form
          name='login form'
          action="/dashboard"
          method="post"
          className='w-1/2 bg-[#1F1F1F] text-white flex flex-col items-center justify-evenly gap-3 py-10 px-3 mx-auto rounded-[2rem]'
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder='Name'
            className='w-2/3 bg-black p-4 rounded-[2rem]'
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder='Email Address'
            className='w-2/3 bg-black p-4 rounded-[2rem]'
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            className='w-2/3 bg-black p-4 rounded-[2rem]'
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder='Confirm Password'
            className='w-2/3 bg-black p-4 rounded-[2rem]'
            value={formData.confirmPassword}
            onChange={(e) => {
              handleChange(e);
              handlePwdChange(e);
            }}
          />
          {/* Check confirm password */}
          {(formData.password === formData.confirmPassword) || (formData.confirmPassword === '') ?
            <div className='w-6 h-6 bg-transparent'></div> :
            <p className='w-2/3 text-[#D00000] text-end' >*Passwords don&apos;t match!</p>
          }
          <button
            type="submit"
            className='w-1/3 bg-[#D00000] text-white p-3 rounded-[2rem]'
            disabled={!(formData.password === formData.confirmPassword) && (formData.confirmPassword) }
          >
            Submit
          </button>
        </form>
      </div>
    </div>

  )
}
