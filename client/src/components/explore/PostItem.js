import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { createComment, deleteComment, getPostById } from "../../actions/post";
import { connect } from "react-redux";
import { Spinner } from "../layout/Spinner";
import Moment from "react-moment";

const PostItem = ({
   post: { post, loading },
   auth: { user },
   getPostById,
   createComment,
   deleteComment,
}) => {
   const postId = useParams("id").id;

   useEffect(() => {
      getPostById(postId);
   }, [getPostById, createComment, deleteComment, postId]);

   const [formData, setFormData] = useState("");

   const onSubmit = async (e) => {
      createComment(formData, postId);
      setFormData("");
      e.preventDefault();
   };

   const onChange = (e) => setFormData(e.target.value);

   return (
      <Fragment className="container">
         <Link to="/posts" className="btn">
            Back To Posts
         </Link>
         {!loading && post ? (
            <Fragment>
               <div className="post bg-white p-1 my-1">
                  <div>
                     <Link to={`/profiles/${post.user}`}>
                        <img className="round-img" src={post.avatar} alt="" />
                        <h4>{post.name}</h4>
                     </Link>
                  </div>
                  <div>
                     <p className="my-1">{post.text}</p>
                  </div>
               </div>

               <div className="post-form">
                  <div className="bg-primary p">
                     <h3>Leave a Comment</h3>
                  </div>
                  <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                     <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
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
               <div className="comments">
                  {post.comments.length > 0 ? (
                     post.comments.map((comment) => (
                        <div
                           className="post bg-white p-1 my-1"
                           key={comment._id}>
                           <div>
                              <Link to={`/profile/${comment.user}`}>
                                 <img
                                    className="round-img"
                                    src={comment.avatar}
                                    alt=""
                                 />
                                 <h4></h4>
                              </Link>
                           </div>
                           <div>
                              <p className="my-1">{comment.text}</p>
                              <p className="post-date">
                                 Posted on{" "}
                                 <Moment format="DD/MM/YY">
                                    {comment.date}
                                 </Moment>
                              </p>
                              {comment.user === user._id ? (
                                 <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                       deleteComment(post._id, comment._id)
                                    }>
                                    <i className="fas fa-times"></i>
                                 </button>
                              ) : (
                                 <></>
                              )}
                           </div>
                        </div>
                     ))
                  ) : (
                     <Fragment></Fragment>
                  )}
               </div>
            </Fragment>
         ) : (
            <Spinner />
         )}
      </Fragment>
   );
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   getPostById: PropTypes.func.isRequired,
   createComment: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   post: state.post,
   auth: state.auth,
});

export default connect(mapStateToProps, {
   getPostById,
   createComment,
   deleteComment,
})(PostItem);
