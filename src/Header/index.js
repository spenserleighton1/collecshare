import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import { connect } from 'react-redux';
import './styles.css';
import { signOut } from '../actions';
import avatar from '../images/avatar.png';
import Dashboard from '../Dashboard';

class Header extends Component {
  constructor(props){
    super();

    this.state = { 
      dashboardActive: false,
      searchInput: ''
    }
  }

  handleSignOut = () => {
    this.setState({ dashboardActive: false })
    auth.doSignOut();
    this.props.signOut();
  }

  handleDashboard = () => {
    const currentState = this.state.dashboardActive;
    this.setState({ dashboardActive: !currentState });
  }

  loginLocation = () => {
    let path = this.props.history.location.pathname;
    console.log(this.props.match.path, this.props.history.location.pathname)
    this.props.history.push( path === '/' ? path + 'login': path + '/login');
  }

  signupLocation = () => {
    let path = this.props.history.location.pathname;
    this.props.history.push( path === '/' ? path + 'signup': path + '/signup');
  }

  handleSearchChange = (event) => {
    this.setState({ searchInput: event.target.value })
  }


  render() { 
    const headerAvatar = `https://collecshare.herokuapp.com/${this.props.user.avatar}` || avatar;

    return (
      <div className='header-container'>
        <div className='header'>
          <Link to={'/home'}>
            <h1 className='header-app-name'>Collec<span>share</span></h1>
          </Link>
          <input className='header-search-bar' type='text' placeholder='Search' value={this.state.searchInput} onChange={this.handleSearchChange} />
          <div className='header-nav'>
          {
            this.props.user.uid ? 
              <div className='avatar-dash'>
                <button className='header-dash board-btn' onClick={this.handleDashboard}>Dashboard</button>
                <img className='header-avatar' src={headerAvatar} alt='avatar' />
              </div> :
              <div>
                <a className='header-link' onClick={() => this.loginLocation()}>Login</a>
                <a className='header-link' onClick={() => this.signupLocation()}>Create Account</a>
                <Link className='header-link' to={'/home'}>Get All</Link>
              </div>
          } 
          </div>
        </div>
          <Dashboard active={this.state.dashboardActive}
                     handleSignOut={this.handleSignOut}/>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));




