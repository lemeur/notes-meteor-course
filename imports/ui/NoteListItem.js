import React from 'react';
import moment from 'moment';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

import PropTypes from 'prop-types';

export const NoteListItem =  (props) => {
  const handleClick = function(e) {
    props.Session.set('selectedNoteId', props.note._id);
  }
  const className = props.note.selected? 'item item--selected':'item';
  return (
    <div className={className} onClick={handleClick.bind(this)}>
      <h5 className="item__title" >{props.note.title || 'Untitled note'}</h5>
      <p className="item__subtitle">{moment(props.note.updatedAt).format('DD/MM/YYYY')}</p>
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
