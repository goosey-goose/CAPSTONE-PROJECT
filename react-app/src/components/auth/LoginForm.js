import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';
import { retrieveAllBugs } from '../../store/bug'
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //////////////////////////////////////////////////////
  const demoUserEmail = "demo@aa.io";
  const demoUserPassword = "password";
  //////////////////////////////////////////////////////
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  ///////////////////////////////////////////////////////
  const onDemoLogin = async () => {
    // e.preventDefault();
    const data = await dispatch(login(demoUserEmail, demoUserPassword));
    if (data) {
      setErrors(data);
    }
  };
  ///////////////////////////////////////////////////////

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
      <div id="login_form_logo_and_ul_wrapper">
        <i id="login_form_wrapper_large_graphic" className="fas fa-bug"></i>
        <ul>
          <li>Track Software Bugs</li>
          <li>Assign Them to Groups</li>
          <li>Keep Your Software Healthy</li>
        </ul>
      </div>
      <form id="login_form_actual" onSubmit={onLogin}>
      {/* <div id="login_form_errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
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
          required={true}
          onChange={updateEmail}
          minLength="1"
          maxLength="255"
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
          required={true}
          onChange={updatePassword}
          minLength="1"
          maxLength="20"
        />
      </div>
      <hr></hr>
        <div className="login_form_button_div">
          <button type='submit' disabled={!email || !password}>Login</button>
        </div>
        <div id="login_form_question" className="login_form_label">
          <Link id="login_form_link_to_signup" to='/sign-up' exact="true">
            Don't have an account?
          </Link>
        <div id="demo_user_button_div">
          <button type="button" onClick={onDemoLogin}>Demo User</button>
        </div>
        </div>
      </form>
      <div id="login_form_errors">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
