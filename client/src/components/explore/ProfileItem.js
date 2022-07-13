import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
   return (
      <Fragment className="container">
         <div className="profile bg-light">
            <img className="round-img" src={profile.user.avatar} alt="" />
            <div>
               <h2>{profile.user.name}</h2>
               <p className="my-1">{profile.status}</p>
               <p className="my-1">
                  {profile.location && <span>{profile.location}</span>}{" "}
               </p>
               <Link
                  replace
                  to={`/profiles/${profile.user._id}`}
                  className="btn btn-primary">
                  View Profile
               </Link>
            </div>
            <ul>
               {profile.skills.map((skill, index) => (
                  <li className="text-primary" key={index}>
                     <i className="fas fa-check"></i> {skill}
                  </li>
               ))}
            </ul>
         </div>
      </Fragment>
   );
};

export default ProfileItem;
