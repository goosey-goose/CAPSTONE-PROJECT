const SET_BUG = 'bug/SET_BUG';
const SET_ALL_BUGS = 'bugs/SET_ALL_BUGS';
const DELETE_BUG = 'bugs/DELETE_BUG';


//  ACTIONS
const setBug = (bug) => ({
  type: SET_BUG,
  payload: bug
});

const setAllBugs = (allBugs) => ({
  type: SET_ALL_BUGS,
  payload: allBugs
})

const removeBug = (bugId) => ({
  type: DELETE_BUG,
  payload: bugId
})



//  THUNKS
export const createNewBug = (user_id, group_id, date_created, title, content, assignee) => async (dispatch) => {
  const response = await fetch('http://localhost:3000/api/bugs/create', {
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
    console.log("##############");
    console.log(data);
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
  const response = await fetch('http://localhost:3000/api/bugs/all');

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
  const response = await fetch(`http://localhost:3000/api/bugs/delete/${dbpk_id}`);

  if (response.ok) {
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





//  REDUCER
const initialState = { newlyAddedBug: null, allBugs: null }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUG:
      state.allBugs[action.payload["dbpk_id"]] = action.payload["new_bug"];
      return { newlyAddedBug: action.payload, allBugs: { ...state.allBugs } }
    case SET_ALL_BUGS:
      return { ...state, allBugs: action.payload }
    case DELETE_BUG:
      let newState = {...state}
      delete newState[action.payload]
      return newState
    default:
      return state;
  }
}
