import React from 'react';

const BuyerCard = ({buyer}) => {
    const { productName, buyerName, buyerImage, buyerEmail, location } = buyer;
    return (
      <div className="card card-side bg-base-100 shadow-xl mt-4">
        <figure>
          <img src={buyerImage} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Order Mobile: {productName}</h2>
          <div>
            <p>
              <strong>Buyer Name:</strong> {buyerName}
            </p>
            <p>
              <strong>Email:</strong> {buyerEmail}
            </p>
            <p>
              <strong>Meet Location:</strong> {location}
            </p>
          </div>
        </div>
      </div>
    );
};

export default BuyerCard;