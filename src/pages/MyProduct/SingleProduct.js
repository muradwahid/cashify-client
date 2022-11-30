import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import toast from 'react-hot-toast';
import useVerify from '../../hooks/useVerify';

const SingleProduct = ({ phone, user, handlePhoneDelete }) => {
  const [verify] = useVerify(user?.email);
  const {
    _id,
    image,
    name,
    seller,
    location,
    resale_price,
    original_price,
    used,
    post_date,
    email,
    condition,
    purchase_year,
    sold,
    categoryId,
  } = phone;
  const advertise = {
    image,
    email,
    seller,
    name,
    resale_price,
    condition,
    location,
    original_price,
    sold,
    purchase_year,
    used,
    categoryId,
    productId:_id
  };
  const handleAdvertise = () => {
    fetch("https://assignment-12-server-gules.vercel.app/advertise", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(advertise),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your product successfully added advertise section");
        }
      });
  };
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex items-center gap-2">
          <p>Seller Name: {seller}</p>{" "}
          <p>
            {verify ? (
              <CheckIcon className="h-4 bg-blue-700 text-white rounded-full" />
            ) : (
              <XMarkIcon className="h-4 bg-red-600 text-white rounded-full" />
            )}
          </p>
        </div>
        <p>Location: {location}</p>
        <p>
          Original Price: <strong>{original_price}</strong>
        </p>
        <p>
          Resale Price: <strong>{resale_price}</strong>
        </p>
        <p>
          Post Date: <strong>{post_date}</strong>
        </p>
        <p>
          {phone?.sold ? <strong>Sold</strong> : <strong>Available</strong>}
        </p>
        <div className="card-actions justify-end">
          <button
            disabled={sold}
            onClick={handleAdvertise}
            className="btn bg-blue-700"
          >
            Advertise
          </button>
          <button onClick={() => handlePhoneDelete(_id)} className="btn bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;