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

const Provider = ({ children }: React.PropsWithChildren) => {
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
