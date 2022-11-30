import { useEffect, useState } from 'react';

const useVerify = (email) => {
  const [verify, setVerify] = useState(false);
  const [verifyLoder, setVerifyLoader] = useState(true);
        useEffect(() => {
          fetch(`https://assignment-12-server-gules.vercel.app/verify/${email}`)
            .then((res) => res.json())
            .then((data) => {
              setVerify(data.isVerify);
              setVerifyLoader(false)
            });
        }, [email]);

        return [verify,verifyLoder];
};

export default useVerify;