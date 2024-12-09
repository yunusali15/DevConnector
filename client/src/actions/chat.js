import axios from "axios";
import {
   GET_CHATS,
   GET_CHAT,
   DELETE_CHAT,
   UPDATE_CHAT,
   CHAT_ERROR,
   CREATE_CHAT,
   SET_LOADING,
} from "./types";
import setAlert from "./alert";

export const getChats = () => async (dispatch) => {
   try {
      const res = await axios.get("/api/chats");

      dispatch({ type: GET_CHATS, payload: res.data });
   } catch (err) {
      dispatch({
         type: CHAT_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getChat = (chatId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/chats/${chatId}`);

      dispatch({ type: GET_CHAT, payload: res.data });
   } catch (err) {
      dispatch({
         type: CHAT_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const getChatByUserId = (userId) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/chats/user/${userId}`);

      dispatch({ type: GET_CHAT, payload: res.data });
   } catch (err) {
      dispatch({
         type: CHAT_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const createChat =
   ({ userId, text }) =>
   async (dispatch) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify({ text });

         const res = await axios.post(`/api/chats/${userId}`, body, config);
         dispatch({ type: CREATE_CHAT, payload: res.data });
         //    dispatch(setAlert("Chat Created", "success"));
      } catch (err) {
         const errors = err.response.data.errors;

         if (errors) {
            errors.forEach((error) => {
               dispatch(setAlert(error.msg, "danger"));
            });
         }
         dispatch({
            type: CHAT_ERROR,
            payload: {
               status: err.response.status,
               msg: err.response.statusText,
            },
         });
      }
   };

export const deleteChat = (userId) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/posts/${userId}`);
      dispatch({ type: DELETE_CHAT, payload: { userId } });
      dispatch(setAlert("Chat Deleted", "success"));
   } catch (err) {
      dispatch({
         type: CHAT_ERROR,
         payload: {
            status: err.response.status,
            msg: err.response.statusText,
         },
      });
   }
};

export const updateChat =
   ({ chatId, text }) =>
   async (dispatch) => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
            },
         };

         const body = JSON.stringify({ text });

         const res = await axios.put(`/api/chats/${chatId}`, body, config);
         dispatch({
            type: UPDATE_CHAT,
            payload: { chatId: chatId, data: res.data },
         });
         //    dispatch(setAlert("Chat Created", "success"));
      } catch (err) {
         const errors = err.response.data.errors;

         if (errors) {
            errors.forEach((error) => {
               dispatch(setAlert(error.msg, "danger"));
            });
         }
         dispatch({
            type: CHAT_ERROR,
            payload: {
               status: err.response.status,
               msg: err.response.statusText,
            },
         });
      }
   };
