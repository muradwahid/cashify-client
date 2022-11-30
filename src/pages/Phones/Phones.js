import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import PhoneCard from './PhoneCard';
import PhoneModal from './PhoneModal';

const Phones = () => {
  const [modalPhone, setModalPhone] = useState(null)
  const phones = useLoaderData()
    const { user } = useContext(AuthContext);


    return (
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-700 py-12">
        <div className="w-4/5 mx-auto grid gap-8 grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {phones.map((phone) => (
            <PhoneCard
              key={phone._id}
              user={user}
              phone={phone}
              setModalPhone={setModalPhone}
            />
          ))}
        </div>
      </div>
    );
};

export default Phones;