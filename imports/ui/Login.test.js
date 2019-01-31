import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient) {
  describe('Login', function() {

    it('should show error messages', function() {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => {}}/>);

      // set state on this component with enzyme
      // https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
      wrapper.setState({error});

      const errText = wrapper.find('p').text();
      expect(errText).toBe(error);

      // Now clear state and there shouldn't be a P tag
      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);

    });


  });
}
