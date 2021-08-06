from flask_wtf import FlaskForm
from wtforms import StringField
# from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired
# from app.models import  ........



class GroupForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
