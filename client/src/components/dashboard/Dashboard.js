import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='dashboard-header'> Dashboard</div>
      {loading || !profile ? (
        <Fragment>No Profile</Fragment>
      ) : (
        <Fragment>
          <div className='body-div'>
            <div className='flex'>
              <div className='avatar'>
                <img src={user.avatar} alt='avatar' />
              </div>
              <div className='dashboard-body'>
                <div className='dashboard-name'>
                  {user.firstname} {user.lastname}
                </div>
                <div className='dashboard-email flex align-center flex-wrap email-flex'>
                  <i className='far fa-envelope'></i>
                  <Link to={'mailto:' + user.email}>{user.email}</Link>
                  <i className='fas fa-car'></i>
                  <span className='email-span'>
                    {profile.driver.car === 'yes' ? (
                      <Fragment>
                        <i className='fas fa-check success'></i>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <i className='fas fa-times not-success'></i>
                      </Fragment>
                    )}
                  </span>
                  <i class='fas fa-id-card'></i>
                  <span className='email-span'>
                    {profile.driver.license === 'yes' ? (
                      <Fragment>
                        <i className='fas fa-check success'></i>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <i className='fas fa-times not-success'></i>
                      </Fragment>
                    )}
                  </span>
                </div>
                <DashboardActions />
              </div>
            </div>
            <div className='dashboard-info'>
              <div className='flex p-2 justify-between flex-wrap info-flex'>
                <div className='flex align-center info-box'>
                  <div>
                    <i className='fas fa-hourglass'></i>
                  </div>
                  <div className='info'>
                    <span className='info-header bold'>
                      Hours Worked (Week)
                    </span>
                    <p className='info-info'>36 Hours</p>
                  </div>
                </div>
                <div className='info-box flex align-center'>
                  <div>
                    <i className='fas fa-history'></i>
                  </div>
                  <div className='info'>
                    <span className='info-header bold'>Overtime</span>
                    <p className='info-info'>10 Hours</p>
                  </div>
                </div>
                <div className='info-box flex align-center'>
                  <div>
                    <i className='fas fa-plane-departure'></i>
                  </div>
                  <div className='info'>
                    <span className='info-header bold'>Leave Time</span>
                    <p className='info-info'>26 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
