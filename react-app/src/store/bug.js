const SET_BUG = 'bug/SET_BUG';
const SET_ALL_BUGS = 'bugs/SET_ALL_BUGS';
const UPDATE_BUG = 'bugs/UPDATE_BUG';
const DELETE_BUG = 'bugs/DELETE_BUG';
const SELECTED_BUG = 'bugs/SELECTED_BUG';


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



//  THUNKS
export const createNewBug = (user_id, group_id, date_created, title, content, assignee) => async (dispatch) => {
  if (group_id === 0) {
    // console.log("INSIDE THUNK IF STATEMENT ####################");
    group_id = 1;
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
      assignee
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

  if (response.ok) {
    const data = await response.json();
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






export const setTheBugUpdate = (group_id, title, content, assignee, bug_id) => async (dispatch) => {
  console.log("##############  OUTER UPDATE BUG THUNK  #########################");
  console.log("GROUP ID: ", group_id);
  console.log("TITLE: ", title);
  console.log("CONTENT: ", content);
  console.log("ASSIGNEE: ", assignee);
  console.log("BUG ID: ", bug_id);
  const response = await fetch(`/api/bugs/update/${bug_id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      group_id,
      title,
      content,
      assignee
    }),
  });

  if (response.ok) {
    // console.log("#############  INNER UPDATE BUG THUNK  #################");
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








//  REDUCER
const initialState = { selectedBugId: null, newlyAddedBug: null, allBugs: null }

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_BUG:
      state.allBugs[action.payload["dbpk_id"]] = action.payload["new_bug"];
      return { newlyAddedBug: action.payload, allBugs: { ...state.allBugs } }
    case SET_ALL_BUGS:
      return { ...state, allBugs: action.payload }




    case UPDATE_BUG:
      newState = {
        ...state,
        allBugs: {
          ...state.allBugs,
          // [action.payload["dbpk_id"]]: action.payload["updated_bug"]
        }
      }
      newState.allBugs[action.payload["dbpk_id"]] = action.payload["updated_bug"]
      return newState








    case DELETE_BUG:
      console.log("###############  INSIDE DELETE BUG:  REDUCER  ################");
      console.log(action.payload)
      newState = {...state, selectedBugId: null}
      // console.log(newState);
      delete newState.allBugs[action.payload["id"]]
      console.log(newState);
      return newState




    case SELECTED_BUG:
      return { ...state, selectedBugId: action.payload }
    default:
      return state;
  }
}
