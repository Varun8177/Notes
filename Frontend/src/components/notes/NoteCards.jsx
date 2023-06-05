import { Button, Td, Tr, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import UpdateNote from "./UpdateNote";

const NoteCards = ({ i, item, getData }) => {
  const [deleting, setDeleting] = useState(false);
  const toast = useToast();
  const DeleteNote = (nodeId) => {
    setDeleting(true);
    fetch(`${process.env.REACT_APP_API_URL}/notes/delete/${nodeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        getData();
        toast({
          title: "Successfully Deleted",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
        setDeleting(false);
      })
      .catch((err) => {
        toast({
          title: err.message,
          status: "error",
          isClosable: true,
          duration: 2000,
        });
        setDeleting(false);
      });
  };
  return (
    <Tr bgColor={"#F8F7F1"}>
      <Td>{i + 1}</Td>
      <Td>{item.title}</Td>
      <Td>{item.body}</Td>
      <Td cursor={"pointer"} onClick={() => DeleteNote(item._id)}>
        <Button
          bgColor={"white"}
          _hover={{ bgColor: "white" }}
          isLoading={deleting}
        >
          Delete
        </Button>
      </Td>
      <Td cursor={"pointer"}>
        <UpdateNote getData={getData} item={item} />
      </Td>
    </Tr>
  );
};

export default NoteCards;
