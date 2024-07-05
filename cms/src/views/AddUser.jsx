"use client";

import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import getUserFromToken from "../utils/auth";
import axios from "axios";
import Forbidden from "./Forbidden";

export default function AddUser({ url }) {
  const user = getUserFromToken();
  //   console.log(user);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const addUser = { email, password, phoneNumber, address };
      let { data } = await axios.post(`${url}/add-user`, addUser, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      console.log(data);
      toast({
        title: "Succes Add User",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.response.data.message);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }
  if (user.role === "admin") {
    return (
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Add User
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>

          <form onSubmit={(e) => handleSubmit(e, email, password, phoneNumber, address)}>
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
              <Stack spacing={2}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement h={"full"}>
                      <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="phoneNumber">
                  <FormLabel>Phone Number</FormLabel>
                  <Input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>
                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Input type="text" onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Add User
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    );
  } else if (user.role !== "admin") {
    return <Forbidden />;
  }
}
