import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { createNewBug, setTheSelectedBugId, retrieveAllBugs } from '../../store/bug';
import LeftChildTestComponent from '../LeftChildTestComponent/LeftChildTestComponent';
import RightChildTestComponent from '../RightChildTestComponent/RightChildTestComponent';
import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm';
import { retrieveAllBugs } from '../../store/bug';
import { retrieveAllGroups } from '../../store/group';



const TestComponent = () => {
  const [trigger, setTrigger] = useState();
  const newlyAddedBug = useSelector(state => state.bug.newlyAddedBug)
  const allBugs = useSelector(state => state.bug.allBugs)
  const dispatch = useDispatch();



  console.log("#####  HELLO FROM INSIDE TEST COMPONENT  ##########");

  let testVariable;



  // useEffect(() => {
  //   dispatch(retrieveAllBugs());
  // }, [dispatch])



  return (
    <>
    {/* <button onClick={() => setTrigger("hello")}>Click</button> */}

    <CreateNewBugForm showFunc={setTrigger}></CreateNewBugForm>
    </>
  );
}

export default TestComponent;
