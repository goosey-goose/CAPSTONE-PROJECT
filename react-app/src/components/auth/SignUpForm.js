import React, { useState, useEffect } from 'react';
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
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
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

  const checkIfValidEmail = () => {
    // const re = /[A-Za-z0-9_]+@[A-Za-z0-9_]+.com$/;
    // const re = /[A-Za-z0-9_]+@[A-Za-z0-9_]+.[A-Za-z0-9_]+/;
    // const re = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9.-]+$/;
    const re = /^([a-zA-Z0-9_\.-]+)@([a-zA-Z0-9_-]+)\.([a-zA-Z0-9]{2,8})(\.[a-zA-Z0-9]{2,8})?$/;

    if (!email) {
      setIsEmailVisible(false)
    } else if (re.test(email)) {
      setIsEmailVisible(false);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setIsEmailVisible(true)
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    if (!password && !repeatPassword) {
      setIsVisible(true)
    }
    // checkIfPasswordsMatch();
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (!password && !repeatPassword) {
      setIsVisible(true)
    }
    // checkIfPasswordsMatch();
  };



  // const checkIfPasswordsMatch = () => {
  //   if (password === repeatPassword) {
  //     setDoPasswordsMatch(true);
  //   } else {
  //     setDoPasswordsMatch(false);
  //   }
  // }


  // console.log(doPasswordsMatch);

  // if (password === repeatPassword) {
  //   setDoPasswordsMatch(true);
  // } else {
  //   setDoPasswordsMatch(false);
  // }



  useEffect(() => {
    checkIfValidEmail();
    if (!password && !repeatPassword) {
      setIsVisible(false)
    }
    let matchPasswordDiv;
    if (password || repeatPassword) {
      matchPasswordDiv = document.getElementById('signup_form_match_passwords');
      if (!matchPasswordDiv) return null;
      if (password === repeatPassword) {
        matchPasswordDiv.style.color = 'green';
        matchPasswordDiv.innerText = 'Passwords match!'
        setDoPasswordsMatch(true);
      } else if (password !== repeatPassword) {
        matchPasswordDiv.style.color = 'red';
        matchPasswordDiv.innerText = '*Passwords must match';
        setDoPasswordsMatch(false);
      }
    }
  })

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="signup_form_wrapper">
      <form id="signup_form_actual" onSubmit={onSignUp}>
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
            required={true}
            minLength="1"
            maxLength="40"
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
            required={true}
            minLength="1"
            maxLength="255"
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
            required={true}
            minLength="1"
            maxLength="20"
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
            minLength="1"
            maxLength="20"
          ></input>
        </div>
        <hr></hr>
        {isVisible && <div id="signup_form_match_passwords">
          *Passwords must match
        </div>}
        {isEmailVisible && <div id="signup_form_email_error">
          *Invalid email
        </div>}
        <div className="signup_form_button_div">
          <button type='submit' disabled={!username || !email || !password || !repeatPassword || !doPasswordsMatch || isEmailVisible}>Sign Up</button>
        </div>
        <div id="signup_form_question" className="signup_form_label">
          <Link id="signup_form_link_to_login" to='/login' exact="true">
            Already have an account?
          </Link>
        </div>
      </form>
      <div id="signup_form_errors">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
    </div>
  );
};

export default SignUpForm;
