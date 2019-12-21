import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='logo'>
          <Link to='/'>
            <ion-icon name='stopwatch' />
            <span className='bold'>Time</span>Keeper
          </Link>
        </div>
        <ul>
          <Link to='/register'>
            <li>
              <ion-icon name='person-add' />
              Register
            </li>
          </Link>
          <Link to='/login'>
            <li>
              <ion-icon name='log-in' />
              Login
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
