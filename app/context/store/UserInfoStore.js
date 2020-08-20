import React, {useState} from 'react';

import UserContext from '../UserInfoContext';

export default function UserInfoStore({children}) {
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState();

  return (
    <UserContext.Provider
      value={{
        isGoogleSignIn,
        userInfo,
        setIsGoogleSignIn,
        setUserInfo,
        token,
        setToken,
      }}>
      {children}
    </UserContext.Provider>
  );
}
