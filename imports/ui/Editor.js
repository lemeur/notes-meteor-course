import React from 'react';
import {Meteor} from 'meteor/meteor';
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
  handleOnChangeBody(e) {
    const element = e.target;
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  handleOnChangeTitle(e) {
    const element = e.target;
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} onChange={this.handleOnChangeTitle.bind(this)}/>
          <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleOnChangeBody.bind(this)}></textarea>
          <button>Delete note</button>
        </div>
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
      note: Notes.findOne({_id: selectedNoteId}),
      call: Meteor.call
  }
},
Editor);
