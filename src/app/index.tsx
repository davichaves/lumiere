/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './containers/HomePage/Loadable';
import { SignInPage } from './containers/SignInPage/Loadable';
import { SignUpPage } from './containers/SignUpPage/Loadable';
import { CheckoutPage } from './containers/CheckoutPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      )
    }
  />
);

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !Cookies.get('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export function App() {
  return (
    <>
      <Helmet titleTemplate="%s - Lumiere" defaultTitle="React Boilerplate">
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthRoute exact path="/signin" component={SignInPage} />
        <AuthRoute exact path="/signup" component={SignUpPage} />
        <PrivateRoute exact path="/:blob/checkout" component={CheckoutPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </>
  );
}
