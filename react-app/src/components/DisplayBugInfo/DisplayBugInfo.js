import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { retrieveAllBugs } from '../../store/allBugs'
import { Modal } from '../../context/Modal';
// import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm';
import UpdateBugForm from '../UpdateBugForm/UpdateBugForm';
import { retrieveAllBugs, setTheSelectedBugId, resetAllBugItems } from '../../store/bug'
import { retrieveAllGroups, resetAllGroupItems } from '../../store/group';
import './DisplayBugInfo.css'

const DisplayBugInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [wasUpdated, setWasUpdated] = useState(null);
  const user = useSelector(state => state.session.user);
  let allBugs = useSelector(state => state.bug.allBugs);
  let newUnassignedBugs = useSelector(state => state.bug.newUnassignedBugs);
  let inProgressAssignedBugs = useSelector(state => state.bug.inProgressAssignedBugs);
  let completedResolvedBugs = useSelector(state => state.bug.completedResolvedBugs);
  let allGroups = useSelector(state => state.group.allGroups);
  let newlyAddedBug = useSelector(state => state.bug.newlyAddedBug);
  let selectedBugId = useSelector(state => state.bug.selectedBugId);
  const [test, setTest] = useState(false);
  let testingYay = useRef();
  const dispatch = useDispatch();

  // testingYay.current = allGroups;
  // console.log(testingYay.current);

  ///////////////////////////
  // dispatch(retrieveAllGroups());

  // console.log(allGroups);
  console.log(newUnassignedBugs);
  console.log(inProgressAssignedBugs);
  console.log(completedResolvedBugs);
  //////////////////////////



  let newBugsReversed;

  const setNewBugDivsWithButtons = () => {
    let newBugDivs = document.querySelectorAll('.dbi_single_bug');

    let newBugObjectKeys;

    newBugObjectKeys = Object.keys(newUnassignedBugs);
    newBugObjectKeys = newBugObjectKeys.reverse();

    let temp = Object.values(newUnassignedBugs);
    newBugsReversed = temp.reverse();


    let pos = 0;
    newBugDivs.forEach((item) => {
      item.setAttribute("id", `${newBugObjectKeys[pos]}`)
      pos = pos + 1;
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }





  let inProgressBugsReversed;

  const setInProgressBugDivsWithButtons = () => {
    let inProgressBugDivs = document.querySelectorAll('.dbi_progress_bug');

    let inProgressBugObjectKeys;

    inProgressBugObjectKeys = Object.keys(inProgressAssignedBugs);
    inProgressBugObjectKeys = inProgressBugObjectKeys.reverse();

    let temp = Object.values(inProgressAssignedBugs);
    inProgressBugsReversed = temp.reverse();


    let pos = 0;
    inProgressBugDivs.forEach((item) => {
      item.setAttribute("id", `${inProgressBugObjectKeys[pos]}`)
      pos = pos + 1;
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }







  let completedBugsReversed;

  const setCompletedBugDivsWithButtons = () => {
    let completedBugDivs = document.querySelectorAll('.dbi_completed_bug');

    let completedBugObjectKeys;

    completedBugObjectKeys = Object.keys(completedResolvedBugs);
    completedBugObjectKeys = completedBugObjectKeys.reverse();

    let temp = Object.values(completedResolvedBugs);
    completedBugsReversed = temp.reverse();


    let pos = 0;
    completedBugDivs.forEach((item) => {
      item.setAttribute("id", `${completedBugObjectKeys[pos]}`)
      pos = pos + 1;
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }






  ///////////////////////////////////////
  const setGroupsWithButtons = () => {
    let displayedGroups = document.querySelectorAll(".group_name_divs");

    //////
    let hiddenDivs = [];

    displayedGroups.forEach((item) => {
      item.addEventListener('click', (event) => {
        if (hiddenDivs.length >= 1) {
          hiddenDivs.forEach((div) => {
            div.style.display="block";
          })
          hiddenDivs = [];
        }

        let dataId = (event.currentTarget).getAttribute('data-id');

        let allSingleBugDivs = document.querySelectorAll(".dbi_single_bug");
        let allProgressBugDivs = document.querySelectorAll(".dbi_progress_bug");
        let allCompletedBugDivs = document.querySelectorAll(".dbi_completed_bug");

        ///////
        console.log(typeof(allSingleBugDivs));
        console.log(allSingleBugDivs);

        allSingleBugDivs.forEach((bug) => {
          let tempId = bug.getAttribute("data-group-id");
          if (tempId !== dataId) {
            bug.style.display="none";
            hiddenDivs.push(bug);
          }
        })

        allProgressBugDivs.forEach((bug) => {
          let tempId = bug.getAttribute("data-group-id");
          if (tempId !== dataId) {
            bug.style.display="none";
            hiddenDivs.push(bug);
          }
        })

        allCompletedBugDivs.forEach((bug) => {
          let tempId = bug.getAttribute("data-group-id");
          if (tempId !== dataId) {
            bug.style.display="none";
            hiddenDivs.push(bug);
          }
        })




      })
    })
  }
  ///////////////////////////////////////







  if (!allBugs) {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    // console.log("%%%%%%%%%%%%%%%%%%%%  MONDAY  %%%%%%%%%%%%%%%%%%%%%");
    dispatch(retrieveAllBugs());
  }

  // if (!allGroups) {
  //   // console.log("%%%%%%%%%%%%%%%%%%%%  TUESDAY  %%%%%%%%%%%%%%%%%%%%");
  //   dispatch(retrieveAllGroups());
  //   // let allGroupsKeysItems = Object.keys(allGroups);
  //   // console.log("Fig Newtons");
  // }



  if (newUnassignedBugs) {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    if (Object.keys(newUnassignedBugs).length === 1) {
      let mustang = document.querySelector(".dbi_single_bug");
      if (mustang === null) {
        if ((Object.keys(allBugs)).length === 1) {
          if (newlyAddedBug) {
            dispatch(retrieveAllBugs());
          } else {

          }
        }
      }
    }
    // console.log(Object.key(newUnassignedBugs));
    // console.log("########### 2: SET NEW BUGS WITH DIVS AND BUTTONS ###########");
    setNewBugDivsWithButtons();
  }

  if (inProgressAssignedBugs) {
    // console.log("########### 2: SET IN PROGRESS BUGS WITH DIVS AND BUTTONS ###########");
    if (Object.keys(inProgressAssignedBugs).length === 1) {
      let mustang = document.querySelector(".dbi_progress_bug");
      if (mustang === null) {
        if ((Object.keys(allBugs)).length === 1) {
          if (newlyAddedBug) {
            dispatch(retrieveAllBugs());
          } else {

          }
        }
      }
    }
    setInProgressBugDivsWithButtons();
  }




  if (completedResolvedBugs) {
    if (Object.keys(completedResolvedBugs).length === 1) {
      let mustang = document.querySelector(".dbi_completed_bug");
      if (mustang === null) {
        if ((Object.keys(allBugs)).length === 1) {
          if (newlyAddedBug) {
            dispatch(retrieveAllBugs());
          } else {

          }
        }
      }
    }
    setCompletedBugDivsWithButtons();
  }






  // console.log(allGroups);
  let allGroupsValuesItems;
  if (allGroups) {
    console.log("its ready");
    allGroupsValuesItems = Object.values(allGroups);
  }

  useEffect(() => {

    // let yolo = document.getElementById("dbi_welcome_label");
    // yolo.addEventListener('mouseover', () => {
    //   console.log("Dunder Mifflin");
    // })

    // console.log(!!allGroups);
    if (!allGroups) {
      dispatch(retrieveAllGroups());
    }

    if (!allGroups) {
      setTimeout(() => {
        setGroupsWithButtons();
      }, 500);
    }

    // let allGroupsKeysItems = Object.keys(allGroups);
    // setTimeout(() => {
    //   // let allGroupsKeysItems = Object.keys(allGroups);
    //   console.log(allGroups);
    // }, 1500);
    // let allGroupsValuesItems;
    // if (allGroupsKeysItems.length >= 1) {
    //   console.log("its ready");
    //   allGroupsValuesItems = Object.values(allGroups);
    // }

    if (newUnassignedBugs) {
      console.log("########### 1: SET NEW BUGS WITH DIVS AND BUTTONS ###########");
      setNewBugDivsWithButtons();
    }

    if (inProgressAssignedBugs) {
      console.log("########### 1: SET IN PROGRESS BUGS WITH DIVS AND BUTTONS ###########");
      setInProgressBugDivsWithButtons();
    }

    if (completedResolvedBugs) {
      console.log("########### 1: SET IN PROGRESS BUGS WITH DIVS AND BUTTONS ###########");
      setCompletedBugDivsWithButtons();
    }

    return () => {
      dispatch(resetAllBugItems());
      dispatch(resetAllGroupItems());
    }
  }, [dispatch, wasUpdated, test])



  ///////////////////////////////////////////////////////////////////////
  // console.log((Object.keys(allGroups) >= 1));
  // console.log(Object.keys(allGroups));
  // let allGroupsValuesItems = Object.values(testingYay.current);
  //////////////////////////////////////////////////////////////////////


  return (
    <div id="dbi_top_div">
      <div id="dbi_grid_container">



        <div className="main_divs" id="dbi_welcome_label">
          <div id="dbi_actual_welcome_div" className="main_divs_titles">
            Welcome, {user.username}
          </div>
        </div>

        <div id="groups_section">
          <div id="available_groups_label">
            Available Groups
          </div>


          {allGroupsValuesItems && <div id="groups_container">
            {allGroupsValuesItems.map((group, index) => (
              <div className="group_name_divs" data-id={group.id} key={index}>
                {group.name}
              </div>
            ))}
          </div>}


        </div>

        <div id="final_new_bugs_label">New Bugs</div>

        <div className="main_divs" id="dbi_new_bugs">
        {/* <div className="main_divs_titles">New Bugs</div> */}
          {/* <br></br> */}

          {newUnassignedBugs && <div id="dbi_new_bugs_list">
            {newBugsReversed.map((bug, index) => (

              <div className="dbi_single_bug" data-group-id={bug.group_id} key={index}>
                  {bug.title + ":"}
                <br></br>
                <div className="dbi_single_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                </div>
              </div>


            ))}
          </div>}

        </div>




        <div id="final_in_progress_bugs_label">In Progress</div>

        <div className="main_divs" id="dbi_in_progress">
          {/* <div className="main_divs_titles">In Progress</div> */}
          {/* <br></br> */}

          {inProgressAssignedBugs && <div id="dbi_progress_bugs_list">
            {inProgressBugsReversed.map((bug, index) => (

              <div className="dbi_progress_bug" data-group-id={bug.group_id} key={index}>
                  {bug.title + ":"}
                <br></br>
                <div className="dbi_progress_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                </div>
              </div>


            ))}
          </div>}

        </div>





        <div id="final_completed_bugs_label">Completed</div>

        <div className="main_divs" id="dbi_completed_bugs">
          {/* <div className="main_divs_titles">Completed</div> */}
          {/* <br></br> */}

          {completedResolvedBugs && <div id="dbi_completed_bugs_list">
            {completedBugsReversed?.map((bug, index) => (

              <div className="dbi_completed_bug" data-group-id={bug.group_id} key={index}>
                  {bug.title + ":"}
                <br></br>
                <div className="dbi_completed_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                </div>
              </div>


            ))}
          </div>}

        </div>







      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBugForm showFunc={setShowModal} triggerUpdate={setWasUpdated} />
        </Modal>
      )}
    </div>
  );
}

export default DisplayBugInfo;
