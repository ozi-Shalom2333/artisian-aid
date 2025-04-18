import React, { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext(null);
const Index = ({ children }) => {
  const [showSearch, setShowSearch] = useState(true);


  return (
    <AppContext.Provider value={{ showSearch,setShowSearch }}>
      {children}
    </AppContext.Provider>
  );
};

export default Index;
