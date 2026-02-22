"use client";

import React, { createContext, useContext, useState } from "react";

interface LoadContextType {
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadContext = createContext<LoadContextType | undefined>(undefined);

export const LoadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </LoadContext.Provider>
  );
};

export const useLoad = () => {
  const context = useContext(LoadContext);
  if (!context) throw new Error("useLoad must be used within a LoadProvider");
  return context;
};