import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="signup_form_wrapper">
      <form id="signup_form_actual" onSubmit={onSignUp}>
        <div id="signup_form_errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div id="signup_form_logo">
          Sign Up
        </div>
        <div id="signup_form_username_wrapper_div">
          <label className="signup_form_label">User Name</label>
          <input
            id="signup_form_username_input"
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <hr></hr>
        <div id="signup_form_email_wrapper_div">
          <label className="signup_form_label">Email</label>
          <input
            id="signup_form_email_input"
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <hr></hr>
        <div>
          <label className="signup_form_label">Password</label>
          <input
            id="signup_form_password_input"
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <hr></hr>
        <div>
          <label className="signup_form_label">Repeat</label>
          <input
            id="signup_form_repeat_password_input"
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <hr></hr>
        <div className="signup_form_button_div">
          <button type='submit'>Sign Up</button>
        </div>
        <div id="signup_form_question" className="signup_form_label">
          <Link id="signup_form_link_to_login" to='/login' exact={true}>
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;



{/* <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form> */}
