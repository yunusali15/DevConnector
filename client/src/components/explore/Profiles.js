import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import {
   getCurrentProfile,
   getProfiles,
   deleteConnection,
   addConnection,
} from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "../layout/Spinner";

const Profiles = ({
   profile: { profiles, loading },
   auth: { user },
   getProfiles,
   getCurrentProfile,
   deleteConnection,
   addConnection,
}) => {
   useEffect(() => {
      getProfiles();
      getCurrentProfile();
   }, [getProfiles, getCurrentProfile, deleteConnection, addConnection]);

   return (
      <Fragment>
         <section className="container">
            {!loading ? (
               <Fragment>
                  <h1 className="large text-primary">Developers</h1>
                  <p className="lead">
                     <i className="fab fa-connectdevelop"></i> Browse and
                     connect with developers
                  </p>
                  <div className="profiles">
                     {profiles && profiles.length > 0 ? (
                        profiles.map((profile) => (
                           <div className="profile bg-light" key={profile._id}>
                              <img
                                 className="round-img"
                                 src={profile.user.avatar}
                                 alt=""
                              />
                              <div>
                                 <h2>{profile.user.name}</h2>
                                 <p className="my-1">{profile.status}</p>
                                 <p className="my-1">
                                    {profile.location && (
                                       <span>{profile.location}</span>
                                    )}{" "}
                                 </p>
                                 <Link
                                    replace
                                    to={`/profiles/${profile.user._id}`}
                                    className="btn btn-primary">
                                    View Profile
                                 </Link>
                                 {user !== null &&
                                 user._id !== profile.user._id ? (
                                    profile.connections &&
                                    profile.connections.find(
                                       (myConnection) =>
                                          myConnection.user === user._id
                                    ) === undefined ? (
                                       <button
                                          onClick={() => {
                                             addConnection(profile.user._id);
                                          }}
                                          className="btn btn-primary">
                                          {" "}
                                          {console.log(
                                             JSON.stringify(profile.user)
                                          )}
                                          Connect
                                       </button>
                                    ) : (
                                       <button
                                          onClick={() => {
                                             deleteConnection(profile.user._id);
                                          }}
                                          className="btn btn-danger">
                                          Remove Connection
                                       </button>
                                    )
                                 ) : (
                                    <></>
                                 )}
                              </div>
                              <ul>
                                 {profile.skills.map((skill, index) => (
                                    <li className="text-primary" key={index}>
                                       <i className="fas fa-check"></i> {skill}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        ))
                     ) : (
                        <h4>No Profiles Found</h4>
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

Profiles.propTypes = {
   profile: PropTypes.object.isRequired,
   getProfiles: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   addConnection: PropTypes.func.isRequired,
   deleteConnection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getProfiles,
   getCurrentProfile,
   deleteConnection,
   addConnection,
})(Profiles);
