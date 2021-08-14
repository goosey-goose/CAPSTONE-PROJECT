from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from sqlalchemy import desc, asc
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
    # bugs = Bug.query.order_by(desc(Bug.id)).all()
    # bugs = Bug.query.order_by(desc(Bug.id)).all()
    # bugs = db.session.query(Bug).order_by(Bug.pk.desc())
    # print(dir(Bug.query))
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
@bug_routes.route('/update/<int:id>', methods=["PATCH"])
# @login_required
def update_bug(id):
    print("############ API FOR UPDATE BUG ################")
    queried_bug = Bug.query.get(id)
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@  STOMACH ACHE @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    print(queried_bug)

    form = BugForm()
    # print(queried_bug.date_resolved)
    # print(form.data["date_resolved"])
    print(form.data)
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("&&&&&&&&&&&&&&&&  FORM IS VALIDATED &&&&&&&&&&&&&&&&&&&&&&")
        print(form.data["date_assigned"])
        if form.data["group_id"] != queried_bug.group_id:
            queried_bug.group_id = form.data["group_id"]
        if form.data["title"] != queried_bug.title:
            queried_bug.title = form.data["title"]
        if form.data["content"] != queried_bug.content:
            queried_bug.content = form.data["content"]
        if form.data["assignee"] != queried_bug.assignee:
            queried_bug.assignee = form.data["assignee"]

        if (form.data["date_assigned"]).strftime("%Y-%m-%d") == "1970-01-01":
            print("(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((")
            print("I LIKE WENDY'S FOOD")
            queried_bug.date_assigned = None
        elif form.data["date_assigned"] != queried_bug.date_assigned:
            print("))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))")
            queried_bug.date_assigned = form.data["date_assigned"]

        print(type(form.data["date_assigned"]))
        print((form.data["date_resolved"]).strftime("%Y-%m-%d"))

        if (form.data["date_resolved"]).strftime("%Y-%m-%d") == "1970-01-01":
            queried_bug.date_resolved = None
        elif form.data["date_resolved"] != queried_bug.date_resolved:
            queried_bug.date_resolved = form.data["date_resolved"]

        db.session.commit()
        # print(queried_bug.id)

        return {"dbpk_id": queried_bug.id, "updated_bug": queried_bug.to_dict()}
    return {'errors': 'something went wrong when updating this bug bug'}
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
