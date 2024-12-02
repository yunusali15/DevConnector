import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
   createPost,
   deletePost,
   getPosts,
   likePost,
   unlikePost,
} from "../../actions/post";
import { Spinner } from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const Posts = ({
   post: { posts, loading },
   auth: { user },
   getPosts,
   createPost,
   deletePost,
   likePost,
   unlikePost,
}) => {
   useEffect(() => {
      getPosts();
   }, [getPosts, createPost, deletePost, likePost, unlikePost]);

   const [formData, setFormData] = useState("");

   const onSubmit = async (e) => {
      e.preventDefault();
      if (formData) {
         createPost(formData);
         setFormData("");
      }
   };

   const onChange = (e) => setFormData(e.target.value);

   return (
      <Fragment className="container">
         <h1 className="large text-primary">Posts</h1>
         <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
         </p>
         <div className="post-form">
            <div className="bg-primary p">
               <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
               <textarea
                  name="text"
                  cols="30"
                  rows="5"
                  placeholder="Create a post"
                  value={formData}
                  onChange={(e) => onChange(e)}
                  required></textarea>
               <input
                  type="submit"
                  className="btn btn-dark my-1"
                  value="Submit"
               />
            </form>
         </div>
         {!loading ? (
            posts.length > 0 ? (
               posts.map((post) => (
                  <Fragment key={post._id}>
                     <div className="posts">
                        <div className="post bg-white p-1 my-1">
                           <div>
                              <Link to={`/profiles/${post.user}`}>
                                 <img
                                    className="round-img"
                                    src={post.avatar}
                                    alt=""
                                 />
                                 <h4>{post.name}</h4>
                              </Link>
                           </div>
                           <div>
                              <p className="my-1">{post.text}</p>
                              <p className="post-date">
                                 Posted on{" "}
                                 <Moment format="DD/MM/YY">{post.date}</Moment>
                              </p>
                              <button
                                 type="button"
                                 className="btn btn-light"
                                 onClick={() => likePost(post._id)}>
                                 <i className="fas fa-thumbs-up"></i>
                                 <span>
                                    {post.likes && post.likes.length > 0
                                       ? post.likes.length
                                       : "0"}
                                 </span>
                              </button>
                              <button
                                 type="button"
                                 className="btn btn-light"
                                 onClick={() => unlikePost(post._id)}>
                                 <i className="fas fa-thumbs-down"></i>
                              </button>
                              <Link
                                 to={`${post._id}`}
                                 className="btn btn-primary">
                                 Discussion{" "}
                                 <span className="comment-count">
                                    {post.comments.length}
                                 </span>
                              </Link>
                              {post.user === user._id ? (
                                 <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => deletePost(post._id)}>
                                    <i className="fas fa-times"></i>
                                 </button>
                              ) : (
                                 <></>
                              )}
                           </div>
                        </div>
                     </div>
                  </Fragment>
               ))
            ) : (
               <h4>No Posts Found!</h4>
            )
         ) : (
            <Spinner />
         )}
      </Fragment>
   );
};

Posts.propTypes = {
   post: PropTypes.object.isRequired,
   getPosts: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   post: state.post,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getPosts,
   createPost,
   deletePost,
   likePost,
   unlikePost,
})(Posts);
