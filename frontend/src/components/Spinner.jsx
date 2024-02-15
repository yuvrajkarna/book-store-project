import React from 'react';

const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
      <p className='text-gray-700'>Loading...</p>
    </div>
  );
};

export default Spinner;
