
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
 
// Create a context
const AuthContext = createContext({});
// Get current auth state from AsyncStorage
const getAuthStateWithoutHook = async () => {
  try {
    const authDataString = await AsyncStorage.getItem("auth");
    const authData = authDataString;
    return authData;
  } catch (err) { }
};


const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState("");


  const configureAxiosHeaders = (token) => {
    axios.defaults.headers["Authorization"] = 'Bearer ' + token;
    //axios.defaults.headers["X-Auth-Phone"] = phone;
  };



  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("auth");
      const authData = authDataString;

      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await AsyncStorage.setItem("auth", auth);
      // Configure axios headers
      const authData = auth;
      configureAxiosHeaders(authData);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider , getAuthStateWithoutHook};