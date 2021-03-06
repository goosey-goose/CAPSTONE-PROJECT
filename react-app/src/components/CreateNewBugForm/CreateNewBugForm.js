import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { createNewBug, retrieveAllBugs } from '../../store/bug';
import './CreateNewBugForm.css';


const CreateNewBugForm = ({ showFunc }) => {
  const [errors, setErrors] = useState([]);
  const [userId, setUserId] = useState(0);
  // const [groupId, setGroupId] = useState(0);
  // const [dateCreated, setDateCreated] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dateAssigned, setDateAssigned] = useState();
  // const [isButtonReady, setIsButtonReady] = useState(true)
  const user = useSelector(state => state.session.user);
  const allGroups = useSelector(state => state.group.allGroups);
  /////////////////////////////////////////////////////////////
  let tempGroupVals;
  if (allGroups) {
    tempGroupVals = Object.values(allGroups)
  }
  const [groupId, setGroupId] = useState(tempGroupVals.length ? tempGroupVals[0]["id"] : 0);
  /////////////////////////////////////////////////////////////
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
  console.log(content);
  // console.log(assignee);

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


  useEffect(() => {
    // let ebens = [];
    // console.log(!!ebens.length);
    // console.log(!!0);
  })



  return (
    <form id="cnbf_form" onSubmit={onClickSubmit}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>

      {/* INPUT FOR GROUP_ID */}
      <div className="cnbf_line_items">
        <label htmlFor='group'>*Assign Bug to a Group</label>
        <select id="cnbf_select_group_id" value={groupId} name='group' onChange={updateGroupId}>
          {/* <option value={''}>Please Select a Group to Assign To</option> */}
          {allGroups && allGroupsValues.map((group, index) => (
            <option key={index} value={allGroupsKeys[index]}>{group.name}</option>
          ))}
        </select>
      </div>


      {/* INPUT FOR TITLE */}
      <div className="cnbf_line_items">
        <label htmlFor='title'>*Title</label>
        <input
          id="cnbf_input_element_for_title"
          name='title'
          type='text'
          placeholder='title'
          value={title}
          onChange={updateTitle}
          minLength="1"
          maxLength="50"
        />
      </div>



      {/* INPUT FOR ASSIGNEE */}
      <div className="cnbf_line_items">
        <label htmlFor='assignee'>Assignee</label>
        <select id="cnbf_select_assignee" value={assignee} name='assignee' onChange={updateAssignee}>
          <option value={''}>Select Assignee</option>
          {employees && employees.map((employee, index) => (
            <option key={index} value={employee}>{employee}</option>
          ))}
        </select>
      </div>



      {/* INPUT FOR CONTENT */}
      <div className="cnbf_line_items">
        <label htmlFor='content'>*Content</label>
        <textarea
          id="cnbf_textarea_content"
          name='content'
          type='text'
          placeholder='content'
          value={content}
          onChange={updateContent}
          minLength="1"
          maxLength="500"
        />
      </div>


      {/* LABEL FOR REQUIRED INFO */}
      <div id="denotes_required">* denotes required</div>


      <button type='submit' disabled={!(title && content) || !groupId}>Create New Bug</button>
      {!groupId && <div id="cnbf_please_create_a_group_first">*Please Create a Group First</div>}
    </form>
  );
};

export default CreateNewBugForm;
