import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Image, Input, useToast, Flex, Center, Stack, Heading, Link } from "@chakra-ui/react";

import { useParams, useNavigate, Link as ReactRouterLink } from "react-router-dom";

export default function ImageUpload({ url }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast({
        title: "Please select a file first!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const { data } = await axios.patch(`${url}/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });

      console.log(data);
      toast({
        title: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <Center h="100vh">
      <Flex direction="column" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" maxW="md" w="100%">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            Edit Image
          </Heading>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Input type="file" onChange={handleFileChange} accept="image/*" mb={4} />
          {preview && <Image src={preview} alt="Image Preview" boxSize="100px" mb={4} />}
          <Button type="submit" colorScheme="blue" w="full">
            Update Image
          </Button>
          <Link as={ReactRouterLink} to="/">
            back
          </Link>
        </form>
      </Flex>
    </Center>
  );
}
