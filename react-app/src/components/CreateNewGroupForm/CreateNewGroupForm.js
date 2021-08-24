import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { createNewGroup } from '../../store/group';  //  EBEN:  CHANGE THIS!!!!!


const CreateNewGroupForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();



  // CREATE NEW GROUP BUTTON
  const onClickSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createNewGroup(groupName));
    if (data) {
      setErrors(data);
    } else {
      showFunc(false)
    }
    // console.log("you created a new group");
  };

  // console.log(groupName);

  // UPDATE GROUP (IN THE BACKEND) BUTTON
  const onLogin = async (e) => {
    e.preventDefault();
    // const data = await dispatch(login(email, password));
    // if (data) {
    //   setErrors(data);
    // }
  };

  const updateGroupName = (e) => {
    setGroupName(e.target.value);
  }

  return (
    <form onSubmit={onClickSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>


      {/* INPUT FOR GROUP NAME */}
      <div>
        <label htmlFor='groupName'>Group Name</label>
        <input
          name='groupName'
          type='text'
          placeholder='Group Name'
          value={groupName}
          onChange={updateGroupName}
        />
      </div>

      <button type='submit' disabled={!groupName}>Create New Group</button>
    </form>
  );
};

export default CreateNewGroupForm;
