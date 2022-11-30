import React from 'react';

const Loading = () => {
    return (
      <div className="flex justify-center items-center">
        <progress className="progress w-56 bg-red-700"></progress>
      </div>
    );
};

export default Loading;