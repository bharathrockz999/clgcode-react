import React, { useEffect,createContext, useReducer, useContext } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
};
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) { 
      dispatch({ type: 'LOGIN', payload: { token } });
    } else { 
      dispatch({ type: 'LOGOUT' });
    } 
    dispatch({ type: 'LOADING_COMPLETE' });
  }, []);
  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};  

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};




























// import { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const login = () => {
     // Perform authentication logic, and if successful, set isAuthenticated to true
//     setIsAuthenticated(true);
//     console.log('User logged in');
//   };

//   const logout = () => {
     // Perform logout logic, and set isAuthenticated to false
//     setIsAuthenticated(false);
//     console.log('User logged out');
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
