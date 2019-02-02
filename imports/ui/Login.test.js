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

    it('should call loginWithPassword with the form data', function() {
        const email = 'tibo@test.com';
        const password= 'aPassword';
        const spy = expect.createSpy();
        const wrapper = mount(<Login loginWithPassword={spy}/>);

        // set email and password inputs
        // ref() https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md
        // wrapper.ref('email').node ==> Instance of HTMLInputElement
        //    https://developer.mozilla.org/fr/docs/Web/API/HTMLInputElement
        wrapper.ref('email').node.value = email;
        wrapper.ref('password').node.value = password;
        // simulate submit
        wrapper.find('form').simulate('submit');
        // Assertion
        // - can't use toHaveBeenCalledWith because we don't want to check the
        //   3rd argument which is the error callback of loginWithPassword
        // - instead we'll check the arguments for the first "call"
        expect(spy.calls[0].arguments[0]).toEqual({email});
        expect(spy.calls[0].arguments[1]).toBe(password);
    });

    it('should set loginWithPassword callback errors', function() {
        const email = 'tibo@test.com';
        const password= 'aPassword';
        const spy = expect.createSpy();
        const wrapper = mount(<Login loginWithPassword={spy}/>);

        wrapper.ref('email').node.value = email;
        wrapper.ref('password').node.value = password;
        wrapper.find('form').simulate('submit');
        // The third argument of the Spy is the error callback
        // We can retrieve it and test it independently
        spy.calls[0].arguments[2]({});
        expect(wrapper.state('error')).toNotBe("");

        // When no error is passed to the error callback, the error
        // state is set back to ''
        spy.calls[0].arguments[2]();
        expect(wrapper.state('error')).toBe("");
    });

    it('should set error message if email is empty', function() {
        const email = '';
        const password= 'aPassword';
        const spy = expect.createSpy();
        const wrapper = mount(<Login loginWithPassword={spy}/>);

        wrapper.ref('email').node.value = email;
        wrapper.ref('password').node.value = password;
        wrapper.find('form').simulate('submit');
        // The third argument of the Spy is the error callback
        // We can retrieve it and test it independently
        expect(wrapper.state('error')).toNotBe("");
    });

    it('should set error message if password is empty', function() {
        const email = 'tibo@test.com';
        const password= '';
        const spy = expect.createSpy();
        const wrapper = mount(<Login loginWithPassword={spy}/>);

        wrapper.ref('email').node.value = email;
        wrapper.ref('password').node.value = password;
        wrapper.find('form').simulate('submit');
        // The third argument of the Spy is the error callback
        // We can retrieve it and test it independently
        expect(wrapper.state('error')).toNotBe("");
    });

  });
}
