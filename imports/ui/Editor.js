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
      title: '',
      body: ''
    }
  }

  handleOnChangeBody(e) {
    const body = e.target.value;
    this.props.call('notes.update', this.props.note._id, {body});
    this.setState({body});
  }

  handleOnChangeTitle(e) {
    const title = e.target.value
    this.props.call('notes.update', this.props.note._id, {title});
    this.setState({title});
  }

  handleDeleteNote(e) {
      this.props.call('notes.remove', this.props.note._id);
      Session.set('selectedNoteId', undefined);
  }

  componentDidUpdate(prevProps, prevState) {
      // Watch changes in this.props.note
      const currentNoteId = this.props.note?this.props.note._id:undefined;
      const prevNoteId = prevProps.note?prevProps.note._id:undefined;
      // If the noteId changed, we reload the State
      if (currentNoteId && currentNoteId !== prevNoteId) {
        this.setState({
          title: this.props.note.title,
          body: this.props.note.body
        });
      }
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.state.title} onChange={this.handleOnChangeTitle.bind(this)}/>
          <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleOnChangeBody.bind(this)}></textarea>
          <button onClick={this.handleDeleteNote.bind(this)}>Delete note</button>
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
