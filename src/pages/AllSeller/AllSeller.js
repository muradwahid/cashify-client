import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllSeller = () => {
  const { data: sellers = [], refetch } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/sellers");
      const data = await res.json();
      return data;
    },
  });

    const handleSellerDelete = (id) => {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Successfully deleted seller.");
          }
        });
  };
  
  const handleVerify = (email) => {
    fetch(`http://localhost:5000/userverify/${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        refetch();
        if (data.modifiedCount > 0) {
          toast.success("Successfully seller verified");
        }
      });
  };
    return (
      <div className="w-4/5 mx-auto min-h-[70vh]">
        <h3 className="text-3xl text-blue-600 text-center font-bold my-6">
          All Sellers List
        </h3>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, i) => (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.role}</td>
                  <td>
                    {seller?.verified ? (
                      <p>verified</p>
                    ) : (
                      <button
                        onClick={() => handleVerify(seller?.email)}
                        className="btn btn-primary btn-xs"
                      >
                        Not verify
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleSellerDelete(seller._id)}
                      className="btn btn-error btn-xs"
                    >
                      delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllSeller;