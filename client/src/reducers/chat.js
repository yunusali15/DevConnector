import {
   CHAT_ERROR,
   CREATE_CHAT,
   DELETE_CHAT,
   GET_CHAT,
   GET_CHATS,
   UPDATE_CHAT,
} from "../actions/types";

const initialState = {
   chats: [],
   chat: null,
   loading: true,
   error: null,
};

export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_CHATS:
         return { ...state, chats: payload, loading: false };
      case GET_CHAT:
         return { ...state, chat: payload, loading: false };
      case UPDATE_CHAT:
         return {
            ...state,
            chats: state.chats.map((chat) =>
               chat.id === payload.chatId ? payload.data : chat
            ),
            chat: payload.data,
         };
      case CREATE_CHAT:
         return {
            ...state,
            chat: payload,
         };
      case DELETE_CHAT:
         return {
            ...state,
            chats: state.chats.filter((chat) => chat.id !== payload.chatId),
         };
      case CHAT_ERROR:
         return { ...state, error: payload, chat: null, loading: false };
      default:
         return state;
   }
}
