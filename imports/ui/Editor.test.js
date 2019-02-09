import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {Editor} from './Editor';
import {notes} from '../fixtures/fixtures';
//import {Notes} from '../api/notes';

if (Meteor.isClient) {
  describe('Editor', function() {
    let browserHistory;
    let call;

    beforeEach(function() {
        call = expect.createSpy();
        browserHistory = {
          push: expect.createSpy()
        };
    });

    it('should display "Note not found" if unknown seletedNoteId', function() {
      //const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      const unknownNoteId = 'unknownNoteId';
      const wrapper = mount(<Editor selectedNoteId={unknownNoteId} note={undefined} call={call} browserHistory={browserHistory}/>);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    it('should display "Select a note to get started" if no seletedNoteId set', function() {
      //const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      const unknownNoteId = undefined;
      const wrapper = mount(<Editor selectedNoteId={unknownNoteId} note={undefined} call={call} browserHistory={browserHistory}/>);
      expect(wrapper.find('p').text()).toBe('Select a note to get started');
    });

    it('should remove a note', function() {
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should update the note body on textarea change', function() {
      const newBody = 'UpdatedBody';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });
      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
    });

    it('should update the note title on input change', function() {
      const newTitle = 'UpdatedTitle';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    it('should set state for new note', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
      // setProps exists in Enzyme only
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
        note: notes[0]
      });
      // componentDidUpdate should update
      expect(wrapper.state('title')).toBe(notes[0].title);
      expect(wrapper.state('body')).toBe(notes[0].body);
    });

    it('should not set state if note prop note not provided', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory}/>);
      // setProps exists in Enzyme only
      wrapper.setProps({
        selectedNoteId: notes[0]._id,
      });
      // componentDidUpdate should update
      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });
}
