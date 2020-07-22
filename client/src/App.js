import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Layout from './pages/Layout/Layout.jsx';


const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
