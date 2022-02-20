import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// we can create this outside the Component scope, because we will not be accessing 
// any value inside the Reducer apart from the parameters passed.
const emailReducer = (state, action) => {
  // ReactJS makes sure that 'state' contains the last known value, guaranteed by ReactJS.
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};
  };
  if (action.type === 'INPUT_BLUR'){
    // for 'INPUT_BLUR' the 'action' only has 'type' defined and 'val' is not defined.
    return {value: state.value, isValid: state.value.includes('@')};
  };
  return { value: '', isValid: false};
};

const passswordReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR'){
    // for 'INPUT_BLUR' the 'action' only has 'type' defined and 'val' is not defined.
    return {value: state.value, isValid: state.value.trim().length > 6};
  };
  return { value: '', isValid: false};
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // the reason for 'isValid' being 'undefined' is because, otherwise the email is set 
  // 'inValid' from beginning itself, making the input form 'red' on UI.
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: undefined});
  const [passwordState, dispatchPassword] = useReducer(passswordReducer, { value: '', isValid: undefined});

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("checking form validity... ");
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   // 'debouncing', this returned function is called a cleanup function.
  //   // runs before the useEffect is run 2nd time onwards, except for the first useEffect invocation.
  //   return () => {
  //     console.log("CLEANUP running... ");

  //     // will essentially clear the lsat timer that was set.
  //     // otherwise we end up getting too many events that are just delayed by 500 ms.
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    // we've passed 'action' to 'dispatchEmail'
    // 'dispatchEmail' calling 'emailReducer'.
    // once 'dispatchEmail' runs, the state would be updated.
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: "USER_INPUT", val: event.target.value})

    setFormIsValid(
      passwordState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
