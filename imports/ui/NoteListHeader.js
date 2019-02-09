import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
  handleClick =() => {
    props.meteorCall('notes.insert', (err, res) => {
      if (res) {
        // res holds the created note Id
        props.Session.set('selectedNoteId', res);
      }
    });
  }
  return (
    <div>
    NoteListHeader
    <button onClick={this.handleClick}>Create Note</button>
    </div>
  );
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
}

export default createContainer( () => {
  return {
    meteorCall: Meteor.call,
    Session
  }
},
NoteListHeader);
