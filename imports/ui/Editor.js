import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

import React from 'react';
import Modal from 'react-modal';
import { browserHistory } from 'react-router';

import PropTypes from 'prop-types';

import {Notes} from '../api/notes';


export class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      modalIsOpen: false
    }
  }

  handleOnChangeBody(e) {
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update', this.props.note._id, {body});

  }

  handleOnChangeTitle(e) {
    const title = e.target.value
    this.setState({title});
    this.props.call('notes.update', this.props.note._id, {title});
  }

  handleDeleteNote(e) {
      this.props.call('notes.remove', this.props.note._id);
      this.props.browserHistory.push(`/dashboard`);
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
  componentWillMount() {
          Modal.setAppElement(this.props.modalRootElement);
  }
  stopPropagation(event) {
   event.stopPropagation();
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} onChange={this.handleOnChangeTitle.bind(this)} placeholder="Your title here"/>
          <textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleOnChangeBody.bind(this)}></textarea>
          <div>
            <button id="intentDelete" className="button button--secondary" onClick={this.props.handleModalOpen.bind(this)}>Delete note</button>
          </div>

          <Modal
            isOpen={this.state.modalIsOpen}
            contentLabel="DeleteNote"
            className="boxed-view__box"
            onRequestClose={this.stopPropagation.bind(this)}
            overlayClassName="boxed-view boxed-view__modal">
            <h1>Do you really want to delete the note ?</h1>
            <form className="boxed-view__form">
              <button id="confirmDelete" className="button" onClick={this.handleDeleteNote.bind(this)}>Delete</button>
              <button type="button" className="button button--secondary" onClick={this.props.handleModalClose.bind(this)}>Cancel</button>
            </form>
          </Modal>


        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message" >{this.props.selectedNoteId?'Note not found':'Select a note to get started'}</p>
        </div>
      );
    }
  }
}

Editor.propTypes = {
   selectedNoteId: PropTypes.string,
   note: PropTypes.object,
   call: PropTypes.func.isRequired,
   browserHistory: PropTypes.object.isRequired,
   handleModalOpen: PropTypes.func.isRequired,
   handleModalClose: PropTypes.func.isRequired,
   modalRootElement: PropTypes.string.isRequired
}

export default createContainer( () => {
  // a reactive function (like a tracker autorun)
  const selectedNoteId = Session.get('selectedNoteId');

  return {
      selectedNoteId,
      note: Notes.findOne({_id: selectedNoteId}),
      call: Meteor.call,
      browserHistory: browserHistory,
      handleModalOpen: function() {
        this.setState(
          {
            ...this.state,
            modalIsOpen: true,
          });
      },
      handleModalClose: function() {
        this.setState(
          {
            ...this.state,
            modalIsOpen: false,
          });
      },
      modalRootElement: 'body'
  }
},
Editor);
