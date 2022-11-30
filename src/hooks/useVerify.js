import { useEffect, useState } from 'react';

const useVerify = (email) => {
  const [verify, setVerify] = useState(false);
  const [verifyLoder, setVerifyLoader] = useState(true);
        useEffect(() => {
          fetch(`http://localhost:5000/verify/${email}`)
            .then((res) => res.json())
            .then((data) => {
              setVerify(data.isVerify);
              setVerifyLoader(false)
            });
        }, [email]);

        return [verify,verifyLoder];
};

export default useVerify;