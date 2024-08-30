import { useState, useEffect } from 'react'
import Mainheading from '../components/Mainheading'
import { useAuth } from '../context/AuthContext';
import { addTransaction, getUserTransactions } from '../api/api';
import TransactionCard from '../components/TransactionCard';
import { FaTimes } from 'react-icons/fa'
import Load1 from './Loading/Load1';

export default function Transactions() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [userTransactions, setUserTransactions] = useState([]);

    const [popUp, setPopUp] = useState(false); // Initialize popUp as false
    const { user } = useAuth();
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionDescription, setTransactionDescription] = useState("");

    const [userData,setUserData] = useState(user);
    const userId = userData.id;

    useEffect(() => {
        setUserData(user);
        getTransactions();
    }, [user]);

    const getTransactions = async () => {
        try {
            const transactions = await getUserTransactions(userId);
            setUserTransactions(transactions);
        } catch (error) {
            setError('Failed to fetch transactions');
            console.error(error.message);
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault(); 
        handlePopUp();
        setIsLoading(true)
        try {
            const response = await addTransaction({
                user_id: userId,
                amount: transactionAmount,
                description: transactionDescription,
            });
            console.log(response)
            setTransactionAmount(0);
            setTransactionDescription("");
            getTransactions();
        }
        catch (error) {
            setError('Failed to add transaction');
            console.error(error.message);
        }
        finally {   
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    const handlePopUp = () => {
        setPopUp(!popUp);
    }

    return (
        <div className='min-h-screen  bg-black'>

            {isLoading ? <Load1 />
                :
                <div className='w-full flex flex-col items-center h-auto'>
                    <Mainheading name="Transactions" />
                    <button className='bg-white p-4 mt-10 rounded-[2rem]' onClick={handlePopUp} >ADD TRANSACTION</button>


                    {popUp &&
                        <div className="popup absolute flex flex-col items-center mx-auto bg-black bg-opacity-60 text-white w-full min-h-screen">
                            <div className='w-1/2 bg-[#1F1F1F] flex flex-col justify-evenly items-center rounded-[2rem] p-1'>
                                <div className="closeLogo w-[95%] text-end text-3xl mt-3" onClick={handlePopUp} >
                                    <button><FaTimes /></button>
                                </div>
                                <div className="w-full flex flex-col items-center">
                                    <Mainheading name="Add Transaction" />
                                </div>
                                <form onSubmit={handleAdd} className='w-full bg-[#1F1F1F] flex flex-col items-center justify-evenly gap-3 py-7 px-3 mx-auto rounded-[2rem]'>
                                    <input
                                        name='amount'
                                        type="number"
                                        placeholder='amount'
                                        className='w-2/3 bg-black p-4 rounded-[2rem] mt-4'
                                        value={transactionAmount}
                                        onChange={(e) => setTransactionAmount(e.target.value)}
                                    />
                                    <input
                                        name='description'
                                        type="text"
                                        placeholder='description'
                                        className='w-2/3 bg-black p-4 rounded-[2rem]'
                                        value={transactionDescription}
                                        onChange={(e) => setTransactionDescription(e.target.value)}
                                    />
                                    <button type="submit" className='w-1/3 bg-[#D00000] text-white p-3 rounded-[2rem]' disabled={transactionAmount === 0} >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    }

                    <div className="userTransactions w-[80%] flex flex-col items-center mx-auto my-10 gap-5 ">
                        {userTransactions?.map((transaction) => (
                            <TransactionCard key={transaction.id} transactionData={transaction} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
