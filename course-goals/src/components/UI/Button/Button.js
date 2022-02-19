import React from 'react';
import styles from './Button.module.css'
// import styled from 'styled-components';


// Styled Components are used to Limit Visibility of CSS Classes.
// by default, CSS Classes would be visible globally. With Styled Components 
// we get to Scope their Visibility.

// 'button' is a special kind method on 'styled' object which is called using backticks.
// this '``' is also called 'Tagged Template Literals'. JavScript feature.
// 'styled' component has methods for all HTML elements. e.g. for <div>
// we can use styled.div``;

// so styled.button would return a Button element with styles that we define inside the backticks.

// const Button = styled.button`
//     width: 100%;
//     font: inherit;
//     padding: 0.5rem 1.5rem;
//     border: 1px solid #8b005d;
//     color: white;
//     background: #8b005d;
//     box-shadow: 0 0 4px rgba(0, 0, 0, 0.26);
//     cursor: pointer;

//     @media (min-width: 768px) {
//       width: auto;
//     }

//     &:focus {
//       outline: none;
//     }

//     &:hover,
//     &:active {
//       background: #ac0e77;
//       border-color: #ac0e77;
//       box-shadow: 0 0 8px rgba(0, 0, 0, 0.26);
//     }
// `;

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
