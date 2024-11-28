import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const { email, password } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
   }

   const onSubmit = async (e) => {
      e.preventDefault();
      login(email, password);

      return <Navigate to="/dashboard" />;
      /*try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const user = {
        email,
        password,
      }

      const body = JSON.stringify(user);

      const res = await axios.post('/api/auth', body, config);

      console.log(res.data);

    } catch (err) {
      console.error(err);
    }*/
   };

   return (
      <Fragment>
         <section className="container">
            <h1 className="large text-primary">Log In</h1>
            <p className="lead">
               <i className="fas fa-user"></i> Log In Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
               <div className="form-group">
                  <input
                     type="email"
                     placeholder="Email Address"
                     name="email"
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <input
                  type="submit"
                  className="btn btn-primary"
                  value="Log In"
               />
            </form>
            <p className="my-1">
               Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
         </section>
      </Fragment>
   );
};

Login.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
