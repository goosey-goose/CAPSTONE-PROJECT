# WatchIt

WatchIt, a Jira issue tracker clone, is a bug tracker application that allows users to create bug tickets and groups. Users can then optionally assign a bug ticket to one assignee from a given list of assignees. The assignment of a bug to a group is mandatory; there must be at least one group in existence in order to create a new bug. Once a bug ticket has been completed, it can be marked as completed, and optionally removed from the database.

## Application Architecture

WatchIt is built on a React frontend with a Flask backend, using PostgreSQL as a database.

### Frontend Technologies Used

React

Redux

### Backend Technologies Used

Flask

PostgreSQL

SQLAlchemy

## Conclusion

In general, I am happy with WatchIt. There are some stylistic choices that I would like to experiment with later on, and in addition, I have two features that I would like to implement some time down the road: a search feature that would allow a user to search for bugs using specific search strings, and finally, a chat feature which would allow logged in users to be able to chat with each other. 
