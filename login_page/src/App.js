import React, { useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userLoggedIn = localStorage.getItem('isLoggedIn');

  // Avoiding this approach because this leads to infinite loop
  // as 'setIsLoggedIn' triggers re-eval of the component.
  // As 'userLoggedIn' is 'true' and because of that line 18 is 'true' and
  // calls 'setIsLoggedIn' again, and so on infinite times.

  // localStorage.getItem() always returns a 'string', even if the input was a boolean.
  if (userLoggedIn === 'true'){
    setIsLoggedIn(true);
  }

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', true);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
