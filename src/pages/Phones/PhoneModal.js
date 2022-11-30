import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const PhoneModal = ({ modalPhone }) => {
  const { user } = useContext(AuthContext);
    const buyerData = (e) => {
      e.preventDefault();
      const buyerInfo = {
        productName:modalPhone?.name,
        buyerName: user.displayName,
        buyerImage: user.photoURL,
        bookedId: modalPhone?._id,
        buyerEmail: user?.email,
        email: modalPhone?.email,
        location: e.target.location.value,
        image: modalPhone.image,
        sellerName:modalPhone.seller
      };
      fetch("https://assignment-12-server-gules.vercel.app/buyers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(buyerInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("Successfully booked product.")
        });
    };
  return (
    <div>
      <input type="checkbox" id="phone_modal" className="modal-toggle" />
      <div className="modal">
        <form onSubmit={buyerData} className="modal-box">
          <label
            htmlFor="phone_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <input
            type="text"
            defaultValue={user?.displayName}
            disabled
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
          />
          <input
            type="text"
            defaultValue={user?.email}
            disabled
            placeholder="Type here"
            className="input input-bordered w-full mb-4"
          />
          <label className="font-semibold">Brand Name:</label>
          <input
            type="text"
            defaultValue={modalPhone?.name}
            disabled
            className="input input-bordered w-full mb-4"
          />
          <label className="font-semibold">Price: </label>
          <input
            type="text"
            defaultValue={modalPhone?.resale_price}
            disabled
            className="input input-bordered w-full mb-4"
          />
          <label className="font-semibold">Meeting location</label>
          <input
            type="text"
            name="location"
            placeholder="location"
            className="input input-bordered w-full mb-4"
            required
          />
          <div className="modal-action">
            <input type="submit" value="Submit" className="w-full btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PhoneModal;