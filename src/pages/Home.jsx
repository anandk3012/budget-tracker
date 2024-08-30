import React, { useState } from 'react'
import Mainheading from '../components/Mainheading'
import { addTransaction } from '../api/api'

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sampleTransaction = {
    user_id: 7,
    description: 'This is a sample transaction',
    amount: 100,
  }

  const handleAdd = async () => {
    setIsLoading(true)
    try {
      await addTransaction(sampleTransaction);
      console.log('Successfully added !');
    }
    catch (error) {
      setError('Failed to add transaction');
      console.error(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen text-[#1F1F1F] flex flex-col items-center '>
      <Mainheading name="HOME" />
      <button className='bg-white p-4 mt-10 rounded-[2rem]' onClick={handleAdd} disabled={isLoading} >{isLoading ? 'ADDING...' : 'ADD TRANSACTION'} </button>
      {error && <p className='text-red-600 mt-4' >{error}</p>}
    </div>
  )
}
