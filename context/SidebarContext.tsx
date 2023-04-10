"use client";

import { createContext, useState } from "react";

export interface ISidebarContext {
  isShown: boolean;
  hideSidebar: () => void;
  displaySidebar: () => void;
}

export const SidebarContext = createContext<ISidebarContext>({
  isShown: false,
} as ISidebarContext);

const Provider = ({ children }: React.PropsWithChildren) => {
  const [isShown, setIsShown] = useState(false);

  const displaySidebar = () => {
    setIsShown(true);
  };
  const hideSidebar = () => {
    setIsShown(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isShown,
        displaySidebar,
        hideSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default Provider;
