import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Notes} from '../api/notes';


export class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    }
  }

  render() {
    if (this.props.note) {
      return (
        <p>Got the note</p>
      );
    } else {
      return (
        <p>{this.props.selectedNoteId?'Note note found':'Select a note to gest started'}</p>
      );
    }
  }
}

Editor.propTypes = {
   selectedNoteId: PropTypes.string,
   note: PropTypes.object
}

export default createContainer( () => {
  // a reactive function (like a tracker autorun)
  const selectedNoteId = Session.get('selectedNoteId');

  return {
      selectedNoteId,
      note: Notes.findOne({_id: selectedNoteId})
  }
},
Editor);
