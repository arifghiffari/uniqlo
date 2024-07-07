"use client";

import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, useToast, Select } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import axios from "axios";

export default function ProductForm({ url, handleSubmit, product, isEdit }) {
  // state untuk add atau edit,

  const [category, setCategory] = useState([]);
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    stock: 0,
    categoryId: null,
  });

  //   console.log(editProduct);

  useEffect(() => {
    // console.log(product);
    if (product) {
      setEditProduct({
        ...product,
      });
    }
  }, [product]);

  async function fetchCategory() {
    try {
      let serverUrl = `${url}/category`;

      const { data } = await axios.get(serverUrl, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      //   console.log(data.categories);
      setCategory(data.categories);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} align={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Product Form
          </Heading>
        </Stack>
        <Box rounded={"lg"} minW={"100vh"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={(e) => handleSubmit(e, { ...editProduct })}>
            {/* e, name, description, price, stock, categoryId */}
            <Stack spacing={2}>
              <FormControl id="product">
                <FormLabel>Product Name</FormLabel>
                <Input type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} />
              </FormControl>
              <FormControl id="description">
                <FormLabel>description</FormLabel>
                <InputGroup>
                  <Input type="text" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} />
                </InputGroup>
              </FormControl>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input type="text" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} />
              </FormControl>
              <FormControl id="imgUrl">
                <FormLabel>imgUrl</FormLabel>
                <Input type="text" value={editProduct.imgUrl} onChange={(e) => setEditProduct({ ...editProduct, imgUrl: e.target.value })} />
              </FormControl>
              <FormControl id="stock">
                <FormLabel>stock</FormLabel>
                <Input type="text" value={editProduct.stock} onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select value={editProduct.categoryId} placeholder="Select Category" name="category" onChange={(e) => setEditProduct({ ...editProduct, categoryId: e.target.value })}>
                  {category.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    );
                  })}
                </Select>
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
                  {isEdit ? "Edit form" : "Add form"}
                </Button>
                <Link as={ReactRouterLink} to="/">
                  back
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
