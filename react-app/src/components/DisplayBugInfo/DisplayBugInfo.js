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
  const [bKeys, setBKeys] = useState(null);
  const refContainer = useRef();
  const user = useSelector(state => state.session.user);
  let allBugs = useSelector(state => state.bug.allBugs);
  let allGroups = useSelector(state => state.group.allGroups);
  let newlyAddedBug = useSelector(state => state.bug.newlyAddedBug);
  const dispatch = useDispatch();

  let allBugsReversed;
  if (allBugs) {
    let temp = Object.values(allBugs)
    allBugsReversed = temp.reverse()

    refContainer.current = (Object.keys(allBugs)).length
  }




  if (allBugs && newlyAddedBug === null) {
    let newBugs = document.querySelectorAll('.dbi_single_bug');
    let bugObjectKeys = Object.keys(allBugs);
    bugObjectKeys = bugObjectKeys.reverse();
    let pos = 0;
    newBugs.forEach((item) => {
      item.setAttribute("id", `${bugObjectKeys[pos]}`)
      pos = pos + 1;
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }





  let bKeysLength;
  if (allBugs) {
    bKeysLength = (Object.keys(allBugs)).length
    if (bKeysLength !== refContainer.current) {
      setBKeys(bKeysLength)
    }
  }



  if (newlyAddedBug) {
    let newBugs = document.querySelectorAll('.dbi_single_bug');
    let bugObjectKeys = Object.keys(allBugs);
    bugObjectKeys = bugObjectKeys.reverse();
    let pos = 0;
    newBugs.forEach((item) => {
      item.setAttribute("id", `${bugObjectKeys[pos]}`)
      pos = pos + 1;
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }



  useEffect(() => {
    if (!allBugs) {
      dispatch(retrieveAllBugs());
    }
    if (!allGroups) {
      dispatch(retrieveAllGroups());
    }
    if (allBugs) {
      let newBugs = document.querySelectorAll('.dbi_single_bug');
      let bugObjectKeys = Object.keys(allBugs);
      bugObjectKeys = bugObjectKeys.reverse();
      let pos = 0;
      newBugs.forEach((item) => {
        item.setAttribute("id", `${bugObjectKeys[pos]}`)
        pos = pos + 1;
        item.addEventListener('click', (event) => {
          let divId = (event.currentTarget).getAttribute('id');
          dispatch(setTheSelectedBugId(divId));
          setShowModal(true);
        })
      })
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

          {allBugs && <div id="dbi_new_bugs_list">
            {allBugsReversed.map((bug, index) => (

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
