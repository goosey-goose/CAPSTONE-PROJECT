from .db import db


class Bug(db.Model):
    __tablename__ = 'bugs'

    id = db.Column(db.Integer, primary_key=True)

    # MY OWN COLUMNS
    user_id = db.Column(db.Integer, nullable=True)
    group_id = db.Column(db.Integer, nullable=True)
    date_created = db.Column(db.Date, nullable=False)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    assignee = db.Column(db.String(50), nullable=True)
    date_assigned = db.Column(db.Date, nullable=True)
    date_resolved = db.Column(db.Date, nullable=True)


    # RELATIONSHIPS
    group = db.relationship('Group', back_populates='bugs')



    # to_dict()  METHODS
    def to_dict(self):
        return {
            'user_id': self.user_id,
            'group_id': self.group_id,
            'date_created': self.date_created,
            'title': self.title,
            'content': self.content,
            'assignee': self.assignee,
            'date_assigned': self.date_assigned,
            'date_resolved': self.date_resolved
        }
