import React from 'react';
import {Link} from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    if (!email) {
      this.setState({error: 'email should not be empty'});
    }
    else if (!password) {
      this.setState({error: 'password should not be empty'});
    }
    else {
      Meteor.loginWithPassword({email}, password, (err) => {
        //console.log('Login Callback',err);
        if (err) {
          //this.setState({error: err.reason});
          this.setState({error: 'Unable to login, check email and password'});
        } else {
          this.setState({error: ''});
        }
      });
    }
  }

  render() {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Login</h1>
            {this.state.error ? <p>{this.state.error}</p>:undefined}
            <form onSubmit={this.handleSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type='text' ref='email' placeholder='foo.bar@gmail.com'/>
              <input type='password' ref='password' placeholder='your password'/>
              <button className='button'>Login</button>
            </form>
            <Link to='/signup'>Sign up for an account</Link>
          </div>
        </div>
      );
  }
}
