import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const NoteListEmptyItem = () => {
  return (
      <p className="empty-item" >Create a new note to begin</p>
  );
}

export default NoteListEmptyItem;
