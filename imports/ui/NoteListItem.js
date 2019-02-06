import React from 'react';
import moment from 'moment';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

import PropTypes from 'prop-types';

export const NoteListItem =  (props) => {
  return (
    <div onClick={() => {props.Session.set('selectedNoteId', props.note._id)} } >
      <h5>{props.note.title || 'Untitled note'}</h5>
      { props.note.selected? 'selected':undefined }
      <p>{moment(props.note.updatedAt).format('DD/MM/YYYY')}</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired
};

export default createContainer(() => {
  return {
    Session,
    selected: false
  }
},  NoteListItem);
