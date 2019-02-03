import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
    describe('NoteListItem', function() {

      it('should render title and timestamp', function() {
        const title = 'A test Title';
        const updatedAt = 1549211785596; // taken from a true note in minimongo on Chrome: 03/02/2019

        const wrapper = mount(<NoteListItem note={{title, updatedAt}} />);
        expect(wrapper.find('h5').text()).toBe(title);
        expect(wrapper.find('p').text()).toBe('03/02/2019');
      });

      it('should set default title if no title set', function() {
        const title = '';
        const updatedAt = 1549211785596; // taken from a true note in minimongo on Chrome: 03/02/2019

        const wrapper = mount(<NoteListItem note={{title, updatedAt}} />);
        expect(wrapper.find('h5').text()).toBe('Untitled note');
        expect(wrapper.find('p').text()).toBe('03/02/2019');
      });


    });
}
