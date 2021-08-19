// React and React Hooks
import React, { useState, useMemo } from 'react';
import { UserContext } from './components/context/UserContext';
import { UserSchemeContext } from './components/context/UserSchemeContext';
import './App.css';

import Header from './components/header/header';
import Login from './components/header/login';
import Logout from './components/header/logout';
import Usermenu from './components/user_menu/usermenu';
import Footer from './components/footer/footer';

export default function App(){
  const [user, setUser] = useState({
    status: false,
    message: "No Action Taken",
    username: null,
    logstatus: `login`,
    token: null
  });
  const providerUserInfo = useMemo(() => (
      { user, setUser}), [user, setUser]
  );
  const [userScheme, setUserScheme] = useState([]);

  const providerUserSchemeInfo = useMemo(() => (
      { userScheme, setUserScheme}), [userScheme, setUserScheme]
  );
  // let logValue = providerValue.user.username; -- PROVIDER USER EXAMPLE
  let logOption;
  if (providerUserInfo.user.logstatus === 'login'){
    logOption  = <Login />;
  };
  if (providerUserInfo.user.logstatus === 'logout'){
    logOption = <Logout />;
  };
  
  return  <div className="app">
              <UserContext.Provider value={providerUserInfo}>
              <UserSchemeContext.Provider value={providerUserSchemeInfo}>
                <div class="container app-wrapper mb-5 pb-5">
                  <Header logButton = {logOption} />
                    {/* {JSON.stringify(user)} */}
                  <Usermenu logstatus={providerUserInfo.user.logstatus}/>
                </div>
                <Footer />
              </UserSchemeContext.Provider>   
              </UserContext.Provider>
          </div>;
};