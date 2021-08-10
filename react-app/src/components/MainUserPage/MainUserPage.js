import React, { useState } from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import DisplayBugInfo from '../DisplayBugInfo/DisplayBugInfo';
import './MainUserPage.css'

const MainUserPage = () => {

  const [wasBugAdded, setWasBugAdded] = useState(false)
  // if (wasBugAdded === true) {
  //   setWasBugAdded(false)
  // }


  return (
    <>
    <SideNavBar bugAdded={setWasBugAdded} />

    <DisplayBugInfo />

    </>
  );
}



export default MainUserPage;
