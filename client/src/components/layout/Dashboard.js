import React, { Fragment, useEffect, useState } from "react";
import {
   getCurrentProfile,
   deleteEducation,
   deleteExperience,
   deleteAccount,
} from "../../actions/profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spinner } from "./Spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Connections from "../explore/Connections";

const Dashboard = ({
   profile: { loading, profile },
   auth: { user },
   getCurrentProfile,
   deleteEducation,
   deleteExperience,
   deleteAccount,
}) => {
   useEffect(() => {
      getCurrentProfile();
   }, []);

   const [showConnections, setShowConnections] = useState(false);

   const navigate = useNavigate();

   return user === null || loading ? (
      <Spinner />
   ) : (
      <Fragment>
         <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
               <i className="fas fa-user"></i> Welcome {user.name}{" "}
            </p>
            {profile != null ? (
               <Fragment>
                  <Link to="/edit-profile" className="btn btn-light">
                     <i className="fas fa-user-circle text-primary"></i> Edit
                     Profile
                  </Link>
                  <Link to="/add-experience" className="btn btn-light">
                     <i className="fab fa-black-tie text-primary"></i> Add
                     Experience
                  </Link>
                  <Link to="/add-education" className="btn btn-light">
                     <i className="fas fa-graduation-cap text-primary"></i> Add
                     Education
                  </Link>
                  <button
                     className="btn btn-light"
                     type="button"
                     onClick={() => {
                        setShowConnections(!showConnections);
                     }}>
                     <i className="fa-solid fa-circle-nodes text-primary"></i>{" "}
                     My Connections{" "}
                     {showConnections ? (
                        <i className="fa-solid fa-angle-up"></i>
                     ) : (
                        <i className="fa-solid fa-angle-down"></i>
                     )}
                  </button>
                  {!showConnections ? (
                     <div>
                        {profile.experience.length > 0 ? (
                           <Fragment>
                              <h2 className="my-2">Experience Credentials</h2>
                              <table className="table">
                                 <thead>
                                    <tr>
                                       <th>Company</th>
                                       <th className="hide-sm">Title</th>
                                       <th className="hide-sm">Years</th>
                                       <th></th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {profile.experience.map((exp) => {
                                       return (
                                          <tr key={exp._id}>
                                             <td>{exp.company}</td>
                                             <td className="hide-sm">
                                                {exp.title}
                                             </td>
                                             <td className="hide-sm">
                                                <Moment format="MMM YYYY">
                                                   {exp.from}
                                                </Moment>{" "}
                                                -{" "}
                                                {exp.to === null ? (
                                                   "Now"
                                                ) : (
                                                   <Moment format="MMM YYYY">
                                                      {exp.to}
                                                   </Moment>
                                                )}
                                             </td>
                                             <td>
                                                <button
                                                   className="btn btn-danger"
                                                   onClick={() =>
                                                      deleteExperience(exp._id)
                                                   }>
                                                   Delete
                                                </button>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                           </Fragment>
                        ) : (
                           <Fragment></Fragment>
                        )}
                        {profile.education.length > 0 ? (
                           <Fragment>
                              <h2 className="my-2">Education Credentials</h2>
                              <table className="table">
                                 <thead>
                                    <tr>
                                       <th>School</th>
                                       <th className="hide-sm">Degree</th>
                                       <th className="hide-sm">Years</th>
                                       <th />
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {profile.education.map((edu) => {
                                       return (
                                          <tr key={edu._id}>
                                             <td>{edu.school}</td>
                                             <td className="hide-sm">
                                                {edu.degree}
                                             </td>
                                             <td className="hide-sm">
                                                <Moment format="MMM YYYY">
                                                   {edu.from}
                                                </Moment>{" "}
                                                -{" "}
                                                {edu.to === null ? (
                                                   "Now"
                                                ) : (
                                                   <Moment format="MMM YYYY">
                                                      {edu.to}
                                                   </Moment>
                                                )}
                                             </td>
                                             <td>
                                                <button
                                                   className="btn btn-danger"
                                                   onClick={() =>
                                                      deleteEducation(edu._id)
                                                   }>
                                                   Delete
                                                </button>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </table>
                           </Fragment>
                        ) : (
                           <Fragment></Fragment>
                        )}

                        <div className="my-2">
                           <button
                              className="btn btn-danger"
                              onClick={() => deleteAccount(navigate)}>
                              <i className="fas fa-user-minus"></i> Delete My
                              Account
                           </button>
                        </div>
                     </div>
                  ) : (
                     <Connections myId={user._id} />
                  )}
               </Fragment>
            ) : (
               <Fragment>
                  <p>Create a Profile to let others know more about you!</p>
                  <Link to="/create-profile" className="btn btn-primary my-1">
                     Create Profile
                  </Link>
               </Fragment>
            )}
         </section>
      </Fragment>
   );
};

Dashboard.propTypes = {
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   deleteEducation: PropTypes.func.isRequired,
   deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
});

export default connect(mapStateToProps, {
   getCurrentProfile,
   deleteEducation,
   deleteExperience,
   deleteAccount,
})(Dashboard);
