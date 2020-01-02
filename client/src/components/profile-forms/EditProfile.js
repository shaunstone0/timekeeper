import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
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

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      gender: loading || !profile.gender ? '' : profile.gender,
      nationality: loading || !profile.nationality ? '' : profile.nationality,
      phone: loading || !profile.phone ? '' : profile.phone,
      street: loading || !profile.address.street ? '' : profile.address.street,
      city: loading || !profile.address.city ? '' : profile.address.city,
      state: loading || !profile.address.state ? '' : profile.address.state,
      zip: loading || !profile.address.zip ? '' : profile.address.zip,
      license: loading || !profile.driver.license ? '' : profile.driver.license,
      car: loading || !profile.driver.car ? '' : profile.driver.car
    });
  }, [
    loading,
    getCurrentProfile,
    profile.address.city,
    profile.address.state,
    profile.address.street,
    profile.address.zip,
    profile.driver.car,
    profile.driver.license,
    profile.gender,
    profile.nationality,
    profile.phone
  ]);

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
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className='dashboard-card card'>
        <div className='form-container m-center'>
          <div className='dash-form-header-big'>
            <h1>Employee Profile</h1>
            <small>Update your Employee Profile</small>
            <i className='fas fa-user-cog'></i>
          </div>
          <div className='dashboard-form-header1'>
            <i className='fab fa-buffer'></i> Employee Personal Information
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
              <i className='fas fa-phone-alt'></i>

              <input
                type='text'
                name='phone'
                value={phone}
                placeholder='+123456789'
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <i className='fas fa-flag'></i>
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
            <div className='profile-address'>
              <div className='dashboard-form-header'>
                <i className='far fa-address-card'></i> Employee Address
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  name='street'
                  value={street}
                  placeholder='Street'
                  onChange={e => onChange(e)}
                  required
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
            <div className='button-area'>
              <button type='submit' className='btn dash-profile-btn'>
                Submit Changes
              </button>
              <Link className='btn-dark btn' to='/dashboard'>
                Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
