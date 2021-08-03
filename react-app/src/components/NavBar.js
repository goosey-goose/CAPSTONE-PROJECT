
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateNewBugModal from './CreateNewBugModal'
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div id="navbar_div">
        <div id="navbar_div_left">
          <NavLink className="main_nav_buttons_left" to='/' exact={true} activeClassName='active'>
            WatchIt
          </NavLink>
        </div>
        {!user && <div id="navbar_div_right">
          <div id="navbar_right_buttons_wrapper">
            <NavLink className="main_nav_buttons_right" to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
            <NavLink className="main_nav_buttons_right" to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
        </div>}
          {user && <LogoutButton />}
      </div>
    </nav>
  );
}

export default NavBar;


{/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li>
          <CreateNewBugModal />
        </li>
      </ul> */}
