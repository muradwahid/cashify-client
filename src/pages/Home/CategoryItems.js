import React from 'react';
import Button from '../component/Button/Button';
const CategoryItems = ({phone}) => {
    const {image,categoryId} = phone;
    return (
      <div className="card card-compact bg-base-100 shadow-xl relative">
        <figure>
          <img className="w-[200px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <div className="card-actions justify-end absolute bottom-[10px]">
            <Button
              bg={"blue-600"}
              text={"white"}
              route={`/phones/${categoryId}`}
            >
              Browse Phones
            </Button>
          </div>
        </div>
      </div>
    );
};

export default CategoryItems;