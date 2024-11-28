import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileItem from "./ProfileItem";
import { Spinner } from "../layout/Spinner";

const Profiles = ({
   profile: { profiles, loading },
   auth: { user },
   getProfiles,
}) => {
   useEffect(() => {
      getProfiles();
   }, []);

   return (
      <Fragment>
         {!loading ? (
            <Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                  <i className="fab fa-connectdevelop"></i> Browse and connect
                  with developers
               </p>
               <div className="profiles">
                  {profiles.length > 0 ? (
                     profiles.map((profile) => (
                        //    if (user != null && user._id === profile.user._id) {
                        //       return <Fragment></Fragment>;
                        //    } else {
                        //       return (
                        //          <ProfileItem
                        //             profile={profile}
                        //             key={profile._id}
                        //          />
                        //       );
                        //    }
                        // })
                        <ProfileItem profile={profile} key={profile._id} />
                     ))
                  ) : (
                     <h4>No Profiles Found</h4>
                  )}
               </div>
            </Fragment>
         ) : (
            <Spinner />
         )}
      </Fragment>
   );
};

Profiles.propTypes = {
   profile: PropTypes.object.isRequired,
   getProfiles: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
