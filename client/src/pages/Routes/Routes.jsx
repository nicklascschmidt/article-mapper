import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchTitles from '../SearchTitles/SearchTitles.jsx';
import ConfirmTitles from '../ConfirmTitles/ConfirmTitles.jsx';
import MapView from '../MapView/MapView.jsx';
import RerouteWrapper from './RerouteWrapper.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route path='/map'>
        <RerouteWrapper>
          <MapView />
        </RerouteWrapper>
      </Route>

      <Route path='/confirm'>
        <RerouteWrapper>
          <ConfirmTitles />
        </RerouteWrapper>
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
