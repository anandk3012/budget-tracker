import React from 'react'

export default function TransactionCard({transactionData}) {
  const amount = transactionData.amount;
  const description = transactionData.description;

  return (
    <div className='w-[80%] bg-[#1F1F1F] p-4 rounded-[2rem] text-white '>
        <h1 className='text-center text-xl'>Rs. {amount}</h1>
        <h1 className='text-center text-xl'>{description}</h1>
    </div>
  )
}
