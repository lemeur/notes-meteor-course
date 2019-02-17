import React from 'react';
import {findDOMNode} from 'react-dom';
import Modal from 'react-modal';
import expect from 'expect';
import {mount,ReactWrapper} from 'enzyme';
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
        modalRootElement = '#mocha';
    });

    afterEach(() => {
      // Because Modal doesn't delete it's portal
      // we need to remove it between tests
      // otherwise we get several empty ReactModalPortal empty divs in the
      // test page
      x = document.getElementsByClassName('ReactModalPortal');
      var i;
      for (i = 0; i < x.length; i++) {
        //x[i].remove();
      }
    });

    it('should display "Note not found" if unknown seletedNoteId', function() {
      //const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      const unknownNoteId = 'unknownNoteId';
      const wrapper = mount(<Editor selectedNoteId={unknownNoteId} note={undefined} call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}} modalRootElement={modalRootElement}/>);
      expect(wrapper.find('p').text()).toBe('Note not found');
    });

    it('should display "Select a note to get started" if no seletedNoteId set', function() {
      //const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory}/>);
      const unknownNoteId = undefined;
      const wrapper = mount(<Editor selectedNoteId={unknownNoteId} note={undefined} call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
      expect(wrapper.find('p').text()).toBe('Select a note to get started');
    });


    it('should openModal confirm before delete', function() {
      const spy = expect.createSpy();
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory} handleModalOpen={spy} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
      wrapper.find('#intentDelete').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should remove a note', function() {
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);

      wrapper.setState({modalIsOpen: true, title: notes[0].title, body: notes[0].body });
      wrapper.update();

      //wrapper.find(Modal).find('#confirmDelete').onClick.call();
      // ==> Error: onClick is not a property of the button element
      // but a property read by React

      //wrapper.find(Modal).find('#confirmDelete').simulate('click');
      // => Error returned: Method “simulate” is only meant to be run on a
      // single node. 0 found instead.
      // => This is because the inner elements of the Modal is rendered inside
      // a "portal"


      //const modalWrapper = new ReactWrapper(wrapper.find(Modal).first(), true);
      //const toto = modalWrapper.find('#confirmDelete');
      // ==> Returns Empty selector

      // EUREKA: the solution
      const modalWrapper = new ReactWrapper(wrapper.find(Modal).node.portal, true);
      //debugger;
      const confirmBtn = modalWrapper.find('#confirmDelete');
      confirmBtn.simulate('click');

      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
    });



    it('should update the note body on textarea change', function() {
      const newBody = 'UpdatedBody';
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
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
      const wrapper = mount(<Editor selectedNoteId={notes[0]._id} note={notes[0]} call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });
      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });

    it('should set state for new note', function() {
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
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
      const wrapper = mount(<Editor call={call} browserHistory={browserHistory} handleModalOpen={()=>{}} handleModalClose={()=>{}}  modalRootElement={modalRootElement}/>);
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
