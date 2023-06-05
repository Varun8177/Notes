import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const [password, setpassword] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();
  const [load, setload] = useState(false);

  const handleSignup = async () => {
    setload(true);
    if (Email) {
      if (password) {
        try {
          const data = {
            email: Email,
            password,
          };
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/login`,
            data
          );
          localStorage.setItem("token", res.data.token);
          setload(false);
          toast({
            title: res.data.message,
            status: "success",
            isClosable: true,
            duration: 3000,
          });
          navigate("/notes");
        } catch (error) {
          setload(false);
          toast({
            title: error.response.data.message,
            status: "error",
            isClosable: true,
            duration: 3000,
          });
        }
      } else {
        toast({
          title: `Please fill all details`,
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        setload(false);
      }
    } else {
      toast({
        title: `Please fill all details`,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      setload(false);
    }
  };
  return (
    <Box>
      <Heading>Log In</Heading>
      <VStack w={"500px"} m="auto">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Password"
            type={"password"}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </FormControl>
        <Button
          bgColor={"black"}
          color={"white"}
          _hover={{ bgColor: "black", color: "white" }}
          onClick={handleSignup}
          isLoading={load}
        >
          Log in
        </Button>
      </VStack>
    </Box>
  );
};

export default Login;
