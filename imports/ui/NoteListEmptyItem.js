import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const NoteListEmptyItem = () => {
  return (
    <div>
    <h5>You have no notes</h5>
    <p>Create a new note to begin</p>

    </div>
  );
}

export default NoteListEmptyItem;
