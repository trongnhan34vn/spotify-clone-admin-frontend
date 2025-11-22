import React from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="text-center pt-24">
        <img className="mb-4 w-28 h-28 mx-auto" src="images/page-not-found.svg" alt="" />
        <p className="text-4xl mb-8">404 Not Found</p>
        <Button
          onClick={() => navigate('/dashboard')}
          className="!w-1/7"
          label="Back to Dashboard"
        />
      </div>
    </div>
  );
};

export default NotFound;
