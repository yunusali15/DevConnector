import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
   const loggedinLinks = (
      <ul>
         <li>
            <Link to="/profiles">
               <span className="hide-sm">Developers</span>
            </Link>
         </li>
         <li>
            <Link to="/posts">
               <span className="hide-sm">Posts</span>
            </Link>
         </li>
         <li>
            <Link to="/dashboard">
               <i className="fas fa-profile"></i>
               {}
               <span className="hide-sm">Dashboard</span>
            </Link>
         </li>
         <li>
            <Link onClick={logout} to="#!">
               <i className="fas fa-sign-out-alt"></i>
               {}
               <span className="hide-sm">Logout</span>
            </Link>
         </li>
      </ul>
   );

   const guestLinks = (
      <ul>
         <li>
            <Link to="/profiles">Developers</Link>
         </li>
         <li>
            <Link to="/register">Register</Link>
         </li>
         <li>
            <Link to="/login">Login</Link>
         </li>
      </ul>
   );

   return (
      <nav className="navbar bg-dark">
         <h1>
            <Link to="/">
               <i className="fas fa-code"></i> DevConnector
            </Link>
         </h1>
         {!loading && (
            <Fragment>{isAuthenticated ? loggedinLinks : guestLinks}</Fragment>
         )}
      </nav>
   );
};

Navbar.propTypes = {
   auth: PropTypes.object.isRequired,
   logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
