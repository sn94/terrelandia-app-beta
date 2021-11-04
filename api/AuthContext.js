 
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState , useEffect} from "react";
 

// Create a context
const AuthContext = createContext({});


const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState( "");

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("auth");
      const authData =  authDataString ;
      // Configure axios headers
   //   configureAxiosHeaders(authData.token, authData.phone);
      setAuthState(authData);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await AsyncStorage.setItem("auth",  auth );
      // Configure axios headers
      //configureAxiosHeaders(auth.token, auth.phone);
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

export { AuthContext, AuthProvider };