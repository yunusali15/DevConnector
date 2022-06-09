import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';

import { Provider } from 'react-redux';
import store from './store';

//Routes replaced Switch in react-router-dom v6

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
        <section className='container'>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router >
  </Provider>
);

export default App;
