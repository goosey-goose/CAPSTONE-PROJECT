import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBug, setTheBugUpdate } from '../../store/bug';


const UpdateBugForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  // const [userId, setUserId] = useState(0);
  const allBugs = useSelector(state => state.bug.allBugs);
  const selectedBugId = useSelector(state => state.bug.selectedBugId);
  // console.log(selectedBugId);
  const allGroups = useSelector(state => state.group.allGroups);


  const [groupId, setGroupId] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["group_id"] ? allBugs[selectedBugId]["group_id"] : '');  ///////////////////////////////////////////
  const [dateResolved, setDateResolved] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["date_resolved"] ? (((new Date(allBugs[selectedBugId]["date_resolved"])).toISOString())).split('T')[0] : '1970-01-01');
  const [completed, setCompleted] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["date_resolved"] ? 1 : 0);
  const [dateAssigned, setDateAssigned] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["date_assigned"] ? (((new Date(allBugs[selectedBugId]["date_assigned"])).toISOString())).split('T')[0] : '1970-01-01');  //
  const [title, setTitle] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["title"] ? allBugs[selectedBugId]["title"] : '');
  const [content, setContent] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["content"] ? allBugs[selectedBugId]["content"] : '');
  const [assignee, setAssignee] = useState(allBugs[selectedBugId] && allBugs[selectedBugId]["assignee"] ? allBugs[selectedBugId]["assignee"] : '');
  const userId = useSelector(state => state.session.user.id);
  const bugUserId = allBugs[selectedBugId] && allBugs[selectedBugId]["user_id"] ? allBugs[selectedBugId]["user_id"] : '';
  // const [bugUserId, setBugUserId] = useState(allBugs[selectedBugId]["user_id"]);
  // const dateCreated = useSelector(state => state.bug.allBugs[selectedBugId]["date_created"]);
  const userName = useSelector(state => state.session.user.username);
  // console.log("COMPLETED: ", completed);
  // console.log("ASSIGNEE: ", assignee);
  // console.log("DATE ASSIGNED: ", dateAssigned);
  // console.log(                 (((new Date(dateAssigned)).toISOString())).split('T')[0]             );
  // console.log("date assigned type: ", typeof(dateAssigned));
  // console.log("DATE RESOLVED: ", dateResolved);
  // console.log("date resolved type: ", typeof(dateResolved));
  // console.log((allBugs[selectedBugId]["date_assigned"]));

  // (date.toJSON()).split('T')[0]
  // let date = new Date();
  // let hello = (date.toJSON()).split('T')[0];
  // console.log("TEST: ", hello);
  // let eben = (Date.parse('01 Jan 1970 00:00:00 GMT'))
  // let eben = new Date();
  // console.log("TEST EBEN");
  // console.log((eben.toJSON()).split('T')[0])

  const dispatch = useDispatch();

  const employees = [
    "Frank",
    "Perl",
    "Samantha",
    "Jonathan",
    "Tom",
    "Melissa",
    "Kathryn"
  ]


  // UPDATE BUG IN BACKEND BUTTON
  const onClickUpdate = async (e) => {
    e.preventDefault();
    // console.log(completed);
    // console.log("################  UPDATE BUG BUTTON  ##############");
    const data = await dispatch(setTheBugUpdate(userId, groupId, title, content, assignee, dateAssigned, dateResolved, selectedBugId));
    if (data) {
      setErrors(data);
    } else {
      showFunc(false);
    }
  };



  // console.log("////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////");
  // console.log(selectedBugId);
  // let divToDelete = document.getElementById(selectedBugId);
  // console.log(divToDelete);


  const deleteTheBug = async (e) => {
    e.preventDefault();
    // console.log("########  DELETE BUG BUTTON  ############");
    // console.log(selectedBugId);
    // console.log(allBugs.length);
    const data = await dispatch(deleteBug(selectedBugId));
    if (data) {
      setErrors(data);
    } else {
      // console.log("###############  IN DELETE BUTTON: AFTER BUG WAS DELETED  #####");
      // console.log(allBugs.length);
      // triggerUpdate(selectedBugId)
      // let divToDelete = document.getElementById(selectedBugId);
      // divToDelete.remove();
      showFunc(false)
    }
  }




  const updateGroupId = (e) => {
    setGroupId(e.target.value)
  }

  // console.log(groupId);
  // console.log(title);
  // console.log(content);
  // console.log(assignee);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };




  const updateContent = (e) => {
    setContent(e.target.value);
  };




  const updateAssignee = (e) => {
    if (e.target.value === '') {
      // setDateResolved('1970-01-01');  //////////////////////////////////////////////////////////////////////////////////
      setDateAssigned('1970-01-01');
      // setDateAssigned((Date.parse('01 Jan 1970 00:00:00 GMT')).toString())
    } else {
      // setDateResolved('1970-01-01');  ///////////////////////////////////////////////////////////////////////////////////
      let date = new Date();
      setDateAssigned((date.toJSON()).split('T')[0]);
    }

    setAssignee(e.target.value);
  };



  const updateDateResolved = (number) => {
    // console.log("MARTY MCFLY");
    // console.log("number: ", number);
    // console.log(typeof(number));
    if (number === "1") {
      // console.log("INSIDE THE MOUNTAIN");
      // setDateAssigned('1970-01-01');  ///////////////////////////////////////////////////////////////////////////////////
      let date = new Date();
      setDateResolved((date.toJSON()).split('T')[0]);
    } else {
      setDateResolved('1970-01-01');
      // setDateResolved((Date.parse('01 Jan 1970 00:00:00 GMT')).toString());
    }

  };

  const updateCompleted = (e) => {
    setCompleted(e.target.value);

    updateDateResolved(e.target.value);

  };




  let allGroupsKeys;
  let allGroupsValues;
  if (allGroups) {
    allGroupsKeys = Object.keys(allGroups)
    allGroupsValues = Object.values(allGroups)
  }

  // useEffect(() => {

  // }, [])

  let showTheDeleteButton = false;
  if (userId === bugUserId || userName === "admin") {
    showTheDeleteButton = true;
  }


  return (
    <form onSubmit={onClickUpdate}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      {/* INPUT FOR GROUP_ID */}
      <div>
        <label htmlFor='group'>Assign to a Group</label>
        <select value={groupId} name='group' onChange={updateGroupId}>
          {/* <option value={''}>Please Select a Group to Assign To</option> */}
          {allGroups && allGroupsValues.map((group, index) => (
            <option key={index} value={allGroupsKeys[index]}>{group.name}</option>
          ))}
        </select>
      </div>


      {/* INPUT FOR TITLE */}
      <div>
        <label htmlFor='title'>Title</label>
        <input
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={updateTitle}
        />
      </div>

      {/* INPUT FOR CONTENT */}
      <div>
        <label htmlFor='content'>Content</label>
        <input
          name='content'
          type='text'
          placeholder='content'
          value={content}
          onChange={updateContent}
        />
      </div>

      {/* INPUT FOR ASSIGNEE */}
      <div>
        <label htmlFor='assignee'>Assignee</label>
        <select value={assignee} name='assignee' onChange={updateAssignee}>
          <option value={''}>Please Select Assignee</option>
          {employees && employees.map((employee, index) => (
            <option key={index} value={employee}>{employee}</option>
          ))}
        </select>
      </div>


      {/* INPUT FOR COMPLETED */}
      <div>
        <label htmlFor='completed'>COMPLETION STATUS</label>
        <select value={completed} name='completed' onChange={updateCompleted}>
          <option value={0}>Not Completed</option>
          <option value={1}>{`Completed`}</option>
        </select>
      </div>


      <button type='submit'>Update Bug</button>

      {showTheDeleteButton && <button onClick={deleteTheBug}>DELETE BUG</button>}
    </form>
  );
};

export default UpdateBugForm;
