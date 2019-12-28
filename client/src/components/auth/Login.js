import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import logo from '../../img/icons/time.svg';

const Login = ({ login, isAuthenticated }) => {
  // Set State Hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Deconstruct
  const { email, password } = formData;
  // Grab Values from Inputs & Change State
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // OnSubmit Form
  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='inner-container m-center'>
        <div className='form-container m-center'>
          <div className='text-center login-logo'>
            <span className='bold'>Time</span>Keeper
            <img src={logo} alt='TK logo' />
          </div>
          <h1>
            <i className='fas fa-user-circle' /> Employee Login
          </h1>
          <form className='form m-center' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <button type='submit' className='btn' value='Login'>
              Login
            </button>
          </form>
          <p className='lead sign-up p-1'>
            Are you a new employee, and need a new account to login for your
            first day?
            <Link to='/register'>
              <span className='bold m'>Register</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

login.prototypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
