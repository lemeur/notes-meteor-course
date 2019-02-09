import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import PropTypes from 'prop-types';

import {Notes} from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
  renderNoteListItems = function() {
      if (props.notes.length > 0) {
        return props.notes.map( (note) => {
          return <NoteListItem key={note._id} note={note} />;
        });
      } else {
        return <NoteListEmptyItem />;
      }

  }
  return (
    <div className="item-list">
    <NoteListHeader />
    {renderNoteListItems()}
    NoteList {props.notes.length}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default createContainer( () => {
    // Reactive to Session.get and Collection subscriptions
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, { sort: { updatedAt: -1 } }).fetch().map((note) => {
      return {...note,
             selected: note._id === selectedNoteId
           }
    } ),
  }
},
NoteList);
