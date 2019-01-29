import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'my Title',
      body: 'my Body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'my Title2',
      body: 'my Body for note2',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function() {
      // Run before each test
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', function() {
      const userId = "testId";

      const _id = Meteor.server.method_handlers['notes.insert'].apply({
        userId: userId
      });
      expect(Notes.findOne({_id, userId: userId})).toExist();
    });

    it('should not insert new note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove a note', function() {
        const _id= noteOne._id;
        const userId= noteOne.userId;
        Meteor.server.method_handlers['notes.remove'].apply( {userId: userId}  ,
                                                              [ _id ] );
        expect(Notes.findOne({_id})).toNotExist();
    });


    it('should not remove a note if unauthenticated', function() {
        const _id= noteOne._id;

        expect(
          () => {Meteor.server.method_handlers['notes.remove'].apply( {}, [ _id ] )}
        ).toThrow();
    });

    it('should not remove a note if no _id', function() {

        const userId= noteOne.userId;
        expect(
          () => {Meteor.server.method_handlers['notes.remove'].apply( {userId: userId} )}
        ).toThrow();
    });

    it('should update a note', function() {
      const title = 'this is an updated title';
      Meteor.server.method_handlers['notes.update'].apply( {userId: noteOne.userId}, [ noteOne._id, {title} ] );

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude({
        title,
        body: noteOne.body
      });
      expect(note.updatedAt).toBeGreaterThan(0);
    });

    it('should throw error if updating other attributes thant title or body', function() {
      expect(
        () => {Meteor.server.method_handlers['notes.update'].apply( {
          userId: noteOne.userId
        }, [
          noteOne._id,
          { updatedAt: 'FAKE'}
        ]);
      }).toThrow();
    });

    it('should not update note if user is not creator', function() {
      const title = 'this is an updated title';
      Meteor.server.method_handlers['notes.update'].apply( {userId: 'FakeId'}, [ noteOne._id, {title} ] );

      const note = Notes.findOne(noteOne._id);

      expect(note).toInclude({
        title: noteOne.title,
        body: noteOne.body,
        updatedAt: 0
      });
    });

    it('should not update new note if not authenticated', function() {
      expect(
        () => {Meteor.server.method_handlers['notes.update'].apply( {

        }, [
          noteOne._id,
          { title: 'FAKE'}
        ]);
      }).toThrow();
    });

    it('should not update a note if no _id', function() {
        const userId= noteOne.userId;
        expect(
          () => {Meteor.server.method_handlers['notes.update'].apply( {userId: userId} )}
        ).toThrow();
    });

    it('should return a users notes', function() {
      // Meteor.server.publish_handlers['notes']
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return zero note for a user that has none', function() {
      // Meteor.server.publish_handlers['notes']
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'OtherId'});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });

  });
}
