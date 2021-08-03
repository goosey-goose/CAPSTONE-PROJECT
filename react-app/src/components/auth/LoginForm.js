import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import { retrieveAllBugs } from '../../store/allBugs'
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    dispatch(retrieveAllBugs())
    return <Redirect to='/' />;
  }

  return (
    <div id="login_form_wrapper">
      <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div id="login_form_logo">
        Log In
      </div>
      <div id="login_form_email_wrapper_div">
        <label className="login_form_label" htmlFor='email'>Email</label>
        <input
          id="login_form_email_input"
          name='email'
          type='text'
          placeholder=''
          value={email}
          onChange={updateEmail}
        />
      </div>
      <hr></hr>
      <div id="login_form_password_wrapper_div">
        <label className="login_form_label" htmlFor='password'>Password</label>
        <input
          id="login_form_password_input"
          name='password'
          type='password'
          placeholder=''
          value={password}
          onChange={updatePassword}
        />
      </div>
      <hr></hr>
        <div className="login_form_button_div">
          <button type='submit'>Login</button>
        </div>
        <div id="login_form_question" className="login_form_label">
          <Link id="login_form_link_to_signup" to='/sign-up' exact={true}>
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
