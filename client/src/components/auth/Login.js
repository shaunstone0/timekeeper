import React, { Fragment, useState } from 'react';

const Login = () => {
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
    console.log('Success');
  };
  return (
    <Fragment>
      <div className='form-container p-2 m-center'>
        <div className='m-center'>
          <h1>Login to View Your TimeKeeper Profile</h1>
          <p className='lead'>
            <ion-icon name='person' /> Your Login Informaton
          </p>

          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label>Email *</label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label>Password*</label>
              <input
                type='password'
                name='password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <button type='submit' className='btn'>
              Login
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
