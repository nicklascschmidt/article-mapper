import React from 'react';
import { Switch, Route } from "react-router-dom";

import Main from '../Main/Main.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route path='/new-tab'>
        <div>this is the new tab you just opened</div>
      </Route>

      {/* This will fallback */}
      <Route path='/'>
        <Main />
      </Route>
    </Switch>
  );
}

export default Routes;
