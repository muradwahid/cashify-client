import React, { useEffect, useState } from 'react';
import CategoryItems from './CategoryItems';

const Category = () => {
    const [phoneCategory, setPhoneCategory] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/category")
        .then(res=>res.json())
            .then(data => {
            setPhoneCategory(data)
        })
    },[])
    return (
      <div className="bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500">
        <div className="w-4/5 mx-auto py-7">
          <h3 className="font-semibold text-xl underline text-white text-center">
            Browse items by category
          </h3>
          <div className="my-12 grid gap-8 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {phoneCategory.map((phone) => (
              <CategoryItems key={phone._id} phone={phone}></CategoryItems>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Category;