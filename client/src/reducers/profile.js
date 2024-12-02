import {
   CLEAR_PROFILE,
   GET_PROIFLE,
   PROFILE_ERROR,
   GET_PROFILES,
   GET_REPOS,
} from "../actions/types";

const initialState = {
   profile: null, //for current profile (personal and others)
   profiles: [], //to use when fecting all profiles
   loading: true,
   repos: [], //to use for fetching repos of profile currently viewing
   error: null,
};

export default function (state = initialState, action) {
   const { type, payload } = action;

   switch (type) {
      case GET_PROIFLE:
         return { ...state, profile: payload, loading: false };
      case GET_PROFILES:
         return { ...state, profiles: payload, loading: false };
      case GET_REPOS:
         return { ...state, repos: payload, loading: false };
      case PROFILE_ERROR:
         return { ...state, error: payload, loading: false };
      case CLEAR_PROFILE:
         return { ...state, profile: null, repos: [], loading: false };
      default:
         return state;
   }
}
