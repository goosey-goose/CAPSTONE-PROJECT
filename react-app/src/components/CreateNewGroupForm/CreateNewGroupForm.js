import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { createNewGroup } from '../../store/group';  //  EBEN:  CHANGE THIS!!!!!
import './CreateNewGroupForm.css';


const CreateNewGroupForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupExistsError2, setGroupExistsError2] = useState(false);
  let allGroups = useSelector(state => state.group.allGroups);
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


  let allGroupsValues = Object.values(allGroups);


  const updateGroupName = (e) => {
    setGroupExistsError2(false);
    setGroupName(e.target.value);

    allGroupsValues.forEach((group) => {
      if (e.target.value === group.name) {
        console.log("NAME ALREADY EXISTS");
        setGroupExistsError2(true);
      }
    })
  }

  return (
    <>
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
          minLength="1"
          maxLength="20"
        />
      </div>

      <button type='submit' disabled={!groupName || groupExistsError2}>Create New Group</button>
    </form>


    {groupExistsError2 && <div id="cngf_group_exists_error">*Group name already exists.</div>}

    </>

  );
};

export default CreateNewGroupForm;
