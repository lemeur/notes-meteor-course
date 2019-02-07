import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory } from 'react-router';
import {Session} from 'meteor/session';

import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unAuthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace('/dashboard');
  }
}
const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  }
}

const onEnterNotePage = (nextState) => {
  if (!Meteor.userId()) {
    browserHistory.replace('/');
  } else {
    Session.set('selectedNoteId', nextState.params.id)
    //console.log(nextState);
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  //console.log('isAuthentcated:',isAuthenticated, ' on ',pathName);
  const isUnauthenticatedPage = unAuthenticatedPages.includes(pathName);
  const isAthenticatedPage = authenticatedPages.includes(pathName);
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/dashboard');
  }
  else if (isAthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
}

export const globalOnChange = (previousState, nextState) => {
  //debugger;
  globalOnEnter(nextState)
}
export const globalOnEnter = (nextState) => {
  const lastRoute = nextState.routes[nextState.routes.length - 1]; // Remove the "Global" first index route
  Session.set('currentPagePrivacy',lastRoute.privacy); // 'auth', 'unauth' or undefined
}
export const routes = (
  <Router history={browserHistory}>
    <Route onEnter={globalOnEnter} onChange={globalOnChange}>
      <Route path="/" component={Login} privacy="unauth"  onEnter={onEnterPublicPage}/>
      <Route path="/signup" component={Signup} privacy="unauth" onEnter={onEnterPublicPage}/>
      <Route path="/dashboard" component={Dashboard} privacy="auth" onEnter={onEnterPrivatePage}/>
      <Route path="/dashboard/:id" component={Dashboard} privacy="auth" onEnter={onEnterNotePage}/>
      <Route path="*" component={NotFound}/>
    </Route>

  </Router>
);
