import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyer = () => {
  const { data: buyers = [],refetch } = useQuery({
    queryKey: ["buyers"],
    queryFn: async () => {
      const res=await fetch("http://localhost:5000/buyers");
      const data=await res.json()
      return data;
    }
  })
  const handleBuyerDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        "content-type":"application/json"
      }
    })
    .then(res=>res.json())
      .then(data => {
       if (data.deletedCount > 0) {
         refetch();
         toast.success("Successfully deleted buyer.")
       }
    })
  }

  const handleVerify = (email) => {
    fetch(`http://localhost:5000/userverify/${email}`, {
      method: "PUT",
      headers: {
        "content-type":"application/json"
      }
    })
    .then(res=>res.json())
      .then(data => {
      if (data.modifiedCount>0) {
        toast.success("Successfully buyer verified")
        refetch()
      }
    })
  }

    return (
      <div className="w-4/5 mx-auto min-h-[70vh]">
        <h3 className="text-3xl text-blue-600 text-center font-bold my-6">
          All Buyers List
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
              {buyers.map((buyer, i) => (
                <tr key={buyer._id}>
                  <th>{i + 1}</th>
                  <td>{buyer.name}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.role}</td>
                  <td>
                    {buyer?.verified ? (
                      <p>verified</p>
                    ) : (
                      <button onClick={()=>handleVerify(buyer.email)} className="btn btn-primary btn-sm">
                        not verify
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleBuyerDelete(buyer._id)}
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

export default AllBuyer;