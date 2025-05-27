"use client";

import React, { createContext, useContext } from "react";
import { AuthState, AuthAction} from "@/types/auth";

const initialState: AuthState = {
  isAuthenticated: false,
  tokens: null,
};

const AuthContext = createContext<AuthState>(initialState);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction>>(() => {});

// function authReducer(state: AuthState, action: AuthAction): AuthState {
//   switch (action.type) {
//     case AUTH_ACTION.LOGIN_SUCCESS:
//     case AUTH_ACTION.REFRESH_TOKEN_SUCCESS:
//       return {
//         isAuthenticated: true,
//         tokens: action.payload,
//       };
//     case AUTH_ACTION.LOGOUT:
//       return {
//         isAuthenticated: false,
//         tokens: null,
//       };
//     default:
//       return state;
//   }
// }

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   return (
//     <AuthContext.Provider value={state}>
//       <AuthDispatchContext.Provider value={dispatch}>
//         {children}
//       </AuthDispatchContext.Provider>
//     </AuthContext.Provider>
//   );
// };

// Hooks personalizados
export const useAuth = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
