import React from 'react';
import {Link} from 'react-router';
import  {Accounts}  from 'meteor/accounts-base';

export default class Signup extends React.Component {
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
    if ( password.length < 3 ) {
      return this.setState({error: 'Password must be over 3 chars'})
    }
    Accounts.createUser(
      {email,password} ,
      (err) => {
          //console.log('Signup callback',err);
          if (err) {
            this.setState({error: err.reason});
          } else {
            this.setState({error: ''});
          }
      });
  }
  render() {
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Signup here</h1>
            {this.state.error ? <p>{this.state.error}</p>:undefined}
            <form onSubmit={this.handleSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type='text' ref='email' placeholder='foo.bar@gmail.com'/>
              <input type='password' ref='password' placeholder='your password'/>
              <button className="button">Create account</button>
            </form>
              <Link to='/'>Already have an account ?</Link>
          </div>
        </div>
    );
  }
}
