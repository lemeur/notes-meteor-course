import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import PrivateHeader from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader', function() {
    it('should set button text to logout', function() {
      const testTitle= "testTitle";
      const wrapper = mount(<PrivateHeader title={testTitle}/>);
      const buttonText = wrapper.find('button').text();
      expect(buttonText).toBe('Logout');
    });

    it('should set Title the prop title value', function() {
      const testTitle= "testTitle";
      const wrapper = mount(<PrivateHeader title={testTitle}/>);
      const buttonText = wrapper.find('h1').text();
      expect(buttonText).toBe(testTitle);
    });

  }); // End describe
}
