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

    # new_user = User(username='jackSparrow', email='jacksparrow@gmail.com', hashed_password='password')
    # db.session.add(new_user)
    # db.session.commit()

    # new_group = Group(name='DevOps')
    # db.session.add(new_group)
    # db.session.commit()

    # new_bug = Bug(date_created='1986-02-01', title='bug1', content='i have a problem')
    # db.session.add(new_bug)
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
