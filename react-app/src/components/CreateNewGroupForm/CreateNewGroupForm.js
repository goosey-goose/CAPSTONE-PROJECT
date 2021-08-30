import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { createNewGroup } from '../../store/group';  //  EBEN:  CHANGE THIS!!!!!
import './CreateNewGroupForm.css';


const CreateNewGroupForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState('');
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
  };



  const updateGroupName = (e) => {
    setGroupName(e.target.value);
  }

  return (
    <form id="cngf_actual_form" onSubmit={onClickSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>


      {/* INPUT FOR GROUP NAME */}
      <div className="cngf_line_items">
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
