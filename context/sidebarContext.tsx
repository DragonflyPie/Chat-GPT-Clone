"use client";

import { createContext, useState } from "react";

interface SidebarContextProps {
  showSidebar: boolean;
  hideSidebar?: () => void;
  displaySidebar?: () => void;
}

export const SidebarContext = createContext<SidebarContextProps>({
  showSidebar: false,
});

interface ProviderProps extends React.PropsWithChildren {}

const Provider = ({ children }: ProviderProps) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const displaySidebar = () => {
    setShowSidebar(true);
  };
  const hideSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        displaySidebar,
        hideSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default Provider;
