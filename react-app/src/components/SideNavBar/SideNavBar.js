import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CreateNewBugFormModal from '../CreateNewBugModal'
import CreateNewGroupFormModal from '../CreateNewGroupModal';
import './SideNavBar.css'

const SideNavBar = () => {
  return (

      <nav id="sidebar_nav">
        <div id="side_navbar_grid_container">
          <div id="side_navbar_new_bug_modal">
            <CreateNewBugFormModal />
          </div>
          <div id="side_navbar_new_group_modal">
            <CreateNewGroupFormModal />
          </div>
        </div>
      </nav>

  );
}

export default SideNavBar;
