import { connection } from "mongoose";
import {
   CLEAR_PROFILE,
   GET_PROIFLE,
   PROFILE_ERROR,
   GET_PROFILES,
   GET_REPOS,
   ADD_CONNECTION,
   DELETE_CONNECTION,
   GET_CONNECTIONS,
   CONNECTION_ERROR,
} from "../actions/types";

const initialState = {
   profile: null, //for current profile (personal and others)
   profiles: [], //to use when fecting all profiles
   loading: true,
   connections: [],
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
      case ADD_CONNECTION:
         return {
            ...state,
            profile: payload.data.profile,
            profiles: state.profiles.map((profile) =>
               profile.user._id === payload.userId
                  ? {
                       ...profile,
                       connections: [
                          ...(profile.connections =
                             payload.data.connectedProfile.connections),
                       ],
                    }
                  : profile
            ),
            connections: state.connections.map((connection) =>
               connection.user === payload.userId
                  ? payload.data.connectedProfile
                  : connection
            ),
            loading: false,
         };
      case DELETE_CONNECTION:
         return {
            ...state,
            profile: payload.data.profile,
            profiles: state.profiles.map((profile) =>
               profile.user._id === payload.userId
                  ? {
                       ...profile,
                       connections: [
                          ...(profile.connections =
                             payload.data.connectedProfile.connections),
                       ],
                    }
                  : profile
            ),
            connections: state.connections.map((connection) =>
               connection.user === payload.userId
                  ? payload.data.connectedProfile
                  : connection
            ),
            loading: false,
         };
      case GET_CONNECTIONS:
         return { ...state, connections: payload, loading: false };
      case CLEAR_PROFILE:
         return { ...state, profile: null, repos: [], loading: false };
      default:
         return state;
   }
}
