import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    gender: '',
    nationality: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    license: '',
    car: ''
  });

  const {
    gender,
    nationality,
    phone,
    street,
    city,
    state,
    zip,
    license,
    car
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <div className='dashboard-card card'>
        <div className='form-container m-center'>
          <div className='dash-form-header-big'>
            <h1>Employee Profile</h1>
            <small>Update your Employee Profile</small>
            <i class='fas fa-user-cog'></i>
          </div>
          <div className='dashboard-form-header1'>
            <i class='fab fa-buffer'></i> Employee Personal Information
          </div>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='form-group select-group'>
              <div className='dash-form-label'>Gender?</div>
              <select
                className='gender'
                name='gender'
                value={gender}
                onChange={e => onChange(e)}
              >
                <option value=''>Please Select</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='rns'>Rather Not Say</option>
              </select>
            </div>
            <div className='form-group'>
              <i class='fas fa-phone-alt'></i>

              <input
                type='text'
                name='phone'
                value={phone}
                placeholder='+123456789'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <i class='fas fa-flag'></i>
              <input
                type='text'
                name='nationality'
                value={nationality}
                placeholder='Nationality'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group select-group'>
              <div className='dash-form-label'>Drivers License?</div>
              <select
                className='license'
                name='license'
                value={license}
                onChange={e => onChange(e)}
              >
                <option value=''>Please Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
            </div>
            <div className='form-group select-group'>
              <div className='dash-form-label'>Personal Vehicle?</div>
              <select name='car' value={car} onChange={e => onChange(e)}>
                <option value=''>Please Select</option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </select>
            </div>
            <div class='profile-address'>
              <div className='dashboard-form-header'>
                <i class='far fa-address-card'></i> Employee Address
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='street'
                  value={street}
                  placeholder='Street'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='city'
                  value={city}
                  placeholder='City'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='state'
                  value={state}
                  placeholder='State Full Name'
                  onChange={e => onChange(e)}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='zip'
                  value={zip}
                  placeholder='Zip Code'
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div class='button-area'>
              <button type='submit' className='btn dash-profile-btn'>
                Submit Changes
              </button>
              <button type='submit' className='btn-dark btn dash-profile-btn'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
