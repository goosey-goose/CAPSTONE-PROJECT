import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveAllBugs } from '../../store/allBugs'
import './DisplayBugInfo.css'

const DisplayBugInfo = () => {
  const user = useSelector(state => state.session.user);
  let allBugs = useSelector(state => state.allBugs.bugs);
  const dispatch = useDispatch();

  // console.log(allBugs[0]);

  useEffect(() => {
    if (!allBugs) {
      dispatch(retrieveAllBugs());
    }
  }, [dispatch])

  return (
    <div id="dbi_top_div">
      <div id="dbi_grid_container">



        <div className="main_divs" id="dbi_welcome_label">
          <div className="main_divs_titles">
            Welcome, {user.username}
          </div>
        </div>

        <div className="main_divs" id="dbi_new_bugs">
        <div className="main_divs_titles">New Bugs</div>
          <br></br>

          {allBugs && <div id="dbi_new_bugs_list">
            {allBugs.map((bug, index) => (

              <div className="dbi_single_bug" key={index}>
                {bug.title + ":"}
                <br></br>
                <div className="dbi_single_bug_content">{bug.content}</div>
                <div className="dbi_status_indicator_parent">
                  <div className="dbi_status_indicator">

                  </div>
                </div>
              </div>


            ))}
          </div>}

        </div>

        <div className="main_divs" id="dbi_in_progress">
          <div className="main_divs_titles">
            In Progress
          </div>
        </div>

        <div className="main_divs" id="dbi_completed_bugs">
          <div className="main_divs_titles">
            Completed
          </div>
        </div>



      </div>
    </div>
  );
}

export default DisplayBugInfo;
