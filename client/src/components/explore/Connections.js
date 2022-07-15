import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
   addConnection,
   getConnections,
   getCurrentProfile,
   deleteConnection,
} from "../../actions/profile";
import { Spinner } from "../layout/Spinner";
import { Link, useParams } from "react-router-dom";

const Connections = ({
   addConnection,
   getConnections,
   getCurrentProfile,
   deleteConnection,
   profile: { profile, connections, loading },
   myId,
}) => {
   let id = useParams("id").id;

   if (!id) {
      id = myId;
   }
   useEffect(() => {
      getConnections(id);
      getCurrentProfile();
      console.log(connections);
   }, [getConnections, getCurrentProfile]);

   return (
      <Fragment>
         <section className="container">
            {loading && profile === null ? (
               <Spinner />
            ) : (
               <Fragment>
                  {myId === undefined ? (
                     <Link to={`/profiles/${id}`} className="btn btn-light">
                        Back To Profile
                     </Link>
                  ) : (
                     <></>
                  )}
                  <div className="connections my-1 ">
                     {profile && connections && connections.length > 0 ? (
                        connections.map((connection) => (
                           <div key={connection.user._id}>
                              <div className="connection bg-light">
                                 <Link to={`/profiles/${connection.user._id}`}>
                                    <img
                                       className="round-img"
                                       src={connection.user.avatar}
                                       alt=""
                                    />
                                 </Link>
                                 <h2>{connection.user.name}</h2>
                                 {profile.user._id !== connection.user._id ? (
                                    profile.connections &&
                                    profile.connections.find(
                                       (myConnection) =>
                                          myConnection.user ===
                                          connection.user._id
                                    ) === undefined ? (
                                       <button
                                          onClick={() => {
                                             addConnection(connection.user._id);
                                          }}
                                          className="btn btn-primary">
                                          Connect
                                       </button>
                                    ) : (
                                       <button
                                          onClick={() => {
                                             deleteConnection(
                                                connection.user._id
                                             );
                                          }}
                                          className="btn btn-primary">
                                          Remove Connection
                                       </button>
                                    )
                                 ) : (
                                    <Fragment></Fragment>
                                 )}
                              </div>
                           </div>
                        ))
                     ) : (
                        <Fragment>No Connections Found</Fragment>
                     )}
                  </div>
               </Fragment>
            )}
         </section>
      </Fragment>
   );
};

Connections.propTypes = {
   profile: PropTypes.object.isRequired,
   getConnections: PropTypes.func.isRequired,
   getCurrentProfile: PropTypes.func.isRequired,
   deleteConnection: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   addConnection: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   addConnection,
   getConnections,
   getCurrentProfile,
   deleteConnection,
})(Connections);
