import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardActions = () => {
  return (
    <div>
      <Link to='/edit-profile'>
        <button className='btn'>Edit Profile</button>
      </Link>
    </div>
  );
};

export default DashboardActions;
