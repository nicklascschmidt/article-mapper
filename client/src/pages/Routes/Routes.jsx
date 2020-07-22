import React from 'react';
import { Switch, Route } from "react-router-dom";

import Main from '../Main/Main.jsx';
import ConfirmTitles from '../ConfirmTitles/ConfirmTitles.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route path='/confirm-titles'>
        <ConfirmTitles />
      </Route>

      {/* This will fallback */}
      <Route path='/'>
        <Main />
      </Route>
    </Switch>
  );
}

export default Routes;
