import React, { useState } from "react";
import AppRouter from "components/Router";
import {authService} from "../fBase"

function App() {
  // 로그인 여부를 판단
  const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
