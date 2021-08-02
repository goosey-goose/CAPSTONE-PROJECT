import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';


const CreateNewBugForm = () => {
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(null);
  const [groupId, setGroupId] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [assignee, setAssignee] = useState(null);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  // CREATE NEW BUG BUTTON
  const onClickSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(email, password));
    // const data = await ;
    // if (data) {
    //   setErrors(data);
    // }
  };



  // UPDATE BUG (IN THE BACKEND) BUTTON
  const onLogin = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // }
  };



  const updateGroupId = (e) => {
    setGroupId(e.target.value)
    console.log(groupId);
  }



  const updateTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };




  const updateContent = (e) => {
    setContent(e.target.value);
    console.log(content);
  };




  const updateAssignee = (e) => {
    setAssignee(e.target.value);
    console.log(assignee);
  };




  if (user) {
    // return <Redirect to='/' />;
  }




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
          <option value=''>Please Select a Group to Assign To</option>
          <option value='1'>Group 1</option>
        </select>
        {/* <input
          name='group'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        /> */}
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
          <option value=''>Please Select a Group to Assign To</option>
          <option value='1'>Group 1</option>
        </select>
      </div>

    </form>
  );
};

export default CreateNewBugForm;
