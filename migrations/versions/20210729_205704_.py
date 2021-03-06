"""empty message

Revision ID: 9852331b1daf
Revises: ffdc0a98111c
Create Date: 2021-07-29 20:57:04.005415

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9852331b1daf'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bugs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('group_id', sa.Integer(), nullable=True),
    sa.Column('date_created', sa.Date(), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('content', sa.String(length=500), nullable=False),
    sa.Column('assignee', sa.String(length=50), nullable=True),
    sa.Column('date_assigned', sa.Date(), nullable=True),
    sa.Column('date_resolved', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('groups',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.add_column('users', sa.Column('group_id', sa.Integer(), nullable=True))
    op.create_unique_constraint(None, 'users', ['group_id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'group_id')
    op.drop_table('groups')
    op.drop_table('bugs')
    # ### end Alembic commands ###
