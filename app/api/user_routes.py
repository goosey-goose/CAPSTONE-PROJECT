from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
# EBEN DELETE MODEL IMPORTS BELOW; THEY WERE JUST FOR INITIAL TESTING PURPOSES
# from flask import session
from app.models import Group, Bug, db

user_routes = Blueprint('users', __name__)



@user_routes.route('/testing')
def ebenTest():
    print("#######################################################################################################################")


    ################################ TO CREATE A NEW USER
    # new_user = User(username='lindsay', email='lindsay@gmail.com', password='password', group_id=1)
    # db.session.add(new_user)
    # db.session.commit()

    ################################ TO UPDATE A USER
    # queried_user = User.query.get(7)
    # queried_user.group_id = None
    # db.session.commit()

    ################################ TO DELETE A USER
    # queried_user = User.query.get(9)
    # db.session.delete(queried_user)
    # db.session.commit()



    ###############################################################################
    ###############################################################################
    ###############################################################################

    ################################ TO CREATE A NEW BUGG
    # new_bug = Bug(user_id=5, group_id=1, date_created='2000-08-12', title='Computer Broken', content='They say to turn it off and turn it on again', assignee='David', date_assigned='2000-08-13', date_resolved='2000-08-17')
    # db.session.add(new_bug)
    # db.session.commit()

    ################################ TO UPDATE A BUGG
    # queried_bug = Bug.query.get(2)
    # queried_bug.content = 'I hate saying that.'
    # db.session.commit()

    ################################ TO DELETE A BUGG
    # queried_bug = Bug.query.get(2)
    # db.session.delete(queried_bug)
    # db.session.commit()

    ###############################################################################
    ###############################################################################
    ###############################################################################

    ################################ TO CREATE A GROUP

    # new_group = Group(name='DevOps')
    # db.session.add(new_group)
    # db.session.commit()

    return {"eben": "miranda"}





@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
