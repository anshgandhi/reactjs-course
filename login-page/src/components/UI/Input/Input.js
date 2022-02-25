import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        className={`${classes.input} ${props.className}`}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      >
      </input>
    </div>
  );
};

export default Input;
