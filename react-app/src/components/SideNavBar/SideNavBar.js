import React from 'react';
import CreateNewBugFormModal from '../CreateNewBugModal'
import CreateNewGroupFormModal from '../CreateNewGroupModal';
import './SideNavBar.css'

const SideNavBar = () => {
  return (

    <>


      <div id="sidebar_nav">

        <div id="side_navbar_grid_container">
          <div id="sidebar_nav_hover_button_div_bug">
              <div className="side_navbar_letter_text">
                New Bug
              </div>
              <CreateNewBugFormModal />
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
