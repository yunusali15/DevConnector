import {
   CREATE_COMMENT,
   DELETE_COMMENT,
   DELETE_POST,
   GET_POST,
   GET_POSTS,
   LIKE_POST,
   PROFILE_ERROR,
   UNLIKE_POST,
   CLEAR_POST,
   CREATE_POST,
} from "../actions/types";

const initialState = {
   post: null,
   posts: [],
   loading: true,
   error: null,
};

export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_POSTS:
         return { ...state, posts: payload, loading: false };
      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter((post) => post._id !== payload.postId),
            loading: false,
         };
      case CREATE_POST:
         return { ...state, posts: [...state.posts, payload], loading: false };
      case GET_POST:
         return { ...state, post: payload, loading: false };
      case CREATE_COMMENT:
         return {
            ...state,
            post: payload.post,
            loading: false,
         };
      case DELETE_COMMENT:
         return {
            ...state,
            posts: state.posts.map((post) =>
               post._id === payload.postId
                  ? { ...post, comments: payload.comments }
                  : post
            ),
            loading: false,
         };
      case LIKE_POST:
      case UNLIKE_POST:
         return {
            ...state,
            posts: state.posts.map((post) =>
               post._id === payload.postId
                  ? { ...post, likes: payload.likes }
                  : post
            ),
            loading: false,
         };
      case CLEAR_POST:
         return { ...state, post: null, loading: false };
      case PROFILE_ERROR:
         return { ...state, error: payload, loading: false };
      default:
         return state;
   }
}
