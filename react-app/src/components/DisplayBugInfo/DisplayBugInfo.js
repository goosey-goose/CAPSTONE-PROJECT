import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { retrieveAllBugs } from '../../store/allBugs'
import { Modal } from '../../context/Modal';
// import CreateNewBugForm from '../CreateNewBugForm/CreateNewBugForm';
import UpdateBugForm from '../UpdateBugForm/UpdateBugForm';
import UpdateGroupForm from '../UpdateGroupForm/UpdateGroupForm';
import { retrieveAllBugs, setTheSelectedBugId } from '../../store/bug'
import { retrieveAllGroups } from '../../store/group';
import './DisplayBugInfo.css'

const DisplayBugInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const user = useSelector(state => state.session.user);
  let newUnassignedBugs = useSelector(state => state.bug.newUnassignedBugs);
  let inProgressAssignedBugs = useSelector(state => state.bug.inProgressAssignedBugs);
  let completedResolvedBugs = useSelector(state => state.bug.completedResolvedBugs);
  let allGroups = useSelector(state => state.group.allGroups);
  let testingYay = useRef([]);
  let selectedGroupNameId = useRef();
  const dispatch = useDispatch();



  let newBugsReversed;

  const setNewBugDivsWithButtons = () => {
    let newBugDivs = document.querySelectorAll('.dbi_single_bug');

    /////////////////////////////
    newBugDivs.forEach((div) => {
      div.style.borderRight="";
    })

    let newBugObjectKeys;

    newBugObjectKeys = Object.keys(newUnassignedBugs);
    newBugObjectKeys = newBugObjectKeys.reverse();

    let temp = Object.values(newUnassignedBugs);
    newBugsReversed = temp.reverse();


    let pos = 0;
    newBugDivs.forEach((item) => {
      item.setAttribute("id", `${newBugObjectKeys[pos]}`)
      pos = pos + 1;
      if (item.getAttribute('data-u-context') == user.id) {
        item.style.borderRight="solid 5px green";
      }
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

    //////////////////
    inProgressBugDivs.forEach((div) => {
      div.style.borderRight="";
    })

    let inProgressBugObjectKeys;

    inProgressBugObjectKeys = Object.keys(inProgressAssignedBugs);
    inProgressBugObjectKeys = inProgressBugObjectKeys.reverse();

    let temp = Object.values(inProgressAssignedBugs);
    inProgressBugsReversed = temp.reverse();


    let pos = 0;
    inProgressBugDivs.forEach((item) => {
      item.setAttribute("id", `${inProgressBugObjectKeys[pos]}`)
      pos = pos + 1;
      if (item.getAttribute('data-u-context') == user.id) {
        item.style.borderRight="solid 5px green";
      }
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

    //////////////////////////
    completedBugDivs.forEach((div) => {
      div.style.borderRight="";
    })

    let completedBugObjectKeys;

    completedBugObjectKeys = Object.keys(completedResolvedBugs);
    completedBugObjectKeys = completedBugObjectKeys.reverse();

    let temp = Object.values(completedResolvedBugs);
    completedBugsReversed = temp.reverse();


    let pos = 0;
    completedBugDivs.forEach((item) => {
      item.setAttribute("id", `${completedBugObjectKeys[pos]}`)
      pos = pos + 1;
      if (item.getAttribute('data-u-context') == user.id) {
        item.style.borderRight="solid 5px green";
      }
      item.addEventListener('click', (event) => {
        let divId = (event.currentTarget).getAttribute('id');
        dispatch(setTheSelectedBugId(divId));
        setShowModal(true);
      })
    })
  }






  let hiddenDivs = [];

  const showAllGroupBugs = () => {
    selectedGroupNameId.current = null;

    testingYay.current.forEach((bug) => {
      bug.style.display="block";
    })

    // testingYay.current = [];

    let specificGroupFilter = document.getElementById("specific_group_filter");
    specificGroupFilter.style.display="none";
    specificGroupFilter.innerText = "";

    let resetGroupView = document.getElementById("reset_group_view");
    resetGroupView.style.display="none";

    let availableGroupsLabel = document.getElementById("available_groups_label");
    availableGroupsLabel.style.justifyContent="center";
  }


  // THIS FUNCTION IS DERIVED FROM THE CORE OF setGroupsWithButtons()
  const displayFilteredGroupBugs = () => {
    console.log("1");
    if (testingYay.current.length >= 1) {
      console.log("2");
      console.log(testingYay.current);
      testingYay.current.forEach((div) => {
        div.style.display="block";
      })
      testingYay.current = [];
    }

    //////////////////
    let temporaryGroupId;
    let groupNameFromDiv = document.getElementById("specific_group_filter");
    if (groupNameFromDiv.innerText !== "") {
      console.log("3");
      console.log(groupNameFromDiv);
      let tempGroupValues = Object.values(allGroups);
      tempGroupValues.forEach((item) => {
        if (item.name === groupNameFromDiv.innerText) {
          console.log("4");
          console.log(item);
          temporaryGroupId = item.id;
          console.log(temporaryGroupId);
        }
      })
    }
    /////////////////

    let dataId = temporaryGroupId;
    dataId = dataId.toString();
    console.log(typeof(dataId));
    let dataIdGroupName = allGroups[dataId].name;
    selectedGroupNameId.current = dataId;

    let allSingleBugDivs = document.querySelectorAll(".dbi_single_bug");
    let allProgressBugDivs = document.querySelectorAll(".dbi_progress_bug");
    let allCompletedBugDivs = document.querySelectorAll(".dbi_completed_bug");


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


    let specificGroupFilter = document.getElementById("specific_group_filter");
    specificGroupFilter.style.display="block";
    specificGroupFilter.innerText = dataIdGroupName;

    let resetGroupView = document.getElementById("reset_group_view");
    resetGroupView.style.display="block";

    let availableGroupsLabel = document.getElementById("available_groups_label");
    availableGroupsLabel.style.justifyContent="space-between";

    testingYay.current = hiddenDivs;
  }



  const setGroupsWithButtons = () => {
    let displayedGroups = document.querySelectorAll(".group_name_divs");

    displayedGroups.forEach((item) => {
      item.addEventListener('click', (event) => {

        if (hiddenDivs.length >= 1) {
          hiddenDivs.forEach((div) => {
            div.style.display="block";
          })
          hiddenDivs = [];
        }

        let dataId = (event.currentTarget).getAttribute('data-id');
        let dataIdGroupName = (event.currentTarget).innerText;
        selectedGroupNameId.current = dataId;

        let allSingleBugDivs = document.querySelectorAll(".dbi_single_bug");
        let allProgressBugDivs = document.querySelectorAll(".dbi_progress_bug");
        let allCompletedBugDivs = document.querySelectorAll(".dbi_completed_bug");


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


        let specificGroupFilter = document.getElementById("specific_group_filter");
        specificGroupFilter.style.display="block";
        specificGroupFilter.innerText = dataIdGroupName;

        let resetGroupView = document.getElementById("reset_group_view");
        resetGroupView.style.display="block";

        let availableGroupsLabel = document.getElementById("available_groups_label");
        availableGroupsLabel.style.justifyContent="space-between";

        testingYay.current = hiddenDivs;

      })
    })
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  // console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");





  // if (newUnassignedBugs) {
  //   if (Object.keys(newUnassignedBugs).length === 1) {
  //     let mustang = document.querySelector(".dbi_single_bug");
  //     if (mustang === null) {
  //       if ((Object.keys(allBugs)).length === 1) {
  //         if (newlyAddedBug) {
  //           dispatch(retrieveAllBugs());
  //         } else {

  //         }
  //       }
  //     }
  //   }
  //   setNewBugDivsWithButtons();
  // }

  // if (inProgressAssignedBugs) {
  //   console.log("FOX MEAT");
  //   if (Object.keys(inProgressAssignedBugs).length === 1) {
  //     let mustang = document.querySelector(".dbi_progress_bug");
  //     if (mustang === null) {
  //       if ((Object.keys(allBugs)).length === 1) {
  //         if (newlyAddedBug) {
  //           dispatch(retrieveAllBugs());
  //         } else {

  //         }
  //       }
  //     }
  //   }
  //   setInProgressBugDivsWithButtons();
  // }




  // if (completedResolvedBugs) {
  //   if (Object.keys(completedResolvedBugs).length === 1) {
  //     let mustang = document.querySelector(".dbi_completed_bug");
  //     if (mustang === null) {
  //       if ((Object.keys(allBugs)).length === 1) {
  //         if (newlyAddedBug) {
  //           dispatch(retrieveAllBugs());
  //         } else {

  //         }
  //       }
  //     }
  //   }
  //   setCompletedBugDivsWithButtons();
  // }















  let allGroupsValuesItems;
  if (allGroups) {
    allGroupsValuesItems = Object.values(allGroups);
  }

  if (newUnassignedBugs) {
    setNewBugDivsWithButtons();
  }

  if (inProgressAssignedBugs) {
    setInProgressBugDivsWithButtons();
  }

  if (completedResolvedBugs) {
    setCompletedBugDivsWithButtons();
  }

  /////////////////////  FIRST USE EFFECT()  /////////////////////
  useEffect(() => {
    dispatch(retrieveAllBugs());

    dispatch(retrieveAllGroups());

    return () => {
      // dispatch(resetAllBugItems());
      // dispatch(resetAllGroupItems());
    }
  }, [dispatch])    //  wasUpdated, test

  /////////////////////  SECOND USE EFFECT()  /////////////////////
  useEffect(() => {
    if (allGroups) {
      setGroupsWithButtons();
    }

    if (newUnassignedBugs) {
      setNewBugDivsWithButtons();
    }

    if (inProgressAssignedBugs) {
      setInProgressBugDivsWithButtons();
    }

    if (completedResolvedBugs) {
      setCompletedBugDivsWithButtons();
    }

    ////////////////////////////////////////////////////
    let specificGroupFilter = document.getElementById("specific_group_filter");
    if (testingYay.current.length >= 1 && specificGroupFilter.innerText !== "") {
      displayFilteredGroupBugs();
    }
    ////////////////////////////////////////////////////

    // console.log("2ND USE EFFECT()");
  })










  /////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   if (selectedGroupNameId.current >= 1000) {  //  change 1000 back to 1
  //     if (hiddenDivs.length >= 1) {
  //       hiddenDivs.forEach((div) => {
  //         div.style.display="block";
  //       })
  //       hiddenDivs = [];
  //     }

  //     let dataId = selectedGroupNameId.current;
  //     console.log(dataId);
  //     let dataIdGroupName = allGroups[dataId].name;
  //     console.log(dataIdGroupName);

  //     let allSingleBugDivs = document.querySelectorAll(".dbi_single_bug");
  //     let allProgressBugDivs = document.querySelectorAll(".dbi_progress_bug");
  //     let allCompletedBugDivs = document.querySelectorAll(".dbi_completed_bug");

  //     allSingleBugDivs.forEach((bug) => {
  //       let tempId = bug.getAttribute("data-group-id");
  //       if (tempId != dataId) {
  //         bug.style.display="none";
  //         hiddenDivs.push(bug);
  //       }
  //     })

  //     allProgressBugDivs.forEach((bug) => {
  //       let tempId = bug.getAttribute("data-group-id");
  //       if (tempId != dataId) {
  //         bug.style.display="none";
  //         hiddenDivs.push(bug);
  //       }
  //     })

  //     allCompletedBugDivs.forEach((bug) => {
  //       let tempId = bug.getAttribute("data-group-id");
  //       if (tempId != dataId) {
  //         bug.style.display="none";
  //         hiddenDivs.push(bug);
  //       }
  //     })


  //     if (hiddenDivs.length >= 1) {
  //       let specificGroupFilter = document.getElementById("specific_group_filter");
  //       specificGroupFilter.style.display="block";
  //       specificGroupFilter.innerText = dataIdGroupName;

  //       let resetGroupView = document.getElementById("reset_group_view");
  //       resetGroupView.style.display="block";

  //       let availableGroupsLabel = document.getElementById("available_groups_label");
  //       availableGroupsLabel.style.justifyContent="space-between";
  //     }


  //     testingYay.current = hiddenDivs;
  //   }

  // })
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
            Filter Bugs By Group
            <div id="specific_group_filter">

            </div>
            <div id="reset_group_view">
              <button onClick={showAllGroupBugs}>Show All Bugs</button>
            </div>
          </div>


          {allGroupsValuesItems && <div id="groups_container">
            {allGroupsValuesItems.map((group, index) => (
              <div className="group_name_divs" data-id={group.id} key={index}>
                {group.name}
              </div>
            ))}
          </div>}


        </div>

        <div id="final_new_bugs_label">New / Unassigned Bugs</div>

        <div className="main_divs" id="dbi_new_bugs">

          {newUnassignedBugs && <div id="dbi_new_bugs_list">
            {newBugsReversed && newBugsReversed.map((bug, index) => (

              <div className="dbi_single_bug" data-u-context={bug.user_id} data-group-id={bug.group_id} key={index}>
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

          {inProgressAssignedBugs && <div id="dbi_progress_bugs_list">
            {inProgressBugsReversed && inProgressBugsReversed.map((bug, index) => (

              <div className="dbi_progress_bug" data-u-context={bug.user_id} data-group-id={bug.group_id} key={index}>
                  {bug.title + ":"}
                <br></br>
                <div className="dbi_progress_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                  <div className="corner_information">Assignee:&nbsp;&nbsp;&nbsp; <span>{bug.assignee}</span></div>
                </div>
              </div>


            ))}
          </div>}

        </div>





        <div id="final_completed_bugs_label">Completed</div>

        <div className="main_divs" id="dbi_completed_bugs">

          {completedResolvedBugs && <div id="dbi_completed_bugs_list">
            {completedBugsReversed && completedBugsReversed.map((bug, index) => (

              <div className="dbi_completed_bug" data-u-context={bug.user_id} data-group-id={bug.group_id} key={index}>
                  {bug.title + ":"}
                <br></br>
                <div className="dbi_completed_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                  <div className="corner_information">Date Completed:&nbsp;&nbsp;&nbsp; <span>{bug.date_resolved.slice(0, -12)}</span></div>
                </div>
              </div>


            ))}
          </div>}

        </div>







      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBugForm showFunc={setShowModal} />
        </Modal>
      )}

      {/* {showEditGroupModal && (
        <Modal onClose={() => setShowEditGroupModal(false)}>
          <UpdateGroupForm showFunc={setShowEditGroupModal} />
        </Modal>
      )} */}
    </div>
  );
}

export default DisplayBugInfo;
