import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation }) => {
   const [formData, setFormData] = useState({
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
   });

   const [toDateDisabled, setToDateDisabled] = useState(false);

   const { school, degree, fieldOfStudy, from, to, current, description } =
      formData;

   const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const navigate = useNavigate();

   const onSubmit = (e) => {
      e.preventDefault();
      addEducation(formData, navigate);
   };

   return (
      <Fragment>
         <section className="container">
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
               <i className="fas fa-graduation-cap"></i> Add any school,
               bootcamp, etc that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
               <div className="form-group">
                  <input
                     type="text"
                     placeholder="* School or Bootcamp"
                     name="school"
                     value={school}
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     placeholder="* Degree or Certificate"
                     name="degree"
                     value={degree}
                     required
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     placeholder="Field Of Study"
                     name="fieldofstudy"
                     value={fieldOfStudy}
                     onChange={(e) => onChange(e)}
                  />
               </div>
               <div className="form-group">
                  <h4>From Date</h4>
                  <input
                     type="date"
                     name="from"
                     onChange={(e) => onChange(e)}
                     required
                  />
               </div>
               <div className="form-group">
                  <p>
                     <input
                        type="checkbox"
                        name="current"
                        value={current}
                        onChange={() => {
                           setFormData({ ...formData, current: !current });
                           setToDateDisabled(!toDateDisabled);
                        }}
                     />{" "}
                     Current School or Bootcamp
                  </p>
               </div>
               <div className="form-group">
                  <h4>To Date</h4>
                  <input
                     type="date"
                     name="to"
                     value={to}
                     onChange={(e) => onChange(e)}
                     disabled={toDateDisabled}
                  />
               </div>
               <div className="form-group">
                  <textarea
                     name="description"
                     cols="30"
                     rows="5"
                     value={description}
                     placeholder="Program Description"
                     onChange={(e) => onChange(e)}></textarea>
               </div>
               <input type="submit" className="btn btn-primary my-1" />
               <Link className="btn btn-light my-1" to="/dashboard">
                  Go Back
               </Link>
            </form>
         </section>
      </Fragment>
   );
};

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
