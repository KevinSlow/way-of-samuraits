import React, {Suspense} from "react";
import PreLoader from "../components/Common/Preloader/Preloader";

export const withSuspense = (Component:any): any => {
    return (props:any) => {
        return  <Suspense fallback={<PreLoader/>}>
           <Component {...props} />
        </Suspense>
    }
}