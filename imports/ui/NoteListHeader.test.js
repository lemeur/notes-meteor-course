import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';


if (Meteor.isClient) {
    describe('NoteListHeader', function() {
      let meteorCall;
      let Session;

      beforeEach(function() {
        meteorCall = expect.createSpy();
        Session = {
          set: expect.createSpy()
        }
      });

      it('should call notes.insert when button clicked', function() {
        const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
        wrapper.find('button').simulate('click');
        // now notes.insert is called with a callback a second argument to use the createdNoteId in 'res'
        // We need to switch from toHaveBeenCalledWith to "Argument check"
        //expect(spy).toHaveBeenCalledWith('notes.insert');
        expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
        meteorCall.calls[0].arguments[1](undefined, notes[0]._id);

        expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
      });

      it('should not set Session for failed insert', function() {
        const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
        wrapper.find('button').simulate('click');

        expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
        meteorCall.calls[0].arguments[1]({error: 'there was an error'}, undefined);
        //debugger;
        expect(Session.set.calls[0].arguments[0]).toBe('noteFilter');
        expect(Session.set.calls.length).toBe(1);
      });

    });
}
