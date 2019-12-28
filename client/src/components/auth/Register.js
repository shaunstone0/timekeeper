import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import logo from '../../img/icons/time.svg';

const Register = ({ setAlert, register, isAuthenticated }) => {
  // Set State Hook
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
  });
  // Deconstruct
  const { firstname, lastname, email, password, password2 } = formData;
  // Grab Values from Inputs & Change State
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // OnSubmit Form
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password Not Match', 'danger');
    } else {
      register({
        firstname,
        lastname,
        email,
        password,
        password2
      });
    }
  };

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
          <h1>Register a TimeKeeper Account</h1>

          <form className='form m-center' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                name='firstname'
                value={firstname}
                placeholder='First Name'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                name='lastname'
                value={lastname}
                placeholder='Last Name'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={e => onChange(e)}
              />
              <small className='p m-center'>
                This Website uses Gravatar, so please use an email that is
                associated with a Gravatar. If you dont have one, you can create
                one{' '}
                <a
                  href='http://en.gravatar.com/'
                  target='_blank'
                  rel=' noopener noreferrer'
                >
                  <span className='bold'>here</span>
                </a>
              </small>
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password2'
                value={password2}
                placeholder='Confirm Password'
                onChange={e => onChange(e)}
              />
            </div>
            <button type='submit' className='btn'>
              Sign Up
            </button>
            <div className='have-account text-center'>
              Already have an account?{' '}
              <Link to='/'>
                <span className='bold m'> Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
