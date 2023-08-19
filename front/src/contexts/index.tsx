import React, { createContext, useContext, useState,HTMLAttributes } from 'react';
import User from '../interfaces/User';

interface StateContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userData: User;
  setUserData : (props:User) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}
export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [ userData, setUser] = useState<User>({
    token: undefined,
    user: undefined
    });
  const setUserData=(user:User)=>{
    if(user.token) localStorage.setItem("auth-user",user.token );
    setUser(user)
  }

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
    localStorage.setItem('themeMode', String(!darkMode));
  };

  return (
    <StateContext.Provider value={{ darkMode, toggleDarkMode, userData, setUserData}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a ContextProvider');
  }
  return context;
};
