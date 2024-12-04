import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRepos, getUserProfile } from "../../actions/profile";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import Moment from "react-moment";
import ProfileGithub from "./ProfileGithub";
const Profile = ({
   getUserProfile,
   getRepos,
   profile: { profile, loading, repos },
}) => {
   const id = useParams("id").id;

   useEffect(() => {
      getUserProfile(id);
   }, [getUserProfile, id]);

   const navigate = useNavigate();

   return (
      <Fragment>
         <section className="container">
            {!loading && profile ? (
               <Fragment>
                  <Link to={`/profiles`} className="btn btn-light">
                     Back to Profiles
                  </Link>
                  <Link
                     to={`/connections/${id}`}
                     style={{ float: "right" }}
                     className="btn btn-light">
                     View Connections
                  </Link>

                  <div className="profile-grid my-1">
                     <div className="profile-top bg-primary p-2">
                        <img
                           className="round-img my-1"
                           src={profile.user.avatar && profile.user.avatar}
                           alt=""
                        />
                        <h1 className="large">{profile.user.name}</h1>
                        <p className="lead">
                           {profile.status} at {profile.company}
                        </p>
                        {profile.location && <p>{profile.location}</p>}
                        <div className="icons my-1">
                           <i className="fas fa-globe fa-2x"></i>
                        </div>
                     </div>
                  </div>
                  <div className="icons my-1">
                     {profile.website && (
                        <Link to={profile.website}>
                           <i className="fas fa-globe fa-2x"></i>
                        </Link>
                     )}
                     {profile.social && profile.social.twitter && (
                        <Link
                           to={profile.social.twitter}
                           rel="noopener noreferrer">
                           <i className="fab fa-twitter fa-2x"></i>
                        </Link>
                     )}
                     {profile.social && profile.social.facebook && (
                        <Link
                           to={profile.social.facebook}
                           rel="noopener noreferrer">
                           <i className="fab fa-facebook fa-2x"></i>
                        </Link>
                     )}
                     {profile.social && profile.social.youtube && (
                        <Link
                           to={profile.social.youtube}
                           rel="noopener noreferrer">
                           <i className="fab fa-youtube fa-2x"></i>
                        </Link>
                     )}
                     {profile.social && profile.social.instagram && (
                        <Link
                           to={profile.social.instagram}
                           rel="noopener noreferrer">
                           <i className="fab fa-instagram fa-2x"></i>
                        </Link>
                     )}
                     {profile.social && profile.social.linkedin && (
                        <Link
                           to={profile.social.linkedin}
                           rel="noopener noreferrer">
                           <i className="fab fa-linkedin fa-2x"></i>
                        </Link>
                     )}
                  </div>
                  <div className="profile-about bg-light p-2">
                     <h2 className="text-primary">{profile.user.name}'s Bio</h2>
                     <p>{profile.bio}</p>
                     <div className="line"></div>
                     <h2 className="text-primary">Skill Set</h2>
                     <div className="skills">
                        {profile.skills.map((skill, index) => (
                           <div className="p-1" key={index}>
                              <i className="fa fa-check"></i> {skill}
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="profile-exp bg-white p-2">
                     <h2 className="text-primary">Experience</h2>
                     {profile.experiences &&
                        profile.experiences.map((exp) => (
                           <div>
                              <h3 className="text-dark">{exp.company}</h3>
                              <p>
                                 <Moment>{exp.from}</Moment> -{" "}
                                 {exp.to ? (
                                    <Moment>{exp.to}</Moment>
                                 ) : (
                                    "Current"
                                 )}
                              </p>
                              <p>
                                 <strong>Position: </strong>
                                 {exp.title}
                              </p>
                              <p>
                                 <strong>Description: </strong>
                                 {exp.description}
                              </p>
                           </div>
                        ))}
                  </div>

                  <div className="profile-edu bg-white p-2">
                     <h2 className="text-primary">Education</h2>
                     <div>
                        {profile.education &&
                           profile.education.map((edu) => (
                              <div>
                                 <h3 className="text-dark">{edu.school}</h3>
                                 <p>
                                    <Moment>{edu.from}</Moment> -{" "}
                                    {edu.to ? (
                                       <Moment>{edu.to}</Moment>
                                    ) : (
                                       "Current"
                                    )}
                                 </p>
                                 <p>
                                    <strong>Degree: </strong>
                                    {edu.degree}
                                 </p>
                                 <p>
                                    <strong>Field of Study: </strong>
                                    {edu.fieldOfStudy}
                                 </p>
                                 <p>
                                    <strong>Description: </strong>
                                    {edu.description}
                                 </p>
                              </div>
                           ))}
                     </div>
                  </div>
                  <div className="profile-github">
                     <h2 className="text-primary my-1">
                        <i className="fab fa-github"></i> Github Repos
                     </h2>
                     {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                     )}
                  </div>
               </Fragment>
            ) : (
               <Spinner />
            )}
         </section>
      </Fragment>
   );
};

Profile.prototypes = {
   profile: PropTypes.object.isRequired,
   getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { getUserProfile })(Profile);
