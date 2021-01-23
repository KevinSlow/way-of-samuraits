import React, { Suspense } from "react";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <Suspense fallback={<div>Loading.....99%</div>}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}
