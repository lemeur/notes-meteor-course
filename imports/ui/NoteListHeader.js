import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class NoteListHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      noteFilter: ''
    }
  }

  handleClick() {
    this.props.Session.set('noteFilter','');
    this.setState({noteFilter: ''});
    this.props.meteorCall('notes.insert', function(err, res) {
      if (res) {
        // res holds the created note Id
        this.props.Session.set('selectedNoteId', res);
      }
    }.bind(this));
  }

  handleChange(e) {
    this.props.Session.set('noteFilter',e.target.value);
    this.setState({noteFilter: e.target.value});
  }

  render() {
    return (
      <div className="item-list__header">
        <button className="button" onClick={this.handleClick.bind(this)}>Create Note</button>
        <input type="text" placeholder="filter note here" ref='noteFilter' value={this.state.noteFilter} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired,
}

export default createContainer( () => {
  const noteFilter = Session.get('noteFilter');
  return {
    meteorCall: Meteor.call,
    Session
  }
},
NoteListHeader);
