import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Landing } from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth'

import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

//Routes replaced Switch in react-router-dom v6



const App = () => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, [localStorage.token]);

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
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
            </Routes>
          </section>
        </Fragment>
      </Router >
    </Provider>
  )
};

export default App;
