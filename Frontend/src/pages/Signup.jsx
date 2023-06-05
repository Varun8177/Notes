import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const toast = useToast();
  const [email, setemail] = useState("");
  const [location, setlocation] = useState("");
  const [password, setpassword] = useState("");
  const [Conformpassword, setConformpassword] = useState("");
  const [age, setAge] = useState(0);
  const [load, setload] = useState(false);
  const handleSignup = async () => {
    setload(true);
    if (email) {
      if (location) {
        if (age) {
          if (password) {
            if (Conformpassword) {
              if (password === Conformpassword) {
                try {
                  const data = {
                    email,
                    location,
                    password,
                    age,
                  };
                  const res = await axios.post(
                    `${process.env.REACT_APP_API_URL}/users/register`,
                    data
                  );
                  setload(false);
                  toast({
                    title: res.data.message,
                    status: "success",
                    isClosable: true,
                    duration: 3000,
                  });
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
      <Heading>Signup</Heading>
      <VStack w={"500px"} m="auto">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />

          <FormLabel>Location</FormLabel>
          <Input
            placeholder="location"
            onChange={(e) => {
              setlocation(e.target.value);
            }}
          />
          <FormLabel>Age</FormLabel>
          <Input
            placeholder="Age"
            type={"number"}
            onChange={(e) => {
              setAge(e.target.value);
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
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm Password"
            type={"password"}
            onChange={(e) => {
              setConformpassword(e.target.value);
            }}
          />
        </FormControl>
        <Flex w={"100%"} justifyContent="space-evenly">
          <Button
            bgColor={"black"}
            color={"white"}
            _hover={{ bgColor: "black", color: "white" }}
            onClick={handleSignup}
            isLoading={load}
          >
            Sign up
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Signup;
