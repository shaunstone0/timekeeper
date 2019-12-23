import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import Time from '../../img/icons/time.svg';

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
      <div className='form-container p-2 m-center'>
        <div className='left-side-register'>
          <img src={Time} alt='time-icon' />
        </div>
        <div>
          <h1>Register a TimeKeeper Account</h1>
          <p className='lead'>
            <ion-icon name='person-add' /> Your Login Informaton
          </p>

          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label>First Name*</label>
              <input
                type='text'
                name='firstname'
                value={firstname}
                onChange={e => onChange(e)}
              />
              <label>Last Name*</label>
              <input
                type='text'
                name='lastname'
                value={lastname}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label>Email *</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
              <small className='my p'>
                This Website uses Gravatar, so please use an email that is
                associated with a Gravatar. If you dont have one, you can create
                one <Link to='http://en.gravatar.com/'>here</Link>
              </small>
            </div>
            <div className='form-group'>
              <label>Password*</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
              <label>Confirm Password*</label>
              <input
                type='password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <button type='submit' className='btn'>
              Sign Up
            </button>
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
