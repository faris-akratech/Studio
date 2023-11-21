import React, { useState, useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import createAxiosInstance from "./axiosInterceptor";
import { SERVER } from "./constants";

const axiosInstance = createAxiosInstance(SERVER);

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/", {
          headers: {
            needsToken: true,
          },
        });
        if (response.status !== 200) return setIsAllowed(false);
        else return setIsAllowed(true);
      } catch (err) {
        console.error(err);
        return setIsAllowed(false);
      }
    };
    fetchData();
  }, [axiosInstance]);
 
//   useEffect(()=> {
    // return <>{isAllowed ? <Element /> : <Navigate to="/login" />}</>;
//   },[isAllowed])
  //   return (
  //     <Route
  //       {...rest}
  //       element={isAllowed ? <Element /> : <Navigate to="/login" />}
  //     />
  //   );
//   
  return <>{isAllowed && <Element />}</>;
};

export default PrivateRoute;
