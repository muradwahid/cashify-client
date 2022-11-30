import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useVerify from '../../hooks/useVerify';
import Loading from '../shared/Loading/Loading';
import PhoneCard from './PhoneCard';
import PhoneModal from './PhoneModal';

const Phones = () => {
  const [modalPhone, setModalPhone] = useState(null)
  const phones = useLoaderData()
    const { user } = useContext(AuthContext);


    return (
      <div className="bg-blue-500 py-12">
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
        <PhoneModal modalPhone={modalPhone} />
      </div>
    );
};

export default Phones;