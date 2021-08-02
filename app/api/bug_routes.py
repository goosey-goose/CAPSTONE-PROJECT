from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User
# EBEN DELETE MODEL IMPORTS BELOW; THEY WERE JUST FOR INITIAL TESTING PURPOSES
# from flask import session
from app.models import Group, Bug, db
from app.forms import BugForm

bug_routes = Blueprint('bugs', __name__)





# GET ALL BUGGS



# GET A SPECIFIC BUGG


# CREATE A NEW BUGG
@bug_routes.route('/create', methods=["POST"])
# @login_required
def ebenTesting():
    print("####################################    BUGS POST ROUTE    ####################################################")

    new_bug = Bug(user_id=current_user.id, group_id=1, date_created='2000-08-12', title='Computer Broken', content='They say to turn it off and turn it on again', assignee='Ian', date_assigned='2000-08-13', date_resolved='2000-08-17')
    db.session.add(new_bug)
    db.session.commit()

    # form = BugForm()
    # form["csrf_token"].data = request.cookies["csrf_token"]
    # if form.validate_on_submit():
    #     # print(form.data["title"])










    return {"eben": "bug_route"}
    # return {"current_user": current_user.id}
    # return queried_bug.to_dict()




################################ TO UPDATE A BUGG
    # queried_bug = Bug.query.get(2)
    # queried_bug.content = 'I hate saying that.'
    # db.session.commit()



################################ TO DELETE A BUGG
    # queried_bug = Bug.query.get(2)
    # db.session.delete(queried_bug)
    # db.session.commit()
