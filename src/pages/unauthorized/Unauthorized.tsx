import React from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className='text-center pt-24'>
        <img className="mb-4 mx-auto" src="images/unauthorized.svg" alt="" />
        <p className="text-4xl mb-8">401 Unauthorized</p>
        <Button onClick={() => navigate('/')} className='!w-1/7' label='Back to Sign In' />
      </div>
    </div>
  );
};

export default Unauthorized;
