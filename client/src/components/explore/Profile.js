import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRepos, getUserProfile } from "../../actions/profile";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import Moment from "react-moment";
import ProfileGithub from "./ProfileGithub";
import { getChatByUserId, createChat } from "../../actions/chat";
// import Modal from "@mui/material/Modal";

const Profile = ({
   getUserProfile,
   getRepos,
   getChatByUserId,
   createChat,
   chat: { chat },
   profile: { profile, loading, repos },
   auth: { user },
}) => {
   const id = useParams("id").id;

   useEffect(() => {
      getUserProfile(id);
      getChatByUserId(id);
   }, [getUserProfile, id]);

   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);
   const [formData, setFormData] = useState("");

   const onChange = (e) => setFormData(e.target.value);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formData) {
         createChat({ userId: id, text: formData });
         getChatByUserId(id);
         navigate("/chat");
      }
   };

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
                  {id !== user._id ? (
                     chat === null ? (
                        <button
                           onClick={() => setOpenModal(!openModal)}
                           style={{ float: "right" }}
                           className="btn btn-light">
                           Send Chat
                        </button>
                     ) : (
                        <Link
                           to={`/chat`}
                           style={{ float: "right" }}
                           className="btn btn-light">
                           Go to Chat
                        </Link>
                     )
                  ) : (
                     <></>
                  )}

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
                        {profile.website && (
                           <Link to={profile.website} className="icons my-1">
                              <i
                                 className="fas fa-globe fa-2x"
                                 style={{ color: "white" }}></i>
                           </Link>
                        )}
                        {profile.social && profile.social.twitter && (
                           <Link
                              to={profile.social.twitter}
                              className="icons my-1"
                              rel="noopener noreferrer">
                              <i className="fab fa-twitter fa-2x"></i>
                           </Link>
                        )}
                        {profile.social && profile.social.facebook && (
                           <Link
                              to={profile.social.facebook}
                              className="icons my-1"
                              rel="noopener noreferrer">
                              <i className="fab fa-facebook fa-2x"></i>
                           </Link>
                        )}
                        {profile.social && profile.social.youtube && (
                           <Link
                              to={profile.social.youtube}
                              className="icons my-1"
                              rel="noopener noreferrer">
                              <i className="fab fa-youtube fa-2x"></i>
                           </Link>
                        )}
                        {profile.social && profile.social.instagram && (
                           <Link
                              to={profile.social.instagram}
                              className="icons my-1"
                              rel="noopener noreferrer">
                              <i className="fab fa-instagram fa-2x"></i>
                           </Link>
                        )}
                        {profile.social && profile.social.linkedin && (
                           <Link
                              to={profile.social.linkedin}
                              className="icons my-1"
                              rel="noopener noreferrer">
                              <i className="fab fa-linkedin fa-2x"></i>
                           </Link>
                        )}
                     </div>
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
                  <modal
                     className={
                        openModal ? "chat-modal-open" : "chat-modal-close"
                     }>
                     <button
                        onClick={() => {
                           setOpenModal(!openModal);
                           setFormData("");
                        }}
                        style={{
                           backgroundColor: "inherit",
                           color: "#17a2b8",
                           margin: "10px",
                           padding: "5px",
                           alignSelf: "flex-end",
                           height: "10%",
                        }}>
                        <i class="fa-solid fa-xmark"></i>
                     </button>
                     <h3 className="text-dark">Send a text to start a chat!</h3>
                     <form
                        className="form m-2"
                        style={{
                           display: "flex",
                           flexDirection: "row",
                           flexWrap: "nowrap",
                        }}
                        onSubmit={(e) => handleSubmit(e)}>
                        <input
                           name="text"
                           placeholder="Hello..."
                           style={{ marginRight: "20px" }}
                           value={formData}
                           onChange={(e) => onChange(e)}
                           required></input>
                        <button
                           type="submit"
                           style={{
                              float: "right",
                              padding: "8px",
                              borderRadius: "10px",
                              alignItems: "start",
                           }}
                           className="my">
                           Send
                        </button>
                     </form>
                  </modal>
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
   chat: PropTypes.object.isRequired,
   getUserProfile: PropTypes.func.isRequired,
   createChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   chat: state.chat,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getUserProfile,
   getChatByUserId,
   createChat,
})(Profile);
