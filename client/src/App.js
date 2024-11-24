import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth'

import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import Dashboard from './components/layout/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CreateProfile from './components/profile-forms/CreateProfile';

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
          <section className='container'>
          <Alert />
          <Routes>
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="dashboard" element={<Dashboard />} />
              <Route exact path="create-profile" element={<CreateProfile/>} />
            </Route>
          </Routes>
          </section>
        </Fragment>
      </Router >
    </Provider>
  )
};

export default App;
