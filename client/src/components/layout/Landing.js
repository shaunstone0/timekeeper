import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
      <section className='landing'>
        <div className='inner-landing m-center'>
          <div className='landing-register p-1'>
            <div className=' landing-info bold py'>
              <ion-icon name='information-circle-outline' /> What is Time Keeper
            </div>
            <p className='px'>
              Timekeeper is a web application that gives employers and their
              employees feedback on hours worked, and is a useful tool for Human
              Resources specialists.
            </p>
            <div className='new-user-reg'>
              <div className='bold py new-user-reg-icon'>
                <ion-icon name='person-add' />
                For New Employees
              </div>
              <div>
                Please Register Below to access a new profile, and to clock in
                for work. Your profile provides weekly, monthly and yearly
                information on how much you work!
              </div>
              <Link to='/register' className='btn'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
