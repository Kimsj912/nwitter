import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "../fBase"

function App() {
  // 로그인 여부를 판단
  const [init, setInit] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{ // React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지
    authService.onAuthStateChanged((user)=>{
      if(user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
      setInit(true);
    });
  },[])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
