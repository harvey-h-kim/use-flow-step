import React, { useState } from "react";
import LoadingPage from "../loading-page";

export interface WithLoadingProps {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export function withLoading<P extends object>(
  Component: React.ComponentType<P & WithLoadingProps>
) {
  return function WithLoadingComponent(props: P) {
    const [isLoading, setLoading] = useState(false);

    if (isLoading) {
      return <LoadingPage />;
    }

    return (
      <Component {...props} isLoading={isLoading} setLoading={setLoading} />
    );
  };
}
