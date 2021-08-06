// const SET_ALL_BUGS = 'bugs/SET_ALL_BUGS'


// //  ACTIONS
// const setAllBugs = (allBugs) => ({
//   type: SET_ALL_BUGS,
//   payload: allBugs
// })



// //  THUNKS
// export const retrieveAllBugs = () => async (dispatch) => {
//   const response = await fetch('http://localhost:3000/api/bugs/all');

//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setAllBugs(data))
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






// //  REDUCER
// const initialState = {}     //  allBugs: null

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_ALL_BUGS:
//       return { ...action.payload }     //  allBugs: action.payload
//     default:
//       return state;
//   }
// }
