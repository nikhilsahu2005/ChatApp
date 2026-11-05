/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Sirf localStorage se user data lo
  const initialUserState = localStorage.getItem("ChatApp");

  const [authUser, setAuthUser] = useState(() => {
    try {
      return initialUserState ? JSON.parse(initialUserState) : null;
    } catch {
      localStorage.removeItem("ChatApp");
      return null;
    }
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
