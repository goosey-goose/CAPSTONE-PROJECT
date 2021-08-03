import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNewBug } from '../../store/bug';///////////////////////////////////////  EBEN: IMPORT THUNK FROM STORE IN ORDER TO UPDATE BUG


const UpdateBugForm = () => {
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(0);
  const [groupId, setGroupId] = useState(0);
  // const [dateResolved, setDateResolved] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [assignee, setAssignee] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  // UPDATE BUG IN BACKEND BUTTON
  const onClickSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createNewBug(userId, groupId, formattedDate, title, content, assignee)); /////////  updateBug thunk goes here....
    if (data) {
      setErrors(data);
    }
  };




  const updateGroupId = (e) => {
    setGroupId(e.target.value)
  }

  console.log(typeof(user.id));
  console.log("User ID: ", userId);
  console.log(groupId);
  console.log(title);
  console.log(content);
  console.log(assignee);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };




  const updateContent = (e) => {
    setContent(e.target.value);
  };




  const updateAssignee = (e) => {
    setAssignee(e.target.value);
  };




  if (user) {
    // return <Redirect to='/' />;
  }



  useEffect(() => {
    // let myUserId = user.id;
    // let n = myUserId.toString()
    // console.log(n);
    // console.log("type of n: ", typeof(n));
    setUserId(user.id)
  }, [userId, user.id])


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
          <option>Please Select a Group to Assign To</option>
          <option value={1}>Group 1</option>
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
          <option>Please Select Assignee</option>
          <option value='Tom Cruise'>Tom Cruise</option>
        </select>
      </div>
      <button type='submit'>Create New Bug</button>
    </form>
  );
};

export default UpdateBugForm;
