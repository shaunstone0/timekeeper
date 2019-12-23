import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Login from '../auth/Login';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <div className='dashboard-header'>
          <i class='fas fa-home' /> Welcome <i class='fas fa-angle-right' />
          {'  '}
          Login
        </div>
        <div className='landing-grid'>
          <article className='card landing-box'>
            <div className='bold landing-header'>For New Employees</div>
            <div className='my-1 landing-desc'>
              Please register for a new account. This will give you access to a
              new profile, so your employer can access your information. and you
              will be able to log your hours for the day. The Dashboard gives
              you access to your weekly, monthly, and yearly hours worked, and
              gives you a calandar for the year to plan vacation days and days
              off! Your profile provides weekly, monthly and yearly information
              on how much you work!
              <p className='bold my'>Need Direct Deposit?</p>
              <p>
                No problem! inside your profile you can enter your bank
                information safely and securely.
              </p>
            </div>
            <Link to='/register' className='btn'>
              Register
            </Link>
          </article>
          <article className='card landing-box'>
            <div>
              <Login />
            </div>
          </article>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
