import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import setAlert from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = (props) => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
   });

   const { name, email, password, password2 } = formData;

   const onChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const onSubmit = async (e) => {
      e.preventDefault();
      if (password !== password2) {
         // props.setAlert('Passwords do not match', 'danger');
         props.setAlert("Passwords do not match", "danger");
      } else {
         /*try {

        const config = {
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const newUser = {
          name,
          email,
          password,
          password2
        }
        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);

        console.log(res.data);

      } catch (err) {
        console.error(err);
      }*/
         props.register({ name, email, password });
      }
   };

   if (props.isAuthenticated) {
      return <Navigate push to="dashboard" />;
   }

   return (
      <Fragment>
         <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
               <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
               <div className="form-group">
                  <input
                     type="text"
                     placeholder="Name"
                     name="name"
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="email"
                     placeholder="Email Address"
                     name="email"
                     required
                     onChange={(e) => onChange(e)}
                  />
                  <small className="form-text">
                     This site uses Gravatar so if you want a profile image, use
                     a Gravatar email
                  </small>
               </div>
               <div className="form-group">
                  <input
                     type="password"
                     placeholder="Password"
                     name="password"
                     minLength="6"
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="password"
                     placeholder="Confirm Password"
                     name="password2"
                     minLength="6"
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <input
                  type="submit"
                  className="btn btn-primary"
                  value="Register"
               />
            </form>
            <p className="my-1">
               Already have an account? <Link to="/login">Sign In</Link>
            </p>
         </section>
      </Fragment>
   );
};

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
