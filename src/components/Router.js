import React from "react";
import {HashRouter as Router , Route, Switch} from "react-router-dom"; // export만으로 선언된 경우 import시 {}를 써서 가져와야한다.
import Profile from "routes/Profile";
import Auth from "routes/Auth"; // export default로 선언된 경우 import할 떄 {}중괄호 없이 가져와도 됨.
import Home from "routes/Home";
import Navigation  from "components/Navigation";

const  AppRouter= ({isLoggedIn,userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj = {userObj}/>
                        </Route> 
                        <Route exact path="/profile">
                            <Profile/>
                        </Route> 
                    </>
                    ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route> 
                    </>
                    )
                }
            </Switch>
        </Router>

    )
}
export default AppRouter;