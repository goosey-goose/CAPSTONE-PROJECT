from .db import db


class Group(db.Model):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)

    # MY OWN COLUMNS
    name = db.Column(db.String(20), nullable=False, unique=True)


    # RELATIONSHIPS
    bugs = db.relationship('Bug', back_populates='group')



    # to_dict()  METHODS
    def to_dict(self):
        return {
            'name': self.name
        }
