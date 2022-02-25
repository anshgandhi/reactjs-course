import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

// we can create this outside the Component scope, because we will not be accessing
// any value inside the Reducer apart from the parameters passed.
const emailReducer = (state, action) => {
  // ReactJS makes sure that 'state' contains the last known value, guaranteed by ReactJS.
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    // for 'INPUT_BLUR' the 'action' only has 'type' defined and 'val' is not defined.
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passswordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    // for 'INPUT_BLUR' the 'action' only has 'type' defined and 'val' is not defined.
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // the reason for 'isValid' being 'undefined' is because, otherwise the email is set
  // 'inValid' from beginning itself, making the input form 'red' on UI.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passswordReducer, {
    value: "",
    isValid: undefined,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // object de-structuring. i.e. emailIsValid = emailState.isValid
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // enabling 'useEffect' will make sure we do not check form validity for every change.
  // if the field is already valid do not check for Form validity again.
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity... ");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    // 'debouncing', this returned function is called a cleanup function.
    // runs before the useEffect is run 2nd time onwards, except for the first useEffect invocation.
    return () => {
      console.log("CLEANUP running... ");

      // will essentially clear the lsat timer that was set.
      // otherwise we end up getting too many events that are just delayed by 500 ms.
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    // we've passed 'action' to 'dispatchEmail'
    // 'dispatchEmail' calling 'emailReducer'.
    // once 'dispatchEmail' runs, the state would be updated.
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   passwordState.isValid && emailState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   passwordState.isValid && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus_activate();
    } else {
      passwordInputRef.current.focus_activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type="email"
          id="email"
          label="E-Mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          ref={passwordInputRef}
          type="password"
          id="password"
          label="Password"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
