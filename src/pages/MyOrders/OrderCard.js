import React from 'react';

const OrderCard = ({ order }) => {
    const { image, productName, sellerName,email } = order;
    return (
      <div className="card card-side bg-base-100 shadow-xl mt-4">
        <figure>
          <img src={image} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Order Mobile: {productName}</h2>
          <div>
            <p>
              <strong>Seller Name:</strong> {sellerName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
          </div>
        </div>
      </div>
    );
};

export default OrderCard;