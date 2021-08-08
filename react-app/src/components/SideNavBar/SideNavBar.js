import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CreateNewBugFormModal from '../CreateNewBugModal'
import CreateNewGroupFormModal from '../CreateNewGroupModal';
import './SideNavBar.css'

const SideNavBar = ({ bugAdded }) => {
  return (

    <>


      <div id="sidebar_nav">

        <div id="side_navbar_grid_container">
          <div id="sidebar_nav_hover_button_div_bug">
              <div className="side_navbar_letter_text">
                New Bug
              </div>
              <CreateNewBugFormModal addBug={bugAdded} />
          </div>


          <div id="sidebar_nav_hover_button_div_group">
              <div className="side_navbar_letter_text">
                New Group
              </div>
              <CreateNewGroupFormModal />
          </div>
        </div>


      </div>



    </>
  );
}

export default SideNavBar;
