import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../shared/Loading/Loading';
import SingleProduct from './SingleProduct';

const MyProduct = () => {
    const {user}=useContext(AuthContext)
        queryKey: ["phones", user?.email],
        queryFn: async () => {
            const res =await fetch(
              `http://localhost:5000/myproduct/${user?.email}`
            );
            const data =await res.json();
            return data;
        }
    })
  const handlePhoneDelete = (id) => {
    fetch(`http://localhost:5000/myproduct/${id}`, {
      method: "DELETE",
      headers: {
        'content-type':"application/json"
      }
    })
    .then(res=>res.json())
      .then(deleteData => {
        if (deleteData.deletedCount > 0) {
          advertiseDelete(id)
          toast.success('Successfully Delete')
          refetch();
        }
      })
    
  }
  const advertiseDelete = (id) => {
        fetch(`http://localhost:5000/advertise/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((deleteData) => {
            if (deleteData.deletedCount > 0) {
              refetch();
            }
          });
  }
  if (isLoading) {
    return <Loading/>
  }
    return (
      <>
        {phones.length ? (
          <div className="w-4/5 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
              {phones.map((phone) => (
                <SingleProduct
                  key={phone._id}
                  handlePhoneDelete={handlePhoneDelete}
                  phone={phone}
                  user={user}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-3xl text-red-500 text-center mt-7 min-h-[70vh]">
            Not yet product. Please Add Product
          </p>
        )}
      </>
    );
};

export default MyProduct;