import React, { createContext, useContext, useState,HTMLAttributes } from 'react';

interface StateContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
}
export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
    localStorage.setItem('themeMode', String(!darkMode));
  };

  return (
    <StateContext.Provider value={{ darkMode, toggleDarkMode }}>
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
