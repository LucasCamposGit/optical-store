"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthState, AuthAction } from "@/types/auth";
import { AUTH_ACTION } from "@/types/action";

const initialState: AuthState = {
  isAuthenticated: false,
  tokens: null,
};

const AuthContext = createContext<AuthState>(initialState);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>(() => {});

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_ACTION.LOGIN_SUCCESS:
    case AUTH_ACTION.REFRESH_TOKEN_SUCCESS:
      return {
        isAuthenticated: true,
        tokens: action.payload,
      };
    case AUTH_ACTION.LOGOUT:
      return {
        isAuthenticated: false,
        tokens: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing tokens on mount
  useEffect(() => {
    const checkAuthState = () => {
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (accessToken && refreshToken) {
          dispatch({
            type: AUTH_ACTION.LOGIN_SUCCESS,
            payload: {
              access_token: accessToken,
              refresh_token: refreshToken,
              expires_in: 0 // We'll handle expiration separately
            }
          });
        }
      }
    };

    checkAuthState();
  }, []);

  // Listen for storage changes (login/logout in other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        if (e.newValue) {
          // Token was added - user logged in
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            dispatch({
              type: AUTH_ACTION.LOGIN_SUCCESS,
              payload: {
                access_token: e.newValue,
                refresh_token: refreshToken,
                expires_in: 0
              }
            });
          }
        } else {
          // Token was removed - user logged out
          dispatch({ type: AUTH_ACTION.LOGOUT });
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
