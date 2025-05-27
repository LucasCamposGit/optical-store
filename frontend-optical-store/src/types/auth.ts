export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  tokens: Tokens | null;
};

export enum AUTH_ACTION {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGOUT = "LOGOUT",
  REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS",
}

export type AuthAction =
  | { type: AUTH_ACTION.LOGIN_SUCCESS; payload: Tokens }
  | { type: AUTH_ACTION.REFRESH_TOKEN_SUCCESS; payload: Tokens }
  | { type: AUTH_ACTION.LOGOUT };
