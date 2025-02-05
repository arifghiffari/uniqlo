"use client";

import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

export default function Login({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let { data } = await axios.post(`${url}/login`, { email, password });
      //   console.log(data.access_token);
      localStorage.setItem("token", data.access_token);
      navigate("/");
      toast({
        title: "Succes Login.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      //   console.log(error.response.data.message);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            </Stack>
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input onChange={(e) => setEmail(e.target.value)} type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input onChange={(e) => setPassword(e.target.value)} type="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    onClick={handleLogin}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </>
  );
}
