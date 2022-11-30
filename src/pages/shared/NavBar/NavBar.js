import React, { useContext, useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { AuthContext } from '../../../contexts/AuthProvider';
import useSeller from '../../../hooks/useSeller';
import Loading from '../Loading/Loading';
const NavBar = () => {
   const [open, setOpen] = useState(true);
  const { user, logOut } = useContext(AuthContext);
  const [role, sellerLoading] = useSeller(user?.email)
  const { seller, buyer, admin } = role;
  if (sellerLoading) {
    return <Loading/>
  }
   return (
     <nav className="bg-blue-700 ">
       <div className="w-4/5 mx-auto flex justify-between items-center py-8">
         <div className="flex items-center gap-4 md:text-[30px] text-[20px]">
           <NavLink to="/">
             <p className="font-mono text-4xl text-white">CASHIFY</p>
           </NavLink>
         </div>
         <div className="lg:hidden" onClick={() => setOpen(!open)}>
           {open ? (
             <Bars3Icon className="h-8" />
           ) : (
             <XMarkIcon className="h-8" />
           )}
         </div>
         <div
           className={`flex items-center gap-8  absolute left-0 text-center text-lg lg:static ${
             !open ? "top-[80px] flex-col gap-2 py-6 w-full bg-blue-600" : "top-[-200px]"
           } text-gray-700 text-xl font-semibold`}
         >
           <NavLink className="text-white hover:text-blue-400" to="/">
             Home
           </NavLink>
           <NavLink className="text-white hover:text-blue-400" to="/blog">
             Blog
           </NavLink>
           {seller ? (
             <>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/addproduct"
               >
                 Add Product
               </NavLink>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/myproduct"
               >
                 My Product
               </NavLink>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/mybuyers"
               >
                 My Buyers
               </NavLink>
             </>
           ) : null}
           {buyer && (
             <>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/myorders"
               >
                 My Orders
               </NavLink>
             </>
           )}
           {admin && (
             <>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/allseller"
               >
                 All Seller
               </NavLink>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/allbuyer"
               >
                 All Buyer
               </NavLink>
             </>
           )}

           {!user?.uid ? (
             <>
               <NavLink className="text-white hover:text-blue-400" to="/login">
                 Login
               </NavLink>
               <NavLink
                 className="text-white hover:text-blue-400"
                 to="/register"
               >
                 Register
               </NavLink>
             </>
           ) : (
             <NavLink
               onClick={logOut}
               className="text-white hover:text-blue-400"
             >
               Logout
             </NavLink>
           )}
           {user?.uid && (
             <NavLink className="flex gap-4 items-center text-white">
               {user?.displayName}
               <div
                 className="tooltip tooltip-bottom "
                 data-tip={user?.displayName}
               >
                 {user?.photoURL ? (
                   <img
                     className="rounded-full h-10 w-10"
                     src={user.photoURL}
                     alt=""
                   />
                 ) : (
                   <CiUser className="rounded-full h-8 w-8 bg-cyan-500" />
                 )}
               </div>
             </NavLink>
           )}
         </div>
       </div>
     </nav>
   );
};

export default NavBar;