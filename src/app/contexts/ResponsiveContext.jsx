import React, { createContext, useState, useEffect, useContext } from "react";

const ResponsiveContext = createContext();

function ResponsiveProvider({ children }) {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const isMobile = browserWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setBrowserWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect only runs once on mount

  return (
    <ResponsiveContext.Provider value={{ isMobile }}>
      {children}
    </ResponsiveContext.Provider>
  );
}

function useResponsiveState() {
  const context = useContext(ResponsiveContext);
  if (context === undefined)
    throw new Error("ResponsiveContext was used outside the ResponsiveProvider");
  return context;
}

export { ResponsiveProvider, useResponsiveState };
