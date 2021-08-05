import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllBugs } from '../../store/allBugs'
import './DisplayBugInfo.css'

const DisplayBugInfo = () => {
  const user = useSelector(state => state.session.user);
  let allBugs = useSelector(state => state.allBugs.bugs);
  const dispatch = useDispatch();

  console.log(allBugs[0]);

  useEffect(() => {
    if (!allBugs) {
      dispatch(retrieveAllBugs());
    }
  }, [dispatch])

  return (
    <div id="dbi_top_div">
      <div id="dbi_grid_container">



        <div className="main_divs" id="dbi_welcome_label">
        Welcome, {user.username}
        </div>

        <div className="main_divs" id="dbi_new_bugs">
        New Bugs<br></br><br></br>

          {allBugs && <div id="dbi_new_bugs_list">
            {allBugs.map((bug, index) => (
              <div className="dbi_single_bug" key={index}>{bug.content}</div>
            ))}
          </div>}

        </div>

        <div className="main_divs" id="dbi_in_progress">
        In Progress
        </div>

        <div className="main_divs" id="dbi_completed_bugs">
        Completed
        </div>



      </div>
    </div>
  );
}

export default DisplayBugInfo;
