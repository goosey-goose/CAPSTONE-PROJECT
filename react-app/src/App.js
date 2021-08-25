import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import MainUserPage from './components/MainUserPage/MainUserPage'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateNewBugForm from './components/CreateNewBugForm/CreateNewBugForm';
import TestComponent from './components/TestComponent/TestComponent'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <MainUserPage />
        </ProtectedRoute>
        <ProtectedRoute path='/bugs/new' exact={true}>
          <CreateNewBugForm />
        </ProtectedRoute>
        <ProtectedRoute path='/test-component' exact={true}>
          <TestComponent></TestComponent>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
