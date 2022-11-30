import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({bg,text,route,children}) => {
    return (
      <Link to={route}>
        <button
          className={`bg-${bg} py-2 px-4 rounded-xl text-[18px] font-semibold text-${text}`}
        >
          {children}
        </button>
      </Link>
    );
};

export default Button;