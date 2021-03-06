const SET_BUG = 'bug/SET_BUG';
const SET_ALL_BUGS = 'bugs/SET_ALL_BUGS';
const UPDATE_BUG = 'bugs/UPDATE_BUG';
const DELETE_BUG = 'bugs/DELETE_BUG';
const SELECTED_BUG = 'bugs/SELECTED_BUG';
const RESET_ALL = 'bugs/RESET_ALL';


//  ACTIONS
const setBug = (bug) => ({
  type: SET_BUG,
  payload: bug
});

const setAllBugs = (allBugs) => ({
  type: SET_ALL_BUGS,
  payload: allBugs
});

const setBugUpdate = (bug) => ({
  type: UPDATE_BUG,
  payload: bug
});

const removeBug = (bugId) => ({
  type: DELETE_BUG,
  payload: bugId
});

const setSelectedBugId = (bugDivId) => ({
  type: SELECTED_BUG,
  payload: bugDivId
});

const resetAll = () => ({
  type: RESET_ALL,
  payload: null
})



//  THUNKS
export const createNewBug = (user_id, group_id, date_created, title, content, assignee, date_assigned) => async (dispatch) => {
  if (group_id === 0) {
    // console.log("INSIDE THUNK IF STATEMENT ####################");
    // group_id = 1;
  }
  const response = await fetch('/api/bugs/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,   //  user_id   or   "user_id": 1
      group_id,
      date_created,
      title,
      content,
      assignee,
      date_assigned
    }),
  });

  if (response.ok) {
    const data = await response.json();
    // console.log("##############");
    // console.log(data);
    dispatch(setBug(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}



export const retrieveAllBugs = () => async (dispatch) => {
  const response = await fetch('/api/bugs/all');
  // console.log("############# FRED FLINSTONE ##############");
  if (response.ok) {
    let data = await response.json();
    // console.log(data);
    const allRetrievedBugs = { ...data }
    let unassignedBugs = {};
    let inProgressBugs = {};
    let completedBugs = {};
    let returnedDataKeys = Object.keys(data);
    let returnedDataValues = Object.values(data);
    for (let i = 0; i < returnedDataValues.length; ++i) {
      if (!returnedDataValues[i].assignee && !returnedDataValues[i].date_resolved) {
        unassignedBugs[returnedDataKeys[i]] = returnedDataValues[i]
      }
      if (returnedDataValues[i].assignee && !returnedDataValues[i].date_resolved) {
        inProgressBugs[returnedDataKeys[i]] = returnedDataValues[i]
      }
      if (returnedDataValues[i].date_resolved) {
        completedBugs[returnedDataKeys[i]] = returnedDataValues[i]
      }
    }
    // console.log(unassignedBugs);
    // console.log(inProgressBugs);
    // console.log(completedBugs);
    data = {
      allRetrievedBugs,
      unassignedBugs,
      inProgressBugs,
      completedBugs
    }
    dispatch(setAllBugs(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}




export const deleteBug = (dbpk_id) => async (dispatch) => {
  // console.log("##########  DELETE BUG THUNK  ##############");
  const response = await fetch(`/api/bugs/delete/${dbpk_id}`, {
    method: 'DELETE'
  });
  // console.log("#############  AFTER THUNK FETCH  ###############");

  if (response.ok) {
    // console.log("###########  AFTER RESPONSE.OK  ##################");
    const data = await response.json();
    // console.log(data.id);
    dispatch(removeBug(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}




export const setTheSelectedBugId = (bugDivId) => async (dispatch) => {
  dispatch(setSelectedBugId(bugDivId));
}






export const setTheBugUpdate = (user_id, group_id, title, content, assignee, date_assigned, date_resolved, bug_id) => async (dispatch) => {

  // console.log("##############  OUTER UPDATE BUG THUNK  #########################");
  // console.log("USER_ID: ", user_id);
  // console.log("GROUP ID: ", group_id);
  // // console.log("DATE CREATED: ", date_created);
  // console.log("TITLE: ", title);
  // console.log("CONTENT: ", content);
  // console.log("ASSIGNEE: ", assignee);
  // console.log("DATE ASSIGNED: ", date_assigned);
  // console.log("DATE RESOLVED: ", date_resolved);
  // console.log("BUG ID: ", bug_id);

  const response = await fetch(`/api/bugs/update/${bug_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id,
      group_id,
      title,
      content,
      assignee,
      date_assigned,
      date_resolved
    }),
  });

  if (response.ok) {
    console.log("#############  INNER UPDATE BUG THUNK  #################");
    const data = await response.json();
    console.log(data);
    dispatch(setBugUpdate(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}





export const resetAllBugItems = () => async (dispatch) => {
  dispatch(resetAll());
}








//  REDUCER
const initialState = { selectedBugId: null, newlyAddedBug: null, allBugs: null, newUnassignedBugs: null, inProgressAssignedBugs: null, completedResolvedBugs: null }

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {




    // DONE /////////////////////////////////////////////////////////
    case SET_BUG:
      newState = { ...state, newlyAddedBug: action.payload, allBugs: { ...state.allBugs } }
      newState.allBugs[action.payload["dbpk_id"]] = action.payload["new_bug"]
      return newState;
      // state.allBugs[action.payload["dbpk_id"]] = action.payload["new_bug"];
      // return { newlyAddedBug: action.payload, allBugs: { ...state.allBugs } }





    // DONE /////////////////////////////////////////////////////////
    case SET_ALL_BUGS:
      return { ...state, allBugs: action.payload.allRetrievedBugs, newUnassignedBugs: action.payload.unassignedBugs, inProgressAssignedBugs: action.payload.inProgressBugs, completedResolvedBugs: action.payload.completedBugs }





    case UPDATE_BUG:     //  check where the returned updated object currently exists, then delete it. THEN, check the specific bug type to then determine which bug type object to add it to
      newState = {...state, allBugs: {...state.allBugs}, newUnassignedBugs: {...state.newUnassignedBugs}, inProgressAssignedBugs: {...state.inProgressAssignedBugs}, completedResolvedBugs: {...state.completedResolvedBugs} }

      console.log("@@@@@@@@@@@@  INSIDE UPDATE_BUG  @@@@@@@@@@@@@@@@@@@@");
      console.log(action.payload);

      if (newState.newUnassignedBugs[action.payload["dbpk_id"]]) delete newState.newUnassignedBugs[action.payload["dbpk_id"]]
      if (newState.inProgressAssignedBugs[action.payload["dbpk_id"]]) delete newState.inProgressAssignedBugs[action.payload["dbpk_id"]]
      if (newState.completedResolvedBugs[action.payload["dbpk_id"]]) delete newState.completedResolvedBugs[action.payload["dbpk_id"]]

      // console.log("@@@@@@@@@@@@@@@@@@@@  STOMACH ACHE  @@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log(action.payload);
      console.log(!action.payload["updated_bug"]["date_resolved"] && action.payload["updated_bug"]["assignee"] && action.payload["updated_bug"]["date_assigned"]);

      // ASSIGNEE: FALSE         &&         DATE RESOLVED: FALSE
      if (!action.payload["updated_bug"]["assignee"] && !action.payload["updated_bug"]["date_resolved"]) newState.newUnassignedBugs[action.payload["dbpk_id"]] = action.payload["updated_bug"]

      // DATE RESOLVED: FALSE         &&         ASSIGNEE: TRUE         &&         DATE ASSIGNED: TRUE
      if (!action.payload["updated_bug"]["date_resolved"] && action.payload["updated_bug"]["assignee"] && action.payload["updated_bug"]["date_assigned"]) newState.inProgressAssignedBugs[action.payload["dbpk_id"]] = action.payload["updated_bug"]

      // DATE RESOLVED: TRUE
      if (action.payload["updated_bug"]["date_resolved"]) newState.completedResolvedBugs[action.payload["dbpk_id"]] = action.payload["updated_bug"]

      newState.allBugs[action.payload["dbpk_id"]] = action.payload["updated_bug"]
      return newState







    // DONE ////////////////////////////////////////////////////////
    case DELETE_BUG:
      console.log("###############  INSIDE DELETE BUG:  REDUCER  ################");
      console.log(action.payload)
      newState = {...state, selectedBugId: null, allBugs: { ...state.allBugs }, newUnassignedBugs: {...state.newUnassignedBugs}, inProgressAssignedBugs: {...state.inProgressAssignedBugs}, completedResolvedBugs: {...state.completedResolvedBugs}}

      if (newState.newUnassignedBugs[action.payload["id_of_bug_deleted"]]) delete newState.newUnassignedBugs[action.payload["id_of_bug_deleted"]]
      if (newState.inProgressAssignedBugs[action.payload["id_of_bug_deleted"]]) delete newState.inProgressAssignedBugs[action.payload["id_of_bug_deleted"]]
      if (newState.completedResolvedBugs[action.payload["id_of_bug_deleted"]]) delete newState.completedResolvedBugs[action.payload["id_of_bug_deleted"]]
      delete newState.allBugs[action.payload["id_of_bug_deleted"]]
      return newState




    case SELECTED_BUG:
      return { ...state, selectedBugId: action.payload }
    case RESET_ALL:
      return { ...state, selectedBugId: null, newlyAddedBug: null, allBugs: null, newUnassignedBugs: null, inProgressAssignedBugs: null, completedResolvedBugs: null }
    default:
      return state;
  }
}
