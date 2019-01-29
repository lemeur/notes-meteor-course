import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import {validateNewUser} from './users';

// it('should add two numbers', function() {
//   res={'a': 30, 'b': 1};
//   expect(res).toEqual({'a': 30, 'b': 1 });
//
// });

if (Meteor.isServer) {

  describe('users', function() {
    it('should allow valid email address', function() {
        const testUser = {
          emails: [
            { address: 'valid.email@address.com'}
          ]
        };
        const res = validateNewUser(testUser);
        expect(res).toBe(true);
    });
    it('should reject invalid email address', function() {
        expect(() => {
          const testUser = {
            emails: [
              { address: 'valid.email'}
            ]
          };
          const res = validateNewUser(testUser);
        }).toThrow();
    });
  });

} // End Meteor.isServer
