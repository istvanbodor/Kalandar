import { createContext, useState } from "react";
import { AuthToken } from "../interfaces/AuthToken";
import { UserLoingDto } from "../interfaces/UserLoginDto";

interface AuthContextProps {
  token: AuthToken | null;
  login: (user: UserLoingDto) => void;
  logout: () => void;
  register: (user: UserRegisterDto)=> void;
  init: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: () => {},
  logout: () => {},
  register: () =>{},
  init: false
});
