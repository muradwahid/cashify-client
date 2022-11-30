import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import OrderCard from './OrderCard';

const MyOrders = () => {
    const {user}=useContext(AuthContext)
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/buyerorders/${user?.email}`)
            .then(res => res.json())
            .then(data => {
            setMyOrders(data)
        })
    },[user?.email])
    return (
        <div className=" bg-blue-600 min-h-[90vh]">
            <h3 className='text-center text-3xl font-bold text-white py-4'>My Orders</h3>
        <div className="w-4/5 mx-auto grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          {myOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    );
};

export default MyOrders;