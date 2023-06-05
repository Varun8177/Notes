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

export default function UpdateNote({ getData, item }) {
  const toast = useToast();
  const [sub, setsub] = useState(item.subject);
  const [Title, setTitle] = useState(item.title);
  const [Des, setDes] = useState(item.body);
  const [isOpen, setIsopen] = useState(false);
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
  const UpdateNote = () => {
    fetch(`${process.env.REACT_APP_API_URL}/notes/update/${item._id}`, {
      method: "PATCH",
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
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "error",
          isClosable: true,
          duration: 3000,
        });
        setIsopen(false);
      });
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
        Update
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
          <ModalHeader>Update Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                value={sub}
                placeholder="Subject"
                onChange={(e) => {
                  setsub(e.target.value);
                }}
              />

              <FormLabel>Title</FormLabel>
              <Input
                value={Title}
                placeholder="title"
                type={"text"}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FormLabel>Description</FormLabel>
              <Textarea
                value={Des}
                placeholder="Description"
                type={"password"}
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                UpdateNote();
              }}
              bgColor={"black"}
              color={"white"}
              _hover={{ bgColor: "black", color: "white" }}
            >
              Update Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
