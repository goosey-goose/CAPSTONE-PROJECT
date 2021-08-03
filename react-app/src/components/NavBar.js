
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateNewBugModal from './CreateNewBugModal'
import './NavBar.css'

const NavBar = () => {

  return (
    <nav>
      <div id="navbar_div">
        <div id="navbar_div_left">
          <NavLink className="main_nav_buttons" to='/' exact={true} activeClassName='active'>
            WatchIt
          </NavLink>
        </div>
        <div id="navbar_div_right">
          <NavLink className="main_nav_buttons" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink className="main_nav_buttons" to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <LogoutButton />
        </div>
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
