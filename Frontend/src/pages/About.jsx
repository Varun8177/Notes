import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <Box>
      <Heading mt={"50px"} mb="20px" fontSize={"80px"}>
        About the Notes App
      </Heading>
      <Text w={"500px"} m="auto" textAlign={"left"} mb={"50px"}>
        The Notes App is a reliable and convenient solution for taking notes on
        the go. It provides an easy way to create, update, read, and delete
        notes at any time. Our app is designed to be user-friendly and
        intuitive, ensuring a seamless note-taking experience.
      </Text>

      <Accordion
        defaultIndex={[0]}
        allowMultiple
        maxW={"500px"}
        m={"auto"}
        color={"GrayText"}
      >
        <AccordionItem maxW={"500px"}>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontSize="xl"
                fontWeight="semibold"
                py={2}
              >
                Key Features
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left" ml={4} pl={2}>
            <Text>- Create and organize notes effortlessly.</Text>
            <Text>- Update and modify your notes with ease.</Text>
            <Text>- Read and access your notes anytime, anywhere.</Text>
            <Text>- Delete notes securely when you no longer need them.</Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem maxW={"500px"}>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontSize="xl"
                fontWeight="semibold"
                py={2}
              >
                Benefits of the Notes App
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} textAlign="left" ml={4} pl={2}>
            <Text>- Stay organized and never miss important information.</Text>
            <Text>- Capture ideas and thoughts quickly and conveniently.</Text>
            <Text>- Access your notes across multiple devices.</Text>
            <Text>
              - Ensure the privacy and security of your notes with individual
              user logins.
            </Text>
            <Text>
              - Enjoy a user-friendly and intuitive note-taking experience.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem maxW={"500px"}>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="left"
                fontSize="xl"
                fontWeight="semibold"
                py={2}
              >
                How to Get Started
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Text w={"500px"} m="auto" textAlign={"left"}>
              Getting started with the Notes App is easy:
              <Text>
                1. Sign up for an account or log in if you already have one.
              </Text>
              <Text>
                2. Create your first note by clicking the "Create New Note"
                button.
              </Text>
              <Text>3. Start typing and saving your thoughts and ideas.</Text>
              <Text>4. Access and manage your notes from any device.</Text>
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default About;
