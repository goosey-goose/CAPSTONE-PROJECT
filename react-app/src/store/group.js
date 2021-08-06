const SET_GROUP = 'groups/SET_GROUP';
const SET_ALL_GROUPS = 'groups/SET_ALL_GROUPS';
const DELETE_GROUP = 'groups/DELETE_GROUP';
const SELECTED_GROUP = 'groups/SELECTED_GROUP';
const RESET_ALL = 'groups/RESET_ALL';


//  ACTIONS
const setGroup = (group) => ({
  type: SET_GROUP,
  payload: group
});

const setAllGroups = (allGroups) => ({
  type: SET_ALL_GROUPS,
  payload: allGroups
});

const removeGroup = (groupId) => ({
  type: DELETE_GROUP,
  payload: groupId
});

const setSelectedGroupId = (groupDivId) => ({
  type: SELECTED_GROUP,
  payload: groupDivId
});

const resetAll = () => ({
  type: RESET_ALL,
  payload: null
})



//  THUNKS
export const createNewGroup = (name) => async (dispatch) => {
  console.log(name);
  const response = await fetch('/api/groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,   //  user_id   or   "user_id": 1
    }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log("##############  INSIDE CREATE NEW GROUP THUNK  #########");
    console.log(data);
    dispatch(setGroup(data))
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



export const retrieveAllGroups = () => async (dispatch) => {
  const response = await fetch('/api/groups/all');

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllGroups(data))
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




// export const deleteBug = (dbpk_id) => async (dispatch) => {
//   const response = await fetch(`/api/bugs/delete/${dbpk_id}`);

//   if (response.ok) {
//     const data = await response.json();
//     // console.log(data.id);
//     dispatch(removeBug(data))
//     return null
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors
//     }
//   } else {
//     return ['An error occurred. Please try again.']
//   }
// }




// export const setTheSelectedBugId = (bugDivId) => async (dispatch) => {
//   dispatch(setSelectedBugId(bugDivId));
// }




export const resetAllGroupItems = () => async (dispatch) => {
  dispatch(resetAll());
}





//  REDUCER
const initialState = { selectedGroupId: null, newlyAddedGroup: null, allGroups: null }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUP:
      state.allGroups[action.payload["dbpk_id"]] = action.payload["new_group"];
      return { newlyAddedGroup: action.payload, allGroups: { ...state.allGroups } }
    case SET_ALL_GROUPS:
      return { ...state, allGroups: action.payload }
    // case DELETE_BUG:
    //   let newState = {...state}
    //   delete newState[action.payload]
    //   return newState
    // case SELECTED_BUG:
    //   return { ...state, selectedBugId: action.payload }
    case RESET_ALL:
      return { ...state, selectedGroupId: null, newlyAddedGroup: null, allGroups: null }
    default:
      return state;
  }
}
