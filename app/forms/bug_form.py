from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, DateField
# from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired
# from app.models import  ........



class BugForm(FlaskForm):
    user_id = IntegerField("User ID")
    group_id = IntegerField("Group ID")
    date_created = DateField("Date Created")
    title = StringField("Title", validators=[DataRequired()])
    content = StringField("Content", validators=[DataRequired()])
    assignee = StringField("Assignee")
    date_assigned = DateField("Date Assigned")
    date_resolved = DateField("Date Resolved")
