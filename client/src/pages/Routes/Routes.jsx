import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Welcome from '../Welcome/Welcome';
import RerouteWrapper from './RerouteWrapper';
import Loading from '../Alt/Loading';
import ErrorBoundary from '../Alt/ErrorBoundary';

// Lazy load each page. To test, return a Promise w setTimeout
const LazySearchTitles = lazy(() => import('../SearchTitles/SearchTitles'));
const LazyConfirmTitles = lazy(() => import('../ConfirmTitles/ConfirmTitles'));
const LazyMapView = lazy(() => import('../MapView/MapView'));

const Routes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={Loading}>
        <Switch>
          <Route path='/map'>
            <RerouteWrapper>
              <LazyMapView />
            </RerouteWrapper>
          </Route>

          <Route path='/confirm'>
            <RerouteWrapper>
              <LazyConfirmTitles />
            </RerouteWrapper>
          </Route>

          <Route path='/search'>
            <LazySearchTitles />
          </Route>

          {/* This path will fallback */}
          <Route path='/'>
            <Welcome />
          </Route>
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
}

export default Routes;
