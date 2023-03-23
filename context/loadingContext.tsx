"use client";

import { createContext, useState } from "react";

interface LoadingContextProps {
  loading: boolean;
  switchLoading: (state: boolean) => void;
}
export const LoadingContext = createContext<LoadingContextProps>({
  loading: true,
  switchLoading: () => {},
});

const Provider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const switchLoading = (state: boolean) => {
    setLoading(state);
  };
  return (
    <LoadingContext.Provider
      value={{
        loading,
        switchLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default Provider;
