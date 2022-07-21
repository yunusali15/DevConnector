import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/layout/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddEducation from "./components/profile-forms/AddEducation";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from "./components/explore/Profiles";
import Profile from "./components/explore/Profile";
import Posts from "./components/explore/Posts";
import PostItem from "./components/explore/PostItem";
import Connections from "./components/explore/Connections";
import Chat from "./components/explore/Chat";

//Routes replaced Switch in react-router-dom v6

if (localStorage.token) {
   setAuthToken(localStorage.token);
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser());
   }, []);

   return (
      <Provider store={store}>
         <Router>
            <Fragment>
               <Navbar />
               <Routes>
                  <Route exact path="/" element={<Landing />} />
               </Routes>
               <Alert />
               <Routes>
                  {/* <Route exact path="/" element={<Landing />} /> */}
                  <Route exact path="register" element={<Register />} />
                  <Route exact path="login" element={<Login />} />
                  <Route exact path="profiles" element={<Profiles />} />
                  <Route element={<ProtectedRoute />}>
                     <Route exact path="dashboard" element={<Dashboard />} />
                     <Route
                        exact
                        path="create-profile"
                        element={<CreateProfile />}
                     />
                     <Route
                        exact
                        path="edit-profile"
                        element={<EditProfile />}
                     />
                     <Route
                        exact
                        path="add-education"
                        element={<AddEducation />}
                     />
                     <Route
                        exact
                        path="add-Experience"
                        element={<AddExperience />}
                     />
                     <Route
                        exact
                        path="connections/:id"
                        element={<Connections />}
                     />
                     <Route exact path="chat" element={<Chat />} />
                     <Route exact path="profiles/:id" element={<Profile />} />
                     <Route exact path="posts" element={<Posts />} />
                     <Route path="posts/:id" element={<PostItem />} />
                  </Route>
               </Routes>
            </Fragment>
         </Router>
      </Provider>
   );
};

export default App;
