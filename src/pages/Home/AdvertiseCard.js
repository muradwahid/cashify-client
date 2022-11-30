import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React from 'react';
import useVerify from '../../hooks/useVerify';
import Loading from '../shared/Loading/Loading';

const AdvertiseCard = ({phone}) => {
        const {
          image,
          name,
          location,
          original_price,
          resale_price,
          used,
          seller,
          email,
            post_date,
          sold
  } = phone;
  const [verify, verifyLoder] = useVerify(email);
  if (verifyLoder) {
    return <Loading/>
  }
    return (
      <>
        {!sold ? (
          <>
            <div className="card bg-base-100 shadow-xl">
              <div className="w-full h-2/5">
                <img className="w-full h-full rounded-xl" src={image} alt="" />
              </div>
              <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>
                  <strong>Location</strong>: {location}
                </p>
                <p>
                  <strong>Original Price:</strong> {original_price}
                </p>
                <p>
                  <strong>Resale Price: {resale_price}</strong>
                </p>
                <p>
                  <strong>Used:</strong> {used}
                </p>
                <div className="flex gap-2 items-center">
                  <p>
                    <strong>Seller Name: </strong> {seller}
                  </p>
                  <p>
                    {verify ? (
                      <CheckIcon className="h-4 bg-blue-700 text-white rounded-full" />
                    ) : (
                      <XMarkIcon className="h-4 bg-red-600 text-white rounded-full" />
                    )}
                  </p>
                </div>
                <small>{post_date}</small>
                <div className="card-actions justify-end">
                  <label
                    htmlFor="phone_modal"
                    className=" bg-blue-600 cursor-pointer py-2 px-4 rounded-xl text-[18px] font-semibold text-white"
                  >
                    Buy Now
                  </label>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
};

export default AdvertiseCard;