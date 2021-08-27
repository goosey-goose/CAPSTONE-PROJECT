from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Group, db
from app.forms import GroupForm

group_routes = Blueprint('groups', __name__)





# GET ALL GROUPS
@group_routes.route('/all')
# @login_required
def get_all_groups():
    groups = Group.query.all()
    return { group.id: group.to_dict() for group in groups }







# CREATE A NEW GROUP
@group_routes.route('/create', methods=["POST"])
# @login_required
def create_new_group():
    # print("###########  JUST OUTSIDE GROUP ROUTES FORM VALIDATION  ########")
    form = GroupForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        group = Group(
            name=form.data['name']
        )
        db.session.add(group)
        db.session.commit()
        # print("########  INSIDE GROUP ROUTES FORM VALIDATION #############")
        # print("###################")
        # print(group)
        # print(type((group.id, group.to_dict())))
        # return group.to_dict()
        # print({"dbpk_id": group.id, "new_group": group.to_dict()})
        return {"dbpk_id": group.id, "new_group": group.to_dict()}
    return {'errors': 'something went wrong when creating this new group'}









##################################################################################
##################################################################################
##################################################################################
##################################################################################
##################################################################################
##################################################################################
##################################################################################
##################################################################################
##################################################################################






# UPDATE A GROUP
@group_routes.route('/update/<int:id>', methods=["PATCH"])
# @login_required
def update_group(id):
    queried_group = Group.query.get(id)
    form = GroupForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        print("##########  INSIDE VALIDATED GROUP UPDATE  #########")
        # print(form.data)
        if form.data["name"] != queried_group.name:
            queried_group.name = form.data["name"]

        db.session.commit()

        return {"dbpk_id": queried_group.id, "updated_group": queried_group.to_dict()}
    return {'errors': 'something went wrong when updating this group'}










# DELETE A GROUP
@group_routes.route('/delete/<int:id>', methods=["DELETE"])
# @login_required
def delete_group(id):
    queried_group = Group.query.get(id)
    db.session.delete(queried_group)
    db.session.commit()
    return { "id_of_group_deleted": id }
