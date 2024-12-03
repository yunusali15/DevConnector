import axios from "axios";
import setAlert from "./alert";
import {
   GET_PROIFLE,
   PROFILE_ERROR,
   UPDATE_PROFILE,
   DELETE_ACCOUNT,
   GET_PROFILES,
   CLEAR_PROFILE,
   GET_REPOS,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/profiles/me");
      dispatch({ type: GET_PROIFLE, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getProfiles = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/profiles");
      dispatch({ type: GET_PROFILES, payload: res.data });

      dispatch({ type: CLEAR_PROFILE });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getUserProfile = (userId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profiles/user/${userId}`);
      dispatch({ type: GET_PROIFLE, payload: res.data });
      getRepos(res.data.githubusername);
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getRepos = (username) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/profiles/github/${username}`);
      dispatch({ type: GET_REPOS, payload: res.data });
   } catch (err) {
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const createProfile =
   (formData, navigate, edit = false) =>
   async (dispatch) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const res = await axios.post("/api/profiles", formData, config);

         dispatch({ type: GET_PROIFLE, payload: res.data });

         dispatch(
            setAlert(edit ? "Profile Updated" : "Profile Created", "success")
         );
         navigate("/dashboard");
      } catch (err) {
         const errors = err.response.data.errors;

         if (errors) {
            errors.forEach((error) => {
               dispatch(setAlert(error.msg, "danger"));
            });
         }
         dispatch({
            type: PROFILE_ERROR,
            payload: {
               status: err.response.status,
               msg: err.response.statusText,
            },
         });
      }
   };

export const addExperience = (formData, navigate) => async (dispatch) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const res = await axios.put("/api/profiles/experience", formData, config);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert("Experience Added Sucessfully!", "success"));
      navigate("/dashboard");
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
   try {
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const res = await axios.put("/api/profiles/education", formData, config);

      dispatch({ type: UPDATE_PROFILE, payload: res.data });

      dispatch(setAlert("Education Added Sucessfully!", "success"));
      navigate("/dashboard");
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const deleteExperience = (id) => async (dispatch) => {
   try {
      if (
         window.confirm(
            "Are you sure you want to delete this Experience Credential?"
         )
      ) {
         const res = await axios.delete("/api/profiles/experience/" + id);

         window.location.reload();
         dispatch({ type: UPDATE_PROFILE, payload: res.data });
         dispatch(setAlert("Experience Deleted Sucessfully!", "success"));
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const deleteEducation = (id) => async (dispatch) => {
   try {
      if (
         window.confirm(
            "Are you sure you want to delete this Education Credential?"
         )
      ) {
         const res = await axios.delete(`/api/profiles/education/${id}`);
         dispatch({ type: UPDATE_PROFILE, payload: res.data });

         window.location.reload();
         dispatch(setAlert("Education Deleted Sucessfully!", "success"));
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const deleteAccount = (navigate) => async (dispatch) => {
   try {
      if (
         window.confirm(
            "This Action cannot undone. Are you sure you want to delete your account?"
         )
      ) {
         const res = await axios.delete(`/api/profiles/`);
         dispatch({ type: DELETE_ACCOUNT, payload: res.data });

         dispatch(setAlert("Account Deleted Sucessfully!", "success"));
         navigate("/");
      }
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => {
            dispatch(setAlert(error.msg, "danger"));
         });
      }
      dispatch({
         type: PROFILE_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};
