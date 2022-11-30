import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hooks/useTitle';
import OrderCard from './OrderCard';

const MyOrders = () => {
  const { user } = useContext(AuthContext)
  useTitle("My Orders")
    const [myOrders, setMyOrders] = useState([]);
    useEffect(() => {
        fetch(`https://assignment-12-server-gules.vercel.app/buyerorders/${user?.email}`)
            .then(res => res.json())
            .then(data => {
            setMyOrders(data)
        })
    },[user?.email])
    return (
      <div className=" bg-gradient-to-r from-pink-500 via-purple-500 to-blue-700 min-h-[90vh]">
        <h3 className="text-center text-3xl font-bold text-white py-4">
          My Orders
        </h3>
        <div className="w-4/5 mx-auto grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          {myOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    );
};

export default MyOrders;