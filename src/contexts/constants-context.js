import { useContext, createContext, useEffect, useState } from "react";
import { getallsizes } from "request/sizes";

const ConstantsContext = createContext();

export const ConstantsContextProvider = ({ children }) => {
  const [sizes, setSizes] = useState([]);

  const value = {
    sizes,
    setSizes,
  };
  useEffect(() => {
    getallsizes().then((res) => {
      setSizes(res.result);
    });
    
  }, []);
  return <ConstantsContext.Provider value={value}>{children}</ConstantsContext.Provider>;
};

export const UseConstants = () => {
  return useContext(ConstantsContext);
};
