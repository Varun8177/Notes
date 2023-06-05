import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function CreateNewNote({ getData }) {
  const toast = useToast();
  const [sub, setsub] = useState("");
  const [Title, setTitle] = useState("");
  const [Des, setDes] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const [load, setLoad] = useState(false);
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="blur(10px)" backdropBlur="2px" />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const CreateNote = () => {
    if (sub.length) {
      if (Title.length) {
        if (Des.length) {
          setLoad(true);
          fetch(`${process.env.REACT_APP_API_URL}/notes/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              auth: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ title: Title, body: Des, subject: sub }),
          })
            .then((res) => res.json())
            .then((res) => {
              getData();
              toast({
                title: res.message,
                status: "success",
                isClosable: true,
                duration: 3000,
              });
              setIsopen(false);
              setLoad(false);
            })
            .catch((err) => {
              toast({
                title: err.message,
                status: "error",
                isClosable: true,
                duration: 3000,
              });
              setIsopen(false);
              setLoad(false);
            });
        } else {
          toast({
            title: "Please fill all details",
            status: "error",
            isClosable: true,
            duration: 3000,
          });
        }
      } else {
        toast({
          title: "Please fill all details",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    } else {
      toast({
        title: "Please fill all details",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button
        ml="4"
        onClick={() => {
          setIsopen(true);
          setOverlay(<OverlayTwo />);
        }}
      >
        Create New Note
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={() => {
          setIsopen(false);
        }}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>Create New Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                placeholder="Subject"
                onChange={(e) => {
                  setsub(e.target.value);
                }}
              />

              <FormLabel>Title</FormLabel>
              <Input
                placeholder="title"
                type={"text"}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                type={"password"}
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={"10px"}>
            <Button
              onClick={() => {
                setIsopen(false);
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                CreateNote();
              }}
              color={"white"}
              bgColor={"black"}
              isLoading={load}
              _hover={{ bgColor: "black", color: "white" }}
            >
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
