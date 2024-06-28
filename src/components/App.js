import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) =>{
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    }
    );
  }, []) // 인증상태가 변경되었을때 다른 이벤트를 발생시키는 함수

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing..."}
    <footer>&copy;{new Date().getFullYear()}nwitter</footer>
    </>
  )
}

export default App;
