import {
   GET_POSTS,
   GET_POST,
   POST_ERROR,
   CREATE_COMMENT,
   CREATE_POST,
   DELETE_COMMENT,
   DELETE_POST,
   LIKE_POST,
   UNLIKE_POST,
   CLEAR_POST,
} from "./types";
import axios from "axios";
import setAlert from "./alert";

export const getPosts = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/posts");

      dispatch({ type: GET_POSTS, payload: res.data });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getPostById = (postId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/posts/${postId}`);

      dispatch({ type: GET_POST, payload: res.data });
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const createPost = (formData) => async (dispatch) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const body = JSON.stringify({ text: formData });

      const res = await axios.post("/api/posts", body, config);
      dispatch({ type: CREATE_POST, payload: res.data });
      dispatch(setAlert("Post Created", "success"));
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const deletePost = (postId) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/posts/${postId}`);
      dispatch({ type: DELETE_POST, payload: { postId } });
      dispatch(setAlert("Post Deleted", "success"));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const createComment = (data, postId) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   try {
      const body = JSON.stringify({ text: data });

      const res = await axios.post(
         "/api/posts/comment/" + postId,
         body,
         config
      );

      dispatch({
         type: CREATE_COMMENT,
         payload: { postId, post: res.data },
      });
      dispatch(setAlert("Comment Created", "success"));
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
   try {
      const res = await axios.delete(
         `/api/posts/comment/${postId}/${commentId}`
      );
      dispatch({
         type: DELETE_COMMENT,
         payload: { postId, comments: res.data },
      });
      dispatch(setAlert("Comment Deleted", "success"));
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const likePost = (postId) => async (dispatch) => {
   try {
      const res = await axios.post(`/api/posts/like/${postId}`);
      if (!res.data.msg) {
         dispatch({ type: LIKE_POST, payload: { postId, likes: res.data } });
      }
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const unlikePost = (postId) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/posts/unlike/${postId}`);
      if (!res.data.msg) {
         dispatch({ type: UNLIKE_POST, payload: { postId, likes: res.data } });
      }
   } catch (err) {
      dispatch({
         type: POST_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};
