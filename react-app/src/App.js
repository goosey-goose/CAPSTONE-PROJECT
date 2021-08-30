import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
import AboutMeFooter from './components/AboutMeFooter/AboutMeFooter';
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
          <AboutMeFooter />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
          <AboutMeFooter />
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
        <Route path='/test-component' exact={true}>
          <Redirect to="www.google.com"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
