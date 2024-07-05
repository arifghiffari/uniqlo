import { Box, chakra, Container, Stack, Text, Image, Flex, VStack, Button, Heading, SimpleGrid, StackDivider, useColorModeValue, VisuallyHidden, List, ListItem, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Detail({ url }) {
  const [products, setProducts] = useState([]);

  const { id } = useParams();

  async function fetchProducts() {
    try {
      const { data } = await axios(`${url}/pub/products/${id}`);
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <Container maxW={"7xl"}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              //   Gambar Product
              src={products.imgUrl}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "100%", sm: "400px", lg: "500px" }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              {/* Nama product */}
              <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
                {products.name}
              </Heading>
              {/* Taro Pricenya disini */}
              <Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"2xl"}>
                Rp.{products.price}
              </Text>
            </Box>

            <Stack spacing={{ base: 4, sm: 6 }} direction={"column"} divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text color={useColorModeValue("gray.500", "gray.400")} fontSize={"2xl"} fontWeight={"300"}>
                  {products.description}
                </Text>
              </VStack>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent={"center"}>
              <Text>Stock : {products.stock}</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
