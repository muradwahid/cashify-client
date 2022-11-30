import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm()
  const post_date=new Date()
  const navigate = useNavigate()
  const handleAddProduct = (data) => {
    const seller = user.displayName;
    const name = data.productname;
    const resale_price = data.resaleprice;
    const condition = data.condition;
    const phone = data.number;
    const original_price = data.originalprice;
    const purchase_year = data.purchaseyear;
    const used = data.usetime;
    const categoryId = data.category;
    const location = data.location;
    const image = data.image[0];

     const formData = new FormData();
     formData.append("image", image);
     const url = `https://api.imgbb.com/1/upload?key=684c6274d794de1079ffad375804e558`;
     fetch(url, {
       method: "POST",
       body: formData,
     })
       .then((res) => res.json())
       .then((imgData) => {
         if (imgData.success) {
           console.log(imgData.data.url);
           const phones = {
             image: imgData.data.url,
             email: user.email,
             seller,
             name,
             resale_price,
             condition,
             phone,
             location,
             original_price,
             isVerified: false,
             sold: false,
             purchase_year,
             used,
             post_date,
             categoryId: Number(categoryId),
           };
           fetch(`http://localhost:5000/phones`, {
             method: "POST",
             headers: {
               "content-type": "application/json",
             },
             body: JSON.stringify(phones),
           })
             .then((res) => res.json())
             .then((postData) => {
               if (postData.acknowledged) {
                 toast.success("sccessfully added")
                 navigate("/");
               }
             });
         }
       });
  }


    return (
      <div className="bg-blue-500 flex justify-center py-12">
        <form onSubmit={handleSubmit(handleAddProduct)} className="w-2/5">
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Product Name: </span>
            </label>
            <input
              type="text"
              {...register("productname")}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Upload Image: </span>
            </label>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Your Location: </span>
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Type Your Location"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Resale Price: </span>
            </label>
            <input
              type="text"
              {...register("resaleprice")}
              placeholder="Resale Price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">
                Product Condition:
              </span>
            </label>
            <select
              {...register("condition")}
              className="select select-bordered w-full"
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Mobile Number:</span>
            </label>
            <input
              type="number"
              {...register("number")}
              placeholder="Mobile number"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Original Price:</span>
            </label>
            <input
              type="text"
              {...register("originalprice")}
              placeholder="Original price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Purchase Year</span>
            </label>
            <input
              type="text"
              {...register("purchaseyear")}
              placeholder="Purchase year"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">Used Time:</span>
            </label>
            <input
              type="text"
              {...register("usetime")}
              placeholder="Used time"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="font-semibold text-white">
                Product Category:
              </span>
            </label>
            <select
              {...register("category")}
              className="select select-bordered w-full"
            >
              <option value={1}>Samsung</option>
              <option value={2}>Vivo</option>
              <option value={3}>Xiaomi</option>
            </select>
          </div>
          <input
            type="submit"
            value="Submit"
            className="bg-white w-full my-5 cursor-pointer py-2 px-4 rounded-xl text-[18px] font-semibold text-blue-600"
          />
        </form>
      </div>
    );
};

export default AddProduct;