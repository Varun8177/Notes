import { useToast } from "@chakra-ui/react";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const toast = useToast();
  const token = localStorage.getItem("token");
  if (!token) {
    toast({
      title: "Login/signup to access this page",
      status: "error",
      isClosable: true,
      duration: 3000,
    });
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;
