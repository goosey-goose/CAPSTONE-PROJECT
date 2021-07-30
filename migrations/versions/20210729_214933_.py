"""empty message

Revision ID: e62028b04d70
Revises: 9852331b1daf
Create Date: 2021-07-29 21:49:33.240411

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e62028b04d70'
down_revision = '9852331b1daf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'bugs', 'users', ['user_id'], ['id'])
    op.create_foreign_key(None, 'bugs', 'groups', ['group_id'], ['id'])
    op.create_foreign_key(None, 'users', 'groups', ['group_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.drop_constraint(None, 'bugs', type_='foreignkey')
    op.drop_constraint(None, 'bugs', type_='foreignkey')
    # ### end Alembic commands ###