import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Heading mt={"100px"} mb="20px" fontSize={"80px"}>
        Welcome to Notes App
      </Heading>
      <Text w={"500px"} m="auto" textAlign={"left"} mb={"50px"}>
        Introducing the Note Taking App - the perfect solution for those who
        need a reliable and convenient way to take notes on the go. This app is
        designed to help you easily create, update, read, and delete any note at
        any time. Plus, with a unique login for every user, you can be sure that
        your notes are always private and secure.
      </Text>
      <Button
        h={"80px"}
        w={"250px"}
        fontSize="20px"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Get Started{" "}
        <Box as="span" ml={"20px"}>
          <HiArrowNarrowRight size={"30"} />
        </Box>
      </Button>
    </Box>
  );
};

export default Home;
