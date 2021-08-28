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
            setDeleteGroupError(false);
            showFunc(false)
            // return <Redirect to='/' />;
        }
    }
  }



  const updateGroupName = (e) => {
    setGroupName(e.target.value);
  }

  let displayedInputs = [];

  useEffect(() => {
    let updateGroupListItemDivs = document.querySelectorAll(".update_group_list_item_divs");
    updateGroupListItemDivs.forEach((div) => {
        div.addEventListener('click', () => {
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



        <div>
          Click On A Group To Edit Its Name Or Delete It
        </div>



        <div id="update_group_list_container">
            {allGroupsValues && allGroupsValues.map((group, index) => (

                <div className="update_group_list_item_divs" data-id={group.id} key={index}><span>{group.name}</span>
                    <input type='text' placeholder='New Group Name' value={groupName} onChange={updateGroupName}></input></div>


            ))}
        </div>


        <div id="ugf_buttons_container_div">
          <button type='submit' disabled={!groupName}>Update Group Name</button>
          <button type='button' disabled={!groupId} onClick={deleteGroup}>DELETE GROUP</button>
        </div>

        </form>
        {deleteGroupError && <div>*There are bugs currently associated with this group. Please delete them and try again.</div>}
    </div>
  );
};

export default UpdateGroupForm;
