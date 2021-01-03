import React, { Suspense } from "react";

export const withSuspense = (Component: any): any => {
  return (props: any) => {
    return (
      <Suspense fallback={<div>Loading.....99%</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
};
