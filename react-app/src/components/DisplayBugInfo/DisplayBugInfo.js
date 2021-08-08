import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { retrieveAllBugs } from '../../store/allBugs'
import { Modal } from '../../context/Modal';
// import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm';
import UpdateBugForm from '../UpdateBugForm/UpdateBugForm';
import { retrieveAllBugs, setTheSelectedBugId } from '../../store/bug'
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
  let allGroups = useSelector(state => state.group.allGroups);
  let newlyAddedBug = useSelector(state => state.bug.newlyAddedBug);
  const dispatch = useDispatch();





  const checkForNewSingleBugs = (allBugsObjectKeys, allBugsObjectValues) => {  //  bug
    // return !bug.assignee
    let newBugs = {}
    for (let i = 0; i < allBugsObjectValues.length; ++i) {
      if (!allBugsObjectValues[i].assignee) {
        newBugs[allBugsObjectKeys[i]] = allBugsObjectValues[i]
      }
    }
    return newBugs;
  }


  const checkForProgressBugs = (allBugsObjectKeys, allBugsObjectValues) => {  //  bug
    let inProgressBugs = {}
    for (let i = 0; i < allBugsObjectValues.length; ++i) {
      if (allBugsObjectValues[i].assignee) {
        inProgressBugs[allBugsObjectKeys[i]] = allBugsObjectValues[i]
      }
    }
    return inProgressBugs;
  }






  // if (allBugs && newlyAddedBug === null) {  //////////////////////////
  //   let newBugDivs = document.querySelectorAll('.dbi_single_bug');
  //   let bugObjectKeys = Object.keys(allBugs);
  //   bugObjectKeys = bugObjectKeys.reverse();
  //   let pos = 0;
  //   newBugDivs.forEach((item) => {
  //     item.setAttribute("id", `${bugObjectKeys[pos]}`)
  //     pos = pos + 1;
  //     item.addEventListener('click', (event) => {
  //       let divId = (event.currentTarget).getAttribute('id');
  //       dispatch(setTheSelectedBugId(divId));
  //       setShowModal(true);
  //     })
  //   })
  // }



  // if (allBugs && newlyAddedBug) {
    // let allBugsObjectValues = Object.values(allBugs);
    // let inProgressBugs = allBugsObjectValues.filter(checkForProgressBugs)
    // console.log(inProgressBugs);
  // }





  // let bKeysLength;
  // if (allBugs) {
  //   bKeysLength = (Object.keys(allBugs)).length
  //   if (bKeysLength !== refContainer.current) {
  //     setBKeys(bKeysLength)
  //   }
  // }



  // if (newlyAddedBug) {  ////////////////////////////
  //   let newBugDivs = document.querySelectorAll('.dbi_single_bug');
  //   let bugObjectKeys = Object.keys(allBugs);
  //   bugObjectKeys = bugObjectKeys.reverse();
  //   let pos = 0;
  //   newBugDivs.forEach((item) => {
  //     item.setAttribute("id", `${bugObjectKeys[pos]}`)
  //     pos = pos + 1;
  //     item.addEventListener('click', (event) => {
  //       let divId = (event.currentTarget).getAttribute('id');
  //       dispatch(setTheSelectedBugId(divId));
  //       setShowModal(true);
  //     })
  //   })
  // }




  if (allBugs && !newSingleBugs) {
    let allBugsObjectKeys = Object.keys(allBugs);
    let allBugsObjectValues = Object.values(allBugs);
    setNewSingleBugs(checkForNewSingleBugs(allBugsObjectKeys, allBugsObjectValues));
  }

  let newBugsReversed;
  if (newSingleBugs) {
    let temp = Object.values(newSingleBugs)
    newBugsReversed = temp.reverse()
  }



  if (false) {  //  allBugs
    let allBugsObjectKeys = Object.keys(allBugs);
    let allBugsObjectValues = Object.values(allBugs);
    setNewSingleBugs(checkForNewSingleBugs(allBugsObjectKeys, allBugsObjectValues));
    setInProgressBugs(checkForProgressBugs(allBugsObjectKeys, allBugsObjectValues));


    let newBugDivs = document.querySelectorAll('.dbi_single_bug');

    let newBugObjectKeys;
    if (newSingleBugs) {
      newBugObjectKeys = Object.keys(newSingleBugs);
      newBugObjectKeys = newBugObjectKeys.reverse();
    }



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



  useEffect(() => {  ////////////////////////////
    if (!allBugs) {
      dispatch(retrieveAllBugs());
    }
    if (!allGroups) {
      dispatch(retrieveAllGroups());
    }



    return () => {
      // dispatch(resetAllGroupItems());
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

          {newSingleBugs && <div id="dbi_new_bugs_list">
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
          <div className="main_divs_titles">
            In Progress
          </div>
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
