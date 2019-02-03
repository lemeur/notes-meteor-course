import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {
  handleClick =() => {
    props.meteorCall('notes.insert');
  }
  return (
    <div>
    NoteListHeader
    <button onClick={this.handleClick}>Create Note</button>
    </div>
  );
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default createContainer( () => {
  return {
    meteorCall: Meteor.call,
  }
},
NoteListHeader);
