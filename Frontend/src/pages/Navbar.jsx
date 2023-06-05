import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <Box w={"100%"} bgColor={"#A6A867"} p={"1rem"} alignItems="center">
      <Flex
        justifyContent={"space-evenly"}
        w={"80%"}
        m={"auto"}
        alignItems="center"
      >
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        {!token ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
          </>
        ) : null}
        <NavLink to={"/notes"}>Notes</NavLink>
        {token ? (
          <Button
            bgColor={"#1B2021"}
            _hover={{ bgColor: "1B2021" }}
            color="white"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
