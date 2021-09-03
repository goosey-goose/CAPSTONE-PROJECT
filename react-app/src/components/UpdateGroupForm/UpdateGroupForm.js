import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setTheGroupUpdate, removeTheGroup } from '../../store/group';
import './UpdateGroupForm.css';


const UpdateGroupForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState();
  const [deleteGroupError, setDeleteGroupError] = useState(false);
  const [groupExistsError, setGroupExistsError] = useState(false);
  let allGroups = useSelector(state => state.group.allGroups);
  let allBugs = useSelector(state => state.bug.allBugs);
  const dispatch = useDispatch();

  let allGroupsValues = Object.values(allGroups);
  let allBugsValues = Object.values(allBugs);

  // UPDATE GROUP BUTTON
  const onClickUpdateGroup = async (e) => {
    e.preventDefault();
    const data = await dispatch(setTheGroupUpdate(groupName, groupId));
    if (data) {
      setErrors(data);
    } else {
      //////////////////////////////////////////
      //////////////////////////////////////////
      showFunc(false)
    }
  };



  // DELETE GROUP BUTTON
  const deleteGroup = async (e) => {
    e.preventDefault();
    let canDelete = true;
    allBugsValues.forEach((bug) => {
        if (bug.group_id == groupId) {
            canDelete = false;
            setDeleteGroupError(true);
            // return null;
        }
    })
    if (canDelete) {
        const data = await dispatch(removeTheGroup(groupId));
        if (data) {
            setErrors(data);
        } else {
            // let veryTempGroups = Object.values(allGroups);
            // console.log(veryTempGroups);
            // if (veryTempGroups.length === 1) {
            //   console.log("SEPTEMBER");
            //   let specificGFilter = document.getElementById("specific_group_filter");
            //   specificGFilter.innerText = "";
            // }
            setDeleteGroupError(false);
            showFunc(false);
            let veryTempGroups = Object.values(allGroups);
            if (veryTempGroups.length === 1) {
            // if (true) {
              // console.log("SEPTEMBER");
              let specificGFilter = document.getElementById("specific_group_filter");
              specificGFilter.innerText = "";

              let resetGroupView = document.getElementById("reset_group_view");
              resetGroupView.style.display="none";

              let availableGroupsLabel = document.getElementById("available_groups_label");
              availableGroupsLabel.style.justifyContent="center";
            }

            if (allBugsValues.length === 0) {
              let sGFilter = document.getElementById("specific_group_filter");
              if (sGFilter.innerText !== "") {
                sGFilter.innerText = "";
              }
            }

            // return <Redirect to='/' />;
        }
    }
  }



  const updateGroupName = (e) => {
    if (deleteGroupError) {
      // setDeleteGroupError(false);
    }
    setGroupName(e.target.value);
    console.log(e.target.value);
    setGroupExistsError(false);
    allGroupsValues.forEach((group) => {
      if (e.target.value === group.name) {
        console.log("NAME ALREADY EXISTS");
        setGroupExistsError(true);
        // let groupExistsErrorDiv = document.getElementById("ugf_group_exists_error");
        // console.log(groupExistsErrorDiv);
        // groupExistsErrorDiv.innerText = "*Group name already exists.";
        // groupExistsErrorDiv.style.display="block";
        // console.log(groupExistsErrorDiv.innerText);
      } else if (e.target.value !== group.name) {
        // console.log("THE OFFICE");
        // console.log(e.target.value);
        // setGroupExistsError(false);
        // let groupExistsErrorDiv = document.getElementById("ugf_group_exists_error");
        // groupExistsErrorDiv.style.display="none";
        // groupExistsErrorDiv.innerText = "";
      }
    })
  }

  let displayedInputs = [];

  useEffect(() => {
    let updateGroupListItemDivs = document.querySelectorAll(".update_group_list_item_divs");
    updateGroupListItemDivs.forEach((div) => {
        div.addEventListener('click', () => {
            setDeleteGroupError(false);
            displayedInputs.forEach((inputItem) => {
                inputItem.style.display="none";
            })

            let divGroupId = div.getAttribute("data-id");
            setGroupId(divGroupId);

            // div.children.style.display="inline";
            // let divChildren = div.children;
            let divChildren = div.childNodes;
            // console.log(divChildren["1"]);
            divChildren["1"].style.display="inline";
            displayedInputs.push(divChildren["1"]);
        })
    })
  })



  return (
    <div id="update_group_form_div_container">
        <form onSubmit={onClickUpdateGroup}>
        <div>
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>



        <div id="ugf_directive_div">
          Click On A Group To Edit Its Name Or Delete It
        </div>



        <div id="update_group_list_container">
            {allGroupsValues && allGroupsValues.map((group, index) => (

                <div className="update_group_list_item_divs" data-id={group.id} key={index}><span>{group.name}</span>
                    <input type='text' minLength="1" maxLength="20" placeholder='New Group Name' value={groupName} onChange={updateGroupName}></input></div>


            ))}
        </div>


        <div id="ugf_buttons_container_div">
          <button type='submit' disabled={!groupName || groupExistsError}>Update Group Name</button>
          <button type='button' disabled={!groupId} onClick={deleteGroup}>DELETE GROUP</button>
        </div>

        </form>
        {/* <div id="ugf_group_exists_error"></div> */}
        {deleteGroupError && <div id="ugf_associated_bugs_error">*There are bugs currently associated with this group. Please delete them and try again.</div>}
        {groupExistsError && <div id="ugf_group_exists_error">*Group name already exists.</div>}
        {/* <div id="ugf_group_exists_error">{" "}</div> */}
    </div>
  );
};

export default UpdateGroupForm;
