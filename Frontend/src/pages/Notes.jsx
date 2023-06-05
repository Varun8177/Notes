import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateNewNote from "../components/notes/CreateNote";
import NoteCards from "../components/notes/NoteCards";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filterValues, setFilterValues] = useState([]);

  const getData = () => {
    let url = `${process.env.REACT_APP_API_URL}/notes?`;
    for (let i = 0; i < filterValues.length; i++) {
      url += "sub=" + filterValues[i] + "&";
    }
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        auth: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNotes(res);
        let obj = {};
        for (let i = 0; i < res.length; i++) {
          obj[res[i].subject] = 0;
        }
        let arr = [];
        for (let key in obj) {
          arr.push(key);
        }
        setFilters(arr);
      })
      .catch((err) => console.log(err));
  };
  const getFilteredData = () => {
    let url = `${process.env.REACT_APP_API_URL}/notes?`;
    for (let i = 0; i < filterValues.length; i++) {
      url += "sub=" + filterValues[i] + "&";
    }
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        auth: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNotes(res);
      })
      .catch((err) => console.log(err));
  };

  const handleFilterChange = (value) => {
    setFilterValues(value);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getFilteredData();
  }, [filterValues]);

  return (
    <Box w={"80%"} m="auto" mt={"20px"}>
      <Flex justifyContent={"space-between"}>
        <CheckboxGroup
          colorScheme="orange"
          value={filterValues}
          onChange={handleFilterChange}
        >
          <Stack
            spacing={[1, 5]}
            direction={["column", "row"]}
            alignItems={"center"}
          >
            <Text>Filter by Subject :</Text>
            {filters.map((item) => {
              return (
                <Checkbox size="lg" value={item}>
                  {item}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
        <CreateNewNote getData={getData} />
      </Flex>

      {notes.length > 0 ? (
        <Table mt="20px">
          <Thead bgColor={"#E3DCC2"}>
            <Th>Sr.no</Th>
            <Th>Title</Th>
            <Th>Note</Th>
            <Th>Delete</Th>
            <Th bgColor={"#7C7D52"} color="white">
              Update
            </Th>
          </Thead>
          <Tbody>
            {notes.map((item, i) => {
              return <NoteCards getData={getData} i={i} item={item} key={i} />;
            })}
          </Tbody>
        </Table>
      ) : (
        <Box>
          <Heading>No notes available</Heading>
        </Box>
      )}
    </Box>
  );
};

export default Notes;
