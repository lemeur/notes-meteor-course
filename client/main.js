import { Meteor } from 'meteor/meteor';
import ReactDom from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import { browserHistory } from 'react-router';

import {routes, onAuthChange} from './../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';


Tracker.autorun( () => {
  const isAuthenticated = !!Meteor.userId(); // True if not null or empty
  const currentPagePrivacy = Session.get('currentPagePrivacy');
  console.log('page privacy:',currentPagePrivacy);

  onAuthChange(isAuthenticated);
});

Tracker.autorun( () => {
  // When selectedNoteId changes, update the URL
  const selectedNoteId = Session.get('selectedNoteId');

  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/${selectedNoteId}`);
  }
});


Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDom.render(routes,document.getElementById('app'));
});
