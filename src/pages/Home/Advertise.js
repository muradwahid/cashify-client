import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../shared/Loading/Loading';
import AdvertiseCard from './AdvertiseCard';

const Advertise = () => {
    const { user } = useContext(AuthContext);
    const [phones, setPhones] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/advertise")
            .then(res => res.json())
            .then(data => {
                setPhones(data)
            })
    }, []);
    return (
      <>
        {phones.length && (
          <div className=" bg-blue-600 py-4">
            <h3 className="font-semibold text-xl underline text-white text-center">
              Advertise Items
            </h3>
            <div className="w-4/5 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1">
              {phones.map((phone) => (
                <AdvertiseCard
                  key={phone._id}
                  phone={phone}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
};

export default Advertise;