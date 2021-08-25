import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { createNewBug, retrieveAllBugs } from '../../store/bug';


const CreateNewBugForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(0);
  const [groupId, setGroupId] = useState(0);
  // const [dateCreated, setDateCreated] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dateAssigned, setDateAssigned] = useState();
  // const [isButtonReady, setIsButtonReady] = useState(true)
  const user = useSelector(state => state.session.user);
  const allGroups = useSelector(state => state.group.allGroups);
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



  // CREATE NEW BUG BUTTON
  const onClickSubmit = async (e) => {
    e.preventDefault();
    let date = new Date();
    let formattedDate = (date.toJSON()).split('T')[0];
    const data = await dispatch(createNewBug(userId, groupId, formattedDate, title, content, assignee, dateAssigned));
    if (data) {
      setErrors(data);
    } else {
      // makeBug(title)
      // console.log("@@@@@@@@@@@@@@@@@@@@@@  WALTER WHITE  @@@@@@@@@@@@@@@@@@@@@");
      dispatch(retrieveAllBugs());
      showFunc(false)
    }
  };





  const updateGroupId = (e) => {
    setGroupId(e.target.value)
  }

  // console.log(typeof(user.id));
  // console.log("User ID: ", userId);
  // console.log(groupId);
  // console.log(title);
  // console.log(content);
  console.log(assignee);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };




  const updateContent = (e) => {
    setContent(e.target.value);
  };




  const updateAssignee = (e) => {
    if (e.target.value !== '') {
      let date = new Date();
      setDateAssigned((date.toJSON()).split('T')[0]);
    } else {
      setDateAssigned('');
    }

    setAssignee(e.target.value);
  };




  if (user) {
    // return <Redirect to='/' />;
  }

  let allGroupsKeys;
  let allGroupsValues;
  if (allGroups) {
    allGroupsKeys = Object.keys(allGroups)
    allGroupsValues = Object.values(allGroups)
  }

  useEffect(() => {
    setUserId(user.id)
  }, [userId, user.id])

  // console.log("##########  ALL GROUPS: LINE 90 ############");
  // console.log(allGroups);







  return (
    <form onSubmit={onClickSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      {/* INPUT FOR GROUP_ID */}
      <div>
        <label htmlFor='group'>Assign to a Group</label>
        <select value={groupId} name='group' onChange={updateGroupId}>
          <option value={''}>Please Select a Group to Assign To</option>
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
      <button type='submit' disabled={!(title && content)}>Create New Bug</button>
    </form>
  );
};

export default CreateNewBugForm;
