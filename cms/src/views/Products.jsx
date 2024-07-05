import { Table, Thead, Tbody, Tr, Th, Td, Heading, Image, Button, Stack, Spacer, useToast, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiTrash, FiEdit2, FiImage, FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import getUserFromToken from "../utils/auth";

export default function Products({ url }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const user = getUserFromToken();
  //   console.log(user);

  async function fetchProducts() {
    try {
      let serverUrl = `${url}/products`;

      const { data } = await axios.get(serverUrl, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      //   console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleDelete(id) {
    try {
      let serverUrl = `${url}/products/${id}`;

      await axios.delete(serverUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      toast({
        title: `Succes Delete product`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      fetchProducts();
    } catch (error) {
      console.log(error.response.data.message);
      toast({
        title: `${error.response.data.message} to Delete`,
        description: "Because only Admin or Products that you made",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleEditImage(id) {
    navigate(`/edit-image/${id}`);
  }

  return (
    <>
      <Heading>
        Table of Products
        <Spacer />
        <Button colorScheme="blue" as="a" href="new-product">
          <FiEdit /> Add New Product
        </Button>
      </Heading>
      <br />
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Description</Th>
            <Th>Stock</Th>
            <Th>Price</Th>
            <Th>Author</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((products) => {
            return (
              <Tr key={products.id}>
                <Td>{products.name}</Td>
                <Td>
                  <Image src={products.imgUrl} alt="Segun Adebayo" />
                </Td>
                <Td>{products.description}</Td>
                <Td>{products.stock}</Td>
                <Td>Rp.{products.price}</Td>
                <Td>{products.User.email}</Td>
                <Td>
                  <Stack spacing={1} direction="row" align="center">
                    {(user.id === products.authorId || user.role === "admin") && (
                      <>
                        <Button onClick={() => handleDelete(products.id)} colorScheme="red" size="sm">
                          <FiTrash />
                        </Button>
                        <Button onClick={() => handleEdit(products.id)} colorScheme="blue" size="sm">
                          <FiEdit2 />
                        </Button>
                        <Button onClick={() => handleEditImage(products.id)} colorScheme="green" size="sm">
                          <FiImage />
                        </Button>
                      </>
                    )}
                  </Stack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}
