import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "../fBase"

function App() {
  // States
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null); //다른페이지(home이외)에서 userObj를 사용하고싶어할 수 있기 때문이다.

  useEffect(()=>{ // useEffect -> React에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야하는 지
    authService.onAuthStateChanged((user)=>{ // 로그인, 로그아웃, 어플리케이션 초기화시 실행됨.
      if(user)  setUserObj(user);
      setInit(true);
    });
  },[])
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
