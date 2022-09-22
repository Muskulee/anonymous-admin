import React, { createContext, useContext, useState } from "react";

// create context

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authUser, setAuthUser] = useState({});

  const verifyToken = async (token) => {
    console.log("token", token);
    // if (token !== undefined) {
    //   console.log("token", token);
    //   const { error, message } = await checkUser(token);
    //   if (error) return console.log("error", error);
    //   // if (error) return updateNotification("error", error);
    //   // navigate("/");
    // }
  };

  const setLogIn = async (user) => {
    setLoggedIn(true);
    setAuthUser(user);
  };

  const setLogOut = () => {
    setLoggedIn(false);
    localStorage.setItem("token", "");
    setAuthUser({});
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, authUser, setLogIn, setLogOut, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
