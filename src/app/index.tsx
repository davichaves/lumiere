/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { SignInPage } from './containers/SignInPage/Loadable';
import { SignUpPage } from './containers/SignUpPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Lumiere" defaultTitle="React Boilerplate">
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
