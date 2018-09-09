import React, { Component } from 'react';
import { auth } from '../firebase';
import { connect } from 'react-redux';
import { signIn } from '../actions';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password1: '',
      password2: '',
      error: null
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;

    this.setState({
      [id]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate(this.state)) {
      //send to firebase .then(save response (Id) to store)
      auth.doCreateUserWithEmailAndPassword('tman@tman.com', '1234567')
        .then(response => this.props.signIn(response.user.uid))
        .catch(err => console.log(err))
    };
  }

  validate(email, password1, password2) {
    return true;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='email'>email</label>
        <input id='email' onChange={this.handleChange}/>
        <label htmlFor='password1'>password</label>
        <input id='password1'onChange={this.handleChange}/>
        <label htmlFor='password2'>confirm password</label>
        <input id='password2' onChange={this.handleChange}/>
        <button type='submit'>Sign Up</button>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  userId: state.userId
})

export const mapDispatchToProps = (dispatch) => ({
  signIn: (userId) => dispatch(signIn(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

