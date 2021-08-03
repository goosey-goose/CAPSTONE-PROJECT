const SET_BUG = 'bug/SET_BUG';


//  ACTIONS
const setBug = (bug) => ({
  type: SET_BUG,
  payload: bug
});



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





//  REDUCER
const initialState = { bug: null }

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUG:
      return { bug: action.payload }
    default:
      return state;
  }
}
