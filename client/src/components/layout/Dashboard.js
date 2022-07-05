import React, { Fragment, useEffect } from 'react'
import { getCurrentProfile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Spinner } from './Spinner';
import { Link, Navigate } from 'react-router-dom';

const Dashboard = ({ profile: { loading, profile }, auth: { user }, getCurrentProfile }) => {

    useEffect(() => {
        getCurrentProfile();
    }, []);


    return profile === null && loading ? (<Spinner />) :
        (<Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user.name} </p>
            {profile != null ? <h3>Cool</h3> :
                <Fragment>
                    <p>Create a Profile to let others know more about you!</p>
                    <Link to='/create-profile'className='btn btn-primary my-1'>Create Profile</Link>
                </Fragment>
            }
        </Fragment>);
}

Dashboard.propTypes = ({
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired

});

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);