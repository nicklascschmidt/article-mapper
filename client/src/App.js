import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from './pages/Layout/Layout.jsx';

const AppWithRouter = () => (
  <Router>
    <Layout />
  </Router>
)

export default () => (
  <Provider store={store}>
    <AppWithRouter />
  </Provider>
);
