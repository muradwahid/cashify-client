import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import BuyerCard from './BuyerCard';

const MyBuyers = () => {
    const { user } = useContext(AuthContext);
    const [buyers, setBuyers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/buyers/${user?.email}`)
        .then(res=>res.json())
            .then(data => {
            setBuyers(data);
        })
    },[user?.email])
    
    return (
      <div className='bg-blue-400 min-h-[90vh]'>
        <div className="w-4/5 mx-auto">
                <p className='text-center text-semibold text-3xl text-white py-5'>My Buyers List</p>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
                    {buyers?.map(buyer => <BuyerCard key={buyer._id} buyer={buyer} />)}
                </div>
        </div>
      </div>
    );
};

export default MyBuyers;