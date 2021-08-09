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
  const [newSingleBugs, setNewSingleBugs] = useState(null)
  const [inProgressBugs, setInProgressBugs] = useState(null)
  // const [bKeys, setBKeys] = useState(null);
  // const refContainer = useRef();
  const user = useSelector(state => state.session.user);
  let allBugs = useSelector(state => state.bug.allBugs);
  let newUnassignedBugs = useSelector(state => state.bug.newUnassignedBugs);
  let inProgressAssignedBugs = useSelector(state => state.bug.inProgressAssignedBugs);
  let completedResolvedBugs = useSelector(state => state.bug.completedResolvedBugs);
  let allGroups = useSelector(state => state.group.allGroups);
  let newlyAddedBug = useSelector(state => state.bug.newlyAddedBug);
  const dispatch = useDispatch();


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




  ///////////////////////////////////////
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
  ///////////////////////////////////////



  if (!allBugs) {
    console.log("%%%%%%%%%%%%%%%%%%%%  MONDAY  %%%%%%%%%%%%%%%%%%%%%");
    dispatch(retrieveAllBugs());
  }

  if (!allGroups) {
    console.log("%%%%%%%%%%%%%%%%%%%%  TUESDAY  %%%%%%%%%%%%%%%%%%%%");
    dispatch(retrieveAllGroups());
  }



  if (newUnassignedBugs) {
    console.log("########### SET NEW BUGS WITH DIVS AND BUTTONS ###########");
    setNewBugDivsWithButtons();
  }

  if (inProgressAssignedBugs) {
    console.log("########### SET IN PROGRESS BUGS WITH DIVS AND BUTTONS ###########");
    setInProgressBugDivsWithButtons();
  }


  useEffect(() => {  ////////////////////////////
    // console.log("^^^^^^^^^^ DBI USE_EFFECT() ^^^^^^^^^^^^^^^");
    // if (!allBugs) {
    //   console.log("New York");
    //   // dispatch(retrieveAllBugs());
    // }
    // if (!allGroups) {
    //   console.log("Miami");
    //   // dispatch(retrieveAllGroups());
    // }

    // if (!newUnassignedBugs) {
    //   console.log("Mountain View");
    //   console.log(newUnassignedBugs);
    //   // setNewBugDivsWithButtons();
    // }

    // if (!inProgressAssignedBugs) {
    //   console.log("Google");
    //   console.log(inProgressAssignedBugs);
    //   // setInProgressBugDivsWithButtons();
    // }

    // if (!allBugs && !allGroups) {
    //   dispatch(retrieveAllBugs());
    //   dispatch(retrieveAllGroups());
    // }

    if (newUnassignedBugs) {
      console.log("########### SET NEW BUGS WITH DIVS AND BUTTONS ###########");
      setNewBugDivsWithButtons();
    }

    if (inProgressAssignedBugs) {
      console.log("########### SET IN PROGRESS BUGS WITH DIVS AND BUTTONS ###########");
      setInProgressBugDivsWithButtons();
    }

    return () => {
      dispatch(resetAllBugItems());
      dispatch(resetAllGroupItems());
    }
  }, [dispatch, wasUpdated])






  return (
    <div id="dbi_top_div">
      <div id="dbi_grid_container">



        <div className="main_divs" id="dbi_welcome_label">
          <div className="main_divs_titles">
            Welcome, {user.username}
          </div>
        </div>

        <div className="main_divs" id="dbi_new_bugs">
        <div className="main_divs_titles">New Bugs</div>
          <br></br>

          {newUnassignedBugs && <div id="dbi_new_bugs_list">
            {newBugsReversed.map((bug, index) => (

              <div className="dbi_single_bug" key={index}>
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






        <div className="main_divs" id="dbi_in_progress">
          <div className="main_divs_titles">In Progress</div>
          <br></br>

          {inProgressAssignedBugs && <div id="dbi_progress_bugs_list">
            {inProgressBugsReversed.map((bug, index) => (

              <div className="dbi_progress_bug" key={index}>
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







        <div className="main_divs" id="dbi_completed_bugs">
          <div className="main_divs_titles">
            Completed
          </div>
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
