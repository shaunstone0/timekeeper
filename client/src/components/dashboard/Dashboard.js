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
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='dashboard-header'> Dashboard</div>
      <section className='card dashboard-card'>
        <div className='dash-component-body flex'>
          <div></div>
          <div className='dash-user-name'>
            {user && user.firstname + ' ' + user.lastname}
            <div className='dash-component-details'>
              <i className='far fa-envelope' /> {user && user.email}
            </div>
          </div>
        </div>
      </section>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Link to={`/profile/${profile._id}`}> Profile </Link>
        </Fragment>
      ) : (
        <Fragment>
          <p>You Have not yet Set up a profile</p>
          <Link to='/create-profile'>Create Profile</Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
