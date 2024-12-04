import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deleteConnection, addConnection } from "../../actions/profile";
import { Spinner } from "../layout/Spinner";
import setAlert from "../../actions/alert";

const ProfileItem = ({
   pulbicProfile,
   profile: { profile, loading },
   deleteConnection,
   addConnection,
}) => {
   const navigate = useNavigate();
   return (
      <Fragment>
         {loading ? (
            <Spinner />
         ) : (
            <div className="profile bg-light">
               <img
                  className="round-img"
                  src={pulbicProfile.user.avatar}
                  alt=""
               />
               <div>
                  <h2>{pulbicProfile.user.name}</h2>
                  <p className="my-1">{pulbicProfile.status}</p>
                  <p className="my-1">
                     {pulbicProfile.location && (
                        <span>{pulbicProfile.location}</span>
                     )}{" "}
                  </p>
                  <Link
                     replace
                     to={`/profiles/${pulbicProfile.user._id}`}
                     className="btn btn-primary">
                     View Profile
                  </Link>
                  {!loading &&
                  profile !== null &&
                  profile.user._id !== pulbicProfile.user._id ? (
                     pulbicProfile.connections &&
                     pulbicProfile.connections.find(
                        (myConnection) => myConnection.user === profile.user._id
                     ) === undefined ? (
                        <button
                           onClick={() => {
                              navigate(0);
                              addConnection(pulbicProfile.user._id);
                           }}
                           className="btn btn-primary">
                           Connect
                        </button>
                     ) : (
                        <button
                           onClick={() => {
                              navigate(0);
                              deleteConnection(pulbicProfile.user._id);
                              setAlert(
                                 "User removed to Connections",
                                 "success"
                              );
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
                  {pulbicProfile.skills.map((skill, index) => (
                     <li className="text-primary" key={index}>
                        <i className="fas fa-check"></i> {skill}
                     </li>
                  ))}
               </ul>
            </div>
         )}
      </Fragment>
   );
};

ProfileItem.propTypes = {
   deleteConnection: PropTypes.func.isRequired,
   addConnection: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { deleteConnection, addConnection })(
   ProfileItem
);
