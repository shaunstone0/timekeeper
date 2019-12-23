import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../img/icons/logo.svg';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <a onClick={logout} href='#!'>
        <li>Logout</li>
      </a>
    </ul>
  );

  const guestLinks = (
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
  );

  return (
    <div>
      <nav className='navbar'>
        <div className='logo'>
          <Link to='/'>
            <span className='bold'>Time</span>Keeper
            <img src={logo} alt='logo' />
          </Link>
        </div>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};

Navbar.protoTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
