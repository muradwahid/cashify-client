import React from 'react';
import Button from '../component/Button/Button';

const Banner = () => {
    return (
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-700 h-[50vh] flex justify-center items-center text-center">
        <div>
          <h2 className="text-4xl font-bold text-white">Sell Your Old Phone</h2>
          <p className="text-xl text-white font-semibold my-3">
            Sell old mobiles and get money instantly.
          </p>
          <Button bg={"white"} text={"blue-600"} route="/addproduct">
            Sell Now
          </Button>
        </div>
      </div>
    );
};

export default Banner;