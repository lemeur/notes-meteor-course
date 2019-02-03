import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';

export const NoteList = (props) => {
  return (
    <div>
    <NoteListHeader />
    NoteList {props.notes.length}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer( () => {
  // a reactive function (like a tracker autorun)
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch(),
  }
},
NoteList);
