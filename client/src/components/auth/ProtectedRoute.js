import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from '../auth/Login'

const ProtectedRoute = ({ isAuthenticated, loading, children }) => {
    // isAuthenticated ? (<Navigate to={path} element={element}/>) : (<Navigate to="/" replace={true}/>);
    return (isAuthenticated && !loading)? (children ? children : <Outlet/>) : <Navigate push to="/login"/>


}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
});

export default connect(mapStateToProps)(ProtectedRoute);