"use client";

import { createContext, useState } from "react";

export interface ILoadingContext {
  loading: boolean;
  toggleLoadingOn: () => void;
  toggleLoadingOff: () => void;
}

export const LoadingContext = createContext<ILoadingContext>({
  loading: false,
} as ILoadingContext);

const Provider = ({ children }: React.PropsWithChildren) => {
  const [loading, setLoading] = useState(false);

  const toggleLoadingOn = () => setLoading(true);

  const toggleLoadingOff = () => setLoading(false);

  return (
    <LoadingContext.Provider
      value={{ loading, toggleLoadingOff, toggleLoadingOn }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default Provider;
