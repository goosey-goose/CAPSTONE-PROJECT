from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User
# from flask import session
from app.models import Group, Bug, db
from app.forms import BugForm

bug_routes = Blueprint('bugs', __name__)





# GET ALL BUGGS
@bug_routes.route('/all')
# @login_required
def get_all_bugs():
    bugs = Bug.query.all()
    # return {'bugs': [bug.to_dict() for bug in bugs]}
    return { bug.id: bug.to_dict() for bug in bugs }




# GET A SINGLE BUGG
@bug_routes.route('/bug/<int:id>')
# @login_required
def get_single_bug(id):
    queried_bug = Bug.query.get(id)
    # print(dir(queried_bug))
    # print("################")
    # print(queried_bug.id)

    return queried_bug.to_dict()






# CREATE A NEW BUGG
@bug_routes.route('/create', methods=["POST"])
# @login_required
def create_new_bug():

    form = BugForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        bug = Bug(
            user_id=form.data['user_id'],
            group_id=form.data['group_id'],
            date_created=form.data['date_created'],
            title=form.data['title'],
            content=form.data['content'],
            assignee=form.data['assignee']
        )
        db.session.add(bug)
        db.session.commit()
        # print("###################")
        # print(bug)
        # print(type((bug.id, bug.to_dict())))
        # return bug.to_dict()
        return {"dbpk_id": bug.id, "new_bug": bug.to_dict()}
    return {'errors': 'something went wrong when creating this new bug'}







################################ TO UPDATE A BUGG
@bug_routes.route('/update/<int:id>', methods=["PUT"])
# @login_required
def update_bug(id):
    queried_bug = Bug.query.get(id)
    # print(id)
    # return {"bug_id": id}
    return {"hello": "there"}
    # queried_bug = Bug.query.get(2)
    # queried_bug.content = 'I hate saying that.'
    # db.session.commit()



################################ TO DELETE A BUGG
@bug_routes.route('/delete/<int:id>', methods=["DELETE"])
# @login_required
def delete_bug(id):
    queried_bug = Bug.query.get(id)
    db.session.delete(queried_bug)
    db.session.commit()
    return { "id": id }
