import React, { useState, useEffect } from 'react';
import SideNavBar from '../SideNavBar/SideNavBar';
import DisplayBugInfo from '../DisplayBugInfo/DisplayBugInfo';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllGroups } from '../../store/group';
import './MainUserPage.css'

const MainUserPage = () => {
  // const dispatch = useDispatch();
  // let allGroups = useSelector(state => state.group.allGroups);

  const [wasBugAdded, setWasBugAdded] = useState(false)
  // if (wasBugAdded === true) {
  //   setWasBugAdded(false)
  // }

  // dispatch(retrieveAllGroups());

  // useEffect(() => {

  // }, [])


  return (
    <>
    <SideNavBar bugAdded={setWasBugAdded} />

    <DisplayBugInfo />

    </>
  );
}



export default MainUserPage;
