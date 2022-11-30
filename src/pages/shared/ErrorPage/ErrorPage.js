import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../../assets/notfound.jpg'
const ErrorPage = () => {
    return (
      <div className="flex justify-center content-center">
        <div className="w-2/5 h-[60vh] mt-8">
                <img src={error} className="full" alt="" />
                <p>Please back to <Link to='/' className='underline text-blue-600 font-semibold'>Home page</Link></p>
        </div>
      </div>
    );
};

export default ErrorPage;