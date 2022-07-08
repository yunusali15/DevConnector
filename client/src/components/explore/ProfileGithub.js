import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { getRepos } from "../../actions/profile";
import { connect } from "react-redux";

const ProfileGithub = ({ profile: { repos }, getRepos, username }) => {
   useEffect(() => {
      getRepos(username);
   }, [getRepos]);

   return (
      <Fragment>
         {repos.map((repo) => (
            <div className="repo bg-white p-1 my-1">
               <div>
                  <h4>
                     <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        Repo One
                     </a>
                  </h4>
                  <p>{repo.description}</p>
               </div>
               <div>
                  <ul>
                     <li className="badge badge-primary">
                        Stars: {repo.stargazers_count}
                     </li>
                     <li className="badge badge-dark">
                        Watchers: {repo.watchers_count}
                     </li>
                     <li className="badge badge-light">
                        Forks: {repo.forks_count}
                     </li>
                  </ul>
               </div>
            </div>
         ))}
      </Fragment>
   );
};

ProfileGithub.propTypes = {
   profile: PropTypes.object.isRequired,
   getRepos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
   profile: state.profile,
});

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
