import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchTitles from '../SearchTitles/SearchTitles.jsx';
import MapView from '../MapView/MapView.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route path='/map'>
        <MapView />
      </Route>

      <Route path='/search'>
        <SearchTitles />
      </Route>

      {/* This will fallback */}
      <Route path='/'>
        <SearchTitles />
      </Route>
    </Switch>
  );
}

export default Routes;
