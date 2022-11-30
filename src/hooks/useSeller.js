import { useEffect, useState } from "react";


const useSeller = (email) => {
    const [role, setSeller] = useState(false);
    const [sellerLoading,setSellerLoading]=useState(true)
      useEffect(() => {
        fetch(`http://localhost:5000/users/${email}`)
          .then((res) => res.json())
          .then((data) => {
            setSeller({seller:data.isSeller,buyer:data.isBuyer,admin:data.isAdmin})
              setSellerLoading(false)
          });
      }, [email]);
    
    return [role, sellerLoading];
};

export default useSeller;